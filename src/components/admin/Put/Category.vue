<template>
    <div>
        <h1>
            <span>Edit Category</span>
        </h1>
        <form @submit.prevent="Put">
            <fieldset>
                <div class="form-row">
                    <label>Name:</label>
                    <input type="text" maxlength="30" required v-model="category.name">
                </div>
                <div class="form-row">
                    <label>Minimum:</label>
                    <input type="number" min="0" required v-model="category.min">
                </div>
            </fieldset>
            <div class="submit-row">
                <input type="submit" value="Delete" class="delete" @click="Delete">
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

                img{
                    width: 200px;
                    height: 200px;
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

            .delete{
                float: left;
                background: #ba2121;
                text-transform: none;
            }

            .delete:hover{
                background: #a41515;
            }
        }
    }

</style>


<script>
import AdminService from "../../../services/AdminService"

export default {
  name: "Category",

  
   data(){
        return {
            category: {
                name:'',
                min: '',
                news: false
            }
        }
    },
    

    methods: {
        New(i){
            this.news = i
        },

        Put(){
            AdminService.putCat(this.category)
            .then((result) => {
                if (this.news) {
                    this.$router.push("/admin/shop/categories/add")
                }
                else
                    this.$router.push("/admin/shop/categories")
                
            }).catch((err) => {
                console.log(err.response.data)
            })
        },

        getOne(id){
            AdminService.getCat(id)
            .then(response => {
                this.category = response.data
            }).catch(e => {
                console.log(e)
            })
        },

        Delete(){
            AdminService.deleteCat(this.$route.params.id)
            .then(() => {
                this.$router.push("/admin/shop/categories")
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    },

    mounted(){
        this.getOne(this.$route.params.id)
    }
}
</script>
