import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

export const Navbar: React.FC = () => {
  const { points } = useUserStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold tracking-wider text-blue-400 hover:text-blue-300">
          ReadSpace Pro
        </Link>

        <nav className="flex items-center space-x-8 text-sm font-medium">
          <Link
            to="/"
            className={isActive('/') ? 'text-blue-400 border-b-2 border-blue-400 pb-1 font-semibold' : 'text-slate-300 hover:text-white transition-colors'}
          >
            หน้าหลัก
          </Link>
          <Link
            to="/collection"
            className={isActive('/collection') ? 'text-blue-400 border-b-2 border-blue-400 pb-1 font-semibold' : 'text-slate-300 hover:text-white transition-colors'}
          >
            คอลเลกชัน
          </Link>
          <Link
            to="/points"
            className={isActive('/points') ? 'text-blue-400 border-b-2 border-blue-400 pb-1 font-semibold' : 'text-slate-300 hover:text-white transition-colors'}
          >
            เติมแต้ม
          </Link>
          <Link
            to="/about"
            className={isActive('/about') ? 'text-blue-400 border-b-2 border-blue-400 pb-1 font-semibold' : 'text-slate-300 hover:text-white transition-colors'}
          >
            ผู้พัฒนา
          </Link>
        </nav>

        <div className="bg-blue-950 border border-blue-800 text-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
          แต้มคงเหลือ: <span className="text-white font-bold text-sm ml-1">{points}</span>
        </div>
      </div>
    </header>
  );
};