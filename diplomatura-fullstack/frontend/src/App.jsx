import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalNoise } from "./components/common/GlobalNoise";
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import HomePage from "./pages/visitante/HomePage";
import ModulosPage from "./pages/visitante/ModulosPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistroPage from "./pages/auth/RegistroPage";
import DashboardPage from "./pages/admin/DashboardPage";
import UsuariosAdminPage from "./pages/admin/UsuariosAdminPage";
import ProfesoresAdminPage from "./pages/admin/ProfesoresAdminPage";
import ModulosAdminPage from "./pages/admin/ModulosAdminPage";
import TemasAdminPage from "./pages/admin/TemasAdminPage";
import TemaDetailPage from "./pages/admin/TemaDetailPage";
import TemaCreatePage from "./pages/admin/TemaCreatePage";
import TemaEditPage from "./pages/admin/TemaEditPage";
import DiplomaturaPage from './pages/visitante/DiplomaturaPage';
import DocumentacionPage from './pages/visitante/DocumentacionPage';


function App() {
  console.log("🔍 Renderizando App, usuario actual:", user?.rol);
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background">
        <Routes>
          {/* Rutas públicas (visitantes) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/modulos" element={<ModulosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/diplomatura" element={<DiplomaturaPage />} />
          <Route path="/documentacion" element={<DocumentacionPage />} />

          {/* Rutas del admin con layout anidado */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="usuarios" element={<UsuariosAdminPage />} />
            <Route path="profesores" element={<ProfesoresAdminPage />} />
            <Route path="modulos" element={<ModulosAdminPage />} />

            {/* Rutas de temas */}
            <Route path="temas" element={<TemasAdminPage />} />
            <Route path="temas/nuevo" element={<TemaCreatePage />} />
            <Route path="temas/:temaId" element={<TemaDetailPage />} />
            <Route path="temas/:temaId/editar" element={<TemaEditPage />} />
          </Route>
        </Routes>

        {/* Ruido encima de TODO */}
        <GlobalNoise opacity={0.06} backgroundSize="400px" />
      </div>
    </BrowserRouter>
  );
}

export default App;