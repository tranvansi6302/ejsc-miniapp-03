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
      {/* Floating Topbar (Immersive Style) - Handled with Safe Area */}
      <div
        className="relative z-20 px-3 flex items-center gap-2 w-full transition-all duration-300"
        style={{ 
          paddingTop: 'calc(var(--ejsc-safe-top) + 8px)', // Thêm 8px padding để không dính sát mép
          paddingBottom: '8px'
        }}
      >
        <div className="w-[30px] h-[30px] shrink-0 flex items-center justify-center select-none active:scale-95 transition-transform">
          <img src={appLogo} alt="logo" className="w-full h-full object-contain" />
        </div>

        <div className="flex-1 flex items-center justify-between gap-1 bg-white rounded-full px-4 h-[30px] border border-slate-100 shadow-sm min-w-0 transition-shadow focus-within:shadow-md">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-slate-700 placeholder:text-slate-400 min-w-0"
            />
          </div>
          <div className="flex items-center gap-1 shrink-0 px-1 border-l border-slate-100 pl-2 active:opacity-70 transition-opacity cursor-pointer">
            <MapPin size={11} className="text-ejsc-brand-sub" />
            <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]">
              {city || 'Khu vực'}
            </span>
            <ChevronDown size={12} className="text-slate-300 shrink-0" />
          </div>
        </div>

        {/* Capsule space - Reserved for native menu buttons */}
        <div className="w-[85px] shrink-0" />
      </div>
    </>
  );
};
