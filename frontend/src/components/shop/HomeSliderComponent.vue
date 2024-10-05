<template>
    <section class="w-[100%] h-[60vh]">
        <swiper :modules="modules" :autoplay="{delay: 3000,}" :loop="true" class="w-full h-full">
            <swiper-slide v-for="(slide, index) in slides" :key="index" class="w-full h-full">
                <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover rounded-2xl" />
            </swiper-slide>
        </swiper>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            modules: [Autoplay, Pagination],
            slides: [
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 1' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 2' },
                { image: 'https://cdn.motowatch.com/skin/frontend/ebnmage/motowatch/images/category/slider/moto70.jpg', title: 'Slide 3' },
            ],
        };
    },
};
</script>