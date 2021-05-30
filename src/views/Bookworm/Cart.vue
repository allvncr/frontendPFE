<template>
    <div class="Cart">
        <Header></Header>
        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="">Cart</router-link>
            </nav>

            <div class="body" v-if="totalQ == 0">
                <div class="empty">
                    <div class="cart">
                        <font-awesome-icon :icon="[ 'fas', 'shopping-bag' ]" class="i" />
                    </div>
                    <p>Your cart is currently empty.</p>
                    <a href="/shop" class="button">Return to shop</a>
                </div>
            </div>

            <div class="body" v-else>
                <div class="title">
                    <h2 v-if="totalQ == 1 || totalQ == 0">Your cart : {{ totalQ }} item</h2>
                    <h2 v-else>Your cart : {{ totalQ }} items</h2>
                </div>
                <div class="page">
                    <div class="left">
                        <table>
                            <thead>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Total</td>
                                <td></td>
                            </thead>
                            <tbody>
                                <tr v-for="(product, i) in products" :key="i">    
                                    <td class="product">
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
                                                <div class="author">
                                                    <a :href="'/author/'+product.book.author.id">{{ product.book.author.name }}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${{ product.book.price }}</td>
                                    <td class="quantity">
                                        <input type="number" v-model="product.quantity" @change="update(product.quantity, product.book.id)" min="1" max="5">
                                    </td>
                                    <td>${{ produit( product.quantity, product.book.price ) }}</td>
                                    <td class="cross">
                                        <a @click="deleteBook(product.id)">
                                            <font-awesome-icon :icon="[ 'fas', 'times' ]"/>
                                        </a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>

                    <div class="right">
                        <div class="top">
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
                                        <input type="radio" checked name="shipping" @click="ship(0)">
                                        Free Shipping
                                    </li>
                                    <div v-else>
                                        <li v-if="totalPrice() >=100">
                                            <input type="radio" name="shipping" @click="ship(8.00)">
                                            Rapid Post : $8
                                        </li>
                                        <li v-if="totalPrice() < 100">
                                            <input type="radio" checked name="shipping" @click="ship(8.00)">
                                            Rapid Post : $8
                                        </li>
                                    </div>
                                </ul>
                            </div>
                            <div class="cart">
                                <div class="total">
                                    <h3>Total</h3>
                                    <p>${{ somme( shipping, totalPrice() ) }}</p>
                                </div>
                            </div>
                        </div>
                        <a class="button" :href="'/checkout/'+shipping">Proceed to checkout</a>
                    </div>
                </div>
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
        
        .empty{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 40px 0 48px;

            .cart{
                margin-top: 4px;
                font-size: 12.5rem;
            }
            
            p{
                font-weight: 600;
                font-size: 1.25rem;
                margin-bottom: 40px;
            }

            .button{
                border: 1px solid #000;
                background-color: #161619;
                color: #fff;
                padding: 12px 48px;
                line-height: 1.5;
                display: block;
                font-size: 1rem;
                text-align: center;
                margin: 0 auto 32px;
                text-decoration: none;
                width: 15.75rem;
                height: 3.75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }
            
        }

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
                width: 75%;
                background: #fff;
                border: 1px solid #eae8e4;
                border-bottom: none;
                margin-bottom: 32px;

                table{
                    border-collapse: collapse;
                    width: 100%;

                    thead, tr{
                        border-bottom: 2px solid #eae8e4;
                        td{
                            @media only screen and (max-width: 768px){
                                padding: 0;
                                font-size: .875rem;
                            }
                            padding: 20px 20px;
                            font-size: 1rem;
                            font-weight: 600;
                        }
                    }

                    tr{
                        .product{
                            width: 50%;
                            
                            .media{
                                display: flex;
                                align-items: center;

                                a{
                                    display: block;

                                    img{
                                        max-width: 100%;
                                    }
                                }

                                .media-body{
                                    @media only screen and (max-width: 768px){
                                        margin-left: 4px;
                                    }
                                    margin-left: 30px;
                                    overflow: hidden;
                                    
                                    h2{
                                        margin-bottom: 4px;
                                        font-size: 14px;
                                        a{
                                            text-decoration: none;
                                            color: #000;
                                        }
                                    }

                                    .author{
                                        @media only screen and (max-width: 768px){
                                            display: none;
                                        }
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
                                }
                            }
                        }

                        .quantity{
                            width: 15%;
                            input{
                                border: 2px solid #eae8e4;
                                padding: 12px;
                                text-align: center;
                                display: block;
                                width: 90%;
                                font-size: .875rem;
                                font-weight: 400;
                            }
                        }

                        .cross{
                            a{
                                cursor: pointer;
                                font-size: 1.5rem;
                                color: #000;
                                text-decoration: none;
                            }
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
                width: 25%;
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


</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "Cart",

    components: {
        Header,
        Footer
    },

    data(){
        return {
            products: [],
            shipping: 0,
            total: 1,
            ships: 1,
            totalQ:0
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
        
    },

    methods: {
        setup(){
            var user = this.$store.state.auth.user
            this.$store.dispatch('get', user)
            .then((result) => {
                this.products = result.data
                this.totalQt()
                if(this.totalPrice() < 100){
                    this.shipping = 8
                    console.log(this.shipping)
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        totalPrice(){
            var somme = 0

            this.products.forEach(element => {
              somme += element.book.price * element.quantity
            })

            return somme
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

        totalQt(){
            this.products.forEach(element => {
              this.totalQ += element.quantity
            })
        },

        update(quantity, id){
            var user = this.$store.state.auth.user.id
            var number = parseInt(quantity)
            const params = {
                idb: id,
                quantity: number
            }
            
            var data = {
                id: user,
                params: params
            }

            this.$store.dispatch('updateq', data)
            .then(() => {
                this.$router.go()
            }).catch(e => {
                console.log(e)
            })
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
        if(this.loggedIn){
            this.setup()
        }
    }

}
</script>
