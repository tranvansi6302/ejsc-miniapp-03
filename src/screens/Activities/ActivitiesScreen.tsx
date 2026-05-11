import React, { useState } from 'react';
import { Text, StandardPage } from 'ejsc-ma-component';
import {
  MapPin, Clock, Wrench, Sparkles, Zap,
  ChevronRight, RefreshCw, Calendar
} from 'lucide-react';

const CATEGORIES = ['Tất cả', 'Sửa chữa', 'Vệ sinh', 'Bảo trì', 'Khác'];

const ACTIVITIES = [
  {
    date: '09/05/2026',
    items: [
      {
        id: '1',
        service: 'Sửa điều hòa - Daikin',
        time: '08:27 CH',
        status: 'Hoàn thành',
        address: '147 Đường Hoa Lan, Phường 2, Phú Nhuận',
        detail: 'Bảo trì định kỳ & nạp gas',
        price: '450.000đ',
        icon: <Wrench size={20} className="text-blue-500" />,
        iconBg: 'bg-blue-50'
      }
    ]
  },
  {
    date: '03/05/2026',
    items: [
      {
        id: '2',
        service: 'Dọn dẹp nhà cửa',
        time: '02:46 SA',
        status: 'Hoàn thành',
        address: '27 Đường Lê Tấn Quốc, Tân Bình',
        detail: 'Gói dọn dẹp cơ bản (4h)',
        price: '320.000đ',
        icon: <Sparkles size={20} className="text-amber-500" />,
        iconBg: 'bg-amber-50'
      }
    ]
  },
  {
    date: '24/04/2026',
    items: [
      {
        id: '3',
        service: 'Sửa hệ thống điện',
        time: '01:03 CH',
        status: 'Hoàn thành',
        address: '39 Đường Mạc Đĩnh Chi, Quận 1',
        detail: 'Thay mới aptomat & ổ cắm',
        price: '210.000đ',
        icon: <Zap size={20} className="text-orange-500" />,
        iconBg: 'bg-orange-50'
      }
    ]
  }
];

const ActivitiesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');

  return (
    <StandardPage hideAppBar contentClassName="!p-0 bg-[#F5F5F5]">
      {/* Header - Adjusted for Safe Area */}
      <div className="bg-white px-5 pt-24 pb-4">
        <Text variant="h3" weight="bold" className="text-slate-900">Hoạt động</Text>

        {/* Horizontal Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-medium ${activeTab === tab
                ? 'bg-slate-800 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-500'
                }`}
            >
              <Text variant="sub" weight="medium" color={activeTab === tab ? 'white' : undefined}>{tab}</Text>
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="px-4 pb-24">
        {ACTIVITIES.map((group) => (
          <div key={group.date} className="mt-6">
            <Text variant="sub" className="text-slate-400 font-bold ml-1 mb-3 block">
              {group.date}
            </Text>

            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col gap-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Text variant="sub" weight="bold" className="text-slate-800">{item.service}</Text>
                      <Text variant="sub" className="text-slate-400 mt-0.5">{item.time}</Text>
                    </div>
                    <div className="bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <Text variant="sub" weight="bold" className="text-emerald-600">{item.status}</Text>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-300 mt-1 shrink-0" />
                        <Text variant="sub" className="text-slate-600 leading-tight">{item.address}</Text>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock size={14} className="text-slate-300 mt-1 shrink-0" />
                        <Text variant="sub" className="text-slate-500 leading-tight italic">{item.detail}</Text>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${item.iconBg} rounded-full flex items-center justify-center shrink-0`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <Text variant="base" className="text-slate-900">{item.price}</Text>
                    <button className="px-4 py-1.5 border border-slate-200 rounded-lg active:bg-slate-50 transition-colors">
                      <Text variant="sub" weight="bold" className="text-slate-800">Đặt lại</Text>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </StandardPage>
  );
};

export default ActivitiesScreen;

