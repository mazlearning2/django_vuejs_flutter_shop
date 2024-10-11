import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import {
    GET_ALL_PRODUCT_BRAND_ROUTE,
    GET_SINGLE_PRODUCT_BRAND_ROUTE,
    CREATE_SINGLE_PRODUCT_BRAND_ROUTE,
    UPDATE_SINGLE_PRODUCT_BRAND_ROUTE,
    DELETE_SINGLE_PRODUCT_BRAND_ROUTE
} from '@/utils/endpoints'
import { useUserStore } from './user'
import router from '@/router'
import { productBrandFormValidation } from '@/utils/validation'

export const useProductBrandStore = defineStore({
    id: 'productBrand',
    state: () => ({
        userStore: useUserStore(),
        brands: [],
        brandsListLoading: true,
        singleProductBrandLoading: false,
        singleProductBrand: {},
        productBrandDeleteButtonIsLoading: false,
        productBrandFormData: {
            title: '',
            image: null,
            status: false,
            previewImage: null,
            isSending: false,
            editProductId: '', // برای تشخیص حالت ویرایش
        }
    }),
    actions: {
        // متد برای ریست فرم
        resetForm() {
            this.productBrandFormData = {
                title: '',
                image: null,
                status: false,
                previewImage: null,
                isSending: false,
                editProductId: '', // ریست کردن آیدی ویرایش
            }
        },
        previewBackdropClickHandler() {
            const previewProductBrandImage = document.getElementById('previewProductBrandImage')
            previewProductBrandImage.click()
        },
        togglePreviewImageHandler(event) {
            const file = event.target.files[0];
            this.productBrandFormData.previewImage = URL.createObjectURL(file)
            this.productBrandFormData.image = file
        },
        showDeleteModalProductBrandHandler(singleProductBrand) {
            const productBrandDeleteModal = document.getElementById('productBrandDeleteModal');
            productBrandDeleteModal.showModal();
            this.singleProductBrand = singleProductBrand;
            console.log(this.singleProductBrand);
        },
        // CRUD methods
        async getAllProductBrandHandler() {
            try {
                this.brandsListLoading = true; // تنظیم لودینگ در ابتدای درخواست
                const response = await axios.get(GET_ALL_PRODUCT_BRAND_ROUTE, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`
                    }
                })
                this.brands = response.data;
            } catch (error) {
                console.log(error);
                toast.error('خطا در برقراری ارتباط با سرور', { rtl: true });
            } finally {
                this.brandsListLoading = false; // لودینگ در پایان درخواست خاموش می‌شود
            }
        },
        async createSingleProductBrandHandler() {
            try {
                this.productBrandFormData.isSending = true;
                await productBrandFormValidation.validate(this.productBrandFormData, { abortEarly: false });

                const formData = new FormData();
                formData.append('title', this.productBrandFormData.title);
                formData.append('status', this.productBrandFormData.status);
                formData.append('image', this.productBrandFormData.image);

                const response = await axios.post(CREATE_SINGLE_PRODUCT_BRAND_ROUTE, formData, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`
                    }
                });

                toast.success('برند محصول با موفقیت ثبت شد', { rtl: true });
                this.resetForm(); // بعد از ایجاد دسته‌بندی، فرم ریست می‌شود

                setTimeout(() => {
                    // هدایت کاربر به صفحه داشبورد
                    router.push({ name: 'dashboardProductBrandManagerView' });
                }, 3000);

            } catch (error) {
                console.log(error);
                this.handleError(error); // استفاده از متد برای مدیریت خطاها
            } finally {
                this.productBrandFormData.isSending = false;
            }
        },
        async getSingleProductBrandHandler(productBrandId) {
            try {
                this.singleProductBrandLoading = true; // لودینگ در ابتدای درخواست
                const response = await axios.get(`${GET_SINGLE_PRODUCT_BRAND_ROUTE}${productBrandId}/`, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`
                    }
                });

                // پر کردن فرم با داده‌های دریافت‌شده
                this.productBrandFormData = {
                    title: response.data.title,
                    image: response.data.image,
                    status: response.data.status,
                    previewImage: response.data.image,
                    isSending: false,
                    editProductId: response.data.id, // تنظیم آیدی برای حالت ویرایش
                };
            } catch (error) {
                console.log(error);
            } finally {
                this.singleProductBrandLoading = false;
            }
        },
        async deleteSingleProductBrandHandler() {
            this.productBrandDeleteButtonIsLoading = true;
            try {
                const response = await axios.delete(`${DELETE_SINGLE_PRODUCT_BRAND_ROUTE}${this.singleProductBrand.id}/`, {
                    headers: { Authorization: `Bearer ${this.userStore.user.accessToken}` },
                });
                if (response.status === 204) {
                    document.getElementById('closeDeleteProductBrandModal').click();
                    this.getAllProductBrandHandler();
                    toast.success('برند محصول با موفقیت حذف شد', { rtl: true });
                }
            } catch (error) {
                this.handleError(error);
            } finally {
                this.productBrandDeleteButtonIsLoading = false;
            }
        },
        async updateSingleProductBrandHandler() {
            try {
                this.productBrandFormData.isSending = true;

                // Validate form data
                await productBrandFormValidation.validate(this.productBrandFormData, { abortEarly: false });

                // ایجاد FormData برای ارسال اطلاعات به روزرسانی
                const formData = new FormData();
                formData.append('title', this.productBrandFormData.title);
                formData.append('status', this.productBrandFormData.status);

                // فقط در صورتی که تصویر جدیدی انتخاب شده باشد، آن را به فرم دیتا اضافه کنید
                if (this.productBrandFormData.image instanceof File) {
                    formData.append('image', this.productBrandFormData.image);
                }

                const response = await axios.patch(`${UPDATE_SINGLE_PRODUCT_BRAND_ROUTE}${this.productBrandFormData.editProductId}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`,
                        'Content-Type': 'multipart/form-data', // تنظیم درخواست به صورت multipart/form-data
                    },
                });

                toast.success('برند محصول با موفقیت ویرایش شد', { rtl: true });

                // ریست کردن فرم پس از ویرایش
                this.resetForm();

                setTimeout(() => {
                    router.push({ name: 'dashboardProductBrandManagerView' });
                }, 3000);

            } catch (error) {
                console.log(error);
                this.handleError(error);
            } finally {
                this.productBrandFormData.isSending = false;
            }
        },

        // متد عمومی برای مدیریت خطاها
        handleError(error) {
            if (error?.response?.status) {
                toast.warning('خطا در برقراری ارتباط با سرور', { rtl: true });
            }

            if (error?.inner?.length > 0) {
                error.inner.forEach(err => {
                    toast.warning(err.message, { rtl: true });
                });
            }
        }

    }
})