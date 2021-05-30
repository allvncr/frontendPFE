<template>
    <div>
        <h1>
            <span>Select the order object to change</span>
        </h1>
        <div class="result">
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Price</th>
                        <th>Delivery</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, i) in orders" :key="i">
                        <td>
                            <a :href="'/admin/cart/order/'+order.id">
                                {{ order.email }}
                            </a>
                        </td>
                        <td>
                            {{ order.total }}
                        </td>
                        <td>
                            {{ order.delivery }}
                        </td>
                        <td>
                            {{ time(order.localDate) }}
                        </td>
                        <td>
                            <img src="../../assets/icon-yes.svg" v-if="order.status">
                            <img src="../../assets/icon-no.svg" v-else>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>{{ total }} orders</p>
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

        a{
            display: flex;
            align-items: center;
            padding: 3px 12px;
            background: #999;
            font-size: 11px;
            text-transform: uppercase;
            border-radius: 15px;
            letter-spacing: 0.5px;
            color: #fff;
            background-image: url(../../assets/tooltag-add.svg);
            background-repeat: no-repeat;
            background-position: right 7px center;
            padding-right: 26px;
        }

        a:hover{
            background-color: #417690;
        }
    }

    table{
        width: 100%;
        border-collapse: collapse;
        border-color: #ccc;

        thead{
            th{
                background: #eee;
                color: #666;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                font-size: 11px;
                cursor: pointer;
                padding: 8px 10px;
                color: #666;
                text-transform: uppercase;
            }
            th:nth-child(2n){
                background: #f6f6f6;
            }
        }
        tbody{
            tr:nth-child(2n){
                background: #f9f9f9;
            }
            tr{
                background: #fff;
                
                td{
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                    a{
                        color: #447e9b;
                        font-weight: 600;
                        font-size: 13px;
                    }
                    a:hover{
                        color: #036;
                    }

                    img{
                        vertical-align: middle;
                    }
                }
            }
        }
    }

    p{
        color: #666;
        border-bottom: 1px solid #eee;
        font-size: 13px;
        padding: 10px;
        border-top: 1px solid #ddd;
        line-height: 22px;
    }

</style>


<script>
import AdminService from "../../services/AdminService"

export default {
  name: "Orders",

  
   data(){
        return {
            orders: [],
            total: 0
        }
    },
    

    methods: {
        getAll(){
            AdminService.getOrders()
            .then(response => {
                this.orders = response.data.reverse()
                this.total = this.orders.length
            }).catch(e => {
                console.log(e.response.data)
            })
        },

        time(date=''){
            var time = date.split('T')

            var dateTime = time[0] +' '+time[1]

            return dateTime
        },
    },

    mounted(){
        this.getAll()
    }
}
</script>
