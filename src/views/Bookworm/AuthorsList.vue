<template>
    <div class="About">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">Authors List</router-link>
        </nav>
        
        <div class="page-content">
            <ul>
                <li>
                    <a @click="init">All</a>
                </li>
                <li v-for="(letter, i) in alpha" :key="i">
                    <a @click="text(letter)">{{ letter }}</a>
                </li>
                <li>
                    <a @click="chiffre">0-9</a>
                </li>
            </ul>
            <div class="authors" v-if="total>0">
                <div class="author-wrapper" v-for="(author, i) in search" :key="i">
                    <a :href="'/author/'+author.id">
                        <img :src="author.image">
                        <div class="text-center">
                            <h4>{{ author.name }}</h4>
                            <!-- <span>
                                3 Published Books
                            </span> -->
                        </div>
                    </a>
                </div>
            </div>
            <div class="authors" v-else>
                <span class="none">No authors available.</span>
            </div>
        </div>
        
        <Footer></Footer>
    </div>
</template>

<style lang="scss" scoped>

    *{
        font-family: inter,Helvetica, Arial, sans-serif;
    }

    nav{
        @media only screen and (max-width: 768px){
            margin: 0;
            align-items: baseline;
        }
        margin: 0 45px;
        padding: 24px 15px;
        display: flex;
        align-items: center;
        font-size: .875rem;
        border-bottom: 1px solid #eae8e4;
        & a{
            @media only screen and (max-width: 768px){
                max-lines: 1;
            }
            display: block;
            text-decoration: none;
            color: #161619;
        }
    }

    .page-content{
        border-bottom: 1px solid #eae8e4;
        padding: 0 15px;

        ul{
            @media only screen and (max-width: 768px){
                padding: 8px;
                overflow-x: scroll;
            }
            display: flex;
            padding: 56px 56px 0 56px;
            margin-bottom: 56px;
            white-space: nowrap;
            list-style: none;
            justify-content: space-between;
            text-align: left;

            li{
                @media only screen and (max-width: 768px){
                padding: 5px;
            }
                padding-bottom: 6px;
                border-bottom: 1px solid #161619;

                a{
                    color: #7c6e65;
                    text-decoration: none;
                    text-transform: uppercase;
                    font-size: .875rem;
                    cursor: pointer;
                }
            }
        }

        .authors{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 48px;

            .none{
                text-align: center;
                padding: 0 48px;
                margin: 0 auto;
                width: 100%;
                display: block;
            }

            .author-wrapper{
                margin-bottom: 20px;
                padding: 0 48px;
                width: 20%;
                @media only screen and (max-width: 768px){
                    width: 50%
                }

                a{
                    display: block;
                    text-decoration: none;

                    img{
                        display: block;
                        width: 200px;
                        margin: 0 auto 16px;
                        max-width: 100%;
                        border-radius: 50%;
                        max-height: 200px;
                    }

                    .text-center{
                        padding: 16px 0;
                        text-align: center;

                        h4{
                            color: #161619;
                            font-size: 1rem;
                            font-weight: 600;
                            line-height: 1.2;
                        }

                        span{
                            color: #7c6e65;
                            font-size: .875rem;
                        }
                    }
                }
            }
        }
    }


</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import BookService from "../../services/ShopService"

export default {
  name: "Authors",
  
  components: {
    Header,
    Footer
  },

   data(){
        return {
            alpha: [
                "a","b","c","d","e","f","g","h","i","j","k","l","m",
                "n","o","p","q","r","s","t","u","v","w","x","y","z"
            ],
            authors: [],
            search: [],
        }
    },

    computed: {
        total(){
            var x = this.search.length
            return x
        }
    },

    methods: {
        getAut(){
            BookService.getAllAuteur()
            .then(response => {
                this.authors = response.data
                this.init()
            }).catch(e => {
                console.log(e)
            })
        },

        text(letter){
            this.search = []
            letter = letter.toUpperCase()
            this.authors.forEach(author => {
                if(author.name[0] == letter){
                    this.search.push(author)
                }
            })
        },

        chiffre(){
            this.search = []
            
            this.authors.forEach(author => {
                if(author.name[0] == 0||
                    author.name[0] == 1||
                    author.name[0] == 2||
                    author.name[0] == 3||
                    author.name[0] == 4||
                    author.name[0] == 5||
                    author.name[0] == 6||
                    author.name[0] == 7||
                    author.name[0] == 8||
                    author.name[0] == 9
                ){
                    this.search.push(author)
                }
            })
        },

        init(){
            this.search = this.authors
        },


    },

    mounted(){
        this.getAut()
        
    }
}
</script>
