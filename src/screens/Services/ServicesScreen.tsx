import { apisAsync } from 'ejsc-ma-api';
import { StandardPage, Text, toast, Sheet } from 'ejsc-ma-component';
import {
  ChevronRight,
  Droplets,
  Heart,
  Lightbulb,
  MapPin,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wind,
  Zap,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SERVICE_DATA = [
  {
    category: 'Sửa chữa điện nước',
    items: [
      { id: '1', name: 'Sửa vòi nước, đường ống', price: '150k - 450k', rating: 4.8, bookings: '1.2k', icon: <Droplets size={20} className="text-blue-500" />, iconBg: 'bg-blue-50' },
      { id: '2', name: 'Sửa chập điện, nhảy aptomat', price: '200k - 600k', rating: 4.9, bookings: '850', icon: <Zap size={20} className="text-orange-500" />, iconBg: 'bg-orange-50' },
      { id: '3', name: 'Lắp đặt, thay mới bóng đèn', price: '100k - 300k', rating: 4.7, bookings: '2.1k', icon: <Lightbulb size={20} className="text-amber-500" />, iconBg: 'bg-amber-50' },
    ]
  },
  {
    category: 'Vệ sinh nhà cửa',
    items: [
      { id: '4', name: 'Dọn dẹp nhà cửa (theo giờ)', price: '80k/giờ', rating: 4.9, bookings: '5k+', icon: <Sparkles size={20} className="text-emerald-500" />, iconBg: 'bg-emerald-50' },
      { id: '5', name: 'Giặt Sofa, nệm, rèm cửa', price: '300k - 800k', rating: 4.8, bookings: '1.1k', icon: <Wind size={20} className="text-cyan-500" />, iconBg: 'bg-cyan-50' },
      { id: '6', name: 'Tổng vệ sinh sau xây dựng', price: '1tr - 5tr', rating: 4.6, bookings: '420', icon: <Droplets size={20} className="text-rose-500" />, iconBg: 'bg-rose-50' },
    ]
  }
];

const FEATURED_SERVICES = [
  { id: 'f1', name: 'Vệ sinh Máy lạnh', price: '150k - 450k', rating: 4.9, bookings: '3.5k', icon: <Wind size={24} className="text-indigo-500" />, iconBg: 'bg-indigo-50', tag: 'Hot' },
  { id: 'f2', name: 'Dọn dẹp nhà', price: '80k - 350k', rating: 4.8, bookings: '5k+', icon: <Sparkles size={24} className="text-emerald-500" />, iconBg: 'bg-emerald-50', tag: 'Phổ biến' },
  { id: 'f3', name: 'Sửa điện cấp tốc', price: '200k - 800k', rating: 4.7, bookings: '1.2k', icon: <Zap size={24} className="text-orange-500" />, iconBg: 'bg-orange-50', tag: 'Cấp cứu' },
];

const ServicesScreen: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleToggleFavorite = () => {
    toast.success('Đã thêm vào danh sách yêu thích');
  };

  return (
    <StandardPage hideAppBar contentClassName="!p-0 bg-[#F5F5F5]">
      {/* Sticky Header & Search Bar Row */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-24 pb-6 flex flex-col gap-5 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Text variant="h3" weight="bold" className="text-slate-900">Khám phá dịch vụ</Text>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} className="text-ejsc-brand-sub" />
              <Text variant="sub" className="text-slate-400 block">
                {city ? `Dịch vụ tại ${city}` : 'Đang xác định vị trí...'}
              </Text>
            </div>
          </div>
        </div>

        {/* Search Bar & Filter Row */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-ejsc px-4 h-14 flex items-center gap-3">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Tìm dịch vụ bạn cần..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-slate-800 font-medium placeholder:text-slate-400 text-ejsc-sub"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-14 h-14 bg-slate-50 rounded-ejsc flex items-center justify-center border border-slate-100 active:bg-slate-100 transition-colors shrink-0"
          >
            <SlidersHorizontal size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="pb-24 flex flex-col">
        {/* Featured Services Section - New Premium Vertical Style */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="px-5">
            <Text variant="sub" weight="bold" className="text-slate-800">Dịch vụ nổi bật</Text>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-6">
            {FEATURED_SERVICES.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[160px] bg-white rounded-ejsc border border-slate-100 flex flex-col p-3 gap-3 active:scale-[0.98] transition-all relative"
              >
                {/* Top: Icon Container */}
                <div className={`w-full h-20 ${item.iconBg} rounded-ejsc flex items-center justify-center relative`}>
                  {React.cloneElement(item.icon as React.ReactElement<{ size: number }>, { size: 32 })}
                  {/* Tag Style - Matched with Home Offers */}
                  <div className="absolute top-2 right-2 bg-orange-100 px-1.5  rounded-[4px]">
                    <Text variant="caption" weight="medium" className="text-orange-600 text-[8px] uppercase tracking-tight">{item.tag}</Text>
                  </div>
                </div>

                {/* Middle: Details */}
                <div className="flex flex-col gap-1">
                  <Text variant="sub" weight="bold" className="text-slate-800 truncate leading-tight">
                    {item.name}
                  </Text>
                  <div className="flex items-center justify-between">
                    <Text variant="sub" weight="bold" className="text-ejsc-brand-sub text-[10px]">{item.price}</Text>
                    <div className="flex items-center gap-0.5">
                      <Star size={9} className="text-amber-400 fill-amber-400" />
                      <Text variant="sub" className="text-slate-400 text-[9px]">{item.rating}</Text>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions - Now standardized to h-10 */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-50">
                  <button
                    onClick={handleToggleFavorite}
                    className="w-10 h-10 rounded-ejsc bg-slate-50 border border-slate-100 flex items-center justify-center active:bg-slate-100 shrink-0"
                  >
                    <Heart size={14} className="text-slate-600" />
                  </button>
                  <button
                    onClick={handleToggleFavorite}
                    className="flex-1 h-10 bg-white border border-slate-200 rounded-ejsc flex items-center justify-center active:bg-slate-50"
                  >
                    <Text variant="sub" weight="medium" className="text-slate-800 text-[10px]">Đặt ngay</Text>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Service Sections */}
        <div className="flex flex-col gap-8 px-4">
          {SERVICE_DATA.map((section) => (
            <div key={section.category} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <Text variant="sub" weight="bold" className="text-slate-800">{section.category}</Text>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Text variant="sub" weight="bold" className="text-orange-600">Tất cả</Text>
                  <ChevronRight size={12} className="text-orange-600" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-ejsc p-4 border border-slate-100 flex flex-col gap-4 active:bg-slate-50 transition-all"
                  >
                    {/* Top Row: Icon & Info */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${item.iconBg} rounded-ejsc flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Text variant="sub" weight="bold" className="text-slate-800 block truncate">{item.name}</Text>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Text variant="sub" weight="bold" className="text-ejsc-brand-sub">{item.price}</Text>
                          <div className="w-1 h-1 bg-slate-200 rounded-full shrink-0" />
                          <div className="flex items-center gap-1 shrink-0">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            <Text variant="sub" className="text-slate-500 font-medium">{item.rating}</Text>
                          </div>
                          <div className="w-1 h-1 bg-slate-200 rounded-full shrink-0" />
                          <Text variant="sub" className="text-slate-400 shrink-0">{item.bookings} lượt đặt</Text>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Actions Only */}
                    <div className="flex items-center justify-end pt-2 border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleToggleFavorite}
                          className="w-10 h-10 rounded-ejsc bg-slate-50 border border-slate-100 flex items-center justify-center active:bg-slate-100 transition-all"
                        >
                          <Heart size={16} className="text-slate-600" />
                        </button>
                        <button
                          onClick={handleToggleFavorite}
                          className="px-6 h-10 bg-white border border-slate-200 rounded-ejsc flex items-center justify-center gap-2 active:bg-slate-50 transition-all"
                        >
                          <Text variant="sub" weight="medium" className="text-slate-800">Đặt ngay</Text>
                          <ChevronRight size={14} className="text-slate-800" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Sheet */}
      <Sheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Bộ lọc dịch vụ"
      >
        <div className="p-5 flex flex-col gap-8 pb-10">
          {/* Sorting */}
          <div className="flex flex-col gap-4">
            <Text variant="sub" weight="bold" className="text-slate-900">Sắp xếp theo</Text>
            <div className="flex flex-wrap gap-2">
              {['Mặc định', 'Giá thấp - cao', 'Giá cao - thấp', 'Đánh giá tốt'].map((opt) => (
                <button
                  key={opt}
                  className={`px-4 py-2 rounded-ejsc border text-sm font-medium transition-all ${opt === 'Mặc định' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-white border-slate-100 text-slate-600'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-4">
            <Text variant="sub" weight="bold" className="text-slate-900">Khoảng giá</Text>
            <div className="flex flex-wrap gap-2">
              {['Dưới 200k', '200k - 500k', 'Trên 500k'].map((opt) => (
                <button
                  key={opt}
                  className="px-4 py-2 rounded-ejsc border bg-white border-slate-100 text-slate-600 text-sm font-medium transition-all active:bg-slate-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full h-14 bg-orange-600 rounded-ejsc flex items-center justify-center active:opacity-90 transition-all mt-4"
          >
            <Text variant="sub" weight="bold" className="text-white">Áp dụng bộ lọc</Text>
          </button>
        </div>
      </Sheet>
    </StandardPage>
  );
};

export default ServicesScreen;
