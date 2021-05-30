<template>
    <div class="Header">
        <header>
            <div class="branding">
                <h1>
                    <a href="/admin">
                        Bookworm Administration
                    </a>
                </h1>
            </div>
            <div class="user-tools" v-show="loggedIn">
                Welcome, {{ username }}. 
                <router-link to="/">view the site</router-link> / 
                <router-link to="/admin/logout">logout</router-link>
            </div>
        </header>
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


    header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 40px;
        background: #417690;
        color: #ffc;
        overflow: hidden;

        .branding{
            margin-right: 20px;
            a{
                color: #f5dd5d;
                font-size: 24px;
                font-size: 400;
            }
        }

        .user-tools{
            margin-left: 20px;
            font-weight: 400;
            font-size: 11px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            text-align: right;
            color: #ffc;

            a{
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                color: #fff;
                font-size: 11px;
            }

            a:hover{
                border-bottom-color: #79aec8;
                color: #79aec8;
            }
        }
    }


</style>

<script>
export default {
  
   data(){
        return {
            username: ''
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

    mounted(){
        this.username = this.$store.state.auth.user.username
    }

}
</script>
