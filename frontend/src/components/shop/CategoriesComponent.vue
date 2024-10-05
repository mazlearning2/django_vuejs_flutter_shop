<template>
    <section class="bg-base-200 rounded-2xl w-full grid grid-cols-12 gap-5 p-5 my-20">
        <div class="col-span-12">
            <h1 class="text-2xl font-bold text-green-600">دسته بندی های مورد علاقه</h1>
            <div class="divider"></div>
        </div>
        <CategoryItemComponent />
        <CategoryItemComponent />
        <CategoryItemComponent />
        <CategoryItemComponent />
        <CategoryItemComponent />
        <CategoryItemComponent />
        <CategoryItemComponent />
        <CategoryItemComponent />
    </section>
</template>

<script>
import CategoryItemComponent from './CategoryItemComponent.vue'
export default {
    components: {
        CategoryItemComponent,
    }
}
</script>