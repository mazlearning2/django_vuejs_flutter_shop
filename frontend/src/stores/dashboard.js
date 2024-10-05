import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
    id: 'dashboard',

    state: () => ({
        isOpenSidebar: false,
    }),
    actions: {
        toggleSidebarHandler() {
            this.isOpenSidebar = !this.isOpenSidebar;
        },
    }
})