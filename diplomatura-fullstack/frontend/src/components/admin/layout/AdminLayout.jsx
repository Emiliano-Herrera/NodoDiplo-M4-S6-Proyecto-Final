import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AdminLayout() {
  console.log("🏗️ AdminLayout se está renderizando");
  return (
    <div className="flex min-h-screen bg-background justify-center px-4">
      <div className="flex w-full max-w-[1600px] gap-6">
        <Sidebar />
        <main className="flex-1 overflow-auto py-8 pr-4 pl-4 lg:pl-0">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}