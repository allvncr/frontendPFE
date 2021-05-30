<template>
    <div class="Wish">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">Wish List</router-link>
        </nav>


        <div class="page">
            <div class="body">
                <h2 class="title">
                    My wishlist
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="product-name">
                                Book name
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, i) in wish_list" :key="i">
                            <td>
                                <a :href="'/categorie/'+product.book.category.id+'/book/'+product.book.id">
                                    <img width="75" height="100" :src="product.book.image">
                                </a>
                            </td>
                            <td>
                                <a :href="'/categorie/'+product.book.category.id+'/book/'+product.book.id">
                                    {{ product.book.title }}
                                </a>
                            </td>
                            <td class="cross">
                                <a @click="deleteWish(product.id)">
                                    <font-awesome-icon :icon="[ 'fas', 'times' ]"/>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        background-image: url(../../assets/carousel.jpg);
        border-bottom: 1px solid #161619;

        .body{
            @media only screen and (max-width: 768px){
                width: 100%;
                margin-left: 0;
            }
            width: 90%;
            margin: 0 auto;
            padding: 0 15px;

            .title{
                text-align: left;
                font-size: 2rem;
                margin-bottom: 8px;
                font-weight: 600;
                line-height: 1.2;
            }

            table{
                background: #fff;
                border-collapse: collapse;
                margin-bottom: 16px;
                color: #161619;
                width: 100%;

                thead{
                    border: 1px solid #161619;

                    th{
                        @media only screen and (max-width: 768px){
                            padding: 16px 20px;
                            font-size: .875rem;
                        }
                        vertical-align: bottom;
                        border-bottom: 2px solid #161619;
                        padding: 1.6rem 2rem;
                        text-align: inherit;
                    }

                    .product-name{
                        width: 60%;
                    }
                }

                tbody{
                    border: 1px solid #161619;
                    td{
                        border-bottom: 2px solid #161619;
                        padding: 1.6rem 2rem;
                        vertical-align: middle;


                        a{
                            text-decoration: none;
                            color: #161619;
                            max-width: 100%;
                        }

                        a:hover{
                            color: #f75454;
                        }
                    }
                    .cross{
                        width: 15%;
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
    }



</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ShopService from '../../services/ShopService';

export default {
  name: "Wish",
  
    components: {
        Header,
        Footer
    },

    data(){
        return {
            wish_list: [],
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
            ShopService.getW(user.id)
            .then((result) => {
                console.log(result.data)
                this.wish_list = result.data
            }).catch((err) => {
                console.log(err.response.data)
            })
        },

        deleteWish(id){
            ShopService.deleteW(id)
            .then(() => {
                this.$router.go()
            }).catch(e => {
                console.log(e.response.data)
            })
        }
    },
    
    mounted(){
        if(this.loggedIn){
            this.setup()
        }
        else
            this.$router.push({name: "Home" })
    }
}
</script>
