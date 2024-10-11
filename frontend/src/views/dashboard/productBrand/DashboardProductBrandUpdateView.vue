<template>
  <form
    class="bg-base-200 p-5 w-full rounded-2xl grid grid-cols-12 cartAnimation gap-5"
    v-on:submit.prevent="productBrandStore.updateSingleProductBrandHandler"
  >
    <div class="col-span-12">
      <h1 class="text-center my-5 text-2xl text-green-600 font-bold">
        ویرایش برند محصول
      </h1>
      <div class="divider"></div>
    </div>
    <div class="col-span-12">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">عنوان برند محصول :</span>
        </div>
        <input
          type="text"
          placeholder="عنوان برند محصول"
          class="input input-bordered w-full"
          v-model="productBrandStore.productBrandFormData.title"
        />
      </label>
    </div>
    <div class="col-span-6">
      <input
        type="file"
        accept="image/*"
        hidden
        id="previewProductBrandImage"
        @change="productBrandStore.togglePreviewImageHandler"
      />
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">عنوان برند محصول :</span>
        </div>

        <div
          class="w-full h-40 border-2 border-base-100 rounded-2xl p-2 flex justify-center items-center"
          @click="productBrandStore.previewBackdropClickHandler"
        >
          <img
            v-if="productBrandStore.productBrandFormData.previewImage !== null"
            :src="productBrandStore.productBrandFormData.previewImage"
            alt=""
          />
          <PhotoIcon v-else class="size-20" />
        </div>
      </label>
    </div>
    <div class="col-span-6">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">وضعیت برند محصول :</span>
        </div>
        <input
          type="checkbox"
          checked="checked"
          class="checkbox"
          v-model="productBrandStore.productBrandFormData.status"
        />
      </label>
    </div>
    <div class="divider col-span-12"></div>
    <div class="col-span-6">
      <button
        class="btn text-white bg-green-600 hover:bg-green-700"
        type="submit"
      >
        <template v-if="productBrandStore.productBrandFormData.isSending">
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
import { useProductBrandStore } from "@/stores/productBrand";
export default {
  setup() {
    const productBrandStore = useProductBrandStore();
    return { productBrandStore };
  },
  components: {
    PhotoIcon,
  },
  mounted() {
    this.productBrandStore.getSingleProductBrandHandler(this.$route.params.id);
  },
};
</script>
