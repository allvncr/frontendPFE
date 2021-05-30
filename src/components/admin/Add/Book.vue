<template>
    <div>
        <h1>
            <span>Add Book</span>
        </h1>
        <form @submit.prevent="Post">
            <fieldset>
                <div class="form-row">
                    <label>Author:</label>
                    <select name="author" v-model="author" required>
                        <option value selected>----------</option>
                        <option :value=author v-for="(author, i) in authors" :key="i">{{ author.name }}</option>
                    </select>
                    <a v-if="author!=undefined" title="Modified the selected author object" target="popup" @click="modifyA(author.id)" :class="{ inactive : author.id==undefined}">
                        <img src="../../../assets/icon-changelink.svg" alt="Edit">
                    </a>
                    <a v-else class="inactive" title="Modified the selected author object">
                        <img src="../../../assets/icon-changelink.svg" alt="Edit">
                    </a>
                    <a href="/admin/shop/authors/add" title="Add another author object" target="popup" onclick="window.open('/admin/shop/authors/add','popup','width=1000,height=600'); return false;">
                        <img src="../../../assets/icon-addlink.svg" alt="Add">
                    </a>
                </div>
                <div class="form-row">
                    <label>Category:</label>
                    <select name="category" v-model="category" required>
                        <option value selected>----------</option>
                        <option :value=category v-for="(category, i) in categories" :key="i">{{ category.name }}</option>
                    </select>
                    <a v-if="category!=undefined" title="Modified the selected category object" target="popup" @click="modifyC(category.id)" :class="{ inactive : category.id==undefined}">
                        <img src="../../../assets/icon-changelink.svg" alt="Edit">
                    </a>
                    <a v-else class="inactive" title="Modified the selected category object">
                        <img src="../../../assets/icon-changelink.svg" alt="Edit">
                    </a>
                    <a href="/admin/shop/categories/add" title="Add another category object" target="popup" onclick="window.open('/admin/shop/categories/add','popup','width=1000,height=600'); return false;">
                        <img src="../../../assets/icon-addlink.svg" alt="Add">
                    </a>
                </div>
                <div class="form-row">
                    <label>Title:</label>
                    <input type="text" maxlength="100" minlength="4" required v-model="title">
                </div>
                <div class="form-row">
                    <label>Isbn-13:</label>
                    <input type="text" minlength="4" required v-model="isbn">
                </div>
                <div class="form-row">
                    <label>Price:</label>
                    <input type="number" step="any" min="0" required v-model="price">
                </div>
                <div class="form-row">
                    <label>Image:</label>
                    <input type="url" required v-model="image" class="url">
                </div>
                <div class="form-row">
                    <label>Quantity:</label>
                    <input type="number" min="1" required v-model="quantity">
                </div>
                <div class="form-row">
                    <label>Release Date:</label>
                    <input type="date" required v-model="date">
                </div>
                <div class="form-row">
                    <label>Description:</label>
                    <textarea v-model="text" cols="40" rows="10"></textarea>
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

                a{
                    cursor: pointer;
                    opacity: .8;
                    margin-left: 7px;
                    color: #447e9b;

                    img{
                        vertical-align: middle;
                    }
                }

                .inactive{
                    opacity: 0.3;
                    cursor: default;
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
import BookService from "../../../services/ShopService"


export default {
  name: "Author",

  
   data(){
        return {
            title: '',
            price: 0,
            image: '',
            isbn: '',
            date: '',
            quantity: 10,
            text: '',
            categories: [],
            authors: [],
            category: undefined,
            author: undefined
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

        Post(){
            this.date = this.formatDate(this.date)
            var data = {
                title: this.title,
                price: parseFloat(this.price),
                isbn: this.isbn,
                date: this.date,
                quantity: parseInt(this.quantity),
                image: this.image,
                text: this.text,
                author: this.author,
                category: this.category
            }

            AdminService.postBook(data)
            .then((result) => {
                if (this.news) {
                    this.title = ''
                    this.price= ''
                    this.quantity= 10
                    this.date= '',
                    this.isbn= ''
                    this.image= ''
                    this.text= ''
                    this.category= {}
                    this.author= {}
                }
                else
                    this.$router.push("/admin/shop/books")
                
            }).catch((err) => {
                console.log(err.response.data)
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

        modifyA(id){
            if(id!=undefined)
                window.open("/admin/shop/authors/"+id, 'popup', 'width=1000,height=600');
        },

        modifyC(id){
            if(id!=undefined)
                window.open("/admin/shop/categories/"+id, 'popup', 'width=1000,height=600');
        }
    },

    mounted(){
        this.getAut()
        this.getCat()
    }
}
</script>
