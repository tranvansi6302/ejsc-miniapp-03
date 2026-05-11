import { apisAsync } from 'ejsc-ma-api';
import { StandardPage, Text } from 'ejsc-ma-component';
import {
  ChevronRight,
  Cog,
  Droplets,
  Lightbulb, Sparkles,
  Thermometer,
  Trash2,
  Waves,
  Wind,
  Zap,
  MapPin
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SERVICE_DATA = [
  {
    category: 'Sửa chữa điện nước',
    items: [
      { id: '1', name: 'Sửa vòi nước, đường ống', price: '150k - 450k', icon: <Droplets size={20} className="text-blue-500" />, iconBg: 'bg-blue-50' },
      { id: '2', name: 'Sửa chập điện, nhảy aptomat', price: '200k - 600k', icon: <Zap size={20} className="text-orange-500" />, iconBg: 'bg-orange-50' },
      { id: '3', name: 'Lắp đặt, thay mới bóng đèn', price: '100k - 300k', icon: <Lightbulb size={20} className="text-amber-500" />, iconBg: 'bg-amber-50' },
    ]
  },
  {
    category: 'Vệ sinh nhà cửa',
    items: [
      { id: '4', name: 'Dọn dẹp nhà cửa (theo giờ)', price: '80k/giờ', icon: <Sparkles size={20} className="text-emerald-500" />, iconBg: 'bg-emerald-50' },
      { id: '5', name: 'Giặt Sofa, nệm, rèm cửa', price: '300k - 800k', icon: <Waves size={20} className="text-cyan-500" />, iconBg: 'bg-cyan-50' },
      { id: '6', name: 'Tổng vệ sinh sau xây dựng', price: '1tr - 5tr', icon: <Trash2 size={20} className="text-rose-500" />, iconBg: 'bg-rose-50' },
    ]
  },
  {
    category: 'Bảo trì điện lạnh',
    items: [
      { id: '7', name: 'Vệ sinh máy lạnh (treo tường)', price: '150k - 250k', icon: <Wind size={20} className="text-indigo-500" />, iconBg: 'bg-indigo-50' },
      { id: '8', name: 'Nạp gas, kiểm tra hệ thống', price: '200k - 500k', icon: <Thermometer size={20} className="text-sky-500" />, iconBg: 'bg-sky-50' },
      { id: '9', name: 'Sửa máy giặt, tủ lạnh', price: '300k - 1tr', icon: <Cog size={20} className="text-slate-500" />, iconBg: 'bg-slate-50' },
    ]
  }
];

const FEATURED_SERVICES = [
  { id: 'f1', name: 'Vệ sinh Máy lạnh', price: 'Chỉ từ 150k', icon: <Wind size={24} className="text-indigo-500" />, iconBg: 'bg-indigo-50', tag: 'Hot' },
  { id: 'f2', name: 'Dọn dẹp nhà', price: 'Chỉ từ 80k', icon: <Sparkles size={24} className="text-emerald-500" />, iconBg: 'bg-emerald-50', tag: 'Phổ biến' },
  { id: 'f3', name: 'Sửa điện cấp tốc', price: 'Từ 200k', icon: <Zap size={24} className="text-orange-500" />, iconBg: 'bg-orange-50', tag: 'Cấp cứu' },
];

const ServicesScreen: React.FC = () => {
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
    <StandardPage hideAppBar contentClassName="!p-0 bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white px-5 pt-24 pb-6">
        <Text variant="h3" weight="bold" className="text-slate-900">Khám phá dịch vụ</Text>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={12} className="text-ejsc-brand-sub" />
          <Text variant="sub" className="text-slate-400 block">
            {city ? `Dịch vụ tại ${city}` : 'Đang xác định vị trí...'}
          </Text>
        </div>
      </div>

      <div className="pb-24 flex flex-col gap-8">
        {/* Featured Services Section */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="px-5">
            <Text variant="sub" weight="bold" className="text-slate-800">Dịch vụ nổi bật</Text>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
            {FEATURED_SERVICES.map((item) => (
              <div 
                key={item.id} 
                className="min-w-[200px] bg-white rounded-2xl p-4 border border-slate-100 flex flex-col gap-3 active:bg-slate-50 transition-all shrink-0"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="bg-orange-100 px-1.5 py-0.5 rounded text-[8px] font-bold text-orange-600 uppercase tracking-tighter">
                    {item.tag}
                  </div>
                </div>
                <div>
                  <Text variant="sub" weight="bold" className="text-slate-800 block truncate">{item.name}</Text>
                  <Text variant="sub" className="text-ejsc-brand-sub font-bold text-[11px] mt-1 block">{item.price}</Text>
                </div>
                <button className="w-full py-2 bg-white border border-ejsc-brand-sub rounded-lg active:bg-slate-50 transition-colors">
                  <Text variant="sub" weight="bold" className="text-ejsc-brand-sub text-[10px]">Đặt ngay</Text>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Service Sections */}
        <div className="flex flex-col gap-8 px-3">
          {SERVICE_DATA.map((section) => (
            <div key={section.category} className="flex flex-col gap-4">
              {/* Category Header */}
              <div className="flex items-center justify-between px-2">
                <Text variant="sub" weight="bold" className="text-slate-800">{section.category}</Text>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Text variant="sub" className="text-ejsc-brand-sub font-bold">Tất cả</Text>
                  <ChevronRight size={12} className="text-ejsc-brand-sub" />
                </div>
              </div>

              {/* Service Items */}
              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 active:bg-slate-50 transition-all"
                  >
                    <div className={`w-12 h-12 ${item.iconBg} rounded-2xl flex items-center justify-center shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <Text variant="sub" weight="bold" className="text-slate-800 block">{item.name}</Text>
                      <Text variant="sub" className="text-slate-400 mt-1 block">{item.price}</Text>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <ChevronRight size={14} className="text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StandardPage>
  );
};

export default ServicesScreen;
