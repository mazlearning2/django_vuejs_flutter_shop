<template>
    <aside
        class="p-2 rounded-2xl bg-base-200 h-[80vh] flex flex-col justify-start items-center toggleSidebarAnimation gap-3"
        :class="dashboardStore.isOpenSidebar ? 'col-span-3' : 'col-span-1'">
        <button class="btn btn-circle bg-green-600 text-white shadow-none hover:bg-green-700"
            @click="dashboardStore.toggleSidebarHandler">
            <Bars3CenterLeftIcon class="size-10" />
        </button>
        <div class="divider my-1"></div>
        <div class="w-full h-full overflow-x-auto ">
            <ul class="menu bg-base-100 rounded-box w-full">
                <li>
                    <details v-if="dashboardStore.isOpenSidebar">
                        <summary class="text-lg font-bold">مدیریت فروشگاه</summary>
                        <ul>
                            <li>
                                <RouterLink :to="{ name: 'dashboardProductManagementView' }">محصولات</RouterLink>
                            </li>
                            <li><a>دسته بندی ها</a></li>
                            <li><a>تگ ها</a></li>
                            <li><a>کامنت ها</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="divider my-1"></div>
            <ul class="menu bg-base-100 rounded-box w-full">
                <li>
                    <details v-if="dashboardStore.isOpenSidebar">
                        <summary class="text-lg font-bold">مدیریت بلاگ ها</summary>
                        <ul>
                            <li><a>بلاگ ها</a></li>
                            <li><a>دسته بندی ها</a></li>
                            <li><a>کامنت ها</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="divider my-1"></div>
            <ul class="menu bg-base-100 rounded-box w-full">
                <li>
                    <details v-if="dashboardStore.isOpenSidebar">
                        <summary class="text-lg font-bold">مدیریت فروشگاه</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="divider my-1"></div>
            <ul class="menu bg-base-100 rounded-box w-full">
                <li>
                    <details v-if="dashboardStore.isOpenSidebar">
                        <summary class="text-lg font-bold">مدیریت فروشگاه</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="divider my-1"></div>
            <ul class="menu bg-base-100 rounded-box w-full">
                <li>
                    <details v-if="dashboardStore.isOpenSidebar">
                        <summary class="text-lg font-bold">مدیریت فروشگاه</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="divider my-1"></div>
            <ul class="menu bg-base-100 rounded-box w-full">
                <li>
                    <details v-if="dashboardStore.isOpenSidebar">
                        <summary class="text-lg font-bold">مدیریت فروشگاه</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="divider my-1"></div>
            <ul class="menu bg-base-100 rounded-box w-full">
                <li>
                    <details v-if="dashboardStore.isOpenSidebar">
                        <summary class="text-lg font-bold">مدیریت فروشگاه</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    </aside>

</template>

<script>
import { Bars3CenterLeftIcon } from '@heroicons/vue/24/outline'
import { useDashboardStore } from '@/stores/dashboard'

export default {
    setup() {
        const dashboardStore = useDashboardStore()
        return {
            dashboardStore
        }
    },
    components: {
        Bars3CenterLeftIcon,
    }
}

</script>
