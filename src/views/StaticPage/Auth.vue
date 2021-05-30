<template>
    <div class="Auth">
        <Header></Header>
        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="">Account</router-link>
            </nav>

            <div class="body">
                <transition name=login>
                <div class="auth" v-if="!forget">
                    <h2>Login</h2>
                    <form  @submit.prevent="handleLogin">
                        <div class="field-container">
                            <div class="form" v-show="errorL">
                                <p style="color: #f75454">Unable to connect with this information</p>
                            </div>
                            <div class="form">
                                <label>
                                    Username
                                    <span>*</span>
                                </label>
                                <input type="text" required v-model="Luser.username" maxlength="15" minlength="3" :class="{error : errorL}">
                            </div>
                            <div class="form">
                                <label>
                                    Password
                                    <span>*</span>
                                </label>
                                <input type="password" required v-model="Luser.password" minlength="4" :class="{error : errorL}">
                            </div>
                            <span class="lost" @click="forget = !forget">
                                Forgot Password?
                            </span>
                        </div>
                        <div class="login">
                            <button type="submit" :class="{ spinner: loadingL }">
                                <span>Login</span>
                            </button>
                        </div>
                        
                    </form>
                </div>
                </transition>
                <transition name="password">
                <div class="auth" v-if="forget && !found" :class="{center : forget}">
                    <h2>Forgot Password</h2>
                    <form  @submit.prevent="handleRecover">
                        <div class="field-container">
                            <div class="form" v-show="errorE">
                                <p style="color: #f75454">Email Not Found</p>
                            </div>
                            <div class="form">
                                <label>
                                    Email
                                    <span>*</span>
                                </label>
                                <input type="email" name="email" required v-model="email" :class="{error : errorE}">
                            </div>
                            <span class="lost" @click="forget = !forget">
                                Remember your password
                            </span>
                        </div>
                        <div class="login">
                            <button type="submit" :class="{ spinner: loadingE }">
                                <span>Recover Password</span>
                            </button>
                        </div>
                        
                    </form>
                </div>
                </transition>

                <div class="auth" v-if="forget && found" :class="{center : forget}">
                    <h2>Forgot Password</h2>
                    <form  @submit.prevent="changePassword">
                        <div class="field-container">
                            <div class="form" v-show="errorP">
                                <p style="color: #f75454">{{ message }}</p>
                            </div>
                            <div class="form" v-show="query">
                                <label>
                                    Email address
                                    <span>*</span>
                                </label>
                                <input type="email" required v-model="email" :class="{error : errorP}">
                            </div>
                            <div class="form">
                                <label>
                                    Code Password
                                    <span>*</span>
                                </label>
                                <input type="password" required v-model="codePassword" :class="{error : errorP}">
                            </div>
                            <div class="form">
                                <label>
                                    New Password
                                    <span>*</span>
                                </label>
                                <input type="password" v-model="password" required :class="{error : errorP}" minlength="4">
                            </div>
                            <span class="lost" @click="forget = !forget">
                                Remember your password?
                            </span>
                        </div>
                        <div class="login">
                            <button type="submit" :class="{ spinner: loadingP }">
                                <span>Reset Password</span>
                            </button>
                        </div>
                        
                    </form>
                </div>
                <transition name="login">
                <div class="auth" v-show="!forget">
                    <h2>Register</h2>
                    <form @submit.prevent="handleRegister">
                        <div>
                            <div class="form" v-show="errorR">
                                <p style="color: #f75454">Unable to register with this information</p>
                            </div>
                            <div class="form">
                                <label>
                                    Username
                                    <span>*</span>
                                </label>
                                <input type="text" required v-model="Ruser.username" maxlength="15" minlength="3" :class="{error : errorR}" autofocus>
                            </div>
                            <div class="form">
                                <label>
                                    Email address
                                    <span>*</span>
                                </label>
                                <input type="email" required v-model="Ruser.email" :class="{error : errorR}">
                            </div>
                            <div class="form">
                                <label>
                                    Password
                                    <span>*</span>
                                </label>
                                <input type="password" required v-model="Ruser.password" minlength="4" :class="{error : errorR}">
                            </div>
                            <p>
                                Your personnal data will be used to support your experience throughout this website,
                                to manage access to your account, and for other purposes described in our
                                <router-link to="/help/terms">privacy policy</router-link>.
                            </p>
                        </div>
                        <div class="login register">
                            <button type="submit" :class="{ spinner: loadingR }">
                                <span>Register</span>
                            </button>
                        </div>
                    </form>
                </div>
                </transition>
            </div>

        </div>
        <Footer></Footer>
    </div>
</template>

<style lang="scss" scoped>
    *{
        font-family: inter,Helvetica, Arial, sans-serif;
    }
    nav{
        @media only screen and (max-width: 768px){
            margin: 0;
            align-items: baseline;
        }
        margin: 0 45px;
        padding: 24px 15px;
        display: flex;
        align-items: center;
        font-size: .875rem;
        border-bottom: 1px solid #eae8e4;
        & a{
            @media only screen and (max-width: 768px){
                max-lines: 1;
            }
            display: block;
            text-decoration: none;
            color: #161619;
        }
    }

    .body{
        @media only screen and (max-width: 768px){
            padding: 0;
            flex-direction: column;
        }
        display: flex;
        padding: 32px;

        .center{
            background: #FDFEFE;
            box-shadow: 0 0 40px 0 rgba(22, 22, 25, 0.1);
            padding: 30px;
            width: 80%;
            margin: 0 auto;
        }

        .auth{
            @media only screen and (max-width: 768px){
                width: 100%;
                margin-bottom: 24px;
            }
            background: #FDFEFE;
            box-shadow: 0 0 40px 0 rgba(22, 22, 25, 0.1);
            padding: 30px;
            width: 50%;

            h2{
                font-weight: 600;
            }
            
            .form{
                margin-bottom: 32px;
            }

            .field-container{
                width: 90%;
                border-bottom: 1px solid #eae8e4;
                margin-bottom: 25px;
            }

            label span, .lost{
                color: #f75454;
                font-size: 1rem;
                font-weight: 600;
            }

            input{
                display: block;
                width: 100%;
                padding: .844rem 1rem;
                font-size: 1.25rem;
                font-weight: 400;
                line-height: 1.5;
                color: #7c6e65;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #dfdcd7;
            }

            .error{
                border-color: #f75454;
            }

            p{
                font-size: 1rem;
                margin-bottom: 20px;
                a{
                    color: #f75454;
                    text-decoration: none;
                }
                a:hover{
                    text-decoration: underline;
                }
            }
            .lost {
                width: 100%;
                display: block;
                color: #161619;
                text-align: right;
                margin-bottom: 15px;
                font-size: 1rem;
            }
            .lost:hover{
                color: #f75454;;
                cursor: pointer;
            }
        }
        .login{
            width: 90%;
            text-align: right;

            button{
                border: 1px solid #ddd;
                font-size: 1em;
                height: 3.75rem;
                padding: .75rem 3rem;
                color: #fff;
                background-color: #161619;
                border-color: #161619;
                position: relative;
                
            }

            .spinner span{
                visibility: hidden;
                opacity: 0;
            }


            .spinner::after{
                content: '';
                z-index: 2;
                width: 28px;
                height: 28px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                border: 5px solid transparent;
                border-top-color: #fff;
                border-radius: 50%;
                animation: button-loading 1s ease infinite;
            }

            @keyframes button-loading {
                from{
                    transform: rotate(0turn);
                }

                to{
                    transform: rotate(1turn);
                }
            }
        }
    }

    .password-enter-active, .password-leave-active{
        @media only screen and (max-width: 768px){
            transition: none;
        }
        transition: transform .5s ease, opacity .5s ease;
    }

    .password-enter-active{
        transition-delay: 0.5s;
    }

    .password-enter{
        transform: translateX(-400px);
        opacity: 0;
    }

    .password-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }

    .password-leave{
        transform: translateX(0px);
        opacity: 1;
    }
    
    .password-leave-to{
        transform: translateX(400px);
        opacity: 0;
    }

    .login-enter-active, .login-leave-active{
        @media only screen and (max-width: 768px){
            transition: none;
        }
        transition: transform .5s ease, opacity .5s ease;
    }

    .login-enter-active{
        transition-delay: 0.5s;
    }

    .login-enter{
        transform: translateX(-1000px);
        opacity: 0;
    }

    .login-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }

    .login-leave{
        transform: translateX(0px);
        opacity: 1;
    }
    
    .login-leave-to{
        transform: translateX(1000px);
        opacity: 0;
    }


</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AuthService from '../../services/AuthService';

export default {
  name: "Auth",
  
  components: {
    Header,
    Footer
  },

   data(){
        return {
            Luser: {
                username: "",
                password: "",
            },

            Ruser: {
                username: "",
                email: "",  
                password: "",
            },
            errorL: false,
            loadingL: false,
            errorR: false,
            loadingR: false,

            forget: false,
            found: false,
            errorE: false,
            loadingE: false,
            errorP: false,
            loadingP: false,

            email: "",
            password: '',
            message: 'Wrong Password Code',
            codePassword: '',
            query: false
        }
    },

    computed: {
        loggedIn(){
            var bool = false
            if (this.$store.state.auth.status.loggedIn && this.$store.state.auth.user != null) {
                bool = true
            }
            return bool
        },
    },

    methods: {
        handleLogin(){
            this.loadingL = true
            this.$store.dispatch('login', this.Luser)
            .then(response => {
                if(this.loggedIn){
                    this.loadingL = false
                    this.errorL = false
                    this.$router.go()
                }
                else{
                    this.errorL = true
                    this.loadingL = false
                }
            })
        },

        handleRegister(){
            this.loadingR = true
            this.$store.dispatch('register', this.Ruser)
            .then(() => {
                this.loadingR = false
                this.$store.dispatch('login', this.Ruser)
                .then(() => {
                    this.$router.push({ name: "Home" })
                })
            }).catch(e => {
                this.loadingR = false
                this.errorR = true
                console.log(e.response.data)
            })
        },

        handleRecover(){
            this.loadingE = true
            var password = Math.random().toString(36).slice(-8);
            localStorage.setItem('password', password)
            
            let params = {
                email: this.email,
                code: password
            }
            AuthService.verifyEmail(params)
            .then(() => {
                this.loadingE = false
                this.errorE = false
                this.found = true
                

            }).catch(e => {
                this.loadingE = false
                this.errorE = true
                console.log(e.response.data)
            })
        },

        changePassword(){
            this.loadingP = true
            let data = {
                email: this.email,
                pass: this.password
            }
            var storageCode = localStorage.getItem('password') 

            if(this.codePassword == storageCode){
                AuthService.changePassword(data)
                .then(() => {
                    this.loadingP = false
                    localStorage.removeItem('password')
                    alert('Password Changed !')
                    this.$router.push({name: "Home" })
                }).catch(e => {
                    console.log(e.response.data)
                })
            }
            else{
                this.loadingP = false
                this.errorP = true
            }

        },
    },

    mounted(){
        if (this.loggedIn)
            this.$router.push({name: "Home" })
        
        if(this.$route.params.recover=='yes'){
            this.forget=true
            this.found=true
            this.query=true
        }
            
    }
}
</script>
