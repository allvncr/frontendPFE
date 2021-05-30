<template>
    <div class="Admin">
        <Header></Header>
        <div class="body">
            <div class="breadcrumbs">
                <a href="/admin">Home</a> > {{ title }}
            </div>
            <div class="content">
                <h1>Site administration</h1>
                <div class="content-main">
                    <div class="app-module" v-show="show==0">
                        <table>
                            <thead>
                                <td>
                                    <a href="/admin/account">Account</a>
                                </td>
                                <td></td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a href="/admin/account/user">User</a>
                                    </td>
                                    <td>
                                        <a href="/admin/account/user/add" class="addlink">Add</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/admin/account/profile">Profile</a>
                                    </td>
                                    <td>
                                        <a href="/admin/account/profile/add" class="addlink">Add</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="app-module" v-show="show==1">
                        <table>
                            <thead>
                                <td>
                                    <a href="/admin/cart">Cart</a>
                                </td>
                                <td></td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a href="/admin/cart/order">Order</a>
                                    </td>
                                    <td>
                                        <a href="/admin/cart/order/add" class="addlink">Add</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/admin/cart/coupon">Coupon</a>
                                    </td>
                                    <td>
                                        <a href="/admin/cart/coupon/add" class="addlink">Add</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="app-module" v-show="show==2">
                        <table>
                            <thead>
                                <td>
                                    <a href="/admin/shop">Shop</a>
                                </td>
                                <td></td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a href="/admin/shop/authors">Authors</a>
                                    </td>
                                    <td>
                                        <a href="/admin/shop/authors/add" class="addlink">Add</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/admin/shop/categories">Categories</a>
                                    </td>
                                    <td>
                                        <a href="/admin/shop/categories/add" class="addlink">Add</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="/admin/shop/books">Books</a>
                                    </td>
                                    <td>
                                        <a href="/admin/shop/books/add" class="addlink">Add</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        padding: 20px 40px;
        width: 50%;
        
        h1{
            margin: 0 0 20px;
            font-size: 20px;
            color: #666;
        }

        .content-main{
            float: left;
            width: 100%;

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

export default {
  name: "App",

  components: {
    Header,
  },
  
   data(){
        return {
            show: 0,
            title: ''
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

        this.title = this.$route.params.app

        if(this.$route.params.app == 'account')
            this.show = 0
        else if (this.$route.params.app == 'cart') {
            this.show = 1
        }
        else
            this.show = 2
        
            
    }
}
</script>
