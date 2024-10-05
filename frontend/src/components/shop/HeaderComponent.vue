<template>
    <div class="navbar bg-base-200 my-5 rounded-2xl">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a>محصولات</a></li>
                    <li><a>وبلاگ</a></li>
                    <li><a>ارتباط با ما</a></li>
                    <li><a>درباره ما</a></li>
                    <li><a>سبد خرید</a></li>
                </ul>
            </div>
            <RouterLink :to="{ name: 'shopIndexView' }" class="btn btn-ghost text-xl font-bold text-green-600">فروشگاه
            </RouterLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li>
                    <RouterLink :to="{ name: 'shopProductsView' }" class="text-green-600">محصولات</RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'shopBlogsView' }">وبلاگ</RouterLink>
                </li>
                <li><a>ارتباط با ما</a></li>
                <li><a>درباره ما</a></li>
                <li><a>سبد خرید</a></li>
            </ul>
        </div>
        <div class="navbar-end gap-5">
            <a class="btn btn-circle btn-sm">
                <MoonIcon class="size-5" />
            </a>
            <RouterLink :to="{ name: 'shopAuthView' }" class="btn btn-circle btn-sm">
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