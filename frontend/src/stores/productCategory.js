import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { GET_ALL_PRODUCT_CATEGORY_ROUTE, CREATE_SINGLE_PRODUCT_CATEGORY_ROUTE, GET_SINGLE_PRODUCT_CATEGORY_ROUTE, DELETE_SINGLE_PRODUCT_CATEGORY_ROUTE, UPDATE_SINGLE_PRODUCT_CATEGORY_ROUTE } from '@/utils/endpoints'
import { productCategoryFormValidation } from '@/utils/validation'
import { useUserStore } from './user'
import router from '@/router'

export const useProductCategoryStore = defineStore({
    id: 'productCategory',
    state: () => ({
        userStore: useUserStore(),
        categories: [],
        categoriesListLoading: true,
        singleProductCategoryLoading: false,
        singleProductCategory: {},
        productCategoryDeleteButtonIsLoading: false,
        productCategoryFormData: {
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
            this.productCategoryFormData = {
                title: '',
                image: null,
                status: false,
                previewImage: null,
                isSending: false,
                editProductId: '', // ریست کردن آیدی ویرایش
            }
        },
        previewBackdropClickHandler() {
            const previewProductCategoryImage = document.getElementById('previewProductCategoryImage')
            previewProductCategoryImage.click()
        },
        togglePreviewImageHandler(event) {
            const file = event.target.files[0];
            this.productCategoryFormData.previewImage = URL.createObjectURL(file)
            this.productCategoryFormData.image = file
        },
        showDeleteModalProductCategoryHandler(singleProductCategory) {
            const productCategoryDeleteModal = document.getElementById('productCategoryDeleteModal');
            productCategoryDeleteModal.showModal();
            this.singleProductCategory = singleProductCategory;
            console.log(this.singleProductCategory);
        },
        // CRUD methods
        async getAllProductCategoryHandler() {
            try {
                this.categoriesListLoading = true; // تنظیم لودینگ در ابتدای درخواست
                const response = await axios.get(GET_ALL_PRODUCT_CATEGORY_ROUTE, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`
                    }
                })
                this.categories = response.data;
            } catch (error) {
                console.log(error);
                toast.error('خطا در برقراری ارتباط با سرور', { rtl: true });
            } finally {
                this.categoriesListLoading = false; // لودینگ در پایان درخواست خاموش می‌شود
            }
        },
        async createSingleProductCategoryHandler() {
            try {
                this.productCategoryFormData.isSending = true;
                await productCategoryFormValidation.validate(this.productCategoryFormData, { abortEarly: false });

                const formData = new FormData();
                formData.append('title', this.productCategoryFormData.title);
                formData.append('status', this.productCategoryFormData.status);
                formData.append('image', this.productCategoryFormData.image);

                const response = await axios.post(CREATE_SINGLE_PRODUCT_CATEGORY_ROUTE, formData, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`
                    }
                });

                toast.success('دسته بندی محصول با موفقیت ثبت شد', { rtl: true });
                this.resetForm(); // بعد از ایجاد دسته‌بندی، فرم ریست می‌شود

                setTimeout(() => {
                    // هدایت کاربر به صفحه داشبورد
                    router.push({ name: 'dashboardProductCategoryManagerView' });
                }, 3000);

            } catch (error) {
                console.log(error);
                this.handleError(error); // استفاده از متد برای مدیریت خطاها
            } finally {
                this.productCategoryFormData.isSending = false;
            }
        },
        async getSingleProductCategoryHandler(productCategoryId) {
            try {
                this.singleProductCategoryLoading = true; // لودینگ در ابتدای درخواست
                const response = await axios.get(`${GET_SINGLE_PRODUCT_CATEGORY_ROUTE}${productCategoryId}/`, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`
                    }
                });

                // پر کردن فرم با داده‌های دریافت‌شده
                this.productCategoryFormData = {
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
                this.singleProductCategoryLoading = false;
            }
        },
        async deleteSingleProductCategoryHandler() {
            this.productCategoryDeleteButtonIsLoading = true;
            try {
                const response = await axios.delete(`${DELETE_SINGLE_PRODUCT_CATEGORY_ROUTE}${this.singleProductCategory.id}/`, {
                    headers: { Authorization: `Bearer ${this.userStore.user.accessToken}` },
                });
                if (response.status === 204) {
                    document.getElementById('closeDeleteProductCategoryModal').click();
                    this.getAllProductCategoryHandler();
                    toast.success('دسته بندی محصول با موفقیت حذف شد', { rtl: true });
                }
            } catch (error) {
                this.handleRequestError(error);
            } finally {
                this.productCategoryDeleteButtonIsLoading = false;
            }
        },
        async updateSingleProductCategoryHandler() {
            try {
                this.productCategoryFormData.isSending = true;

                // Validate form data
                await productCategoryFormValidation.validate(this.productCategoryFormData, { abortEarly: false });

                // ایجاد FormData برای ارسال اطلاعات به روزرسانی
                const formData = new FormData();
                formData.append('title', this.productCategoryFormData.title);
                formData.append('status', this.productCategoryFormData.status);

                // فقط در صورتی که تصویر جدیدی انتخاب شده باشد، آن را به فرم دیتا اضافه کنید
                if (this.productCategoryFormData.image instanceof File) {
                    formData.append('image', this.productCategoryFormData.image);
                }

                const response = await axios.patch(`${UPDATE_SINGLE_PRODUCT_CATEGORY_ROUTE}${this.productCategoryFormData.editProductId}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.userStore.user.accessToken}`,
                        'Content-Type': 'multipart/form-data', // تنظیم درخواست به صورت multipart/form-data
                    },
                });

                toast.success('دسته بندی محصول با موفقیت ویرایش شد', { rtl: true });

                // ریست کردن فرم پس از ویرایش
                this.resetForm();

                setTimeout(() => {
                    router.push({ name: 'dashboardProductCategoryManagerView' });
                }, 3000);

            } catch (error) {
                console.log(error);
                this.handleError(error);
            } finally {
                this.productCategoryFormData.isSending = false;
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
});
