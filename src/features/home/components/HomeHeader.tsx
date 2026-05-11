import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { Text } from 'ejsc-ma-component';
import appLogo from '../../../assets/icons/Icon.png';
import bgHeader from '../../../assets/images/bg-header.jpg';
import { apisAsync } from 'ejsc-ma-api';

interface HomeHeaderProps {
  onNavigate: (path: string) => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onNavigate }) => {
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await apisAsync.getUserLocation();
        if (res.success && res.data?.city) {
          setCity(res.data.city);
        }
      } catch (e) {
        console.error('Fetch location failed:', e);
      }
    };
    fetchLocation();
  }, []);

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
          <div className="flex items-center gap-1 shrink-0 px-1 border-l border-white/10 pl-2 active:opacity-70 transition-opacity cursor-pointer">
            <MapPin size={12} className="text-white/70" />
            <span className="text-ejsc-sub text-white/90 font-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]">
              {city || 'Khu vực'}
            </span>
            <ChevronDown size={14} className="text-white/70 shrink-0" />
          </div>
        </div>

        {/* Reserved space for native controls */}
        <div className="w-[100px] shrink-0" />
      </div>
    </>
  );
};
