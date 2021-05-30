<template>
    <div class="Shop">
        <Header></Header>
        <div>
            <nav>
                <router-link to="/">Home</router-link>
                <span class="breadcrumb-separator mx-2">
                    <font-awesome-icon icon="angle-right"/>
                </span>
                <router-link to="">Shop</router-link>
            </nav>

            <div class="site-content">
              <div class="block">
                <div class="primary">
                  <div class="header">
                    <div class="control-bar__left">
                      <p v-if="total == 0 || total == 1">Showing {{ total }}–{{ total }} of {{ total }} result</p>
                      <p v-else-if="total <= perPage">Showing {{ page }}–{{ total }} of {{ total }} results</p>
                      <p v-else-if="page==1">Showing 1 – {{ perPage*page }} of {{ total }} results</p>
                      <p v-else-if="page==nbre">Showing {{ perPage*(page-1)+1 }} – {{ total }} of {{ total }} results</p>
                      <p v-else>Showing {{ perPage*(page-1)+1 }} – {{ perPage*page }} of {{ total }} results</p>
                    </div>

                    <div class="control-bar__right">
                      <form class="ordering" action="">
                        <select name="order">
                          <option selected value="normal">Default sorting: by newest</option>
                          <option value="latest">sort by latest</option>
                          <option value="cooler">sort by Popularity</option>
                          <option value="alpha">sort by Alphabetical(A-Z)</option>
                          <option value="beta">sort by Alphabetical(Z-A)</option>
                          <option value="lower">sort by price: low to high</option>
                          <option value="high">sort by price: high to low</option>
                        </select>

                        <select name="show" v-model="perPage">
                          <option selected value="8">Show 8</option>
                          <option value="12">Show 12</option>
                          <option value="16">Show 16</option>
                          <option :value="total">Show All</option>
                        </select>
                        <button type="submit">OK</button>
                      </form>
                    </div>
                  </div>

                  <div class="grid-view">
                    <ul class="products-list">
                      <li class="product" v-for="(book, i) in pagination" :key="i">
                        <div class="product__inner">
                          <div class="product-header">
                            <router-link :to="'/categorie/'+book.category.id+'/book/'+book.id">
                              <img width="150" height="200" :src="book.image">
                            </router-link>
                          </div>

                          <div class="product-body">
                            <div class="product-cat">
                              <router-link :to="'/categorie/'+book.category.id">{{ book.category.name }}</router-link>
                            </div>

                            <h2 class="product-title">
                              <router-link :to="'/categorie/'+book.category.id+'/book/'+book.id">
                                {{ book.title }}
                              </router-link>
                            </h2>
                            <div class="product-auth">
                              <router-link :to="'/author/'+book.author.id">{{ book.author.name }}</router-link>
                            </div>
                            <div class="product-price">
                              <span>
                                $ {{ book.price }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <nav>
                      <ul>
                        <li v-for="i in nbre" :key="i">
                          <a class="page-link" :class="{ current: page==i }" @click="next(i)">{{ i }}</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div class="secondary">
                  <div class="d-block">
                    <div class="widget-head">
                      <a @click="cat = !cat">
                        <h3>Categories</h3>
                        <div>
                          <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-show="!cat"/>
                          <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-show="cat"/>
                        </div>
                      </a>
                    </div>

                    <div class="woocommerce" v-show="cat">
                      <ul>
                        <li class="cat-item" v-for="(category, i) in categories" :key="i">
                          <a :href="'/categorie/'+category.id">
                            {{ category.name }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="d-block">
                    <div class="widget-head">
                      <a @click="author = !author">
                        <h3>Author</h3>
                        <div>
                          <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-show="!author"/>
                          <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-show="author"/>
                        </div>
                      </a>
                    </div>
                    <div class="woocommerce" v-show="author">
                      <ul>
                        <li class="cat-item" v-for="(auteur, i) in authors" :key="i">
                          <a :href="'/author/'+auteur.id">
                            {{ auteur.name }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="none d-block">
                    <div class="widget-head">
                      <a @click="filter = !filter">
                        <h3>Filter by price</h3>
                        <div>
                          <font-awesome-icon :icon="[ 'fas', 'plus' ]" v-show="!filter"/>
                          <font-awesome-icon :icon="[ 'fas', 'minus' ]" v-show="filter"/>
                        </div>
                      </a>
                    </div>
                    <div class="woocommerce" v-show="filter">
                      <form @submit.prevent="trie">
                        <div class="slider-container">
                            <vue-range-slider 
                              v-model="value" 
                              :min="min" 
                              :max="max"
                              :bg-style="bgStyle"
                              :formatter="formatter" 
                              :tooltip-merge="tooltipMerge"
                              :tooltip-style="tooltipStyle"
                              :process-style="processStyle"
                              
                              :enable-cross="enableCross">
                          </vue-range-slider>
                        </div>
                        
                        <div class="price-amout">
                          <button type="submit">Filter</button>
                          <div class="price-label">
                            Price: ${{ value[0] }} - ${{ value[1] }}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
        <Footer></Footer>
    </div>
</template>

<style lang="scss" scoped>

  *{
    font-family: Helvetica, Arial, sans-serif;
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

    .site-content{
      margin-top: 56px;
      padding-bottom: 96px;
      border-bottom: 1px solid #eae8e4;

      .block{
        @media only screen and (max-width: 768px){
            flex-direction: column;
        }
        padding: 0 15px;
        display: flex;
        

        .primary{
          @media only screen and (max-width: 768px){
              width: 100%;
              padding: 0;
          }
          width: 75%;
          padding: 0 15px;
          order: 2;
          
          .header{
            @media only screen and (max-width: 768px){
                flex-direction: column;
                margin-top: 8px;

                form{
                  display: flex;
                  flex-direction: column;
                }

                button{
                  display: block;
                  margin: 8px auto;
                }
            }
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            select{
              border: 0;
              border-bottom: 1px solid #eae8e4;
              font-size: 1rem;
              color: #161619;
              margin-right: 15px;
              padding: 8px 19px;
            }

            button{
              border: 1px solid #000;
              background-color: #161619;
              color: #fff;
              padding: 5px;
              font-size: .875rem;
              border-radius: 50%;
            }

          }

          .grid-view{
            .products-list{
              @media only screen and (max-width: 768px){
                  flex-direction: row;
              }
              list-style: none;
              margin-bottom: 40px;
              border-left: 1px solid #eae8e4;
              border-top: 1px solid #eae8e4;
              display: flex;
              flex-wrap: wrap;
              width: 100%;

              .product:hover{
                box-shadow: 0 0 40px 0 rgba(22, 22, 25, 0.1);
                border-left: 1px solid #eae8e4;
                border-top: 1px solid #eae8e4;
                border-color: #161619!important;
              }

              .product{
                @media only screen and (max-width: 768px){
                    width: 50%;
                }
                border-right: 1px solid #eae8e4;
                border-bottom: 1px solid #eae8e4;
                position: relative;
                width: 25%;

                .product__inner{
                  @media only screen and (max-width: 768px){
                      padding: 15px;
                  }
                  padding: 30px;

                  .product-header img{
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                    max-width: 100%;
                    height: auto;
                  }

                  .product-body{
                    padding-top: 16px;
                    transition: all .3s ease-in-out;

                    .product-cat{
                      margin-bottom: 4px;

                      & a{
                        text-transform: uppercase;
                        text-decoration: none;
                        color: #f75454;
                        font-size: 14px;
                      }
                    }

                    & h2{
                      margin-bottom: 4px;
                      font-size: 1rem;
                      font-weight: 500;
                    }
                    & h2>a{
                      text-transform: capitalize;
                      text-decoration: none;
                      color: #161619;
                    }

                    .product-auth{
                      margin-bottom: 4px;
                      font-size: .875rem;

                      & a{
                        text-transform: uppercase;
                        text-decoration: none;
                        color: #7c6e65;
                      }

                      & a:hover{
                        color: #f75454;
                      }
                    }

                    .product-price{
                      font-weight: 500;
                      font-size: 1.3rem;
                    }
                  
                  }
                }
              }
            }

            nav{
              border: none;
              & ul{
                margin-bottom: 16px;
                list-style: none;
                display: flex;
                width: 100%;
                justify-content: center;
                
                & li{
                  margin: 0 5px;

                  .page-link{
                    color: #161619;
                    padding: 8px 14px;
                    cursor: pointer;
                  }

                  .current, .page-link:hover{
                    background-color: #161619;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        

        .secondary{
          @media only screen and (max-width: 768px){
              width: 100%;
              padding: 0;
              .none{
                display: none !important;
              }
              
          }
          width: 23%;
          padding: 0 15px;
          order: 1;

          .d-block{
            border: 1px solid #eae8e4;
            padding: 30px;
            
            
            .widget-head{
              & a{
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-decoration: none;
                cursor: pointer;
                color: #161619;

                & h3{
                  font-size: 1.125rem;
                  font-weight: 600;
                }
              }
            }

            .woocommerce{
              margin-top: 24px;
              
              & ul{
                list-style: none;

                .cat-item a{
                  display: inline-block;
                  padding: 9px 0;
                  text-decoration: none;
                  text-transform: capitalize;
                  color: #161619;
                }

                .cat-item a:hover{
                  color: #f75454;
                }
              }
          
              .slider-container{
                width: 100%;
                margin-top: 40px;
                margin-bottom: 20px;
              }

              .price-amout{
                display: flex;
                align-items: center;

                button{
                  padding: 6px 16px;
                  background-color: #f75454;
                  color: #fff;
                  border: 0;
                  outline: none;
                }
                
                .price-label{
                  margin-left: 8px;
                  font-size: .875rem;
                }
              }
            }
          }
        }
      }
    }

</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BookService from "../../services/ShopService"
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'

export default {
  name: "Shop",
  
  components: {
    Header,
    Footer,
    VueRangeSlider
  },

  data(){
        return {
            books: [],
            pagination: [],
            categories: [],
            order_by: [],
            authors: [],
            cat: false,
            author: false,
            total: 0,
            perPage: 8,
            nbre: 0,
            page: 1,
            order: 0,
            filter: true,
            min: 0,
            max: 100,
            value: [0, 100],
        }
    },

    created() {
      this.enableCross = false
      this.tooltipMerge = false
      this.formatter = value => `$${value}`
      this.bgStyle = {
        backgroundColor: '#fff',
        boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
      }
      this.tooltipStyle = {
        backgroundColor: '#f75454',
        borderColor: '#f75454'
      }
      this.processStyle = {
        backgroundColor: '#161619'
      }
  },

  methods: {

    getAll(){
      BookService.getAll()
      .then(response => {
        this.books = response.data
        this.total = this.books.length
        if((this.$route.query.cat != undefined) && this.$route.query.s != undefined){
          this.search()
        }
        this.setup(this.$route.query.order)
        if(this.$route.query.show != undefined){
          this.perPage = this.$route.query.show
        }
        this.button(this.total)
        this.paginate()
        
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

    getAut(){
      BookService.getAllAuteur()
      .then(response => {
        this.authors = response.data
      }).catch(e => {
        console.log(e)
      })
    },

    search(){
      var list= []
      var text
      var cat
      var title
      if(this.$route.query.cat == "none"){
        text = this.$route.query.s
        text = text.toLowerCase()

        this.books.forEach(book => {
          title = book.title.toLowerCase()

          if(title.search(text) >= 0){
            list.push(book)
          }
        })
        this.books = []
        this.books = list
        this.total = this.books.length
      }
      else{
        var list= []
        text = this.$route.query.s
        text = text.toLowerCase()
        cat = this.$route.query.cat
        
        this.books.forEach(book => {
          if(book.category.id == cat){
            list.push(book)
          }
        })

        this.books = []
        list.forEach(book => {
          title = book.title.toLowerCase()
          if(title.search(text) >= 0){
            this.books.push(book)
          }
        })
        this.total = this.books.length
 
      }
    },

    button(total){
      this.nbre = total/this.perPage
      if(total%this.perPage !=0 ){
        this.nbre++
      }
      this.nbre = Math.floor(this.nbre)
    },

    paginate(){
      this.pagination = this.order_by.slice(0, this.perPage)
    },

    next(i){
      this.page = i
      this.pagination = []
      this.pagination = this.order_by.slice(this.perPage*(i-1), this.perPage*i)
    },

    setup(order){
      this.order_by = this.normal()
      if(order == 'normal')
        this.normal()
      if(order == 'latest')
        this.latest()
      if(order == 'cooler')
        this.cooler()
      if(order == 'alpha')
        this.abc()
      if(order == 'beta')
        this.xyz()
      if(order == 'lower')
        this.LoH()
      if(order == 'high')
        this.HoL()
    },

    normal(){
      this.order_by = this.books.sort(function(a,b){
        return new Date(b.date) - new Date(a.date)
      })
      return this.order_by
      
    },

    latest(){
      this.order_by = this.normal()
      this.order_by = this.order_by.reverse()
    },

    cooler(){
      this.order_by = this.books.sort(function(a, b) {
          return parseFloat(b.purchased) - parseFloat(a.purchased)
      })
    },

    abc(){
      this.order_by = this.books.sort(function(a, b) {
          return (a.title).localeCompare(b.title)
      })

      return this.order_by
    },

    xyz(){
      this.order_by = this.abc()
      this.order_by = this.order_by.reverse()
    },

    LoH(){
      this.order_by = this.books.sort(function(a, b) {
          return parseFloat(a.price) - parseFloat(b.price)
      })

      return this.order_by
    },

    HoL(){
      this.order_by = this.LoH()
      this.order_by = this.order_by.reverse()
    },

    trie(){
      var min = this.value[0]
      var max = this.value[1]
      this.order_by = this.books.filter(book=> book.price >= min && book.price <= max)
      this.paginate()
      this.button(this.order_by.length)
    }


  },

  mounted(){
    this.getAll()
    this.getAut()
    this.getCat()
  }

}
</script>
