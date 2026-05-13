import { apisAsync } from 'ejsc-ma-api';
import { StandardPage, Text } from 'ejsc-ma-component';
import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { HomeHeader } from '~/features/home/components/HomeHeader';
import { HomeOfferSection } from '~/features/home/components/HomeOfferSection';
import { HomeQuickAction } from '~/features/home/components/HomeQuickAction';
import { HomeQuickStats } from '~/features/home/components/HomeQuickStats';
import { HomeServiceGrid } from '~/features/home/components/HomeServiceGrid';
import { HomeWelcome } from '~/features/home/components/HomeWelcome';
import { useHome } from '~/features/home/hooks/useHome';

const HomeScreen: React.FC = () => {
  const { user, navigate, handleRefresh } = useHome();
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const res = await apisAsync.getSetting();
        if (res.success && res.data?.authSetting && !res.data.authSetting['scope.userLocation']) {
          setShowLocationDialog(true);
        }
      } catch (e) {
        console.error('Check permission failed:', e);
      }
    };
    checkPermission();
  }, []);

  const handleAuthorize = async () => {
    try {
      await apisAsync.authorize({ scope: 'scope.userLocation' });
      setShowLocationDialog(false);
      // Optional: Refresh location if needed
    } catch (e) {
      setShowLocationDialog(false);
    }
  };

  return (
    <StandardPage
      onRefresh={handleRefresh}
      hideAppBar
      contentClassName="p-0"
    >
      <div className="relative bg-white min-h-screen flex flex-col">
        {/* Landscape Banner Background (Immersive Style) - Mini App 03 */}
        <div className="absolute top-0 left-0 right-0 h-[260px] z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1064&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Header Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-white" />
        </div>

        <HomeHeader onNavigate={navigate} />

        <HomeWelcome
          userName={user ? (user.fullName || user.FirstName || 'bạn') : 'bạn'}
        />

        {/* Main Curved Content Container */}
        <div className="relative z-20 bg-linear-to-b from-ejsc-bg-page via-white via-10% to-white px-4 pt-5 pb-8 flex flex-col gap-2.5 min-h-screen -mt-2 rounded-t-(--ejsc-sys-radius)">
          <HomeQuickStats />
          <HomeQuickAction />
          <HomeServiceGrid />
          <HomeOfferSection />
        </div>
      </div>

      {/* Location Permission Dialog */}
      {showLocationDialog && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl p-8 flex flex-col items-center gap-6 w-full max-w-sm animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
              <MapPin size={40} className="text-orange-500" />
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <Text variant="h3" weight="bold" className="text-slate-900">Cấp quyền vị trí</Text>
              <Text variant="sub" className="text-slate-500 leading-relaxed">
                Vui lòng cho phép ứng dụng truy cập vị trí để chúng tôi có thể tìm kiếm các dịch vụ gần bạn nhất.
              </Text>
            </div>

            <div className="flex flex-col w-full gap-3 mt-2">
              <button
                onClick={handleAuthorize}
                className="w-full py-4 bg-ejsc-brand-sub rounded-2xl active:scale-95 transition-transform"
              >
                <Text variant="sub" weight="bold" color="white">Cho phép</Text>
              </button>
              <button
                onClick={() => setShowLocationDialog(false)}
                className="w-full py-4 bg-white border border-slate-200 rounded-2xl active:bg-slate-50 transition-colors"
              >
                <Text variant="sub" weight="bold" className="text-slate-400">Để sau</Text>
              </button>
            </div>
          </div>
        </div>
      )}
    </StandardPage>
  );
};


export default HomeScreen;
