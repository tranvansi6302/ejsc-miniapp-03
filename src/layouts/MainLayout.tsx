/**
 * @file layouts/MainLayout.tsx
 * @description Layout chính của ứng dụng - Mini App 3.
 */
import React from 'react';
import { useLocation, useNavigate } from 'ejsc-ma-router';
import { Home, LayoutGrid, Calendar, User, History, Code, Info, Link as LinkIcon } from 'lucide-react';
import { bottomTabBarConfig } from '../navigation';

const getIcon = (name: string) => {
  switch (name) {
    case 'home': return <Home size={20} />;
    case 'api':
    case 'code': return <Code size={20} />;
    case 'about':
    case 'info': return <Info size={20} />;
    case 'account':
    case 'user': return <User size={20} />;
    case 'link': return <LinkIcon size={20} />;
    default: return <Home size={20} />;
  }
};

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 pb-[80px]">
        {children}
      </main>

      {/* Basic Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[70px] bg-white border-t border-slate-100 flex items-center justify-around px-2 z-50">
        {bottomTabBarConfig.items.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <div
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                isActive ? 'text-orange-600' : 'text-slate-400'
              }`}
            >
              {getIcon(tab.icon)}
              <span className="text-[10px] font-medium">{tab.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainLayout;
