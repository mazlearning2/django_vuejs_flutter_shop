<template>
    <section class="bg-base-200 p-5 w-full rounded-2xl grid grid-cols-12 cartAnimation">
        <div class="col-span-12 flex items-center justify-between">
            <button class="btn bg-green-600 hover:bg-green-700 text-white shadow-none">افزودن محصول</button>
            <h1 class="text-2xl font-bold text-green-600">مدیریت محصولات</h1>
            <form action="">
                <label class="input input-bordered flex items-center gap-2">
                    <input type="text" class="grow" placeholder="جستجو..." />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="h-4 w-4 opacity-70">
                        <path fill-rule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clip-rule="evenodd" />
                    </svg>
                </label>
            </form>
        </div>
        <div class="col-span-12 divider"></div>
        <div class="col-span-12 grid grid-cols-12 border-b-4 border-b-base-100 p-2">
            <div class="col-span-3 border-l border-l-base-100">
                <h1 class="font-bold text-center">عنوان محصول</h1>
            </div>
            <div class="col-span-3 border-l border-l-base-100">
                <h1 class="font-bold text-center">تصویر محصول</h1>
            </div>
            <div class="col-span-2 border-l border-l-base-100">
                <h1 class="font-bold text-center">قیمت محصول</h1>
            </div>
            <div class="col-span-2 border-l border-l-base-100">
                <h1 class="font-bold text-center">دسته بندی محصول</h1>
            </div>
            <div class="col-span-2">
                <h1 class="font-bold text-center">عملایت ها</h1>
            </div>
        </div>
        <div class="col-span-12 grid grid-cols-12 border-b border-b-base-100 p-2">
            <div class="col-span-3 border-l border-l-base-100 flex items-center justify-center">
                <h1 class="font-bold text-center">این محصول محصول شماره یک هست که یک محصول خیلی خیلی عالی میباشد</h1>
            </div>
            <div class="col-span-3 border-l border-l-base-100 p-2">
                <img src="https://visualeducation.com/wp-content/uploads/2018/05/Watch-live-product-shoot.jpg"
                    class="w-full h-20 rounded-2xl object-cover" alt="">
            </div>
            <div class="col-span-2 border-l border-l-base-100 flex items-center justify-center">
                <h1 class="font-bold text-center">140,000 تومان</h1>
            </div>
            <div class="col-span-2 border-l border-l-base-100 flex items-center justify-center">
                <h1 class="font-bold text-center">دسته بندی محصول</h1>
            </div>
            <div class="col-span-2 flex items-center justify-center gap-5">
                <button class="btn btn-circle bg-red-600 hover:bg-red-700 text-white">
                    <TrashIcon class="size-5" />
                </button>
                <button class="btn btn-circle bg-green-600 hover:bg-green-700 text-white">
                    <PencilSquareIcon class="size-5" />
                </button>
            </div>
        </div>
        <!-- pagination -->
        <div class="col-span-12 mt-10 flex items-center justify-center">
            <div class="join">
                <button class="join-item btn-circle bg-base-100 btn btn-md shadow-none border-none">
                    <ArrowRightIcon class="size-5" />
                </button>
                <button class="join-item bg-base-100 shadow-none border-none btn btn-md btn-active">1</button>
                <button class="join-item btn btn-md bg-base-100 shadow-none border-none">2</button>
                <button class="join-item btn btn-md bg-base-100 shadow-none border-none">---</button>
                <button class="join-item btn btn-md bg-base-100 shadow-none border-none">99</button>
                <button class="join-item btn btn-md bg-base-100 shadow-none border-none">100</button>
                <button class="join-item btn btn-md bg-base-100 btn-circle shadow-none border-none">
                    <ArrowLeftIcon class="size-5" />
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { TrashIcon, PencilSquareIcon, ArrowRightIcon,ArrowLeftIcon } from '@heroicons/vue/24/outline'
export default {
    components: {
        TrashIcon, PencilSquareIcon,
        ArrowRightIcon,ArrowLeftIcon
    }
}
</script>