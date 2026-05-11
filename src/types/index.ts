/**
 * @file types/index.ts
 * @description Type definitions cho Mini App 3.
 */

export interface ApiEntry {
  id: string;
  name: string;
  desc: string;
  params?: string;
  fn: (params?: any) => Promise<any>;
}

export interface ApiGroup {
  name: string;
  apis: ApiEntry[];
}

export interface NavTab {
  path: string;
  label: string;
  icon: string;
}
