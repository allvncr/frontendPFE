<template>
    <div>
        <h1>
            <span>Add Coupon</span>
        </h1>
        <form @submit.prevent="Post">
            <fieldset>
                <div class="form-row">
                    <label>Code:</label>
                    <input type="text" maxlength="20" minlength="6" required v-model="code">
                </div>
                <div class="form-row">
                    <label>Percent:</label>
                    <input type="number" step="any" min="0" required v-model="percent">
                </div>
                <div class="form-row">
                    <label>Expiration:</label>
                    <input type="date" required v-model="expiration">
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
  name: "Coupon",

  
   data(){
        return {
            code: '',
            percent: '',
            expiration: '',
            news: false
        }
    },
    

    methods: {
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        },

        New(i){
            this.news = i
        },

        Post(){
            this.expiration = this.formatDate(this.expiration)
            var data = {
                code: this.code,
                percent: this.percent,
                expiration: this.expiration
            }
            AdminService.postCoupon(data)
            .then((result) => {
                if (this.news) {
                    this.code = ''
                    this.percent= ''
                    this.expiration= ''
                    
                }
                else
                    this.$router.push("/admin/cart/coupon")
                
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    },
}
</script>
