<template>
    <div class="Admin">
        <Header></Header>
        <div class="body">
            <div class="breadcrumbs">
                <a href="/admin">Accceuil</a>
            </div>
            <div class="content">
                <h1>Disconnected</h1>
                <p>Thank you for your time spent on this site today.</p>
                <p>
                    <a href="/admin/login">Log in again</a>
                </p>
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
        color: #fff;
    }

    .breadcrumbs{
        background: #79aec8;
        padding: 10px 40px;
        font-size: 14px;
        color: #c4dce8;
        text-align: left;
    }

    .content{
        padding: 20px 40px;

        h1{
            margin-bottom: 20px;
            font-size: 20px;
            color: #666;
        }

        p{
            line-height: 140%;
            margin: 3px 0 12px;

            a{
                color: #447e9b;
            }
            a:hover{
                color: #036;
            }
        }
    }

    


</style>

<script>
import Header from "@/components/AdminHeader.vue"

export default {
  name: "Admin",

  components: {
    Header,
  },
  
   data(){
        return {

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
        logout(){
            this.$store.state.shop.cart = null
            this.$store.dispatch('logout')
        },
    },

    mounted(){
        if (this.loggedIn){
            this.logout()
        }
        else{
            this.$router.push({name: "Login administration" })
        }
    }
}
</script>
