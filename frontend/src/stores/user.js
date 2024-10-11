import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import { AUTH_LOGIN_ROUTE, AUTH_ME_ROUTE } from '@/utils/endpoints'
import { loginFormValidation } from '@/utils/validation'
import router from '@/router'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {
            userId: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            lastLogin: "",
            dateJoined: "",
            isSuperUser: false,
            isStaff: false,
            isActive: false,
            isAuthenticated: false,
            accessToken: "",
            refreshToken: "",
        },
        loginFormData: {
            username: '',
            password: '',
            loginFormLoading: false,
        }
    }),
    actions: {
        initStoreHandler() {
            if (localStorage.getItem('user.accessToken')) {
                this.user.userId = localStorage.getItem('user.userId');
                this.user.firstName = localStorage.getItem('user.firstName');
                this.user.lastName = localStorage.getItem('user.lastName');
                this.user.username = localStorage.getItem('user.username');
                this.user.email = localStorage.getItem('user.email');
                this.user.lastLogin = localStorage.getItem('user.lastLogin');
                this.user.dateJoined = localStorage.getItem('user.dateJoined');
                this.user.isSuperUser = localStorage.getItem('user.isSuperUser') === 'true';
                this.user.isStaff = localStorage.getItem('user.isStaff') === 'true';
                this.user.isActive = localStorage.getItem('user.isActive') === 'true';
                this.user.isAuthenticated = true;
                this.user.accessToken = localStorage.getItem('user.accessToken');
                this.user.refreshToken = localStorage.getItem('user.refreshToken');

                console.log('Initialized user from localStorage.');
            }
        },

        async loginUserHandler() {
            try {
                this.loginFormData.loginFormLoading = true;
                await loginFormValidation.validate(this.loginFormData, { abortEarly: false });

                const formData = new FormData();
                formData.append('username', this.loginFormData.username);
                formData.append('password', this.loginFormData.password);

                const response = await axios.post(AUTH_LOGIN_ROUTE, formData);
                if (response.status === 200) {
                    this.setTokenHandler(response.data.access, response.data.refresh);

                    const userInfoResponse = await axios.get(AUTH_ME_ROUTE, {
                        headers: {
                            Authorization: `Bearer ${this.user.accessToken}`
                        }
                    });
                    this.setUserInfoHandler(userInfoResponse.data);
                    toast.success(`کاربر گرامی ${this.user.username} به داشبورد خوش آمدید.`, { rtl: true });

                    setTimeout(() => {
                        // هدایت کاربر به صفحه داشبورد
                        router.push({ name: 'dashboardIndexView' });
                    }, 3000);

                }
            } catch (error) {
                const handleYupErrors = (innerErrors) => {
                    innerErrors.forEach(err => {
                        toast.warning(err.message, { rtl: true });
                    });
                };

                const handleServerError = (status) => {
                    const statusMessages = {
                        401: 'نام کاربری یا کلمه عبور صحیح نمیباشد',
                        default: 'خطا در برقراری ارتباط با سرور'
                    };

                    const message = statusMessages[status] || statusMessages.default;
                    toast.warning(message, { rtl: true });
                };

                if (error?.inner?.length > 0) {
                    handleYupErrors(error.inner);
                } else {
                    handleServerError(error?.response?.status);
                }
            } finally {
                this.loginFormData.loginFormLoading = false;
            }
        },


        setTokenHandler(accessToken, refreshToken) {
            this.user.accessToken = accessToken;
            this.user.refreshToken = refreshToken;
            this.user.isAuthenticated = true;
            localStorage.setItem('user.accessToken', accessToken);
            localStorage.setItem('user.refreshToken', refreshToken);
        },

        setUserInfoHandler(user) {
            // تنظیم اطلاعات کاربر در state
            this.user.userId = user.id;
            this.user.firstName = user.first_name;
            this.user.lastName = user.last_name;
            this.user.username = user.username;
            this.user.email = user.email;
            this.user.lastLogin = user.last_login;
            this.user.dateJoined = user.date_joined;
            this.user.isSuperUser = user.is_superuser;
            this.user.isStaff = user.is_staff;
            this.user.isActive = user.is_active;

            // ذخیره اطلاعات کاربر در localStorage
            localStorage.setItem('user.userId', user.id);
            localStorage.setItem('user.firstName', user.first_name);
            localStorage.setItem('user.lastName', user.last_name);
            localStorage.setItem('user.username', user.username);
            localStorage.setItem('user.email', user.email);
            localStorage.setItem('user.lastLogin', user.last_login);
            localStorage.setItem('user.dateJoined', user.date_joined);
            localStorage.setItem('user.isSuperUser', user.is_superuser ? 'true' : 'false');
            localStorage.setItem('user.isStaff', user.is_staff ? 'true' : 'false');
            localStorage.setItem('user.isActive', user.is_active ? 'true' : 'false');

            console.log('User information has been saved in both store and localStorage.');
        },

        removeTokenHandler() {
            localStorage.clear(); // حذف اطلاعات کاربر از localStorage
            this.user = {
                userId: "",
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                lastLogin: "",
                dateJoined: "",
                isSuperUser: false,
                isStaff: false,
                isActive: false,
                isAuthenticated: false,
                accessToken: "",
                refreshToken: "",
            };
        },
    }
})
