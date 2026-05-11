import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Text } from 'ejsc-ma-component';
import appLogo from '../../../assets/icons/Icon.png';
import appDiscount from '../../../assets/icons/discount.png';
import appMyBiz from '../../../assets/icons/myBiz.png';
import bgHeader from '../../../assets/images/bg-header.jpg';
import { apisAsync } from 'ejsc-ma-api';

interface HomeHeaderProps {
  onNavigate: (path: string) => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Landscape Banner Background */}
      <div className="absolute inset-x-0 top-0 h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHeader})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-ejsc-bg-page/40" />
      </div>

      {/* Floating Topbar */}
      <div
        className="relative z-20 mt-0.5 px-3 flex items-center justify-between gap-1.5"
        style={{ paddingTop: 'calc(var(--safe-top, env(safe-area-inset-top, 0px)) + 6px)' }}
      >
        <div className="w-15 h-15 shrink-0 flex items-center justify-center select-none active:scale-95 transition-transform">
          <img src={appLogo} alt="logo" className="w-full h-full object-contain" />
        </div>

        <div className="flex-1 flex items-center justify-between gap-1 bg-transparent rounded-full px-4 h-15 border border-white/20 backdrop-blur-md min-w-0 ">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Search size={14} className="text-white/80 shrink-0" />
            <input
              type="text"
              placeholder="Tìm dịch vụ..."
              className="flex-1 bg-transparent border-none outline-none text-ejsc-sub font-normal text-white placeholder:text-white/60 min-w-0"
            />
          </div>
          <div className="flex items-center gap-0.5 shrink-0 px-1 border-l border-white/10 pl-2 active:opacity-70 transition-opacity cursor-pointer">
            <span className="text-ejsc-sub text-white/90 font-normal whitespace-nowrap">Khu vực</span>
            <ChevronDown size={14} className="text-white/70 shrink-0" />
          </div>
        </div>

        {/* Reserved space for native controls (Three dots & Close button) */}
        <div className="w-[100px] shrink-0" />

        {/* 
        <div className="w-11 h-11 shrink-0 flex items-center justify-center select-none active:scale-95 transition-transform bg-transparent rounded-ejsc-main border border-white/20 shadow-sm backdrop-blur-md overflow-hidden">
          <img src={appDiscount} alt="discount" className="w-full h-full object-cover" />
        </div>

        <div
          onClick={() => {
            apisAsync.openNativeWindow({
              url: 'https://mini-app-debugger-z6kv.vercel.app/',
              title: 'My Biz'
            });
          }}
          className="flex items-center gap-2 shrink-0 px-3.5 h-11 rounded-ejsc-main bg-transparent select-none active:scale-95 transition-transform shadow-sm border border-white/20 backdrop-blur-md"
        >
          <img src={appMyBiz} alt="mybiz" className="w-5 h-5 object-contain" />
          <Text weight='medium' variant="caption" className="text-white tracking-wider">Mybiz</Text>
        </div>
        */}
      </div>
    </>
  );
};
