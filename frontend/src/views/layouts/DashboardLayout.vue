<template>
    <main class="max-w-7xl mx-auto">
        <DashboardHeaderComponent />
        <section class="grid grid-cols-12 gap-5 items-start ">
            <!-- Dashboard Aside Component -->
            <DashboardSidebarComponent />
            <section class="transition-all" :class="dashboardStore.isOpenSidebar ? 'col-span-9' : 'col-span-11'">
                <RouterView />
            </section>
        </section>
    </main>
</template>

<script>
import { DashboardHeaderComponent, DashboardSidebarComponent } from '@/components/dashboard'
import { useDashboardStore } from '@/stores/dashboard'
export default {
    setup() {
        const dashboardStore = useDashboardStore()
        return { dashboardStore }
    },
    components: {
        DashboardHeaderComponent,
        DashboardSidebarComponent,
    },
}
</script>