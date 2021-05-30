<template>
    <div class="coming">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">Coming Soon</router-link>
        </nav>
        <div class="body">
            <div class="error">We’re coming soon.</div>
            <h6>
                Our website is under construction. We’ll be here soon with our new awesome site.
            </h6>
            
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
        padding: 200px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eae8e4;

        .error{
            line-height: 1.2;
            font-size: 4.75rem;
            font-weight: 800;
            margin-bottom: 16px;
        }

        h6{
            line-height: 1.8;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 32px;
        }

        @media only screen and (max-width: 768px){
            display: block;
            width: 90%;
            margin: 0 auto;

            .error{
                font-size: 3rem;
            }

        }

    }

</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "coming",
  
  components: {
    Header,
    Footer
  },

   data(){
        return {

        }
    },

    methods: {
        
    }
}
</script>
