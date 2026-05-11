import React, { useEffect } from 'react';
import { useLocation, useNavigate, useRouterStore } from 'ejsc-ma-router';
import type { IRouterStoreState } from 'ejsc-ma-router';
import { useNavBar } from 'ejsc-ma-component';
import { apisAsync, type IEjscSetNavigationBarOptions } from 'ejsc-ma-api';
import { Home, Code, Info, User, Link as LinkIcon } from 'lucide-react';
import { bottomTabBarConfig, appRouterConfig } from '../navigation';

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
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { updateNavBar } = useNavBar();
  
  const isTransitioning = useRouterStore((s: IRouterStoreState) => s.isPending);
  const histories = useRouterStore((s: IRouterStoreState) => s.histories);
  const globalLastHistory = histories[histories.length - 1];
  const isActive = globalLastHistory?.location?.key === pageLocation.key;

  const currentPage = appRouterConfig.pages.find(p => p.pathname === pageLocation.pathname);

  useEffect(() => {
    if (isActive && currentPage) {
      const navOptions: IEjscSetNavigationBarOptions = {
        visible: false,
        immersive: true,
        title: currentPage.navigationBar?.title || '',
        backIcon: currentPage.navigationBar?.backIcon || 'none'
      };

      apisAsync.setNavigationBar(navOptions);
      updateNavBar(currentPage.navigationBar || { visible: false, title: '', backIcon: 'none' });
    }
  }, [isActive, pageLocation.pathname, updateNavBar, currentPage]);

  return (
    <div 
      className="app-layout"
      style={{
        pointerEvents: isTransitioning ? 'none' : 'auto',
        background: 'var(--color-ejsc-bg-page)'
      }}
    >
      <main className="app-main">
        {children}
      </main>

      {/* Basic Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[70px] bg-white border-t border-slate-100 flex items-center justify-around px-2 z-50">
        {bottomTabBarConfig.items.map((tab) => {
          const isTabActive = pageLocation.pathname === tab.path;
          return (
            <div
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                isTabActive ? 'text-orange-600' : 'text-slate-400'
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

export default React.memo(MainLayout);
