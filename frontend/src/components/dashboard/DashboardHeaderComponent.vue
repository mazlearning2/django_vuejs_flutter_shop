<template>
    <div class="navbar bg-base-200 my-5 rounded-2xl">
        <div class="navbar-start">
            <RouterLink :to="{ name: 'dashboardIndexView' }" class="btn btn-ghost text-xl font-bold text-green-600">
                مدیریت فروشگاه
            </RouterLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <h1 class="text-xl font-bold">داشبورد</h1>
        </div>
        <div class="navbar-end gap-5">
            <a class="btn btn-circle btn-sm">
                <MoonIcon class="size-5" />
            </a>
            <RouterLink :to="{ name: 'dashboardIndexView' }" class="btn btn-circle btn-sm">
                <UserIcon class="size-5" />
            </RouterLink>
            <a class="btn btn-circle btn-sm">
                <ShoppingCartIcon class="size-5" />
            </a>
        </div>
    </div>
</template>

<script>
import { MoonIcon, SunIcon, UserIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
export default {
    components: {
        MoonIcon, SunIcon, UserIcon, ShoppingCartIcon
    }
}

</script>