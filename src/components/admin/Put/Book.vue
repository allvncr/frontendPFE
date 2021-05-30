<template>
    <div>
        <h1>
            <span>Edit Book</span>
        </h1>
        <form @submit.prevent="Put">
            <fieldset>
                <div class="form-row">
                    <label>Author:</label>
                    <select name="author" v-model="book.author" required>
                        <option :value=author v-for="(author, i) in authors" :key="i">{{ author.name }}</option>
                    </select>
                </div>
                <div class="form-row">
                    <label>Category:</label>
                    <select name="category" v-model="book.category" required>
                        <option :value=category v-for="(category, i) in categories" :key="i">{{ category.name }}</option>
                    </select>
                </div>
                <div class="form-row">
                    <label>Title:</label>
                    <input type="text" maxlength="100" minlength="4" required v-model="book.title">
                </div>
                <div class="form-row">
                    <label>Isbn-13:</label>
                    <input type="text" minlength="4" required v-model="book.isbn">
                </div>
                <div class="form-row">
                    <label>Price:</label>
                    <input type="number" step="any" min="0" required v-model="book.price">
                </div>
                <div class="form-row">
                    <label>Image:</label>
                    <input type="url" required v-model="book.image" class="url">
                </div>
                <div class="form-row">
                    <label>Quantity:</label>
                    <input type="number" min="1" required v-model="book.quantity">
                </div>
                <div class="form-row">
                    <label>Release Date:</label>
                    <input type="date" required v-model="book.date">
                </div>
                <div class="form-row">
                    <label>Purchased:</label>
                    <input type="number" step="any" min="0" required v-model="book.purchased">
                </div>
                <div class="form-row">
                    <label>Description:</label>
                    <textarea v-model="book.description" cols="40" rows="10"></textarea>
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

                textarea{
                    width: 610px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 5px 6px;
                    vertical-align: top;
                }

                select{
                    height: 30px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 5px 6px;

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
import BookService from "../../../services/ShopService"

export default {
  name: "Book",

  
   data(){
        return {
            book: {},
            authors: [],
            categories: [],
            news: false
        }
    },
    

    methods: {
        New(i){
            this.news = i
        },

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

        Put(){
            this.book.date = this.formatDate(this.book.date)
            var data = {
                id: this.book.id,
                title: this.book.title,
                price: parseFloat(this.book.price),
                image: this.book.image,
                isbn: this.book.isbn,
                date: this.book.date,
                quantity: parseInt(this.book.quantity),
                text: this.book.description,
                author: this.book.author,
                category: this.book.category,
                purchased: parseInt(this.book.purchased)
            }

            AdminService.putBook(data)
            .then((result) => {
                if (this.news) {
                    this.$router.push("/admin/shop/books/add")
                }
                else
                    this.$router.push("/admin/shop/books")
                
            }).catch((err) => {
                console.log(err.response.data)
            })
        },

        getOne(id){
            BookService.getBook(id)
            .then(response => {
                this.book = response.data
            }).catch(e => {
                console.log(e)
            })
        },

        getAut(){
            BookService.getAllAuteur()
            .then(response => {
                this.authors = response.data
            }).catch(e => {
                console.log(e)
            })
        },

        getCat(){
            BookService.getAllCat()
            .then(response => {
                this.categories = response.data
            }).catch(e => {
                console.log(e)
            })
        },

        Delete(){
            AdminService.deleteBook(this.$route.params.id)
            .then(() => {
                this.$router.push("/admin/shop/books")
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    },

    mounted(){
        this.getOne(this.$route.params.id)
        this.getAut()
        this.getCat()

    }
}
</script>
