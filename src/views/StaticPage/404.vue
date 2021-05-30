<template>
    <div class="404">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">Error 404</router-link>
        </nav>
        <div class="body">
            <div class="error">404</div>
            <h6>
                Woops, looks like this page does not exist
            </h6>
            <span>
                You could either go back or go to homepage
            </span>
            <div>
                <a href="/" class="button">Go Back</a>
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
        padding: 64px 0 128px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eae8e4;

        .error{
            margin-top: 4px;
            line-height: 1.2;
            font-size: 12.5rem;
            font-weight: 600;
        }

        h6{
            line-height: 1.2;
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 8px;
        }

        span{
            display: block;
            margin-bottom: 40px;
            font-size: .875rem;
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

</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "404",
  
  components: {
    Header,
    Footer
  },


    methods: {
        retour(){
            this.$router.push({name: "Home" })
        }
    }
}
</script>
