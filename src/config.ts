export type ModeType = "development" | "production";

export type ConfigType = {
  url: string
  mode: ModeType
  initData: string
}

export const Config: ConfigType = {
  mode: import.meta.env.VITE_RUN_MODE,
  url: import.meta.env.VITE_API_URL,
  initData: import.meta.env.VITE_INIT_DATA,
}
