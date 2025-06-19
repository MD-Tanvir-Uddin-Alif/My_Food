import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ClipboardList, Plus, Folder } from 'lucide-react';

const AdminLayout = () => {

    const location = useLocation();

    const isActive = (path) => location.pathname.endsWith(path);

      const navItems = [
    { path: '/admin/add-food', label: 'Add Food', icon: <Plus size={20} /> },
    { path: '/admin/products/', label: 'View Food', icon: <ClipboardList size={20} /> },
    { path: '/admin/add-category', label: 'Add Category', icon: <Plus size={20} /> },
    { path: '/admin/categorys/', label: 'View Categories', icon: <Folder size={20} /> },
  ]
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-xl p-6 space-y-8 border-r border-red-200">
        <h2 className="text-3xl font-bold text-red-600">🍽️ Food Admin</h2>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className='block'>
              <button
                className={`flex items-center gap-3 w-full py-3 px-4 rounded-xl border text-left text-sm font-medium transition-all duration-200
                  ${
                    isActive(item.path)
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-red-50 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout