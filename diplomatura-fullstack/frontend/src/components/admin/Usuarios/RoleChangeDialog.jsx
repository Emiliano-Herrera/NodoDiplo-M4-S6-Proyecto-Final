import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

const roleLabels = {
  admin: 'Administrador (acceso total)',
  editor: 'Editor (puede editar contenido)',
  visitante: 'Visitante (solo lectura)',
};

export function RoleChangeDialog({ usuario, onConfirm, onClose }) {
  const [rol, setRol] = useState(usuario?.rol || 'visitante');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onConfirm(usuario._id, rol);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-md p-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cambiar Rol de Usuario</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Usuario: <span className="font-medium text-foreground">{usuario?.nombre}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Email: <span className="font-medium text-foreground">{usuario?.email}</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label>Nuevo Rol</Label>
          <Select value={rol} onValueChange={setRol}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="visitante">Visitante</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            {roleLabels[rol]}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Guardando...' : 'Cambiar Rol'}
          </Button>
        </div>
      </div>
    </div>
  );
}