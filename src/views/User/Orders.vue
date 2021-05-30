<template>
    <div class="Cart">
        <Header></Header>
        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="">Order</router-link>
            </nav>

            <div class="body">
                <div class="title">
                    <h2 v-if="totalQ == 1 || totalQ == 0">Your orders : {{ totalQ }} order</h2>
                    <h2 v-else>Your orders : {{ totalQ }} orders</h2>
                </div>
                <div class="page">
                    <div class="left">
                        <table>
                            <thead>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Total</td>
                                <td>Date</td>
                                <td>Status</td>
                            </thead>
                            <tbody v-for="(order, i) in products" :key="i">
                                <tr v-for="(product, j) in order.shoppingCart" :key="j">    
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
                                        <input type="text" v-model="product.quantity" readonly>
                                    </td>
                                    <td>${{ product.quantity * product.book.price  }}</td>
                                    <td>{{ time(order.localDate) }}</td>
                                    <td v-if="!order.status" style="color:#f75454">In progress</td>
                                    <td v-else style="color:#6dbd28">Delivered</td>
                                </tr>
                                
                            </tbody>
                        </table>
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
            display: flex;

            .left{
                @media only screen and (max-width: 768px){
                    margin: 0;
                    width: 100%;
                }
                height: 100%;
                margin: 0 auto 32px;
                width: 90%;
                background: #fff;
                border: 1px solid #eae8e4;
                border-bottom: none;

                table{
                    border-collapse: collapse;
                    width: 100%;

                    thead, tr{
                        border-bottom: 2px solid #eae8e4;
                        td{
                           @media only screen and (max-width: 768px){
                                padding: 5px 5px;
                                font-size: .875rem;
                            }
                            padding: 20px;
                            font-size: 1rem;
                            font-weight: 600;
                        }
                    }

                    tbody{
                        border-bottom: 3px solid #000;
                    }

                    tr{
                        .product{
                            width: 25%;
                            
                            .media{
                                display: flex;
                                align-items: center;

                                a{
                                    display: block;
                                }

                                .media-body{
                                    @media only screen and (max-width: 768px){
                                        display: none;
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
import CartService from '../../services/CartService';

export default {
  name: "Order",
  
    components: {
        Header,
        Footer
    },

    data(){
        return {
            products: [],
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

        
    },

    methods: {
        setup(){
            var user = this.$store.state.auth.user

            let params = {
                email: user.email
            }

            CartService.getOrder(params)
            .then((result) => {
                this.products = result.data.reverse()
                this.totalQ = this.products.length
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

        time(date=''){
            var time = date.split('T')

            var dateTime = time[0]

            return dateTime
        },

    },

    mounted(){
        if(this.loggedIn){
            this.setup()
        }
        // else
        //     this.$router.push({name: "Home" })
    }

}
</script>
