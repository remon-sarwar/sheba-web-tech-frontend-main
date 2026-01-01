import React, { ReactNode } from 'react';

export interface ILayout {
  children?: ReactNode;
}

export interface ISidebar {
  isCollapsed: boolean;
  setIsCollapsed: (arg: boolean) => void;
}

export interface ITopbar {
  isSidebarCollapsed?: boolean;
  setIsSidebarCollapsed?: (arg: boolean) => void;
}

export interface IReusableSidebar {
  children?: ReactNode;
  isCollapsed: boolean;
  setIsCollapsed: (arg: boolean) => void;
}

export interface IHeader {
  children?: ReactNode;
  isSidebarCollapsed?: boolean;
  setIsSidebarCollapsed?: (arg: boolean) => void;
}

export interface INavLink {
  icon?: ReactNode;
  url: string;
  text: string;
  isCollapsed?: boolean;
}

export interface IAdminMobileMenu {
  open: boolean;
  setOpen: (a: boolean) => void;
}

export interface IMobileNavItem {
  onClick: () => void;
  href: string;
  text: string;
  activeFlag?: string;
  className?: string;
}
