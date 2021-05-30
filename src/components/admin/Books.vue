<template>
    <div>
        <h1>
            <span>Select the book object to change</span>
            <a href="/admin/shop/books/add">Add book</a>
        </h1>
        <div class="result">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Purchased</th>
                        <th>Quantity</th>
                        <th>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, i) in books" :key="i">
                        <td>
                            <a :href="'/admin/shop/books/'+book.id">
                                {{ book.title }}
                            </a>
                        </td>
                        <td>
                            {{ book.author.name }}
                        </td>
                        <td>
                            {{ book.category.name }}
                        </td>
                        <td>
                            {{ book.price }}
                        </td>
                        <td>
                            {{ book.purchased }}
                        </td>
                        <td>
                            {{ book.quantity }}
                        </td>
                        <td>
                            {{ book.date }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>{{ total }} books</p>
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
  name: "Books",

  
   data(){
        return {
            books: [],
            total: 0
        }
    },
    

    methods: {
        getAll(){
            BookService.getAll()
            .then(response => {
                this.books = response.data.reverse()
                this.total = this.books.length
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
