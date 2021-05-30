<template>
    <div class="login">
        <section>
            <div class="d-block">
                <div class="header">
                    <h1>
                        <a href="">
                            Bookworm Administration
                        </a>
                    </h1>
                </div>
                <div class="main">
                    <p class="errorL" v-show="errorL">
                        Please correctly complete the “username” and “password” fields of an authorized account.
                    </p>
                    <form @submit.prevent="handleLogin">
                        <div class="form-row">
                            <label>Username :</label>
                            <input type="text" required maxlength="20" minlength="3" v-model="user.username">
                        </div>
                        <div class="form-row">
                            <label>Password :</label>
                            <input type="password" required minlength="3" v-model="user.password">
                        </div>
                        <div class="form-submit">
                            <input type="submit" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        </section>
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

    section{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        padding-top: 100px;

        .d-block{
            width: 28em;
            min-width: 300px;
            height: 50px;
            background-color: #fff;

            .header{
                display: flex;
                justify-content: center;
                padding: 15px 16px;
                background-color: #417690;
                border-radius: 5px 5px 0 0;
                
                a{
                    font-size: 18px;
                    color: #fff;
                }
            }

            .main{
                border: 1px solid #eaeaea;
                border-radius: 5px;
                background-color: #fff;
                padding: 20px;

                p{
                    font-weight: 600;
                    padding: 10px 12px;
                    color: #ba2121;
                    border: 1px solid #ba2121;
                    border-radius: 4px;
                    margin-bottom: 10px;
                }

                form{
                    width: 100%;

                    .form-row{
                        padding: 4px 0;

                        label{
                            padding-right: 0.5em;
                            line-height: 2em;
                            font-size: 1em;
                        }

                        input{
                            width: 100%;
                            padding: 8px;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            margin-bottom: 2px;
                        }
                    }

                    .form-submit{
                        padding: 14px 14px 0;
                        text-align: center;

                        input[type=submit]{
                            appearance: none;
                            background: #79aec8;
                            padding: 10px 24px;
                            border: none;
                            border-radius: 4px;
                            color: #fff;
                            cursor: pointer;
                        }

                        input[type=submit]:hover{
                            background: #609ab6;
                        }
                    }
                }
            }
        }
    }


    
</style>

<script>

export default {
  name: "Login",

   data(){
        return {
            user: {
                username: '',
                password: '',
            },

            errorL: false

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
        handleLogin(){
            this.$store.dispatch('login', this.user)
            .then(response => {
                if(this.loggedIn){
                    if (this.$store.state.auth.user.roles[0] == "ADMIN") {
                        this.errorL = false
                        this.$router.push({name: "Site administration"})
                    }
                    else{
                        this.errorL = true
                        this.logout()
                    }
                }
                else{
                    this.errorL = true
                }
            })
        },

        logout(){
            this.$store.state.shop.cart = null
            this.$store.dispatch('logout')
        },
    },

    mounted(){
        if (this.loggedIn){
            if (this.$store.state.auth.user.roles[0] == "ADMIN"){
                this.$router.push({name: "Site administration" })
            }
            else
                this.logout()
        }
            
        
            
    }

}
</script>
