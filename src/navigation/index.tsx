/**
 * @file navigation/index.tsx
 * @description Quản lý luồng điều hướng tập trung của ứng dụng - Mini App 3.
 */
import React from 'react';
import { type IRouterConfig } from 'ejsc-ma-router';
import { SimulatorAppHeader } from 'ejsc-ma-component';
import MainLayout from '../layouts/MainLayout';

// Import Screens (Chỉ dùng các trang đã tạo)
import DeepLinkHomeScreen from '../screens/Home/DeepLinkHomeScreen';
import ApiScreen from '../screens/Activities/ApiScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import AboutScreen from '../screens/About/AboutScreen';

export type AnimationType = 'none' | 'slide_left' | 'slide_up' | 'fade_in';

const pages = [
  {
    pathname: '/',
    Component: DeepLinkHomeScreen,
    animation: 'none',
    showAppBar: false,
    customHeader: () => null
  },
  {
    pathname: '/api',
    Component: ApiScreen,
    animation: 'slide_left',
    showAppBar: false,
    customHeader: () => null,
    title: 'Bridge APIs'
  },
  {
    pathname: '/account',
    Component: AccountScreen,
    animation: 'slide_left',
    showAppBar: false,
    customHeader: () => null,
    title: 'Tài khoản'
  },
  {
    pathname: '/about',
    Component: AboutScreen,
    animation: 'slide_left',
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
      visible: p.showAppBar !== false
    },
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
    { id: 'api', name: 'API', path: '/api', icon: 'code' },
    { id: 'about', name: 'Giới thiệu', path: '/about', icon: 'circle-info' },
    { id: 'account', name: 'Tài khoản', path: '/account', icon: 'user' },
  ]
};
