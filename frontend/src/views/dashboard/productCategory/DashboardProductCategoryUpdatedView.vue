<template>
  <form
    class="bg-base-200 p-5 w-full rounded-2xl grid grid-cols-12 cartAnimation gap-5"
    v-on:submit.prevent="
      productCategoryStore.updateSingleProductCategoryHandler
    "
  >
    <div class="col-span-12">
      <h1 class="text-center my-5 text-2xl text-green-600 font-bold">
        افزودن دسته بندی محصول
      </h1>
      <div class="divider"></div>
    </div>
    <div class="col-span-12">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">عنوان دسته بندی محصول :</span>
        </div>
        <input
          type="text"
          placeholder="عنوان دسته بندی محصول"
          class="input input-bordered w-full"
          v-model="productCategoryStore.productCategoryFormData.title"
        />
      </label>
    </div>
    <div class="col-span-6">
      <input
        type="file"
        accept="image/*"
        hidden
        id="previewProductCategoryImage"
        @change="productCategoryStore.togglePreviewImageHandler"
      />
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">عنوان دسته بندی محصول :</span>
        </div>

        <div
          class="w-full h-40 border-2 border-base-100 rounded-2xl p-2 flex justify-center items-center"
          @click="productCategoryStore.previewBackdropClickHandler"
        >
          <img
            v-if="
              productCategoryStore.productCategoryFormData.previewImage !== null
            "
            :src="productCategoryStore.productCategoryFormData.previewImage"
            alt=""
          />
          <PhotoIcon v-else class="size-20" />
        </div>
      </label>
    </div>
    <div class="col-span-6">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">وضعیت دسته بندی محصول :</span>
        </div>
        <input
          type="checkbox"
          checked="checked"
          class="checkbox"
          v-model="productCategoryStore.productCategoryFormData.status"
        />
      </label>
    </div>
    <div class="divider col-span-12"></div>
    <div class="col-span-6">
      <button
        class="btn text-white bg-green-600 hover:bg-green-700"
        type="submit"
      >
        <template v-if="productCategoryStore.productCategoryFormData.isSending">
          <span class="loading loading-ring loading-md"></span>
        </template>
        <template v-else>
          <span>بروز رسانی</span>
        </template>
      </button>
    </div>
  </form>
</template>

<script>
import { PhotoIcon } from "@heroicons/vue/24/outline";
import { useProductCategoryStore } from "@/stores/productCategory";
export default {
  setup() {
    const productCategoryStore = useProductCategoryStore();
    return { productCategoryStore };
  },
  components: {
    PhotoIcon,
  },
  mounted() {
    this.productCategoryStore.getSingleProductCategoryHandler(
      this.$route.params.id
    );
  },
};
</script>
