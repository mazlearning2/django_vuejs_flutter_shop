import * as yup from 'yup'

export const loginFormValidation = yup.object().shape({
    username: yup.string().required('نام کاربری الزامی میباشد').min(3, 'نام کاربری نمیتواند کمتر از 3 کاراکتر داشته باش').max(255, 'نام کاربری نمیتواند بیشتر از 255ک کاراکتر داشته باشد'),
    password: yup.string().required('کلمه عبور الزامی میاشد').min(8, 'کلمه عبور نمیتوان کمتر از 8 کاراکتر داشته باشد').max(255, 'کلمه عبور نمیتواند بیشتر از 255 کاراکتر داشته باشد')
})

export const productCategoryFormValidation = yup.object().shape({
    title: yup.string().required('عنوان دسته بندی محصول الزامی میباشد').min(3, 'عنوان دسته بندی محصول نمیتواند کمتر از 3 کاراکتر داشته باشد').max(255, 'عنوان دسته بندی محصول نمیتواند بیشتر از 255 کاراکتر داشته باشد'),
    image: yup.string().required('تصویر دسته بندی محصول الزامی میباشد'),
})
export const productBrandFormValidation = yup.object().shape({
    title: yup.string().required('عنوان برند محصول الزامی میباشد').min(3, 'عنوان برند محصول نمیتواند کمتر از 3 کاراکتر داشته باشد').max(255, 'عنوان برند محصول نمیتواند بیشتر از 255 کاراکتر داشته باشد'),
    image: yup.string().required('تصویر برند محصول الزامی میباشد'),
})
