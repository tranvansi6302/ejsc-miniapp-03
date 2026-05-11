import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useRouterStore } from 'ejsc-ma-router';
import type { IRouterStoreState } from 'ejsc-ma-router';
import { useNavBar } from 'ejsc-ma-component';
import { apisAsync, type IEjscSetNavigationBarOptions } from 'ejsc-ma-api';
import { Home, LayoutGrid, Calendar, User, History, Code, Info } from 'lucide-react';
import { bottomTabBarConfig, appRouterConfig } from '../navigation';

/** 
 * Hàm ánh xạ tên icon sang Lucide icons. 
 */
const getIcon = (name: string) => {
  switch (name) {
    case 'home': return <Home size={20} />;
    case 'services':
    case 'grid': return <LayoutGrid size={20} />;
    case 'booking':
    case 'calendar': return <Calendar size={20} />;
    case 'activities':
    case 'history': return <History size={20} />;
    case 'account':
    case 'user': return <User size={20} />;
    case 'api':
    case 'code': return <Code size={20} />;
    case 'about':
    case 'info': return <Info size={20} />;
    default: return <Home size={20} />;
  }
};

interface IBottomBarProps {
  show: boolean;
  items: Array<{ path: string; icon: string; name: string }>;
  currentPath: string;
}

const MemoizedBottomBar = React.memo(({ show, items, currentPath }: IBottomBarProps) => {
  const navigate = useNavigate();
  if (!show) return null;

  return createPortal(
    <div className="fixed bottom-0 left-0 w-full z-[1000] h-[98px] flex flex-col justify-end pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-[84px] pointer-events-auto overflow-hidden">
        <svg
          viewBox="0 0 400 84"
          className="w-full h-full fill-white drop-shadow-[0_-5px_14px_rgba(0,0,0,0.06)]"
          preserveAspectRatio="none"
        >
          <path d="M0,84 L400,84 L400,43 Q400,28 385,28 C338,28 318,28 244,28 C233,28 224,13 200,13 C176,13 167,28 156,28 C82,28 62,28 15,28 Q0,28 0,43 Z" />
        </svg>
      </div>

      <div className="relative flex items-end justify-between px-1 pb-2 pointer-events-auto w-full h-full">
        {items.map((tab) => {
          const isActive = currentPath === tab.path;
          const isFAB = tab.path === '/booking';

          if (isFAB) {
            return (
              <div key={tab.path} className="flex-1 flex flex-col items-center justify-end pb-3 h-full">
                <div
                  onClick={() => navigate(tab.path)}
                  className="z-50 -mb-[6px] active:scale-95 transition-all flex items-center justify-center h-[60px] w-[60px]"
                >
                  <div className="h-[35px] w-[35px] rounded-[11px] bg-ejsc-brand-sub overflow-hidden flex items-center justify-center shadow-[0_4px_12px_rgba(52,92,90,0.2)]">
                    <Calendar size={25} className="text-white" />
                  </div>
                </div>
                <span className={`text-[10px] leading-none font-normal ${isActive ? 'text-ejsc-brand-sub' : 'text-slate-900'}`}>
                  {tab.name}
                </span>
              </div>
            );
          }

          return (
            <div
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-end pb-3 h-full transition-all cursor-pointer active:opacity-60 ${isActive ? 'text-ejsc-brand-sub' : 'text-slate-400'}`}
            >
              <div className={`${isActive ? 'scale-105 text-ejsc-brand-sub' : 'text-slate-400'} transition-all mb-1`}>
                {getIcon(tab.icon)}
              </div>
              <span className={`text-[10px] leading-none font-normal ${isActive ? 'text-ejsc-brand-sub' : 'text-slate-400'}`}>
                {tab.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );
});

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const pageLocation = useLocation();
  const isTransitioning = useRouterStore((s: IRouterStoreState) => s.isPending);
  const histories = useRouterStore((s: IRouterStoreState) => s.histories);
  const globalLastHistory = histories[histories.length - 1];
  const isActive = globalLastHistory?.location?.key === pageLocation.key;

  const { updateNavBar } = useNavBar();

  const currentPage = (appRouterConfig.pages as any[]).find(p => p.pathname === pageLocation.pathname);
  const showBottomNav = currentPage?.showBottomNav !== false;

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

      <MemoizedBottomBar
        show={showBottomNav}
        items={bottomTabBarConfig.items}
        currentPath={pageLocation.pathname}
      />
    </div>
  );
};

export default React.memo(MainLayout);
