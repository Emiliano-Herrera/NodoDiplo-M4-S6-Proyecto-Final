import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function RegistroPage() {
  const { registro } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validaciones de contraseña
  const passwordValidations = {
    minLength: password.length >= 6,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const allValidationsPass = Object.values(passwordValidations).every(v => v === true);

  const validateForm = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
    }
    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!allValidationsPass) {
      newErrors.password = "La contraseña no cumple con los requisitos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
    
    try {
      const userData = await registro(nombre, email, password);
      // ✅ Redirigir a HOME (visitante) en lugar de /admin
      navigate("/");
    } catch (err) {
      setError(err.message || "Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 md:p-8 space-y-6 bg-card rounded-xl shadow-lg border border-border">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Diplomatura Full-Stack</h1>
          <p className="text-muted-foreground mt-2">Crear Cuenta</p>
        </div>

        {(error || Object.keys(errors).length > 0) && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm space-y-1">
            {error && <p>{error}</p>}
            {touched.nombre && errors.nombre && <p>{errors.nombre}</p>}
            {touched.email && errors.email && <p>{errors.email}</p>}
            {touched.password && errors.password && <p>{errors.password}</p>}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() => handleBlur('nombre')}
              required
              className="w-full p-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tu nombre"
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              required
              className="w-full p-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="tu@email.com"
            />
          </div>

          {/* Campo Contraseña con visibilidad */}
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••"
                className="w-full p-2 pr-10 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Requisitos de contraseña */}
          {password && (
            <div className="text-xs space-y-1 p-3 bg-muted/20 rounded-lg">
              <p className="font-medium mb-1">La contraseña debe contener:</p>
              <div className="flex items-center gap-2">
                {passwordValidations.minLength ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                <span className={passwordValidations.minLength ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                  Mínimo 6 caracteres
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordValidations.hasUpperCase ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                <span className={passwordValidations.hasUpperCase ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                  Al menos una mayúscula
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordValidations.hasLowerCase ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                <span className={passwordValidations.hasLowerCase ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                  Al menos una minúscula
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordValidations.hasNumber ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                <span className={passwordValidations.hasNumber ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                  Al menos un número
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={password && !allValidationsPass}
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