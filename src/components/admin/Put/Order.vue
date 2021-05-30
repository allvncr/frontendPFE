<template>
    <div>
        <h1>
            <span>Edit Order</span>
        </h1>
        <form @submit.prevent="Put">
            <fieldset>
                <div class="form-row">
                    <label>Email:</label>
                    <input type="email" v-model="order.email" readonly>
                </div>
                <div class="form-row">
                    <label>Price:</label>
                    <input type="number" v-model="order.total" readonly>
                </div>
                <div class="form-row">
                    <label>Delivery:</label>
                    <input type="number" v-model="order.delivery" readonly>
                </div>
                <div class="form-row">
                    <label>Date:</label>
                    <input type="datetime" v-model="order.localDate" readonly>
                </div>
                <div class="label-row">
                    <input type="checkbox" v-model="order.status">
                    <label class="checkbox">Status</label>
                </div>
                <div class="form-row">
                    <label>Note:</label>
                    <textarea v-model="order.notes" cols="40" rows="10"></textarea>
                </div>
            </fieldset>
            <div class="submit-row">
                <input type="submit" value="Delete" class="delete" @click="Delete">
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

                textarea{
                    width: 610px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 5px 6px;
                    vertical-align: top;
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
  name: "Author",

  
   data(){
        return {
            news: false,
            order: {}
        }
    },
    

    methods: {
        New(i){
            this.news = i
        },

        Put(){
            AdminService.putCheck(this.order)
            .then((result) => {
                    this.$router.push("/admin/cart/order")
            }).catch((err) => {
                console.log(err.response.data)
            })
        },

        getOne(id){
            AdminService.getOrder(id)
            .then(response => {
                this.order = response.data
                console.log(response.data)
            }).catch(e => {
                console.log(e)
            })
        },

        Delete(){
            AdminService.deleteOrder(this.$route.params.id)
            .then(() => {
                this.$router.push("/admin/cart/order")
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
