import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal, Edit, Trash2, UserCog } from 'lucide-react';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Input } from '../../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Badge } from '../../ui/badge';

const roleColors = {
  admin: 'bg-red-500/10 text-red-500 border-red-500/20',
  editor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  visitante: 'bg-green-500/10 text-green-500 border-green-500/20',
};

const roleLabels = {
  admin: 'Administrador',
  editor: 'Editor',
  visitante: 'Visitante',
};

export function UsuarioTableAdvanced({
  usuarios,
  onEdit,
  onDelete,
  onRoleChange,
  currentUserRol,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Seleccionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'nombre',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="p-0 hover:bg-transparent"
            >
              Nombre
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('nombre')}</div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="p-0 hover:bg-transparent"
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue('email')}</div>
        ),
      },
      {
        accessorKey: 'rol',
        header: 'Rol',
        cell: ({ row }) => {
          const rol = row.getValue('rol');
          return (
            <Badge className={roleColors[rol]}>
              {roleLabels[rol]}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'fecha_registro',
        header: 'Fecha Registro',
        cell: ({ row }) => {
          const fecha = row.getValue('fecha_registro');
          return new Date(fecha).toLocaleDateString('es-AR');
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const usuario = row.original;
          const esAdminActual = currentUserRol === 'admin';
          
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end" sideOffset={5}>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(usuario)} className="gap-2 cursor-pointer">
                  <Edit className="h-4 w-4" />
                  <span>Editar usuario</span>
                </DropdownMenuItem>
                {esAdminActual && (
                  <DropdownMenuItem onClick={() => onRoleChange(usuario)} className="gap-2 cursor-pointer">
                    <UserCog className="h-4 w-4" />
                    <span>Cambiar rol</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete(usuario)}
                  className="gap-2 cursor-pointer text-red-500 focus:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Eliminar usuario</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [currentUserRol, onEdit, onDelete, onRoleChange]
  );

  const table = useReactTable({
    data: usuarios,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Barra de herramientas */}
      <div className="flex items-center py-4 gap-4 flex-wrap">
        <Input
          placeholder="Filtrar por email..."
          value={table.getColumn('email')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded-full"
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto rounded-full">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnLabels = {
                  nombre: 'Nombre',
                  email: 'Email',
                  rol: 'Rol',
                  fecha_registro: 'Fecha Registro',
                };
                return (
                  <DropdownMenuItem
                    key={column.id}
                    className="cursor-pointer"
                    onClick={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    <Checkbox
                      checked={column.getIsVisible()}
                      className="mr-2"
                      onCheckedChange={() => {}}
                    />
                    {columnLabels[column.id] || column.id}
                  </DropdownMenuItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla */}
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-border/50 hover:bg-muted/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}