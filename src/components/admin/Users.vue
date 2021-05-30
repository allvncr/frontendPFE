<template>
    <div>
        <h1>
            <span>Select the user object to change</span>
            <a href="/admin/account/user/add">Add user</a>
        </h1>
        <div class="result">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>ID</th>
                        <th>Is_Admin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, i) in users" :key="i">
                        <td>
                            <a :href="'/admin/account/user/'+user.id">
                                {{ user.username }}
                            </a>
                        </td>
                        <td>
                            {{ user.email }}
                        </td>
                        <td>
                            {{ user.id }}
                        </td>
                        <td>
                            <img src="../../assets/icon-yes.svg" v-if="user.roleSet[0].name == 'ADMIN'">
                            <img src="../../assets/icon-no.svg" v-else>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>{{ total }} users</p>
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
  name: "Users",

  
   data(){
        return {
            users: [],
            total: 0
        }
    },
    

    methods: {
        getAll(){
            AdminService.getUsers()
            .then(response => {
                this.users = response.data.reverse()
                this.total = this.users.length
            }).catch(e => {
                console.log(e)
            })
        },
    },

    mounted(){
        this.getAll()
    }
}
</script>
