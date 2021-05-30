<template>
    <div>
        <header>
            <div class="border">
                <div class="d-flex">
                    <div class="site-branding">
                        <router-link to="/">
                            Book
                            <span>
                                <i class="fad fa-won-sign"></i>
                            </span>
                            orm
                        </router-link>
                    </div>
                    <div class="site-search">
                        <form action="/shop">
                            <div class="input-group">
                                <div class="input-group-cat">
                                    <select name="cat">
                                        <option value="none" selected>All categories</option>
                                        <option v-for="(category, i) in categories" :key="i" :value="category.id">{{ category.name }}</option>
                                    </select>
                                </div>

                                <input type="text" name="s" id="s" v-model="recherche" placeholder="search for books by keyword">

                                <div class="input-group-append">
                                    <button type="submit">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="auth">
                        <a @click="account = !account" v-if="!loggedIn">
                            <div class="align">
                                <i class="fal fa-user"></i>
                                <div class="flaticon">
                                    <span>Log in</span>
                                </div>
                            </div>
                        </a>
                        <div class="deroulant">
                            <a v-if="loggedIn">
                                <div class="align">
                                    <i class="fal fa-user" @click="userHover = !userHover"></i>
                                    <div class="flaticon">
                                        <span @click="userHover = !userHover">Hello</span>
                                        <div class="light" @click="userHover = !userHover">{{name}}</div>
                                        <transition name="userHover">
                                        <div class="sous" v-show="userHover">
                                            <a href="/admin" v-show="admin">
                                                <i class="fas fa-tools"></i>
                                                Admin
                                            </a>
                                            <a href="/user/account">
                                                <i class="fas fa-user"></i>
                                                Account
                                            </a>
                                            <a href="/user/order">
                                                <i class="fas fa-shopping-cart"></i>
                                                Orders
                                            </a>
                                            <a href="/user/wish">
                                                <i class="fas fa-heart"></i>
                                                Wish List
                                            </a>
                                            <a @click="logout">
                                                <i class="fas fa-sign-out-alt"></i>
                                                Log Out
                                            </a>
                                        </div>
                                        </transition>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <a class="right" @click="shopcart = !shopcart">
                            <div class="align">
                                <span class="icon">{{ totalQ }}</span>
                                <i class="fal fa-shopping-bag"></i>
                                <div class="flaticon">
                                    <span>My cart</span>
                                    <div>${{ totalPrice() }}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <transition name="board">
            <aside v-show="account == 1">
                <header v-if="!forget">
                    <h2>
                        <i class="fal fa-user"></i>
                        <a @click="account = !account">
                            Account
                        </a>
                        <a @click="account = !account">
                            <i class="fas fa-times"></i>
                        </a>
                    </h2>
                </header>
                <header v-else>
                    <h2>
                        <i class="far fa-question-circle"></i>
                        <a @click="account = !account">
                            Forgot Password
                        </a>
                        <a @click="account = !account">
                            <i class="fas fa-times"></i>
                        </a>
                    </h2>
                </header>
                <form @submit.prevent="handleLogin" v-if="!forget">
                    <div class="form-group" v-show="error">
                        <p style="color: #f75454"> Impossible de se connecter avec ces informations</p>
                    </div>
                    <div class="form-group">
                        <label for="username">
                            Username *
                        </label>
                        <input type="text" name="username" required v-model="Luser.username" maxlength="15" minlength="3" :class="{error : error}">
                    </div>
                    <div class="form-group">
                        <label for="password">
                            Password *
                        </label>
                        <input type="password" name="password" required v-model="Luser.password" minlength="4" :class="{error : error}">
                    </div>
                    <div class="forget">
                        <a @click="forget = !forget">
                            Forgot Password?
                        </a>
                    </div>
                    
                    <div class="submit">
                        <button type="submit" :class="{ spinner: loading }">
                            <span>Sign In</span>
                        </button>
                    </div>

                    <div class="register">
                        <span>
                            Vous n'avez pas de compte ?
                            <a href="/auth/no">Inscrivez Vous</a>
                        </span>
                    </div>

                </form>

                <form @submit.prevent="handleRecover" v-if="forget && !found">
                    <div class="form-group" v-show="errorR">
                        <p style="color: #f75454">Email Not Found</p>
                    </div>
                    <div class="form-group">
                        <label for="email">
                            Email *
                        </label>
                        <input type="email" name="email" required v-model="email" :class="{error : errorR}">
                    </div>
                    
                    <div class="submit">
                        <button type="submit" :class="{ spinner: loadingR }">
                            <span>Recover Password</span>
                        </button>
                    </div>
                    

                    <div class="register">
                        <span>
                            Remember your password?
                            <a @click="forget = !forget ">Login</a>
                        </span>
                    </div>
                </form>

                <form @submit.prevent="changePassword" v-if="forget && found">
                    <div class="form-group" v-show="errorR">
                        <p style="color: #f75454">{{ message }}</p>
                    </div>
                    <div class="form-group">
                        <label for="password">
                            Code Password *
                        </label>
                        <input type="password" name="Codepassword" required v-model="codePassword" :class="{error : errorR}">
                    </div>
                    <div class="form-group">
                        <label for="newPassword">
                            New Password *
                        </label>
                        <input type="password" name="newPassword" v-model="password" required :class="{error : errorR}" minlength="4">
                    </div>
                    
                    <div class="submit">
                        <button type="submit" :class="{ spinner: loadingP }">
                            <span>Reset Password</span>
                        </button>
                    </div>

                    <div class="register">
                        <span>
                            Remember your password?
                            <a @click="forget = !forget">Login</a>
                        </span>
                    </div>
                </form>
            </aside>
            </transition>

            <transition name="board">
            <aside class="min" v-show="shopcart == 1">
                <header>
                    <h2>
                        <i class="fal fa-shopping-bag font-size"></i>
                        Your shopping Bag ({{ products.length }})
                        <a @click="shopcart = !shopcart">
                            <i class="fas fa-times"></i>
                        </a>
                    </h2>
                </header>
                <div class="shopping_cart">
                    <div class="cart-item" v-for="(product, i) in products" :key="i">
                        <div class="media">
                            <a :href="'/categorie/'+product.book.category.id+'/book/'+product.book.id">
                                <img width="75" height="100" :src="product.book.image">
                            </a>
                            <div class="media-body">
                                <h2>
                                    <a :href="'/categorie/'+product.book.category.id+'/book/'+product.book.id">
                                        {{ product.book.title }}
                                    </a>
                                </h2>
                                <div class="price">
                                    <span>{{ product.quantity }} x ${{ product.book.price }}</span>
                                </div>
                            </div>
                            <div class="cross">
                                <a @click="deleteBook(product.id)">
                                    <i class="fas fa-times"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="subtotal">
                        <h4>Subtotal:</h4>
                        <div>
                            <span>${{ totalPrice() }}</span>
                        </div>
                    </div>
                    <div class="buttons">
                        <a href="/cart">View Cart</a>
                        <a href="/checkout/0" class="btn-dark">Checkout</a>
                    </div>
                </div>
            </aside>
            </transition>
            <transition name="sombre">
                <div class="sombre" v-show="shopcart==1 && account== 0" @click="shopcart = !shopcart"></div>
            </transition>
            <transition name="sombre2$">
                <div class="sombre2" v-show="shopcart==0 && account==1" @click="account = !account"></div>
            </transition>
        </header>
    </div>
</template>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}



.border{
    @media only screen and (max-width: 1356px){
        width: 100%;
        padding: 20px 0 0;
    }
    display: flex;
    flex-direction: column;
    padding: 25px 0;
    .d-flex{
        @media only screen and (max-width: 1356px){
            flex-direction: column;
            
        }
        display: flex;
        justify-content: space-evenly;
        & a{
            @media only screen and (max-width: 1356px){
            width: 60%;
        }
            display: block;
            margin: 0 auto;
            text-decoration: none;
            text-transform: uppercase;
            color: #000;
            font-size: 2em;
            font-weight: 600;

            & span{
                color: rgb(223, 35, 35);
                margin: 0 -7px;
            }
        }
    }
}

.input-group{
    display: flex;
    @media only screen and (max-width: 1356px){
        width: 100%;
        margin-bottom: 8px;
    }
    
    .input-group-cat{
        @media only screen and (max-width: 1356px){
            display: none;
        }
        select{
            border: 1px solid #eae8e4;
            width: 300px;
            padding: 15px 50px 15px 25px;
            font-size: .875rem;
            line-height: 1.5;
            overflow: scroll;
            color: #000;

            option{
                font-size: 1.2rem;
            }
        }
    }

    input{
        @media only screen and (max-width: 1356px){
            display: block;
            width: 80%;
            margin-left: 5px;
        }
        border: 1px solid #dfdcd7;
        width: 550px;
        padding: 15px;
        font-size: .875rem;
        line-height: 1.5;
    }

    .input-group-append{
        @media only screen and (max-width: 1356px){
            width: 10%;
            margin-right: 5px;
        }
        
        button{
            margin-left: -1px;
            padding: 12px 20px;
            border: none;
            background-color: #f75454;
            border: 1px solid #f75454;
            color: #fff;
            line-height: 1.5; 
        }
    }
}

    .auth{
        display: flex;
        align-items: center;

        a{
            text-decoration: none;
            cursor: pointer;
            padding: 8px 16px;

            .align{
                display: flex;
                align-items: center;
                position: relative;
                line-height: 1.2;
                font-size: .875rem;
                color: #161619;

                i{
                    font-size: 1.5rem;
                    display: block;
                }

                .flaticon{
                    & span{
                        display: block;
                        margin: 0 5px;
                        color: #000;
                        font-size: .75rem;
                    }
                    div{
                        margin-left: 5px;
                        font-size: .875rem;
                        font-weight: 400;
                    }
                    .light{
                        color: #f75454;
                        font-size: .75rem;
                        font-weight: 600;
                    }
                }

                .sous{
                    display: block;
                    border: 1px solid #151516;
                    background-color: #fff;
                    position: absolute;
                    left:  -20px;
                    min-width: 7rem;
                    z-index: 100;

                    & a{
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        padding: 10px;
                        color: #151516;
                        font-weight: 400;
                        font-size: 0.7rem;
                        transition: all 0.25s ease-in-out;
                    }

                    & a:hover{
                        color: #f75454;
                        font-weight: 600;
                        padding-left: 28px;
                    }

                    i{
                        display: block;
                        margin-right: 4px;
                        font-size: .625rem;
                    }
                }
            }
        }

        .right{
            margin-left: 24px;
            cursor: pointer;
            .icon{
                position: absolute;
                left: 0;
                top: 0;
                height: 1.25rem;
                width: 1.25rem;
                font-size: .7rem;
                color: #fff;
                margin: -7px 0 0 -12px;
                border-radius: 50%;
                background-color: #161619;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .sombre{
        @media only screen and (max-width: 1356px){
            min-width: 0%;
            max-width: 0%;
        }
        position: fixed;
        z-index: 1002;
        top: 0;
        left: 0;
        background: rgba($color: #161619, $alpha: 0.7);
        height: 100%;
        width: 62%;
    }

    .sombre2{
        @media only screen and (max-width: 1356px){
            min-width: 0%;
            max-width: 0%;
        }
        position: fixed;
        z-index: 1002;
        top: 0;
        left: 0;
        background: rgba($color: #161619, $alpha: 0.8);
        height: 100%;
        width: 69.5%;
    }

    .min{
        @media only screen and (max-width: 1356px){
            min-width: 100%;
            max-width: 100%;
        }
        min-width: 38%;
        max-width: 38%;
    }

    aside{
        @media only screen and (max-width: 1356px){
            min-width: 100%;
            max-width: 100%;
        }
        min-width: 31%;
        max-width: 31%;
        overflow-y: scroll;
        right: 0px;
        opacity: 1;
        position: fixed;
        top: 0;
        z-index: 1002;
        height: 100%;
        background-color: #fff;
        box-shadow: -13px 0 20px #eae8e4;
        display: block;

        header{
            padding: 24px 40px;
            border-bottom: 1px solid #eae8e4;

            h2{
                font-size: 1.125rem;
                display: flex;
                align-items: center;
                justify-content: space-between;

                i{
                    margin-right: 16px;
                    font-size: 1.5rem;
                }
                a{
                    display: block;
                    cursor: pointer;
                }
            }
        }


        form{
            padding: 40px;

            .form-group{
                margin-bottom: 24px;

                label{
                    margin-bottom: 8px;
                    display: inline-block;
                    font-weight: 600;
                }

                input{
                    border: 1px solid #dfdcd7;
                    padding: 12px 24px;
                    line-height: 1.5;
                    color: #7c6e65;
                    font-size: .875rem;
                    width: 100%;
                    display: block;
                }

                .error{
                    border-color: #f75454;
                }
            }

            .forget{
                float: right;
                a{
                    cursor: pointer;
                    display: block;
                    text-decoration: none;
                    font-size: .875rem;
                    color: #161619;
                    font-weight: 600;
                    margin-bottom: 32px;
                }

                a:hover{
                    color: #f75454;
                    cursor: pointer;
                }
            }

            .submit{
                margin-bottom: 28px;
                button{
                    border: 1px solid #000;
                    background-color: #161619;
                    color: #fff;
                    padding: 16px 20px;
                    line-height: 1.5;
                    display: block;
                    text-decoration: none;
                    width: 100%;
                    font-size: 1rem;
                    text-align: center;
                    margin-bottom: 32px;
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

            .register{
                span{
                    display: block;
                    font-size: .875rem;
                    text-align: center;
                    color: #7f7f83;

                    a{
                        cursor: pointer;
                        display: inline-block;
                        text-decoration: none;
                        color: #f75454;
                    }
                }
            }
        }

        .shopping_cart{
            .cart-item{
                border-bottom: 1px solid #eae8e4;
                padding: 15px 40px;

                .media{
                    display: flex;
                    align-items: center;
                    a{
                        display: block;
                    }

                    .media-body{
                        margin-left: 30px;
                        overflow: hidden;
                        
                        .text-primary{
                            margin-bottom: 4px;

                            a{
                                text-decoration: none;
                                color: #f75454;
                                text-transform: uppercase;
                            }
                        }
                        h2{
                            margin-bottom: 4px;
                            font-size: 14px;
                            a{
                                text-decoration: none;
                                color: #000;
                            }
                        }

                        .author{
                            margin-bottom: 4px;
                            a{
                                text-decoration: none;
                                color: #7c6e65;
                                font-size: 12px;
                            }
                            a:hover{
                                color: #f75454;
                            }
                        }

                        .price{
                            font-weight: 600;
                            font-size: 18px;
                        }
                    }

                    .cross{
                        margin-top: 16px;
                        margin-left: 16px;
                        cursor: pointer;

                        a{
                            color: #000;
                            text-decoration: none;
                        }
                    }
                }
            }
            .subtotal{
                display: flex;
                padding: 15px 40px;
                font-size: 1.125rem;
                align-items: center;
                justify-content: space-between;
                font-weight: 600;

                h4{
                    font-weight: 600;
                    line-height: 1.2;
                    font-size: 1.125rem;
                }
            }

            .buttons{
                padding: 32px 40px;
                
                a{
                    border: 1px solid #000;
                    color: #000;
                    padding: 24px 20px;
                    margin-bottom: 24px;
                    display: block;
                    text-decoration: none;
                    width: 100%;
                    font-size: 1rem;
                    text-align: center;
                }

                a:hover, .btn-dark{
                    color: #fff;
                    background-color: #000;
                }
            }
        }
    }

    .board-enter-active, .board-leave-active{
        transition: transform .5s ease, opacity .5s ease;
    }

    .board-enter, .board-leave-to{
        transform: translateX(400px);
        opacity: 0;
    }

    .board-enter-to, .board-leave{
        transform: translateX(0px);
        opacity: 1;
    }

    .sombre-enter-active, .sombre-leave-active{
        transition: transform .5s ease, opacity .5s ease;
    }

    .sombre-enter-active{
        transition-delay: 0.1s;
    }

    .sombre-enter, .sombre-leave-to{
        transform: translateX(0px);
        opacity: 0;
    }

    .sombre-enter-to, .sombre-leave{
        transform: translateX(0px);
        opacity: 1;
    }

    .userHover-enter-active, .userHover-leave-active{
        transition: transform .3s ease, opacity .5s ease;
    }

    .userHover-enter{
        transform: translateY(-50px);
        opacity: 0;
    }

    .userHover-enter-to, .board-leave{
        transform: translateY(0px);
        opacity: 1;
    }

    .userHover-leave-to{
        transform: translateY(50px);
        opacity: 0;
    }

</style>

<script>
import BookService from "../services/ShopService"
import AuthService from "../services/AuthService"

export default {
    data(){
        return {
            categories: [],
            recherche: "",
            shopcart: 0,
            products: [],
            account: 0,
            Luser: {
                username: "",
                password: "",
            },
            error: false,
            loading: false,
            errorR: false,
            loadingR: false,
            errorP: false,
            loadingP: false,
            totalQ: 0,
            forget: false,
            found: false,
            email: "",
            userHover: 0,
            password: '',
            message: 'Wrong Password Code',
            codePassword: '',
            admin: false
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
        name(){
            return this.$store.state.auth.user.username
        },
    },
    
    methods:{
        getCat(){
            BookService.getAllCat()
            .then(response => {
                this.categories = response.data
            }).catch(e => {
                console.log(e)
            })
        },

        logout(){
            this.$store.state.shop.cart = null
            this.products = []
            this.$store.dispatch('logout')
            .then(() => {
                alert('Log Out !')
                this.$router.go()
            })
        },

        setup(){
            var user = this.$store.state.auth.user
            this.$store.dispatch('get', user)
            .then((result) => {
                this.products = result.data
                this.totalQt()
            }).catch((err) => {
                console.log(err)
            })
        },

        totalQt(){
            this.products.forEach(element => {
              this.totalQ += element.quantity
            })
        },

        totalPrice(){
            var somme = 0

            this.products.forEach(element => {
              somme += element.book.price * element.quantity
            })

            return somme
        },
        handleLogin(){
            this.loading = true
            this.$store.dispatch('login', this.Luser)
            .then(response => {
                if(this.loggedIn && this.$store.state.auth.user != null){
                    this.error = false
                    this.loading = false
                    this.$router.go()
                }
                else{
                    this.loading = false
                    this.error = true
                }
            })
        },

        handleRecover(){
            this.loadingR = true
            var password = Math.random().toString(36).slice(-8);
            localStorage.setItem('password', password)
            
            let params = {
                email: this.email,
                code: password
            }
            AuthService.verifyEmail(params)
            .then(() => {
                this.loadingR = false
                this.errorR = false
                this.found = true
                

            }).catch(e => {
                this.loadingR = false
                this.errorR = true
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
                    localStorage.removeItem('password')
                    this.loadingP = false
                    this.$router.go()
                }).catch(e => {
                    this.loadingP = false
                    console.log(e.response.data)
                })
            }
            else{
                this.loadingP = false
                this.errorR = true
            }

        },

        update(){
            var total = 0
            this.$store.state.shop.items.forEach(book => {
                total += book.quantity * book.price
            })
            this.$store.state.shop.price = total
            this.products.price = total
        },

        deleteBook(id){
            this.$store.dispatch('remove', id)
            .then(() => {
                this.$router.go()
            }).catch((err) => {
                console.log(err)
            })
        },

    },

    mounted(){
        this.getCat()
        if(this.loggedIn){
            this.setup()
            if(this.$store.state.auth.user.roles[0] == "ADMIN")
                this.admin = true
        }
    }
}
</script>