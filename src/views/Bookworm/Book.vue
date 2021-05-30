<template>
    <div class="Book">
        <Header></Header>
        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="/shop">Shop</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link :to="'/categorie/'+book.category.id">
                    {{ book.category.name }}
                </router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="">{{ book.title }}</router-link>
            </nav>

            <div class="page">
                <div class="primary">
                    <div class="alert" v-if="exist()">
                        <a href="/cart">View Cart</a>
                        “{{ book.title }}” has been added to your cart.
                    </div>
                    <div class="alert" v-if="!loggedIn">
                        <a href="/auth/no">Log In</a>
                        to place an order
                    </div>
                    <div class="single-product">
                        <div class="gallery">
                            <img :src="book.image"> 
                        </div>
                        <div class="summary">
                            <div class="summary__inner">
                                <h1>{{ book.title }}</h1>
                                <div class="author">
                                    <span>By (author)</span>
                                    <span>
                                        <router-link :to="'/author/'+book.author.id">
                                            {{ book.author.name }}
                                            
                                        </router-link>
                                    </span>
                                </div>
                                <p class="price">
                                    $ {{ book.price }}
                                </p>
                                <p class="short">
                                    {{ limitText(book.description)}} ...
                                </p>
                                <form @submit.prevent="buy" v-if="loggedIn && !exist()">
                                    <div class="quantity">
                                        <input type="number" name="quantity" v-model="quantity" min="1" max="5">
                                    </div>
                                    <button type="submit">
                                        Add to cart
                                    </button>
                                </form>
                                <form @submit.prevent="update" v-if="loggedIn && exist()">
                                    <div class="quantity">
                                        <input type="number" name="quantity" v-model="quantity" min="1" max="5">
                                    </div>
                                    <button type="submit">
                                        Update Quantity
                                    </button>
                                </form>
                            </div>
                            <div class="wish">
                                <div class="add" v-if="!Fwish">
                                    <a @click="addWish">
                                        <font-awesome-icon :icon="[ 'far', 'heart' ]" class="i" />
                                        <span>Add to wishlist</span>
                                    </a>
                                </div>

                                <div class="add" v-else>
                                    <a href="/user/wish" class="browse">
                                        <font-awesome-icon :icon="[ 'fas', 'heart' ]" class="i" />
                                        <span>Browse wishlist</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="description">
                        <ul>
                            <li>
                                <a  class="nav-link" :class="{ active: score==1 }" @click="score1">Description</a>
                            </li>
                            <li>
                                <a class="nav-link" :class="{ active: score==2 }" @click="score2">Product Details</a>
                            </li>
                        </ul>
                        <div class="tab-content" v-if="score==1">
                            <p>
                                {{book.description}}
                            </p>
                        </div>

                        <div class="tab-content" v-if="score===2">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>ISBN-13:</th>
                                            <td>
                                                <span>{{ book.isbn }}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Categories:</th>
                                            <td>
                                                <router-link :to="'/categorie/'+book.category.id">
                                                    {{ book.category.name }}
                                                </router-link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Book Author </th>
                                            <td>
                                                <router-link :to="'/author/'+book.author.id">
                                                   {{ book.author.name }}
                                                </router-link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Release Date:</th>
                                            <td>
                                                <span>{{ book.date }}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Book Format:</th>
                                            <td>
                                                <span>Paper Back</span>
                                            </td>
                                        </tr>
    
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
                <div class="secondary">
                    <div class="products" v-if="books.length>0">
                        <ul class="list">
                            <li class="item" v-for="(book, i) in books" :key="i">
                                <div class="media">
                                    <a :href="'/categorie/'+book.category.id+'/book/'+book.id">
                                        <img :src="book.image">
                                    </a>
                                    <div>
                                        <h6>
                                            <a :href="'/categorie/'+book.category.id+'/book/'+book.id">
                                                {{ book.title }}
                                            </a>
                                        </h6>
                                        <span>${{ book.price }}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="features">
                        <ul>
                            <li>
                                <div class="list_features">
                                    <div class="icon">
                                        <font-awesome-icon icon="truck-moving"/>
                                    </div>
                                    <div class="body">
                                        <h4>Free Delivery</h4>
                                        <p>Orders over $100</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list_features">
                                    <div class="icon">
                                        <font-awesome-icon :icon="[ 'fab', 'amazon-pay' ]" />
                                    </div>
                                    <div class="body">
                                        <h4>Secure Payment</h4>
                                        <p>100% Secure Payment</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list_features">
                                    <div class="icon">
                                        <font-awesome-icon :icon="[ 'fas', 'money-check-alt' ]" />
                                    </div>
                                    <div class="body">
                                        <h4>Money Back Guarantee</h4>
                                        <p>Within 30 Days</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="list_features">
                                    <div class="icon">
                                        <font-awesome-icon :icon="[ 'fas', 'comments' ]" />
                                    </div>
                                    <div class="body">
                                        <h4>24/7 Support</h4>
                                        <p>Within 1 Business Day</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
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

    .page{
        margin: 0 45px;
        padding: 0 15px;
        border-bottom: 1px solid #eae8e4;
        display: flex;
        @media only screen and (max-width: 768px){
            flex-direction: column;
            margin: 0;
        }

        .primary{
            @media only screen and (max-width: 768px){
                width: 100%;
                margin: 0;
            }
            width: 75%;
            margin: 0 15px;

            .alert{
                margin: 16px 0;
                padding: 12px 20px;
                border: 1px solid #def2b8;
                color: #476c00;
                background-color: #95F760;

                a{
                    color: #f75454;
                    text-decoration: none;
                    background-color: transparent;
                }
            }

            .single-product{
                @media only screen and (max-width: 768px){
                    flex-direction: column;
                }
                display: flex;
                padding-bottom: 45px;
            }

            .gallery{
                padding: 56px 15px 0;

                img{
                    @media only screen and (max-width: 768px){
                        width: 100%;
                        height: auto;
                        margin: 0;
                    }
                    width: 300px;
                    height: 444px;
                    margin: 0 58px;
                }
            }

            .summary{
                padding: 64px 15px 0 0;

                .summary__inner{
                    @media only screen and (max-width: 768px){
                        padding: 0 15px;
                    }
                    padding: 0 40px;

                    & h1{
                        font-size: 1.875rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                    }

                    .author{
                        display: flex;
                        margin-bottom: 1.5rem;
                        font-size: .875rem;
                        align-items: center;
                        
                        & > span{
                            font-weight: 600;
                        }
                        & span a{
                            text-decoration: none;
                            color: #7f7f83;
                            margin-left: .5rem;
                        }
                        & span a:hover{
                            color: #f75454;
                        }
                    }

                    .price{
                        font-size: 1.375rem;
                        margin-bottom: 1rem;
                        font-weight: 600;
                    }

                    .short{
                        margin-bottom: 2rem;
                        font-size: .875rem;
                    }

                    form{
                        display: flex;
                        align-items: center;

                        .quantity{
                            border: 2px solid #eae8e4;

                            input{
                                text-align: center;
                                padding: 16px 16px;
                                border: 0;
                                display: block;
                                width: 100%;
                                font-size: .875rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #7c6e65;
                                background-color: #fff;
                            }
                        }

                        & button{
                            width: 70%;
                            margin-left: 24px;
                            padding: 16px;
                            border: 0;
                            background-color: #161619;
                            color: #fff;
                        }
                    }
                }

                .wish{
                    padding: 32px 48px;

                    .add{
                        margin-right: 24px;

                        a{
                            color: #161619;
                            text-decoration: none;
                            cursor: pointer;
                            font-size: 1rem;

                            .i{
                                margin-right: 8px;
                            }

                        }

                        a:hover{
                            color: #f75454
                        }

                        .browse{
                            color: #f75454
                        }
                    }
                }
            }
            
        }

        .description{
            @media only screen and (max-width: 768px){
                flex-direction: column;
                padding: 0;
            }
            padding: 0 15px;
            margin-bottom: 72px;
            max-width: 100%;
            border-top: 1px solid #eae8e4;
            display: flex;

            & ul{
                @media only screen and (max-width: 768px){
                    display: flex;
                    max-width: 50%;
                }
                display: block;
                list-style: none;
                max-width: 25%;
                padding: 64px 15px 0 0;

                & li{
                    margin-bottom: 16px;

                    & a{
                        display: inline-block;
                        cursor: pointer;
                        color: #7c6e65;
                        padding: 4px 0;
                        margin: 0 25px;
                    }
                }
                & .active{
                    border-bottom: 1px solid;
                    color: #161619;
                    font-weight: 600;
                }
            }
            .tab-content{
                @media only screen and (max-width: 768px){
                    flex-direction: column;
                    max-width: 100%;
                    padding: 15px;
                    border: 0;
                    border-top: 1px solid #eae8e4;
                }
                display: block;
                border-left: 1px solid #eae8e4;
                max-width: 75%;
                padding: 64px 15px 0 64px;
                font-size: .875rem;

                table{
                    border-collapse: collapse;
                    display: block;
                    color: #161619;
                    width: 100%;

                    & th{
                        @media only screen and (max-width: 768px){
                            width: 100%;
                            padding: 12px;
                        }
                        width: 500px;
                        vertical-align: top;
                        padding: 12px 32px;
                        font-weight: 600;
                    }

                    & td{
                        width: 500px;
                        padding: 12px;
                        font-size: 16px;

                        & a{
                            color: #f75454;
                            text-transform: uppercase;
                            text-decoration: none;
                        }
                    }
                }
            }
        }

        .secondary{
            @media only screen and (max-width: 768px){
                width: 100%;
                margin: 0;
            }
            width: 25%;
            margin: 64px 15px 0;

            .products{
                margin-bottom: 32px;
                border: 1px solid #eae8e4;
                padding: 30px 30px 0;

                & > ul{
                    list-style: none;
                    font-size: 14px;
                }

                .item{
                    margin-bottom: 32px;

                    & .media{
                        display: flex;
                        align-items: flex-start;
                        
                        & a{
                            display: block;
                            text-decoration: none;
                            color: #161619;

                            & img{
                                max-width: 60px;
                                height: auto;
                            }
                        }

                        & > div{
                            margin-left: 16px;
                            padding-left: 4px;

                            h6{
                                height: 3rem;
                                overflow: hidden;
                                & a{
                                    text-decoration: none;
                                    color: #161619;
                                }
                            }

                            span{
                                font-weight: 600;   
                            }

                        }
                    }
                }
            }

            .features{
                margin-bottom: 32px;
                border: 1px solid #eae8e4;
                
                & > ul{
                    list-style: none;
                    font-size: 14px;
                }

                & ul > li {
                    padding: 30px;
                }
                
                .list_features{
                    display: flex;
                }

                .icon{
                    color: #f75454;
                    font-size: 2.5rem;
                    margin-right: 24px;
                }

                .body{
                    color: #161619;

                    & h4{
                        margin-bottom: 4px;
                        font-size: 1rem;
                        font-weight: 600;
                        line-height: 1.2;
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
import ShopService from "../../services/ShopService"

export default {
  name: "Book",
  
  components: {
    Header,
    Footer
  },

   data(){
        return {
            score: 1,
            books: [],
            book: {},
            quantity: 1,
            products: [],
            wish_list: [],
            Fwish: false
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
        getOne(id){
            ShopService.getBook(id)
            .then(response => {
                this.book = response.data
                this.getAll()
            }).catch(e => {
                this.$router.push({ name: "404" })
            })
        },

        getAll(){
            ShopService.getAuteur(this.book.author.id)
            .then(response => {
                var test = []
                this.books = response.data

                if(this.books.length<=2){
                    ShopService.getCat(this.$route.params.cat)
                    .then((result) => {
                        this.books = result.data
                        
                        this.books.forEach(book => {
                        if(book.id != this.$route.params.id)
                            test.push(book)
                        })
                        this.books = test.slice(0,3)

                    })
                }
                else{
                    this.books.forEach(book => {
                    if(book.id != this.$route.params.id)
                        test.push(book)
                    })
                }

                this.books = test.slice(0,3)

                
            }).catch(e => {
                console.log(e)
            })
        },

        buy(){
            var user = this.$store.state.auth.user
            var number = parseInt(this.quantity)
            var data = {
                user: user,
                book: this.book,
                quantity: number
            }
            this.$store.dispatch('add', data)
            .then(() => {
                this.$router.go()
            }).catch(e => {
                console.log(e)
            })
        },

        update(){
            var user = this.$store.state.auth.user.id
            var number = parseInt(this.quantity)
            const params = {
                idb: this.book.id,
                quantity: number
            }

            var data = {
                id: user,
                params: params
            }

            this.$store.dispatch('update', data)
            .then(() => {
                this.$router.go()
            }).catch(e => {
                console.log(e)
            })
            
        },

        score1(){
            this.score=1
        },

        score2(){
            this.score=2
        },

        setup(){
            var user = this.$store.state.auth.user
            this.$store.dispatch('get', user)
            .then((result) => {
                this.products = result.data
            }).catch(e=>{
                console.log(e.response.data)
            })

            ShopService.getW(user.id)
            .then((result) => {
                this.wish_list = result.data
                this.find()
            }).catch((err) => {
                console.log(err.response.data)
            })
        },

        exist(){
            var find = this.products.find(element => element.book.id==this.$route.params.id)
            if(find == undefined)
                return false
            else
                return true
        },

        limitText(text){
            var str = text.substring(0, 260)
            return str
        },

        find(){
            var find = this.wish_list.find(element => element.book.id==this.$route.params.id)
            if(find == undefined)
                this.Fwish = false
            else
                this.Fwish = true
        },

        addWish(){
            var user = this.$store.state.auth.user
            let data = {
                id: user.id,
                book: this.book
            }
            ShopService.addW(data)
            .then(() => {
                this.$router.go()
            }).catch(e => {
                console.log(e.response.data)
            })
        }

  },

  beforeMount(){
      this.getOne(this.$route.params.id)
      this.setup()
  }

}
</script>
