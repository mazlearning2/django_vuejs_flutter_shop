<template>
    <main>
        <!-- HomeSliderComponent -->
        <HomeSliderComponent />
        <!-- categories -->
        <CategoriesComponent />
        <!-- Product Slider -->
        <ProductSliderComponent />
        <ProductSliderComponent />
    </main>
</template>

<script>
import { HeaderComponent, FooterComponent, HomeSliderComponent, CategoriesComponent, ProductSliderComponent } from '../../components/shop'

export default {
    components: {
        HeaderComponent, FooterComponent,
        HomeSliderComponent, CategoriesComponent,
        ProductSliderComponent,
    }
}
</script>