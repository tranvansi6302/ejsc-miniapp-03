/**
 * @file screens/Account/AccountScreen.tsx
 * @description Tài khoản - Lấy thông tin từ Native Bridge getUserInfo.
 * App: Mini App 03
 */
import React, { useEffect, useState } from 'react';
import { Button, Text, StandardPage, Card } from 'ejsc-ma-component';
import { apisAsync } from 'ejsc-ma-api';
import {
  User, Mail, ExternalLink, RefreshCw,
  Bell, Settings, ChevronRight,
  MessageSquare, MapPin, Ticket, Coins,
  Calendar, ClipboardList, History, Heart, CreditCard, LogOut,
  CalendarCheck, Wallet, Star,
  Crown, ShieldCheck, FileText, QrCode, BellRing
} from 'lucide-react';

const AccountScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await apisAsync.getUserInfo();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  if (loading) {
    return (
      <StandardPage hideAppBar contentClassName="!p-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <Text variant="sub" className="text-slate-400">Đang tải thông tin...</Text>
          </div>
        </div>
      </StandardPage>
    );
  }

  if (!user) {
    return (
      <StandardPage hideAppBar contentClassName="!p-0">
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg border border-slate-100">
            <User size={40} className="text-slate-300" />
          </div>
          <Text variant="h2" weight="bold" className="mb-2 text-slate-800">Chưa đăng nhập</Text>
          <Text variant="sub" className="text-slate-500 mb-8 text-center">
            Thông tin tài khoản được lấy từ Super App qua Bridge.
          </Text>
          <Button
            theme="brand"
            block
            className="h-14 rounded-2xl font-bold bg-orange-600 border-none"
            onClick={fetchUser}
            startIcon={<RefreshCw size={18} />}
          >
            Thử lại
          </Button>
        </div>
      </StandardPage>
    );
  }

  const displayName = user?.fullName || user?.FullName || user?.FirstName || user?.name || 'Mobbin';
  const displayEmail = user?.email || user?.Email || 'chưa cập nhật email';

  return (
    <StandardPage hideAppBar contentClassName="!p-0 bg-[#F5F5F5]">
      {/* Header - Shopee Style */}
      <div className="bg-linear-to-b from-ejsc-brand to-[#FF9D5C] px-5 pt-28 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full border-2 border-white/50 overflow-hidden bg-white/10">
              <User size={45} className="text-white mt-4 mx-auto opacity-80" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <RefreshCw size={12} className="text-ejsc-brand" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Text variant="h3" weight="bold" color="white">{displayName}</Text>
              <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/30 flex items-center gap-1">
                <Text variant="sub" color="white" weight="medium" className="text-[11px]">Bạc</Text>
                <ChevronRight size={10} className="text-white/60" />
              </div>
            </div>
            <Text variant="sub" color="white" className="opacity-70 mt-1 block">{displayEmail}</Text>
          </div>
        </div>

        {/* VIP Banner */}
        <div className="mt-6 bg-[#FFFBEC] rounded-xl p-3 flex items-center justify-between border border-[#FFE7A5]">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 text-white font-black px-1.5 py-0.5 rounded text-[10px] italic">VIP</div>
            <Text variant="sub" weight="bold" className="text-amber-900">Giảm thêm 15% cho mọi dịch vụ</Text>
          </div>
          <ChevronRight size={14} className="text-amber-400" />
        </div>
      </div>

      <div className="px-3 pb-24 flex flex-col gap-3 mt-3">

        {/* My Bookings Section */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-slate-50">
            <Text variant="sub" weight="bold" className="text-slate-800">Đơn đặt của tôi</Text>
            <div className="flex items-center gap-1 cursor-pointer active:opacity-60">
              <Text variant="sub" className="text-slate-400">Xem lịch sử</Text>
              <ChevronRight size={12} className="text-slate-300" />
            </div>
          </div>
          <div className="grid grid-cols-4 py-5">
            {[
              { label: 'Chờ thanh toán', icon: <CreditCard size={22} className="text-slate-600" /> },
              { label: 'Đã xác nhận', icon: <CalendarCheck size={22} className="text-slate-600" /> },
              { label: 'Hoàn thành', icon: <ClipboardList size={22} className="text-slate-600" /> },
              { label: 'Đánh giá', icon: <Star size={22} className="text-slate-600" /> },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="relative">
                  {item.icon}
                  {i === 1 && <div className="absolute -top-1.5 -right-1.5 bg-ejsc-brand text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">2</div>}
                </div>
                <Text variant="sub" className="text-slate-500 text-center leading-tight scale-90">{item.label}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* My Wallet Section - Styled Up */}
        <div className="bg-white rounded-xl overflow-hidden border border-orange-50/50">
          <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-orange-500" />
              <Text variant="sub" weight="bold" className="text-slate-800">Tiện ích tài chính</Text>
            </div>
          </div>
          <div className="flex divide-x divide-slate-100">
            <div className="flex-1 p-4 bg-linear-to-br from-orange-50/50 to-white">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="bg-orange-500 text-white text-[8px] font-bold px-1 py-0.5 rounded">365</div>
                <Text variant="sub" weight="bold" className="text-slate-700">Ví 365</Text>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <Text variant="base" className="text-slate-900">500.000đ</Text>
                <div className="flex items-center gap-0.5 text-orange-500 cursor-pointer active:opacity-60 ml-auto">
                  <Text variant="sub" weight="bold" className="text-[11px]">Nạp</Text>
                  <ChevronRight size={10} />
                </div>
              </div>
              <Text variant="sub" className="text-slate-400 text-[10px] mt-1">Sử dụng ví để nhận ưu đãi</Text>
            </div>

            <div className="w-[40%] grid grid-rows-2">
              <div className="p-3 flex items-center gap-3 active:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50">
                <div className="relative">
                  <Ticket size={20} className="text-orange-500" />
                </div>
                <div>
                  <Text variant="sub" weight="bold" className="text-slate-800 leading-none">12</Text>
                  <Text variant="sub" className="text-slate-400 text-[10px] mt-1 block">Voucher</Text>
                </div>
              </div>
              <div className="p-3 flex items-center gap-3 active:bg-slate-50 transition-colors cursor-pointer">
                <Coins size={20} className="text-amber-500" />
                <div>
                  <Text variant="sub" weight="bold" className="text-slate-800 leading-none">1.2k</Text>
                  <Text variant="sub" className="text-slate-400 text-[10px] mt-1 block">Điểm tích</Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Utilities Section */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-50">
            <Text variant="sub" weight="bold" className="text-slate-800">Tiện ích cá nhân</Text>
          </div>
          <AccountMenuItem icon={<Crown size={18} className="text-amber-500" />} label="Gói hội viên" />
          <div className="mx-4 border-t border-slate-50" />
          <AccountMenuItem icon={<MapPin size={18} className="text-blue-500" />} label="Sổ địa chỉ" />
          <div className="mx-4 border-t border-slate-50" />
          <AccountMenuItem icon={<QrCode size={18} className="text-slate-600" />} label="Quản lý mã QR" />
        </div>

        {/* Settings & Support Section */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-50">
            <Text variant="sub" weight="bold" className="text-slate-800">Cài đặt & Hỗ trợ</Text>
          </div>
          <AccountMenuItem icon={<BellRing size={18} className="text-orange-500" />} label="Cài đặt thông báo" />
          <div className="mx-4 border-t border-slate-50" />
          <AccountMenuItem icon={<Settings size={18} className="text-slate-400" />} label="Thiết lập tài khoản" />
          <div className="mx-4 border-t border-slate-50" />
          <AccountMenuItem icon={<Mail size={18} className="text-emerald-500" />} label="Trung tâm hỗ trợ" />
        </div>

        {/* Legal Information Section */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-50">
            <Text variant="sub" weight="bold" className="text-slate-800">Thông tin & Pháp lý</Text>
          </div>
          <AccountMenuItem icon={<ShieldCheck size={18} className="text-indigo-500" />} label="Chính sách bảo mật" />
          <div className="mx-4 border-t border-slate-50" />
          <AccountMenuItem icon={<FileText size={18} className="text-slate-500" />} label="Điều khoản & Chính sách" />
        </div>

        <button className="mt-2 w-full py-4 bg-white rounded-xl flex items-center justify-center gap-2 active:bg-slate-50 transition-colors mb-20">
          <LogOut size={18} className="text-red-500" />
          <Text variant="base" weight="bold" className="text-red-500">Đăng xuất</Text>
        </button>
      </div>
    </StandardPage>
  );
};

// Sub-component for Menu Items in Account
const AccountMenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  className?: string;
  hideArrow?: boolean;
}> = ({ icon, label, className, hideArrow }) => (
  <div className="flex items-center gap-3 px-4 py-4 active:bg-slate-50 transition-colors cursor-pointer group">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-active:scale-90 transition-transform">
      {icon}
    </div>
    <Text variant="base" weight="medium" className={`flex-1 text-slate-700 ${className}`}>{label}</Text>
    {!hideArrow && <ChevronRight size={16} className="text-slate-300" />}
  </div>
);

export default AccountScreen;

