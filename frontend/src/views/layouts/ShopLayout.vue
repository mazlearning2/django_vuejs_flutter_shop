<template>
    <main class="max-w-7xl mx-auto p-2">
        <HeaderComponent />
        <RouterView />
        <FooterComponent />
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
