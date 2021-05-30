<template>
    <div>
        <h1>
            <span>Add User</span>
        </h1>
        <form @submit.prevent="Post">
            <fieldset>
                <div class="form-row">
                    <label>Password:</label>
                    <input type="password" maxlength="30" minlength="4" required v-model="password">
                </div>
                <div class="form-row">
                    <label>Username:</label>
                    <input type="text" maxlength="30" minlength="3" required v-model="username">
                </div>
                <div class="form-row">
                    <label>Email:</label>
                    <input type="email" required v-model="email">
                </div>
                <div class="label-row">
                    <input type="checkbox" v-model="admin">
                    <label class="checkbox">Is admin</label>
                </div>
            </fieldset>
            <div class="submit-row">
                <input type="submit" value="Save and add new" class="default" @click="New(true)">
                <input type="submit" value="Save" @click="New(false)">
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>

    *{
        font-family: "Roboto","Lucida Grande","DejaVu Sans","Bitstream Vera Sans",Verdana,Arial,sans-serif;
        margin: 0;
        padding: 0;
        font-size: 13px;
        color: #333;
    }

    a{
        text-decoration: none;
    }

    h1{
        display: flex;
        justify-content: space-between;
        margin: 0 0 20px;
        
        span{        
            font-size: 20px;
            color: #666;
        }
    }

    form{
        fieldset{
            background: #fff;
            margin-bottom: 30px;

            .form-row{
                display: flex;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #eee;

                label{
                    font-size: 14px;
                    font-weight: bold;
                    display: block;
                    padding: 4px 10px 0 0;
                    width: 160px;
                    word-wrap: break-word;
                    line-height: 1;
                }

                input{
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 5px 6px;
                    margin-top: 0;
                    width: 20rem;
                }



                .url{
                    width: 30rem;
                }
            }

            .label-row{
                display: flex;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #eee;

                input{
                    display: block;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .checkbox{
                    vertical-align: -3px;
                    padding-left: 5px;
                    color: #666;
                }
            }
            
        }


        .submit-row {
            padding: 12px 14px;
            margin: 0 0 20px;
            background: #f8f8f8;
            border: 1px solid #eee;
            border-radius: 4px;
            text-align: right;
            overflow: hidden;

            input{
                border: none;
                outline: none;
                margin-left: 8px;
                text-transform: uppercase;
                background: #417690;
                height: 35px;
                line-height: 15px;
                padding: 10px 15px;
                border-radius: 4px;
                color: #fff;
            }

            input:hover{
                background: #205067;
            }

            .default{
                background: #79aec8;
                text-transform: none;
            }

            .default:hover{
                background: #609ab6;
            }
        }
    }

</style>


<script>
import Authservice from "../../../services/AuthService"


export default {
  name: "Author",

  
   data(){
        return {
            username: '',
            email: '',
            password: '',
            admin: false,
            news: false
        }
    },
    

    methods: {
        New(i){
            this.news = i
        },

        Post(){
            if(this.admin)
                var admin = ["ADMIN"]
            else
                var admin = ["USER"]

            var user = {
                username: this.username,
                password: this.password,
                email: this.email,
                admin: admin
            }

            Authservice.register(user)
            .then((result) => {
                if (this.news) {
                    this.username = ''
                    this.password= ''
                    this.email= '',
                    this.admin= false
                }
                else
                    this.$router.push("/admin/account/user")
                
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    },
}
</script>
