/**
 * @file mockBridge.ts
 * @description Mock Bridge cho Mini App 3.
 */

if (typeof window !== 'undefined') {
  if (!window.ejsc) window.ejsc = {};
  
  const ejsc = window.ejsc;

  // Nhận phản hồi từ Native
  ejsc._onNativeResponse = (id: number, res: any) => {
    const event = new CustomEvent(`ejsc:response:${id}`, { detail: res });
    window.dispatchEvent(event);
  };

  // Các phương thức Bridge cơ bản
  ejsc.openDeeplink = (opts: any) => {
    console.log('[Bridge] openDeeplink', opts);
    if (window.EjscBridge) {
      window.EjscBridge.postMessage(JSON.stringify({ method: 'openDeeplink', params: opts }));
    }
    opts.success?.({ success: true });
  };

  ejsc.getUserInfo = (opts: any) => {
    if (window.EjscBridge) {
       window.EjscBridge.postMessage(JSON.stringify({ method: 'getUserInfo', id: 999 }));
       // Response sẽ về qua _onNativeResponse
    } else {
       opts.success?.({ success: true, data: { fullName: 'Mock User 3', email: 'mock3@example.com' } });
    }
  };
}
