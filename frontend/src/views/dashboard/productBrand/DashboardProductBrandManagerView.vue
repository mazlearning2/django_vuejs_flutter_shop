<template>
  <section
    class="bg-base-200 p-5 w-full rounded-2xl grid grid-cols-12 cartAnimation"
  >
    <div class="col-span-12 flex items-center justify-between">
      <RouterLink
        :to="{ name: 'dashboardProductBrandCreateView' }"
        class="btn bg-green-600 hover:bg-green-700 text-white shadow-none"
      >
        افزودن
      </RouterLink>
      <h1 class="text-2xl font-bold text-green-600">
        مدیریت برند محصولات
      </h1>
      <form action="">
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="جستجو..." />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
      </form>
    </div>
    <div class="col-span-12 divider"></div>
    <div class="col-span-12 grid grid-cols-12 border-b-4 border-b-base-100 p-2">
      <div class="col-span-3 border-l border-l-base-100">
        <h1 class="font-bold text-center">عنوان برند</h1>
      </div>
      <div class="col-span-3 border-l border-l-base-100">
        <h1 class="font-bold text-center">تصویر برند</h1>
      </div>
      <div class="col-span-3 border-l border-l-base-100">
        <h1 class="font-bold text-center">وضعیت برند</h1>
      </div>
      <div class="col-span-3">
        <h1 class="font-bold text-center">عملایت ها</h1>
      </div>
    </div>
    <template v-if="productBrandStore.brands.length !== 0">
      <div
        class="col-span-12 grid grid-cols-12 border-b border-b-base-100 p-2"
        v-for="brand in productBrandStore.brands"
        :key="brand.id"
      >
        <!-- Open the modal using ID.showModal() method -->
        <div
          class="col-span-3 border-l border-l-base-100 flex items-center justify-center"
        >
          <h1 class="font-bold text-center">
            {{ brand.title }}
          </h1>
        </div>
        <div class="col-span-3 border-l border-l-base-100 p-2">
          <img
            :src="brand.image"
            class="w-full h-20 rounded-2xl object-contain"
            alt=""
          />
        </div>
        <div
          class="col-span-3 border-l border-l-base-100 flex items-center justify-center"
        >
          <h1 class="font-bold text-center">
            <span class="badge badge-success" v-if="brand.status">فعال</span>
            <span class="badge badge-warning" v-else>غیره فعال</span>
          </h1>
        </div>
        <div class="col-span-3 flex items-center justify-center gap-5">
          <button
            class="btn btn-circle bg-red-600 hover:bg-red-700 text-white"
            @click="productBrandStore.showDeleteModalProductBrandHandler(brand)"
          >
            <TrashIcon class="size-5" />
            <!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
          </button>
          <dialog id="productBrandDeleteModal" class="modal">
            <div class="modal-box">
              <h3 class="text-lg font-bold text-red-600">
                حذف برند محصول
              </h3>
              <div class="divider"></div>
              <p class="py-4">
                آیا از حذف برند محصول
                <span class="text-red-600">{{
                  productBrandStore.singleProductBrand.title
                }}</span>
                اطمینان دارید ؟
              </p>
              <div class="divider"></div>
              <div class="modal-action flex items-center justify-between">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button
                    class="btn shadow-none"
                    id="closeDeleteProductCategoryModal"
                  >
                    خیر دستم خورد
                  </button>
                </form>
                <button
                  class="btn bg-red-600 hover:bg-red-700 text-white shadow-none"
                  @click="productBrandStore.deleteSingleProductBrandHandler"
                >
                  بله اطمینان دارم
                </button>
              </div>
            </div>
          </dialog>
          <RouterLink
            :to="{
              name: 'dashboardProductBrandUpdateView',
              params: { id: brand.id },
            }"
            class="btn btn-circle bg-green-600 hover:bg-green-700 text-white"
          >
            <PencilSquareIcon class="size-5" />
          </RouterLink>
        </div>
      </div>
    </template>
    <template v-else>
      <h1>Empty</h1>
    </template>
    <!-- pagination -->
    <div class="col-span-12 mt-10 flex items-center justify-center">
      <div class="join">
        <button
          class="join-item btn-circle bg-base-100 btn btn-md shadow-none border-none"
        >
          <ArrowRightIcon class="size-5" />
        </button>
        <button
          class="join-item bg-base-100 shadow-none border-none btn btn-md btn-active"
        >
          1
        </button>
        <button
          class="join-item btn btn-md bg-base-100 shadow-none border-none"
        >
          2
        </button>
        <button
          class="join-item btn btn-md bg-base-100 shadow-none border-none"
        >
          ---
        </button>
        <button
          class="join-item btn btn-md bg-base-100 shadow-none border-none"
        >
          99
        </button>
        <button
          class="join-item btn btn-md bg-base-100 shadow-none border-none"
        >
          100
        </button>
        <button
          class="join-item btn btn-md bg-base-100 btn-circle shadow-none border-none"
        >
          <ArrowLeftIcon class="size-5" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/outline";
import { useProductBrandStore } from "@/stores/productBrand";
export default {
  setup() {
    const productBrandStore = useProductBrandStore();
    return {
      productBrandStore,
    };
  },
  components: {
    TrashIcon,
    PencilSquareIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
  },
  mounted() {
    this.productBrandStore.getAllProductBrandHandler();
  },
};
</script>
