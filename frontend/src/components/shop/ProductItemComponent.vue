<template>
    <div class="col-span-4 p-5 rounded-2xl bg-base-200 flex flex-col gap-5 h-96">
        <img src="https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg"
            class="w-full h-40 object-cover rounded-2xl" alt="">
        <h1 class="font-bold text-center">محصول شماره یک هست این محصول و بهترین محصولی هست که در سایت ما هست
        </h1>
        <h2 class="font-bold text-green-600">قیمت 150000 تومان</h2>
        <div class="w-full gap-2 grid grid-cols-12">
            <div class="h-14 border border-transparent hover:border-green-600 transition-all bg-base-100 rounded-2xl col-span-3 flex items-center justify-center p-2"
                @click="toggleModalHandler">
                <ArrowsPointingOutIcon class="size-6" />
            </div>
            <div
                class="h-14 border border-transparent hover:border-green-600 transition-all bg-base-100 rounded-2xl col-span-3 flex items-center justify-center p-2">
                <EyeIcon class="size-6" />
            </div>
            <div
                class="h-14 border border-transparent hover:border-green-600 transition-all bg-base-100 rounded-2xl col-span-3 flex items-center justify-center p-2">
                <HeartIcon class="size-6" />
            </div>
            <div
                class="h-14 border border-transparent hover:border-green-600 transition-all bg-base-100 rounded-2xl col-span-3 flex items-center justify-center p-2">
                <ShoppingCartIcon class="size-6" />
            </div>
        </div>
        <dialog id="productPopupDetail" class="modal" style="z-index: 2;">
            <div class="modal-box w-11/12 max-w-5xl">
                <div class="grid grid-cols-12 gap-5">
                    <div class="flex justify-between col-span-12">
                        <h3 class="text-2xl font-bold">جزییات محصول</h3>
                        <form method="dialog">
                            <button class="btn">بستن</button>
                        </form>
                    </div>
                    <div class="col-span-12 divider"></div>
                    <div class="col-span-6">
                        <img src="https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg"
                            class="w-full rounded-2xl h-60 object-cover p-2 border border-green-600" alt="">
                        <swiper :modules="modules" :autoplay="{ delay: 3000, }" :slides-per-view="4" :space-between="10"
                            :loop="true" class="w-full h-full my-5">
                            <swiper-slide v-for="(slide, index) in slides" :key="index"
                                class="w-full h-full grid grid-cols-12">
                                <img :src="slide.image" class="h-20 object-cover rounded-xl p-1 border border-green-600"
                                    alt="">

                            </swiper-slide>

                        </swiper>
                    </div>
                    <div class="col-span-6 flex flex-col gap-5">
                        <h1 class="text-xl font-bold">پرفروش ترین محصولات پرفروش ترین محصولات</h1>
                        <h4 class="font-bold text-green-600">قیمت : 150000 تومان</h4>
                        <div class="w-full gap-2 grid grid-cols-12">
                            <div
                                class="h-20 border border-transparent hover:border-green-600 transition-all bg-base-200 rounded-2xl col-span-4 flex items-center justify-center p-2">
                                <EyeIcon class="size-6" />
                            </div>
                            <div
                                class="h-20 border border-transparent hover:border-green-600 transition-all bg-base-200 rounded-2xl col-span-4 flex items-center justify-center p-2">
                                <HeartIcon class="size-6" />
                            </div>
                            <div
                                class="h-20 border border-transparent hover:border-green-600 transition-all bg-base-200 rounded-2xl col-span-4 flex items-center justify-center p-2">
                                <ShoppingCartIcon class="size-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
</template>


<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import { EyeIcon, ShoppingCartIcon, HeartIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/outline'
export default {
    components: {
        Swiper,
        SwiperSlide,
        EyeIcon, ShoppingCartIcon, HeartIcon, ArrowsPointingOutIcon
    },
    data() {
        return {
            modules: [Autoplay, Pagination],
            slides: [
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 1' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 2' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 3' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 3' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 3' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 3' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 3' },
            ],
        };
    },
    methods: {
        toggleModalHandler() {
            const productPopupDetail = document.getElementById('productPopupDetail');
            productPopupDetail.showModal()
        },
    }
}
</script>