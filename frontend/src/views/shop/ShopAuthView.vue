<template>
  <main class="grid grid-cols-12 items-start gap-5 my-10">
    <section
      class="col-span-12 grid grid-cols-12 items-center justify-center min-h-screen"
    >
      <div class="col-span-6 p-10">
        <img :src="AuthImage" class="w-full h-full" alt="" />
      </div>
      <div class="col-span-6 bg-base-200 w-full rounded-2xl p-10 flex flex-col">
        <h1 class="col-span-12 text-center font-bold text-2xl text-green-600">
          فروشگاه
        </h1>
        <div class="divider col-span-12"></div>
        <div role="tablist" class="tabs tabs-boxed bg-base-100">
          <a role="tab" class="tab bg-green-600 text-white font-bold">ورود</a>
          <a role="tab" class="tab">ثبت نام</a>
        </div>
        <div class="divider col-span-12"></div>
        <form
          action=""
          class="flex flex-col w-full gap-5"
          v-on:submit.prevent="userStore.loginUserHandler"
        >
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">نام کاربری : </span>
            </div>
            <input
              type="text"
              placeholder="نام کاربری..."
              class="input input-bordered w-full"
              v-model="userStore.loginFormData.username"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">کلمه عبور :</span>
            </div>
            <input
              type="password"
              placeholder="کلمه عبور..."
              class="input input-bordered w-full"
              v-model="userStore.loginFormData.password"
            />
          </label>
          <button class="btn bg-green-600 text-white hover:bg-green-700">
            ورود
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import AuthImage from "@/assets/images/auth.svg";
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    return {
      AuthImage,
      userStore,
    };
  },
};
</script>
