import React, { useEffect } from 'react';
import { useLocation, useRouterStore } from 'ejsc-ma-router';
import type { IRouterStoreState } from 'ejsc-ma-router';
import { BottomBar, useNavBar } from 'ejsc-ma-component';
import { apisAsync, type IEjscSetNavigationBarOptions } from 'ejsc-ma-api';
import { Home, LayoutGrid, Calendar, User, History, Code, Info } from 'lucide-react';
import { bottomTabBarConfig, appRouterConfig } from '../navigation';

/** 
 * Hàm ánh xạ tên icon sang Lucide icons. 
 */
const getIcon = (name: string) => {
  switch (name) {
    case 'home': return <Home size={18} />;
    case 'services':
    case 'grid': return <LayoutGrid size={18} />;
    case 'booking':
    case 'calendar': return <Calendar size={18} />;
    case 'activities':
    case 'history': return <History size={18} />;
    case 'account':
    case 'user': return <User size={18} />;
    case 'api':
    case 'code': return <Code size={18} />;
    case 'about':
    case 'info': return <Info size={18} />;
    default: return <Home size={18} />;
  }
};

interface IBottomBarProps {
  show: boolean;
  items: Array<{ path: string; icon: string; name: string }>;
  currentPath: string;
}

const MemoizedBottomBar = React.memo(({ show, items, currentPath }: IBottomBarProps) => {
  if (!show) return null;

  return (
    <BottomBar 
      style={{ 
        paddingBottom: 'var(--ejsc-safe-bottom)',
        paddingTop: '10px', // Tạo khoảng cách phía trên cho cân đối
        height: 'auto',     // Cho phép thanh menu giãn theo nội dung
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {items.map((tab) => (
        <BottomBar.Item
          key={tab.path}
          path={tab.path}
          isActive={currentPath === tab.path}
          icon={getIcon(tab.icon)}
          label={tab.name}
        />
      ))}
    </BottomBar>
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
