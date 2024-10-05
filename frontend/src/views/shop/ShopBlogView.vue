<template>
    <main class="grid grid-cols-12 items-start gap-5 my-10">
        <div class="col-span-3 p-5 bg-base-200 rounded-2xl grid grid-cols-12">
            <form action="" class="col-span-12 space-y-2">
                <h1 class="text-xl font-bold">جستجو</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />

                </label>
            </form>
            <div class="col-span-12 divider"></div>
            <ul class="menu bg-base-100 rounded-box col-span-12">
                <li>
                    <details>
                        <summary class="text-xl font-bold">برند ها</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="col-span-12 divider"></div>
            <ul class="menu bg-base-100 rounded-box col-span-12">
                <li>
                    <details>
                        <summary class="text-xl font-bold">دسته بندی ها</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            <div class="col-span-12 divider"></div>
            <ul class="menu bg-base-100 rounded-box col-span-12">
                <li>
                    <details>
                        <summary class="text-xl font-bold">محبوب ترین تگ ها</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>

        </div>
        <div class="col-span-9 grid grid-cols-12 gap-4">
            <div class="col-span-12 bg-base-200 p-5 rounded-2xl flex items-center justify-between">
                <h1 class="text-xl font-bold text-green-600">لیست بلاگ ها</h1>
                <div class="flex items-center justify-center gap-5">
                    <button class="btn">Gird</button>
                    <button class="btn">List</button>
                </div>
            </div>
            <BlogItemComponent />
            <BlogItemComponent />

            <!-- pagination -->
            <div class="col-span-12 my-20">
                <div class="join">
                    <button class="join-item btn-circle btn btn-md"><ArrowRightIcon class="size-5" /></button>
                    <button class="join-item btn btn-md btn-active">1</button>
                    <button class="join-item btn btn-md">2</button>
                    <button class="join-item btn btn-md">---</button>
                    <button class="join-item btn btn-md">99</button>
                    <button class="join-item btn btn-md">100</button>
                    <button class="join-item btn btn-md btn-circle"><ArrowLeftIcon class="size-5" /></button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { BlogItemComponent } from '@/components/shop'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
export default {
    components: {
        BlogItemComponent,
        ArrowLeftIcon, ArrowRightIcon
    }
}
</script>