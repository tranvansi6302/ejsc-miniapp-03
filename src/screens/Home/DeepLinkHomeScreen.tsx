/**
 * @file screens/Home/DeepLinkHomeScreen.tsx
 * @description Trang chủ tập trung vào DeepLink Navigation - Mini App 03.
 */
import React, { useState, useEffect } from 'react';
import { StandardPage, Text, Card, toast } from 'ejsc-ma-component';
import { ExternalLink, CheckCircle2, XCircle, User, ChevronsRight } from 'lucide-react';
import { apisAsync } from 'ejsc-ma-api';

const DeepLinkHomeScreen: React.FC = () => {
  const [lastResult, setLastResult] = useState<{ success: boolean; label: string } | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apisAsync.getUserInfo();
        if (res.success && res.data) {
          setUserInfo(res.data);
        }
      } catch (e) {
        console.error('Failed to fetch user info:', e);
      }
    };
    fetchUser();
  }, []);

  const displayName = userInfo?.fullName || userInfo?.FullName || userInfo?.FirstName || userInfo?.name || 'Người dùng';
  const displayEmail = userInfo?.email || userInfo?.Email || '';

  const openApp = async (appId: string, appName: string) => {
    try {
      const result = await (window as any).ejsc?.openDeeplink({
        url: `ejsc://mini-apps/${appId}`,
        title: appName,
      });
      if (result && result.success === false) {
        toast.error(`Lỗi mở ${appName}`);
        setLastResult({ success: false, label: appName });
      } else {
        setLastResult({ success: true, label: appName });
      }
    } catch {
      toast.error(`Lỗi khi mở ${appName}`);
      setLastResult({ success: false, label: appName });
    }
  };

  const apps = [
    {
      id: 'mini-app-1',
      name: 'Mini App 01',
      desc: 'Mini app 01 test trên môi trường dev',
      color: 'bg-emerald-600',
      num: '1',
    },
    {
      id: 'mini-app-2',
      name: 'Mini App 02',
      desc: 'Mini app 02 test trên môi trường dev',
      color: 'bg-indigo-600',
      num: '2',
    },
    {
      id: 'mini-app-3',
      name: 'Mini App 03',
      desc: 'Mini app 03 test trên môi trường dev',
      color: 'bg-orange-600',
      isSelf: true,
    },
  ];

  return (
    <StandardPage title="Mini App 03">
      {/* Header Banner Area - Flat Look */}
      <div className="bg-gradient-to-br flex items-center gap-2 from-orange-600 to-amber-700 px-6 py-4 text-white">
        <ChevronsRight size={18} className="text-white" />
        <Text variant="sub" color="white" className="opacity-90">Mini app nội bộ cho development/testing</Text>
      </div>

      {/* Content Area - Increased Spacing from Header */}
      <div className="px-4 mt-6 pb-10 flex flex-col gap-6">
        {/* Welcome Section */}
        <Card className="rounded-3xl border-none shadow-none bg-orange-50 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <User size={24} className="text-orange-600" />
          </div>
          <div>
            <Text variant="sub" className="text-orange-800 opacity-70 block mt-3">Chào mừng quay lại,</Text>
            <Text variant="base" weight="bold" className="text-orange-900">
              {displayName} {displayEmail ? `(${displayEmail})` : ''}
            </Text>
          </div>
        </Card>

        {/* Mini App Section */}
        <div className="flex flex-col gap-4">
          <Text variant="base" weight="bold" className="text-slate-700">Mini App nổi bật</Text>
          <div className="grid grid-cols-2 gap-3">
            {apps.filter(app => !app.isSelf).map(app => (
              <button
                key={app.id}
                onClick={() => openApp(app.id, app.name)}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all active:scale-95 bg-white"
              >
                <div className={`w-12 h-12 shrink-0 rounded-2xl ${app.color} flex items-center justify-center text-white font-black text-xl shadow-sm`}>
                  {app.num || '3'}
                </div>
                <div className="flex-1 text-left">
                  <Text variant="base" weight="bold" className="text-slate-800">{app.name}</Text>
                  <Text variant="sub" className="text-slate-500 text-[11px]">Nhấn để mở</Text>
                </div>
                <ExternalLink size={16} className="text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {lastResult && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${lastResult.success ? 'bg-orange-50 border-orange-100' : 'bg-red-50 border-red-100'}`}>
            {lastResult.success ? <CheckCircle2 size={20} className="text-orange-600" /> : <XCircle size={20} className="text-red-500" />}
            <Text variant="sub" className={lastResult.success ? 'text-orange-700' : 'text-red-600'}>
              {lastResult.success ? `✅ Mở ${lastResult.label} thành công` : `❌ Lỗi mở ${lastResult.label}`}
            </Text>
          </div>
        )}
      </div>
    </StandardPage>
  );
};

export default DeepLinkHomeScreen;
