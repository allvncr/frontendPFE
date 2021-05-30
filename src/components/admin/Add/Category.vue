<template>
    <div>
        <h1>
            <span>Add Category</span>
        </h1>
        <form @submit.prevent="Post">
            <fieldset>
                <div class="form-row">
                    <label>Name:</label>
                    <input type="text" maxlength="30" required v-model="name">
                </div>
                <div class="form-row">
                    <label>Minimum:</label>
                    <input type="number" min="0" required v-model="min">
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
import AdminService from "../../../services/AdminService"

export default {
  name: "Author",

  
   data(){
        return {
            name: '',
            min: 3,
            news: false
        }
    },
    

    methods: {
        New(i){
            this.news = i
        },

        Post(){
            var data = {
                name: this.name,
                min: parseInt(this.min),
            }
            console.log(data)
            AdminService.postCat(data)
            .then((result) => {
                if (this.news) {
                    this.name = ''
                    this.min = 0
                }
                else
                    this.$router.push("/admin/shop/categories")
                
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    },

}
</script>
