/**
 * @file navigation/index.tsx
 * @description Quản lý luồng điều hướng tập trung của ứng dụng - Mini App 3.
 */
import React from 'react';
import { type IRouterConfig } from 'ejsc-ma-router';
import { SimulatorAppHeader } from 'ejsc-ma-component';
import MainLayout from '../layouts/MainLayout';

// Import Screens (Chỉ dùng các trang đã tạo)
import HomeScreen from '../screens/Home/HomeScreen';
import ServicesScreen from '../screens/Services/ServicesScreen';
import BookingScreen from '../screens/Booking/BookingScreen';
import ActivitiesScreen from '../screens/Activities/ActivitiesScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import AboutScreen from '../screens/About/AboutScreen';
import ApiScreen from '../screens/Activities/ApiScreen';

export type AnimationType = 'none' | 'slide_left' | 'slide_up' | 'fade_in';

const pages = [
  {
    pathname: '/',
    Component: HomeScreen,
    animation: 'none',
    showAppBar: false,
    showBottomNav: true,
    customHeader: () => null,
    title: 'Trang chủ'
  },
  {
    pathname: '/services',
    Component: ServicesScreen,
    animation: 'slide_left',
    showAppBar: false,
    showBottomNav: true,
    customHeader: () => null,
    title: 'Dịch vụ'
  },
  {
    pathname: '/booking',
    Component: BookingScreen,
    animation: 'slide_up',
    showAppBar: false,
    showBottomNav: true,
    customHeader: () => null,
    title: 'Đặt lịch'
  },
  {
    pathname: '/activities',
    Component: ActivitiesScreen,
    animation: 'slide_left',
    showAppBar: false,
    showBottomNav: true,
    customHeader: () => null,
    title: 'Hoạt động'
  },
  {
    pathname: '/account',
    Component: AccountScreen,
    animation: 'slide_left',
    showAppBar: false,
    showBottomNav: true,
    customHeader: () => null,
    title: 'Tài khoản'
  },
  {
    pathname: '/api',
    Component: ApiScreen,
    animation: 'slide_left',
    showAppBar: true,
    showBottomNav: false,
    title: 'Bridge APIs'
  },
  {
    pathname: '/about',
    Component: AboutScreen,
    animation: 'slide_left',
    showAppBar: true,
    showBottomNav: false,
    title: 'Thông tin'
  },
];

export const appRouterConfig: IRouterConfig = {
  pages: pages.map(p => ({
    pathname: p.pathname,
    Component: p.Component,
    headerComponent: p.customHeader,
    Layouts: [MainLayout],
    navigationBar: {
      title: p.title,
      visible: p.showAppBar !== false,
      backIcon: p.pathname === '/' ? 'none' : 'arrow'
    },
    showBottomNav: p.showBottomNav,
    animation: {
      type: p.animation as AnimationType
    }
  })),
  headerComponent: SimulatorAppHeader,
  animation: { mode: 'framer-motion', type: 'slide_left' },
};

export const bottomTabBarConfig = {
  items: [
    { id: 'home', name: 'Trang chủ', path: '/', icon: 'home' },
    { id: 'services', name: 'Dịch vụ', path: '/services', icon: 'grid' },
    { id: 'booking', name: 'Đặt lịch', path: '/booking', icon: 'calendar' },
    { id: 'activities', name: 'Hoạt động', path: '/activities', icon: 'history' },
    { id: 'account', name: 'Tài khoản', path: '/account', icon: 'user' },
  ]
};
