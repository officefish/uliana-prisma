import {
    Page,
  } from "@/types"
  export type PageNotificationType = Page.MAGIC_BALL | Page.SECRET | Page.ROOM | Page.TASKS | Page.FRIENDS

  export interface IStoreState {
    page: Page
    isLoading: number
    keyShopOpen: boolean
    withdrawOpen: boolean
    menuOpen: boolean
    menuTutorialOpen: boolean
    isFooterTransparent: boolean
    isEmptyPage: boolean
    pageNotifications: PageNotificationType[]
  }

  export interface IStoreActions {
    setPage: (page: Page) => void
    addLoading: () => void
    removeLoading: () => void
    hideLoading: () => void
    setKeyShopOpen: (isOpen: boolean) => void
    setWithdrawOpen: (isOpen: boolean) => void
    setMenuOpen: (isOpen: boolean) => void
    setMenuTutorialOpen: (isOpen: boolean) => void
    setIsFooterTransparent: (isTransparent: boolean) => void
    setIsEmptyPage: (isEmptyPage: boolean) => void
    setPageNotifications: (notifications: PageNotificationType[]) => void
  }
