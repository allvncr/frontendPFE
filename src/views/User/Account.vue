<template>
    <div class="Account">
        <Header></Header>
        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="/user/account">Account</router-link>
            </nav>

            <div class="body">
                <div class="title">
                    <h2>Account</h2>
                </div>
                <form class="page" @submit.prevent="updateProfile">
                    <div class="left">
                        <div class="form">

                            <div class="flex">
                                <div class="form-group">
                                    <label for="Username">
                                        Username *
                                    </label>
                                    <input type="text" name="Username" v-model="user.username" required  maxlength="15" minlength="3">
                                </div>
                                <div class="form-group">
                                    <label for="email">
                                        Email address *
                                    </label>
                                    <input type="email" required name="email" v-model="user.email">
                                </div>
                            </div>

                            <h3 class="head">
                                Billing Details
                            </h3>
                            <div class="flex">
                                <div class="form-group">
                                    <label for="first_name">
                                        First name *
                                    </label>
                                    <input type="text" name="first_name" v-model="profile.firstname" required  maxlength="15" minlength="3">
                                </div>
                                <div class="form-group" style="margin:0">
                                    <label for="last_name">
                                        Last name *
                                    </label>
                                    <input type="text" name="last_name" v-model="profile.lastname" required  maxlength="20" minlength="3">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="country">
                                    Country *
                                </label>
                                <select name="country" v-model="profile.country">
                                    <option value>(selectionnez votre pays)</option>
                                    <option v-for="(pays, i)  in country" :key="i" :value=pays.name>
                                        {{ pays.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="street">
                                    Street address *
                                </label>
                                <input type="text" name="street" v-model="profile.address" required minlength="3" placeholder="House number and street name">
                            </div>

                            <div class="form-group">
                                <label for="city">
                                    Town / City *
                                </label>
                                <input type="text" name="city" v-model="profile.city" required minlength="2">
                            </div>

                            <div class="form-group">
                                <label for="post">
                                    PostCode
                                </label>
                                <input type="text" name="post" v-model="profile.zipcode" minlength="4">
                            </div>

                            <div class="form-group">
                                <label for="phone">
                                    Phone number *
                                </label>
                                <input type="text" required name="phone" v-model="profile.phone" minlength="8">
                            </div>

                            <button class="button" type="submit">Save</button>
                        </div>
                        
                    </div>

                </form>
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
        padding: 24px 54px;
        display: flex;
        align-items: center;
        font-size: .875rem;
        border-bottom: 1px solid #eae8e4;
        & a{
            display: block;
            text-decoration: none;
            color: #161619;
        }
    }

    .body{
        border-bottom: 1px solid #eae8e4;
        width: 100%;
        // background-image: url(https://demo4.madrasthemes.com/bookworm/wp-content/plugins/bookwormgb/dist/images/block-hero-carousel-1-pattern.cefc31e.jpg);
        background-image: url(../../assets/carousel.jpg);

        .title{
            text-align: center;
            padding: 48px 0;

            & h2{
                font-weight: 600;
                font-size: 1.875rem;
                margin: .25rem 0;
            }
        }

        .page{
            .left{
                @media only screen and (max-width: 768px){
                    width: 100%;
                    margin-left: 0;
                }
                margin: auto;
                width: 80%;
                background: #fff;
                border: 1px solid #eae8e4;
                border-bottom: none;
                margin-bottom: 32px;

                .form{
                    padding: 30px;
                    width: 100%;
                    .head{
                        font-size: 1.3rem;
                        font-weight: 600;
                        margin-bottom: 32px;
                    }

                    .flex{
                        @media only screen and (max-width: 768px){
                            flex-direction: column;
                            margin-bottom: 24px;
                        }
                        display: flex;
                        justify-content: space-between;

                        .form-group{
                            @media only screen and (max-width: 768px){
                                width: 100%;
                                margin: 0;
                                margin-bottom: 24px;
                            }
                            width: 50%;
                            margin-right: 30px;
                        }
                    }
                    .form-group{
                        margin-bottom: 24px;

                        label{
                            margin-bottom: 8px;
                            display: inline-block;
                            font-weight: 600;
                        }

                        input, select{
                            border: 1px solid #dfdcd7;
                            padding: 12px 24px;
                            line-height: 1.5;
                            font-size: 1rem;
                            width: 100%;
                            display: block;
                        }
                    }

                    .button{
                        border: 1px solid #000;
                        background-color: #161619;
                        color: #fff;
                        padding: 16px 20px;
                        line-height: 1.5;
                        display: block;
                        width: 100%;
                        font-size: 1rem;
                        text-align: center;
                        margin: 0 auto 32px;
                        text-decoration: none;
                    }

                    .button:hover{
                        background-color: #fff;
                        color: #161619;
                    }
                }
            }
        }
    }


</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CartService from "../../services/CartService"
import AuthService from "../../services/AuthService"

export default {
    name: "Account",

    components: {
        Header,
        Footer
    },

    data(){
        return {
            user: {
                username: '',
                email: '',
            },
            profile:{
                firstname: '',
                lastname: '',
                country: '',
                address: '',
                city: '',
                zipcode: '',
                phone: ''
            },
            country: [],
            exist: false,
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
        setup(){
            var user = this.$store.state.auth.user
            this.$store.dispatch('get', user)
            .then((result) => {
                this.products = result.data
            }).catch((err) => {
                console.log(err)
            })
        },

        getProfile(id){
            let params = {
                id: id
            }
            AuthService.getProfile(params)
            .then(response => {
                this.profile = response.data
                this.exist = true
            }).catch(e => {
                console.log(e)
                this.exist = false
            })
        },

        updateProfile(){
            let user = {
                id: this.$store.state.auth.user.id,
                email: this.user.email,
                username: this.user.username,
                password: this.user.password
            }

            let data = {
                id: this.$store.state.auth.user.id,
                firstname: this.profile.firstname,
                lastname: this.profile.lastname,
                country: this.profile.country,
                address: this.profile.address,
                city: this.profile.city,
                zipcode: this.profile.zipcode,
                phone: this.profile.phone,
            }

            if(!this.exist){
                AuthService.createProfile(data)
                .then(response => {
                    this.profile = response.data
                }).catch(e => {
                    console.log(e.response.data)
                    alert('Error !')
                    this.$router.go()
                })
            }
            else{
                AuthService.updateProfile(data)
                .then(response => {
                    this.profile = response.data
                }).catch(e => {
                    console.log(e.response.data)
                    alert('Error !')
                    this.$router.go()
                })
            }

            AuthService.updateUser(user)
            .then(response => {
                alert('Save !')
                this.logout()
            }).catch(e => {
                console.log(e.response.data)
                alert('Error !')
                this.$router.go()
            })
            
        },

        logout(){
            this.$store.state.shop.cart = null
            this.products = []
            this.$store.dispatch('logout')
            .then(() => {
                alert('Log Out !')
                this.$router.push({name: "Home" })
            })
        },

        retrieveCountry(){
            CartService.getCountry()
            .then(response => {
                this.country = response.data
            }).catch(e => {
                console.log(e)
            })
        },

    },

    mounted(){
        if(this.loggedIn){
            this.setup()
            this.retrieveCountry()
            this.user = this.$store.state.auth.user
            this.getProfile(this.$store.state.auth.user.id)
            this.shipping = this.$route.params.price
        }
        else
            this.$router.push({name: "Home" })
        
    }

}
</script>
