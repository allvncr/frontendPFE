<template>
    <div>
        <h1>
            <span>Edit Coupon</span>
        </h1>
        <form @submit.prevent="Put">
            <fieldset>
                <div class="form-row">
                    <label>Code:</label>
                    <input type="text" maxlength="20" minlength="6" required v-model="coupon.code">
                </div>
                <div class="form-row">
                    <label>Percent:</label>
                    <input type="number" step="any" min="0" required v-model="coupon.percent">
                </div>
                <div class="form-row">
                    <label>Expiration:</label>
                    <input type="date" required v-model="coupon.expiration">
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
            coupon: {
                code: '',
                percent: '',
                expiration: '',
            }
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

        Put(){
            this.coupon.expiration = this.formatDate(this.coupon.expiration)
            var data = {
                id: this.coupon.id,
                code: this.coupon.code,
                percent: this.coupon.percent,
                expiration: this.coupon.expiration
            }

            AdminService.putCoupon(data)
            .then((result) => {
                if (this.news) {
                    this.$router.push("/admin/cart/coupon/add")
                }
                else
                    this.$router.push("/admin/cart/coupon")
                
            }).catch((err) => {
                console.log(err.response.data)
            })
        },

        getOne(id){
            AdminService.getCoupon(id)
            .then(response => {
                this.coupon = response.data
            }).catch(e => {
                this.$router.push({ name: "404" })
                console.log(e.response.data)
            })
        },

        Delete(){
            AdminService.deleteCoupon(this.$route.params.id)
            .then(() => {
                this.$router.push("/admin/cart/coupon")
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
