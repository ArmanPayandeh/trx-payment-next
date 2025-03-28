export const APP_ROUTES = {
  home: "/",
  invoice: (id: string) => `/invoice/${id}`,
  setting: "/setting",
  receipt: (id: string) => `/receipt/${id}`,
} as const;
