import { useState } from "react";
import { Edit, Trash2, UserCog } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

const roleColors = {
  admin: "bg-red-500/10 text-red-500",
  editor: "bg-blue-500/10 text-blue-500",
  visitante: "bg-green-500/10 text-green-500",
};

const roleLabels = {
  admin: "Administrador",
  editor: "Editor",
  visitante: "Visitante",
};

export function UsuarioTable({ usuarios, onEdit, onDelete, onRoleChange }) {
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Fecha Registro</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground py-8"
              >
                No hay usuarios registrados
              </TableCell>
            </TableRow>
          ) : (
            usuarios.map((usuario, index) => (
              <TableRow key={usuario._id} className="hover:bg-muted/20">
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                  <Badge className={roleColors[usuario.rol]}>
                    {roleLabels[usuario.rol]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(usuario.fecha_registro).toLocaleDateString("es-AR")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(usuario)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRoleChange(usuario)}
                      className="h-8 w-8 p-0 text-blue-500"
                    >
                      <UserCog className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(usuario)}
                      className="h-8 w-8 p-0 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
