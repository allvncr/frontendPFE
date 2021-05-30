<template>
    <div class="Admin">
        <Header></Header>
        <div class="body">
            <div class="breadcrumbs">
                <a href="/admin">Home</a> >
                <a :href="'/admin/'+ cat ">{{ cat }}</a> > 
                {{ title }}
            </div>
            <div class="content">
                <button class="sticky" @click="show = !show">
                    <font-awesome-icon :icon="[ 'fas', 'chevron-right' ]" v-if="!show" />
                    <font-awesome-icon :icon="[ 'fas', 'chevron-left' ]" v-else/>
                </button>
                <div class="content-nav" v-show="show">
                    <div class="app-module">
                        <table>
                            <thead>
                                <td>
                                    <a href="/admin/account">Account</a>
                                </td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td :class="{ current: title=='user'}">
                                        <a href="/admin/account/user">User</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td :class="{ current: title=='profile'}">
                                        <a href="/admin/account/profile">Profile</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="app-module">
                        <table>
                            <thead>
                                <td>
                                    <a href="/admin/cart">Cart</a>
                                </td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td :class="{ current: title=='order'}">
                                        <a href="/admin/cart/order">Order</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td :class="{ current: title=='coupon'}">
                                        <a href="/admin/cart/coupon">Coupon</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="app-module">
                        <table>
                            <thead>
                                <td>
                                    <a href="/admin/shop">Shop</a>
                                </td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td :class="{ current: title=='authors'}">
                                        <a href="/admin/shop/authors">Authors</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td :class="{ current: title=='categories'}">
                                        <a href="/admin/shop/categories">Categories</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td :class="{ current: title=='books'}">
                                        <a href="/admin/shop/books">Books</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="content-main">
                    <div>
                        <Author v-show="title=='authors'"></Author>
                        <Category v-show="title=='categories'"></Category>
                        <Book v-show="title=='books'"></Book>
                        <User v-show="title=='user'"></User>
                        <Coupon v-show="title=='coupon'"></Coupon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    *{
        font-family: "Roboto","Lucida Grande","DejaVu Sans","Bitstream Vera Sans",Verdana,Arial,sans-serif;
        margin: 0;
        padding: 0;
        font-size: 14px;
        color: #333;
    }

    a{
        text-decoration: none;
    }

    .breadcrumbs{
        background: #79aec8;
        padding: 10px 40px;
        text-align: left;
        color: #c4dce8;

        a{
            color: #fff;
        }

        a:hover{
            color: #c4dce8;
        }
    }

    .content{
        width: 100%;
        display: flex;

        .sticky{
            z-index: 20;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 23px;
            border-right: 1px solid #eaeaea;
            background-color: #fff;
            cursor: pointer;
            font-size: 20px;
            color: #447e9b;
            padding: 0;
            position: sticky;
            top: 0;
            max-height: 100vh;
            outline: none;
        }

        .sticky:hover{
                background-color: #f6f6f6;
        }
        

        .content-main{
            padding: 20px 40px;
            width: 80%;

            h1{
                display: flex;
                justify-content: space-between;
                margin: 0 0 20px;
                
                span{        
                    font-size: 20px;
                    color: #666;
                }

                a{
                    display: flex;
                    align-items: center;
                    padding: 3px 12px;
                    background: #999;
                    font-size: 11px;
                    text-transform: uppercase;
                    border-radius: 15px;
                    letter-spacing: 0.5px;
                    color: #fff;
                    background-image: url(../../assets/tooltag-add.svg);
                    background-repeat: no-repeat;
                    background-position: right 7px center;
                    padding-right: 26px;
                }

                a:hover{
                    background-color: #417690;
                }
            }
        }

        .content-nav{
            width: 20%;
            padding: 10px 0;

            .app-module{
                border: none;
                margin-bottom: 30px;
                background: #fff;

                table{
                    width: 100%;
                    border-collapse: collapse;
                    border-color: #ccc;

                    thead{
                        td{
                            width: 100%;
                            padding: 8px;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            text-align: left;
                            background: #79aec8;

                            a{
                                font-size: 12px;
                                color: #fff;
                            }

                            a:hover{
                                text-decoration: underline;
                            }
                        }
                    
                    }

                    tbody{
                        tr{
                            background: #f9f9f9;
                            
                            .current{
                                background: #ffc;
                            }
                            
                            td{
                                padding: 8px;
                                line-height: 16px;
                                border-bottom: 1px solid #eee;

                                a{
                                    color: #447e9b;
                                    font-size: 13px;
                                    font-weight: 600;
                                }

                                a:hover{
                                    color: #036;
                                }

                                .addlink{
                                    display: block;
                                    padding-left: 16px;
                                    padding-right: 8px;
                                    font-weight: 400;
                                    background: url(../../assets/icon-addlink.svg) 0 5px no-repeat;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    


</style>

<script>
import Header from "@/components/AdminHeader.vue"
import Author from "@/components/admin/Add/Author.vue"
import Category from "@/components/admin/Add/Category.vue"
import Book from "@/components/admin/Add/Book.vue"
import User from "@/components/admin/Add/User.vue"
import Coupon from "@/components/admin/Add/Coupon.vue"

export default {
  name: "Add",

  components: {
    Header,
    Author,
    Category,
    Book,
    User,
    Coupon
  },
  
   data(){
        return {
            cat: '',
            title: '',
            show: true
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
        
    },

    mounted(){
        if (this.loggedIn){
            if (this.$store.state.auth.user.roles[0] != "ADMIN"){
                this.$router.push({name: "Login administration" })
            }
        }
        else{
            this.$router.push({name: "Login administration" })
        }
        this.cat = this.$route.params.app

        this.title = this.$route.params.module
    }
}
</script>
