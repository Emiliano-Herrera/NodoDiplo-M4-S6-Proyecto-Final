import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function RegistroPage() {
  const { registro } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registro(nombre, email, password);
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message || "Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Diplomatura Full-Stack</h1>
          <p className="text-muted-foreground mt-2">Crear Cuenta</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              className="w-full p-2 border rounded-lg bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-2 rounded-lg"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-primary hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegistroPage;
