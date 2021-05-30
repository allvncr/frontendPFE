<template>
    <div class="Cart">
        <Header></Header>
        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="/cart">Cart</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="">Checkout</router-link>
            </nav>

            <div class="body">
                <div class="title">
                    <h2>Checkout</h2>
                </div>
                <form class="page" @submit.prevent="checkout">
                    <div class="left">
                        <div class="form">
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
                                <input type="text" name="street" v-model="profile.address" required minlength="3" placeholder="House number and street name" style="margin-bottom: 15px;">
                                <!-- <input type="text" name="apartment" minlength="3" placeholder="Apartement, suite, ect. (optional)"> -->
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

                            <div class="form-group">
                                <label for="email">
                                    Email address (Read Only)
                                </label>
                                <input type="email" required name="email" v-model="userEmail" readonly="readonly">
                            </div>

                            <h3 class="head">
                                Additional information
                            </h3>

                            <div class="form-group">
                                <label for="note">
                                    Order note (optional)
                                </label>
                                <textarea placeholder="Note about your order, e.g. special notes for delivery." v-model="message"></textarea>
                            </div>
                            
                        </div>
                    </div>

                    <div class="right">
                        <div class="top">
                            <div class="cart">
                                <a class="head" @click="order = !order">
                                    <h3>Your order</h3>
                                    <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-if="order"/>
                                    <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-else/>
                                </a>
                                
                                <div class="subtotal" v-for="(product, i) in products" :key="i" v-show="order">
                                    <p class="book">{{ product.book.title }} x {{ product.quantity }}</p>
                                    <p>${{ produit( product.book.price, product.quantity ) }}</p>
                                </div>
                            </div>
                            <div class="cart">
                                <a class="head" @click="total = !total">
                                    <h3>Cart Totals</h3>
                                    <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-if="total"/>
                                    <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-else/>
                                </a>
                                
                                <div class="subtotal" v-show="total">
                                    <h4>Subtotal</h4>
                                    <p>${{ totalPrice() }}</p>
                                </div>
                                <div class="subtotal" v-show="total">
                                    <h4>Shipping</h4>
                                    <p>${{ shipping }}</p>
                                </div>
                            </div>
                            <div class="cart">
                                <a class="head" @click="ships = !ships">
                                    <h3>Shipping</h3>
                                    <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-if="ships"/>
                                    <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-else/>
                                </a>
                                
                                <ul v-show="ships">
                                    <li v-if="totalPrice() >=100">
                                        <input type="radio" v-if="shipping==0" checked name="shipping" @click="ship(0)">
                                        <input type="radio" v-else name="shipping" @click="ship(0)">
                                        Free Shipping
                                    </li>
                                    <li v-else>
                                        <input type="radio" name="shipping" v-if="shipping==8" checked @click="ship(8.00)">
                                        <input type="radio" name="shipping" v-else @click="ship(8.00)">
                                        Rapid Post : $8
                                    </li>
                                </ul>
                            </div>

                            <div class="cart">
                                <a class="head" @click="coupon = !coupon">
                                    <h3>Coupon</h3>
                                    <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-if="coupon"/>
                                    <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-else/>
                                </a>

                                <div class="form-group" v-show="coupon">
                                    <input type="text" name="coupon" v-model="reductCode" minlength="6" placeholder="Coupon Code" @keyup="getCoupon">
                                    <button disabled type="button" v-if="!correct">Apply Code</button>
                                    <button type="button" v-if="correct && !apply" @click="apply = !apply">Apply</button>
                                    <button type="button" v-if="correct && apply" :class="{ apply : apply}" @click="apply = !apply">turn off</button>
                                </div>
                                <div v-show="correct!=undefined">                     
                                    <p v-show="coupon && !correct" style="color:#f75454">Wrong Code !</p>
                                    <p v-show="coupon && correct" style="color:#359e04">Coupon: {{ code.percent }}%</p>
                                </div>
                                
                            </div>
                            
                            <div class="cart">
                                <div class="total">
                                    <h3>Total</h3>
                                    <p>${{ parseInt(shipping) + totalPrice()  }}</p>
                                </div>
                            </div>
                            <div class="cart">
                                <a class="head" @click="payment = !payment">
                                    <h3>Payment</h3>
                                    <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-if="payment"/>
                                    <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-else/>
                                </a>

                                <ul v-show="payment">
                                    <!-- <li>
                                        <input type="radio" name="payment">
                                        <h4>Direct Bank Transfert</h4>
                                        <p>
                                            Make your payment diretly into our bank account.<br>
                                            Please use your Order ID as the payment reference.<br>
                                            Your order won't be shipped until the funds have cleared in our account.
                                        </p>
                                    </li> -->
                                    <li>
                                        <input type="radio" checked name="payment">
                                        <h4>Cash on delivery</h4>

                                        <p>Pay with cash on delivery.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button class="button" type="submit" :class="{ spinner: loading }">
                            <span>Place order</span>
                        </button>
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
        border-bottom: 1px solid #eae8e4;
        width: 100%;
        // background-image: url(https://demo4.madrasthemes.com/bookworm/wp-content/plugins/bookwormgb/dist/images/block-hero-carousel-1-pattern.cefc31e.jpg);
        background-image: url(../../assets/hero-carousel.jpg);

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
            display: flex;
            @media only screen and (max-width: 768px){
                flex-direction: column;
            }

            .left{
                @media only screen and (max-width: 768px){
                    width: 100%;
                    margin-left: 0;
                }
                margin-left: 32px;
                height: 100%;
                width: 70%;
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

                        textarea{
                            display: block;
                            width: 100%;
                            padding: .844rem 1rem;
                            font-weight: 400;
                            line-height: 1.5;
                            background-color: #fff;
                            background-clip: padding-box;
                            border: 1px solid #dfdcd7;
                            height: 129px;
                            font-size: 1rem;
                        }
                    }
                }
            }

            .right{
                @media only screen and (max-width: 768px){
                    width: 100%;
                    margin: 0;
                    padding: 15px;
                }
                margin: 0 32px;
                width: 30%;
                height: 100%;

                .top{
                    background: #fff;
                    border: 2px solid #000;
                    margin-bottom: 32px;
                }

                .cart{
                    border-bottom: 2px solid #eae8e4;
                    padding: 20px 20px 0;

                    .head{
                        text-decoration: none;
                        color: #161619;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;

                        h3{
                            font-size: 1.3rem;
                            font-weight: 600;
                            margin-bottom: 24px;
                        }

                        i{
                            display: block;
                            align-items: center;
                        }
                    }

                    .subtotal{
                        display: flex;
                        justify-content: space-between;

                        h4, p{
                            font-size: 1rem;
                            font-weight: 600;
                        }

                        .book{
                            width: 70%;
                            font-size: .875rem;
                            font-weight: 400;
                        }
                    }

                    .total{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        h3{
                            font-size: 1rem;
                            font-weight: 600;
                        }

                        p, input{
                            font-size: 1rem;
                            font-weight: 800;
                        }
                    }

                    ul{
                        list-style: none;
                        
                        h4{
                            display: inline-block;
                            font-size: .875rem;
                            font-weight: 600;
                            margin-left: 24px;
                        }

                        p{
                            color: #928c88;
                            font-size: .875rem;
                            text-align: justify;
                            margin-left: 10%;
                        }
                    }

                    .form-group{
                        @media only screen and (max-width: 768px){
                            flex-direction: column;
                        }
                        
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        input{
                            @media only screen and (max-width: 768px){
                                margin-bottom: 12px;
                            }
                            border: 1px solid #dfdcd7;
                            padding: 10px 20px;
                            font-size: 1.125rem;
                            display: block;
                        }

                        button{
                            border: 1px solid #f75454;
                            background-color: #f75454;
                            color: #fff;
                            padding: 10px 20px;
                            font-size: 1rem;
                            outline: none;
                        }

                        button:disabled, .apply{
                            border: 1px solid #928c88;
                            background-color: #928c88;
                            color: #fff;
                        }
                    }

                    p{
                        text-align: center;
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
    }

</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CartService from "../../services/CartService"
import AuthService from "../../services/AuthService"
import ShopService from '../../services/ShopService';

export default {
    name: "Checkout",

    components: {
        Header,
        Footer
    },

    data(){
        return {
            products: [],
            shipping: 0,
            userEmail: "",
            order: 1,
            total: 0,
            ships: 0,
            payment: 1,
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
            message: '',
            reductCode: '',
            coupon: 1,
            correct: undefined,
            apply: false,
            code:{},
            loading: false
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

        cart(){
            return this.$store.state.shop
        },
        setShip(){
            return this.$route.params.price
        }
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

        totalPrice(){
            var somme = 0

            this.products.forEach(element => {
              somme += element.book.price * element.quantity
            })

            if(this.apply){
                somme = Math.ceil(somme - ((somme * this.code.percent)/100))
            }

            return somme
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

        checkout(){
            this.loading = true

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

            var cart = this.products

            let order = {
                cart: cart,
                total: this.totalPrice(),
                email: this.userEmail,
                message: this.message,
                status: false,
                delivery: parseInt(this.shipping),
            }

            if(!this.exist){
                AuthService.createProfile(data)
                .then(response => {
                    this.profile = response.data
                }).catch(e => {
                    console.log(e.response.data)
                    this.loading = false
                })
            }
            else{
                AuthService.updateProfile(data)
                .then(response => {
                    this.profile = response.data
                }).catch(e => {
                    console.log(e.response.data)
                    this.loading = false
                })
            }
            
            CartService.order(order)
            .then(response => {
                this.loading = false
                alert('Order Received !')
                this.$router.push({name: "Orders" })
            }).catch(e => {
                this.loading = false
                console.log(e.response.data)
            })

            
        },

        produit(a, b){
            return (a * b).toPrecision(4)
        },

        somme(a, b){
            return (a + b)
        },

        ship(x){
            this.shipping = x
        },

        retrieveCountry(){
            CartService.getCountry()
            .then(response => {
                this.country = response.data
            }).catch(e => {
                console.log(e)
            })
        },

        getCoupon(){
            var maj = this.reductCode.toUpperCase()
            var params = {
                code: maj
            }

            if(this.reductCode.length >= 6){
                ShopService.getCoupon(params)
                .then((result) => {
                  this.code = result.data
                  this.correct = true
                }).catch((err) => {
                  this.correct = false
                  console.log(err)
                })
            }
            else
                this.correct = false
        },

    },

    mounted(){
        if(this.loggedIn){
            this.setup()
            this.retrieveCountry()
            this.userEmail = this.$store.state.auth.user.email
            this.getProfile(this.$store.state.auth.user.id)
            this.shipping = this.$route.params.price
        }
        else
            this.$router.push({name: "Cart" })
        
    }

}
</script>
