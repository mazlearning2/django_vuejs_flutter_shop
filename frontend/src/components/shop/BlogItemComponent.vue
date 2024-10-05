<template>
    <div class="col-span-6 p-5 rounded-2xl bg-base-200 flex flex-col gap-5 h-96">
        <img src="https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg"
            class="w-full h-40 object-cover rounded-2xl" alt="">
        <h1 class="font-bold text-center">محصول شماره یک هست این محصول و بهترین محصولی هست که در سایت ما هست
        </h1>
        <div class="w-full gap-2 grid grid-cols-12">
            <button class="btn btn-block bg-green-600 col-span-12 hover:bg-green-700 shadow-none text-white">مشاهده</button>
        </div>
    </div>
</template>


<script>

import { EyeIcon, ShoppingCartIcon, HeartIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/outline'
export default {

    data() {
        return {
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
    }
}
</script>