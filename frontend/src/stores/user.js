import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import { AUTH_LOGIN_ROUTE, AUTH_ME_ROUTE } from '@/utils/endpoints'

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
            if (localStorage.getItem('user.access')) {
                this.user.userId = localStorage.getItem('user.userId')
                this.user.firstName = localStorage.getItem('user.firstName')
                this.user.lastName = localStorage.getItem('user.lastName')
                this.user.username = localStorage.getItem('user.username')
                this.user.email = localStorage.getItem('user.email')
                this.user.lastLogin = localStorage.getItem('user.lastLogin')
                this.user.dateJoined = localStorage.getItem('user.dateJoined')
                this.user.isSuperUser = localStorage.getItem('user.isSuperUser')
                this.user.isStaff = localStorage.getItem('user.isStaff')
                this.user.isActive = localStorage.getItem('user.isActive')
                this.user.isAuthenticated = true
                this.user.accessToken = localStorage.getItem('user.accessToken')
                this.user.refreshToken = localStorage.getItem('user.refreshToken')
                this.refreshTokenHandler()
                console.log('Initialized user');
            }
        },
        setTokenHandler(accessToken, refreshToken) {
            this.user.accessToken = accessToken;
            this.user.refreshToken = refreshToken;
            localStorage.setItem('user.accessToken', accessToken);
            localStorage.setItem('user.refreshToken', refreshToken);
            console.log('call setToken');
        },
        removeTokenHandler() {
            // remove user information in localStorage
            localStorage.setItem('user.userId', '')
            localStorage.setItem('user.firstName', '')
            localStorage.setItem('user.lastName', '')
            localStorage.setItem('user.username', '')
            localStorage.setItem('user.email', '')
            localStorage.setItem('user.lastLogin', '')
            localStorage.setItem('user.dateJoined', '')
            localStorage.setItem('user.isSuperUser', '')
            localStorage.setItem('user.isStaff', '')
            localStorage.setItem('user.isActive', '')
            localStorage.setItem('user.accessToken', '')
            localStorage.setItem('user.refreshToken', '')
            // empty user information in local state
            this.user.isAuthenticated = false
            this.user.userId = "";
            this.user.firstName = "";
            this.user.lastName = "";
            this.user.username = "";
            this.user.email = "";
            this.user.lastLogin = "";
            this.user.dateJoined = "";
            this.user.isSuperUser = false;
            this.user.isStaff = false;
            this.user.isActive = false;
            this.user.accessToken = "";
            this.user.refreshToken = "";

            console.log('removeToken');
        },
        setUserInfoHandler(user) {
            console.log('call set user info');
            // set user info to localStorage
            localStorage.setItem('user.userId', user.id)
            localStorage.setItem('user.firstName', user.first_name)
            localStorage.setItem('user.lastName', user.last_name)
            localStorage.setItem('user.username', user.username)
            localStorage.setItem('user.email', user.email)
            localStorage.setItem('user.lastLogin', user.last_login)
            localStorage.setItem('user.dateJoined', user.date_joined)
            localStorage.setItem('user.isSuperUser', user.is_superuser)
            localStorage.setItem('user.isStaff', user.is_staff)
            localStorage.setItem('user.isActive', user.is_active)
            // set user info to user state
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
        },

        async refreshTokenHandler() {

        },

        async loginUserHandler() {
            try {
                this.loginFormData.loginFormLoading = true;
                const formData = new FormData()
                formData.append('username', this.loginFormData.username);
                formData.append('password', this.loginFormData.password);
                const response = await axios.post(AUTH_LOGIN_ROUTE, formData)
                if (response.status === 200) {
                    this.setTokenHandler(response.data.access, response.data.refresh);
                    const userInfoResponse = await axios.get(AUTH_ME_ROUTE, {
                        headers: {
                            Authorization: `Bearer ${this.user.accessToken}`
                        }
                    })
                    this.setUserInfoHandler(userInfoResponse.data)
                    console.log(this.router);

                    toast.success(`کاربر گرامی ${this.user.username} به فرشگاه خوش آمدین.`, { rtl: true })
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.loginFormData.loginFormLoading = false
            }
        },
        registerUserHandler() { },
        logoutUserHandler() { },

    }
})