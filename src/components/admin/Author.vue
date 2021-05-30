<template>
    <div>
        <h1>
            <span>Select the author object to change</span>
            <a href="/admin/shop/authors/add">Add author</a>
        </h1>
        <div class="result">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(author, i) in authors" :key="i">
                        <td>
                            <a :href="'/admin/shop/authors/'+author.id">
                                {{ author.name }}
                            </a>
                        </td>
                        <td>
                            {{ author.id }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>{{ total }} authors</p>
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
import BookService from "../../services/ShopService"

export default {
  name: "Author",

  
   data(){
        return {
            authors: [],
            total: 0
        }
    },
    

    methods: {
        getAut(){
            BookService.getAllAuteur()
            .then(response => {
                this.authors = response.data.reverse()
                this.total = this.authors.length
            }).catch(e => {
                console.log(e)
            })
        },
    },

    mounted(){
        this.getAut()
    }
}
</script>
