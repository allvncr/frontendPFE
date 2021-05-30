<template>
  <div class="home">
    
    <Header></Header>
    <div class="border-bottom">
      <div class="container">

        <div class="position-relative">
          <button class="btn" @click="link = !link">
              <i class="far fa-bars"></i>
              <span>Browse categories</span>
              <i class="far fa-chevron-down" v-if="link"></i>
              <i class="far fa-chevron-right" v-else></i>
          </button>
          <transition name="ul">
          <div class="card-body" v-if="link==1">
            <ul class="menu">
              <a :href="'/categorie/'+category.id" class="menu-item" v-for="(category, i) in categories" :key="i" >
                <li>{{ category.name }}</li>
              </a>
            </ul>
          </div>
          </transition>
        </div>

        <div class="nav site-navigation">
          <ul>
            <li>
              <router-link to="/shop">Shop</router-link>
            </li>
            <li class="deroulant">
              <a>Others</a>
              <div class="sous">
                <div><a href="/authors">Authors List</a></div>
                <div><a href="/help/faq">FAQ</a></div>
                <div><a href="/help/about">About Us</a></div>
                <div><a href="/help/contact">Contact Us</a></div>
                <div><a href="/help/terms">Terms and Conditions</a></div>
              </div>
            </li>
          </ul>
        </div>

      </div>
      
      <div class="nav secondary-navigation">
        <ul>
          <li>
            <a :href="'/categorie/'+random.category.id+'/book/'+random.id">Random Book</a>
          </li>
          <li>
            <a :href="'/categorie/'+best.category.id+'/book/'+best.id">Best Seller</a>
          </li>
          <li>
            <a :href="'/categorie/'+trending.category.id+'/book/'+trending.id">Trending Books</a>
          </li>
        </ul>
      </div>
    </div>

    <section class="img-hero">
      <div class="carousel">
        <div class="offset">
          <div class="media">
            <h1>PaperBack Edition</h1>
            <h2>
              <span>Featured Books of the</span>
              <span class="bold">{{ month }}</span>
            </h2>
            <a href="/shop">
              See More
            </a>
          </div>
        </div>
        <div class="fade-right">
          <img src="https://demo4.madrasthemes.com/bookworm/wp-content/uploads/2020/08/img1-12.png">
        </div>
      </div>
    </section>

    <section class="service">
      <div class="service_card">
        <div class="service_img">
          <i class="fal fa-truck-moving"></i>
        </div>
        <div class="service_body">
          <h4>Free Delivery</h4>
          <p>Orders over $100</p>
        </div>
      </div>

      <div class="separator"></div>

      <div class="service_card">
        <div class="service_img">
          <i class="fab fa-amazon-pay"></i>
        </div>
        <div class="service_body">
          <h4>Secure Payment</h4>
          <p>100% Secure Payment</p>
        </div>
      </div>

      <div class="separator"></div>

      <div class="service_card">
        <div class="service_img">
          <i class="far fa-badge-check"></i>
        </div>
        <div class="service_body">
          <h4>Money Back Guarantee</h4>
          <p>Within 30 Days</p>
        </div>
      </div>

      <div class="separator"></div>

      <div class="service_card">
        <div class="service_img">
          <i class="fad fa-comments"></i>
        </div>
        <div class="service_body">
          <h4>24/7 Support</h4>
          <p>Within 1 Business Day</p>
        </div>
      </div>
    </section>

    <section class="code">
        <div class="cat_book">
          <div class="block">
            <header>
              <h2>{{ cat1.name }} Books</h2>
              <a :href="'/categorie/'+cat1.id">
                <span>View All</span>
                <i class="far fa-chevron-right"></i>
              </a>
            </header>
            <div class="cat_products">
              <div class="stick-list">
                <div class="product" v-for="(book, i) in bookCat1" :key="i">
                  <div class="media">
                    <a :href="'/categorie/'+book.category.id+'/book/'+book.id">
                      <img width="120" height="183" :src="book.image">
                    </a>
                    <div class="media-body">
                      <div class="cat">
                        <a :href="'/categorie/'+book.category.id">{{ book.category.name }}</a>
                      </div>
                      <h6 class="title">
                        <a :href="'/categorie/'+book.category.id+'/book/'+book.id">{{ book.title }}</a>
                      </h6>
                      <div class="auth">
                        <a :href="'/author/'+book.author.id">{{ book.author.name }}</a>
                      </div>
                      <div class="price">
                        <span>
                        ${{ book.price }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="author">
            <h2>Favorite Authors</h2>
            <div class="author__inner border">
              
              <div class="author-content" v-for="(author, i) in authors" :key="i">
                <a :href="'/author/'+author.id" class="d-block">
                  <img class="author-img" :src="author.image">
                </a>

                <div class="author-body">
                  <h6>
                    <a :href="'/author/'+author.id">{{ author.name }}</a>
                  </h6>
                  <!-- <span>3 Published Books</span> -->
                </div>
              </div>

            </div>
          </div>
          <div class="news">
            <h2>New Releases</h2>
            <div class="commerce">
              <div class="product-box" v-for="(book, i) in books" :key="i">
                <div class="product border">
                  <div class="product__inner">
                    
                    <div class="product-image">
                      <a :href="'/categorie/'+book.category.id+'/book/'+book.id" class="d-block">
                        <img :src="book.image">
                      </a>
                    </div>
                    <div class="product-body">
                      <div class="product-cat">
                        <a :href="'/categorie/'+book.category.id">{{ book.category.name }}</a>
                      </div>

                      <h2 class="product-title">
                        <a :href="'/categorie/'+book.category.id+'/book/'+book.id">{{ book.title }}</a>
                      </h2>
                      <div class="product-auth">
                        <a :href="'/author/'+book.author.id">{{ book.author.name }}</a>
                      </div>
                      <div class="product-price">
                        <span>
                          ${{ book.price }}
                        </span>
                      </div>
                    </div>
                    <!-- <div class="product-hover" v-show="loggedIn">
                      <a>add to cart</a>
                    </div> -->
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="cat_book">
          <div class="block">
            <header>
              <h2>{{ cat2.name }} Books</h2>
              <a :href="'/categorie/'+cat2.id">
                <span>View All</span>
                <i class="far fa-chevron-right"></i>
              </a>
            </header>
            <div class="cat_products">
              <div class="stick-list">
                <div class="product" v-for="(book, i) in bookCat2" :key="i">
                  <div class="media">
                    <a :href="'/categorie/'+book.category.id+'/book/'+book.id">
                      <img width="120" height="183" :src="book.image">
                    </a>
                    <div class="media-body">
                      <div class="cat">
                        <a :href="'/categorie/'+book.category.id">{{ book.category.name }}</a>
                      </div>
                      <h6 class="title">
                        <a :href="'/categorie/'+book.category.id+'/book/'+book.id">{{ book.title }}</a>
                      </h6>
                      <div class="auth">
                        <a :href="'/author/'+book.author.id">{{ book.author.name }}</a>
                      </div>
                      <div class="price">
                        <span>
                        ${{ book.price }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
    </section>
  <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>

.container{
   @media only screen and (max-width: 768px){
      padding: 0;
      align-items: center;
    }
  display: flex;

  .position-relative{
    margin-right: 20px;
  }
}

.border-bottom{
  @media only screen and (max-width: 768px){
      justify-content: flex-start;
    }
  display: flex;
  position: relative;
  justify-content: space-around;
  border: none;

  .position-relative{
    @media only screen and (max-width: 768px){
      padding: .5rem 1rem;
    }
    background-color: #f75454;
    padding: 1rem 2rem;
    
    .btn{
      display: flex;
      align-items: center;
      padding: 0;
      box-shadow: none;

      & span{
        margin-left: 1rem;
        color: #fff;
      }

      & .far{
        font-size: .875rem;
        font-weight: 900;
        color: #fff;
        display: inline-block;
      }

      & .fa-chevron-down, .fa-chevron-right{
         @media only screen and (max-width: 768px){
          margin-left: 5px;
        }
        margin-left: 2rem;
      }

      & .fa-bars{
        font-size: 1.5rem;
      }
    }

    .card-body{
      padding: 0;
      position: absolute;
      z-index: 2;
      top: 100%;
      left: 0;
      right: 0;
      border: 1px solid #eae8e4;
      background-color: #fff;

      .menu:hover{
        overflow-y: scroll;
      }

      .menu{
        overflow-y: hidden;
        list-style: none;
        margin: 0;
        max-height: 424px;
        

        .menu-item{
          display: flex;
          align-items: center;
          padding: .875rem 1rem;
          border-bottom: 1px solid #eae8e4;
          text-decoration: none;
          color: #19110b;
          
          
          &:hover li{
            color: #f75454;
          }
        }
      }
    }
  }

  .secondary-navigation{
    margin-right: 30px;
     @media only screen and (max-width: 768px){
      display: none;
    }
  }

  .nav ul{
    display: flex;
    list-style: none;
    margin-bottom: 0;

    & li{
      
      position: relative;
      & a{
         @media only screen and (max-width: 768px){
          margin-left: 8px;
          padding: 0;
        }
        display: block;
        margin: 0 8px;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        color: #000;
        padding: 1rem 0;
      }

      & a:hover{
        color: #f75454;
      }
      
      .deroulant > a::after{
        content: " ▼";
        font-size: 12px;
      }

      .sous{
        display: none;
        border: 1px solid rgba(0, 0, 0, .15);
        background-clip: padding-box;
        background-color: #fff;
        position: absolute;
        min-width: 14rem;
        z-index: 1000;
        padding: 20px 0;

        & a{
          margin: 0;
          padding: .375rem 1.875rem;
          color: #19110b;
          transition: all 0.2s ease-in-out;
          font-size: 0.875rem;
        }
        & a:hover{
          color: #000;
          background-color: #f7f7f7;
          padding-left: 2.8rem;
        }
      }
    }

    & li:hover .sous{
      
      display: block;
    }
  }
}


.img-hero{
  @media only screen and (max-width: 768px){
    
  }
  background-image: url(../../assets/carousel.jpg);
  background-size: cover;
  max-width: 100%;
  height: auto;

  .carousel{
    @media only screen and (max-width: 768px){
      padding: 32px 24px;
    }
    padding: 96px 72px;
    display: flex;
    max-width: 100%;

    .offset{
      width: 60%;
      margin-left: 20%;
      
      .media{
        display: block;
        

        & h1{
          color: #beb4b4;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        & h2{
          font-size: 3.125rem;
          margin-bottom: 40px;


          span{
            font-weight: 400;
            display: block;
          }

          .bold{
            font-weight: 600;
          }
        }

        & a{
          padding: 12px 48px;
          color: #fff;
          background-color: #161619;
          border: 1px solid #161619;
        }
      }
    }
  }

  .fade-right{
    @media only screen and (max-width: 768px){
        display: none;
      }
    padding: 0 15px;
    
    img{
      display: block;
      width: 100%;
    }
  }
}



.service{
  @media only screen and (max-width: 768px){
    padding: 24px 0;
    justify-content: flex-start;
    flex-wrap: wrap;

  }
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 42px 0;

  border-bottom: 1px solid #eae8e4;

  .service_card{
    @media only screen and (max-width: 768px){
      flex-direction: column;
      width: 50%;
      padding: 0 15px;
    }
    display: flex;
    text-align: left;
    
    .service_img{
      @media only screen and (max-width: 768px){
        font-size: 1.875rem;
      }
      font-size: 3rem;
      color: #f75454;
    }
    .service_body{
      @media only screen and (max-width: 768px){
        margin: 0;
      }
      margin-left: 1.5rem;

      .h4{
        @media only screen and (max-width: 768px){
          font-size: .875rem;
        }
        font-size: 1.125rem;
        margin-bottom: .5rem;
        font-weight: 500;
        line-height: 1.2;
      }
    }
  }

  .separator{
    @media only screen and (max-width: 768px){
      display: none;
    }
    width: 1px;
    height: 80px;
    background-color: #eae8e4;
  }
}

.code{

  padding-bottom: 42px;

  h2{
    @media only screen and (max-width: 768px){
      font-size: 1.2rem;
      margin-bottom: 16px;
    }
    font: 26px inter, Helvetica, Arial, sans-serif;
    text-align: left;
    color: #161619;
    margin-bottom: 24px;
    font-weight: 500;
  }
  .block{
    @media only screen and (max-width: 768px){
      flex-direction: column;
      padding: 0 10px;
    }
    width: 100%;
    display: flex;
    padding-right: 30px;
    padding-left: 30px;
    margin: 32px auto;
    
    .border{
      border: 1px solid #eae8e4;
    }
    
    .author{
      @media only screen and (max-width: 768px){
        width: 100%;
        padding: 0;
        margin-bottom: 15px;
      }
      width: 25%;
      padding: 0 15px;

      .author__inner{
        @media only screen and (max-width: 768px){
          flex-direction: row;
          overflow-x: scroll;
          padding: 0;
          margin: 0;
        }
        display: flex;
        flex-direction: column;
          
        padding: 24px 24px 0;
        margin-bottom: 32px;

        .author-content{
          @media only screen and (max-width: 768px){
            flex-direction: column;
            padding: 8px;
            margin: 0;
            width: 33%;
          }
          width: 100%;
          display: flex;
          align-items: center;
          text-align: left;
          margin-bottom: 40px;

          .d_block{
            text-decoration: none;
            display: block;
          }

          .author-img{
            float: left;
            border-radius: 50%;
            width: 80px;
            height: 80px;
          }


          .author-body{
            margin-left: 16px;
            padding-left: 4px;

            h6{
              font-weight: normal;
              font-size: 1rem;
              margin-bottom: 0;
              overflow: hidden;
            }

            h6>a{
              color: #161619;
              text-decoration: none;
              text-transform: capitalize;
            }
            
            h6>a:hover{
              color: #f75454;
            }

            & span{
              font-size: 0.875rem;
              color: #7c6e65;
            }

          }
        }

      }

    }

    .news{
      @media only screen and (max-width: 768px){
        width: 100%;
        padding: 0;
      }
      width: 75%;
      padding: 0 15px;

      .commerce{
        @media only screen and (max-width: 768px){
          margin: 0;
        }
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 0 15px;

        .product:hover{
          box-shadow: 0 0 40px 0 rgba(22, 22, 25, 0.1);
          border-color: #161619!important;
        }


        .product-box{
          @media only screen and (max-width: 768px){
            width: 50%;
            padding: 0;
            margin-bottom: 20px;
          }
          width: 25%;
          padding: 0 15px;
          margin-bottom: 32px;

          .product{
            transition: all .3s ease-in-out;
            height: 100%;

            .product__inner{
              @media only screen and (max-width: 768px){
                padding: 15px;
              }
              padding: 30px;
              height: 100%;

              .product-image img{
                display: block;
                width: 120px;
                height: 183px;
                margin: 0 auto;
              }

              .product-body{
                transition: all .3s ease-in-out;
                position: relative;
                z-index: 1;
                padding: 16px 0 0;

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

              .product-hover{
                display: block;
                margin: 15px 0 0;
                & a{
                  cursor: pointer;
                  text-decoration: none;
                  text-transform: uppercase;
                  font-size: 1rem;
                  font-weight: 500;
                  color: #161619;
                }

                & a::after{
                  content: "";
                  display: block;
                  width: 0;
                  height: 2px;
                  background: #000;
                  transition: width .3s ease-in-out;
                }


                & a:hover::after{
                  width: 75%;
                }
              }

            }
          }
        }
      }
    }
  }

  .cat_book{
    @media only screen and (max-width: 768px){
      padding: 16px 10px;
    }
    padding: 48px 0 96px;
    width: 100%;
    background-image: url(../../assets/hero-carousel.jpg);

    .block{
      @media only screen and (max-width: 768px){
        width: 100%;
      }
      display: block;
      width: 90%;
      margin: 0 auto;
      padding: 0 15px;
    }

    header{
      @media only screen and (max-width: 768px){
        margin-bottom: 16px;
      }
      display: flex;
      margin-bottom: 32px;
      align-items: center;
      justify-content: space-between;

      h2{
        @media only screen and (max-width: 768px){
          font-size: 1.2rem;
        }
        font-size: 1.875rem;
        line-height: 1.2;
        font-weight: 600;
      }

      a{
        display: block;
        color: #161619;
        text-decoration: none;
        background-color: transparent;

        i{
          margin-left: 10px;
          font-size: 1rem;
        }
      }
    }

    .cat_products{
      .stick-list{
        overflow: hidden;
        display: flex;
        
        @media only screen and (max-width: 768px){
          margin-bottom: 16px;
          width: 100%;
          overflow-x: scroll;
        }
        

        .product{
          margin: 0 15px;
          width: 30%;
          @media only screen and (max-width: 768px){
            width: 100%;
          }
          
          
          .media{
            @media only screen and (max-width: 768px){
              padding: 20px;
            }
            padding: 30px;
            background-color: #fff;
            display: flex;
            align-items: flex-start;
            border: 1px solid #eae8e4;

            a{
              display: block;
              text-decoration: none;
              background-color: transparent;

              img{
                vertical-align: middle;
              }
            }

            .media-body{
              @media only screen and (max-width: 768px){
                margin-left: 15px;
              }
              margin-left: 30px;

              .cat, .title, .auth, .price{
                margin-bottom: 4px;
              }

              .cat{
                font-size: .875rem;
                text-transform: uppercase;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                a{
                  color: #f75454;
                  text-decoration: none;
                }
              }

              .title{
                height: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                line-clamp: 2;

                a{
                  color: #161619;
                  text-decoration: none;
                }
              }

              .auth{
                font-size: .875rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                a{
                  color: #7c6e65;
                  text-decoration: none;
                }
                a:hover{
                  color: #f75454;
                }
              }

              .price{
                font-size: 1.125rem;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

}

.ul-enter-active, .ul-leave-active{
        transition: transform .5s ease, opacity .5s ease;
    }

    .ul-enter-active{
        transition-delay: 0.1s;
    }

    .ul-enter{
        transform: translateX(-400px);
        opacity: 0;
    }

    .ul-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }

    .ul-leave-to{
        transform: translateY(400px);
        opacity: 0;
    }

    .ul-leave{
        transform: translateY(0px);
        opacity: 1;
    }

</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BookService from "../../services/ShopService"

export default {
  name: "Home",
  
  components: {
    Header,
    Footer
  },

  data: () => ({
    link: 1,
    books: [],
    authors: [],
    categories: [],
    random: {},
    best: {},
    trending: {},
    cat1: {},
    bookCat1: {},
    cat2: {},
    bookCat2: {}
  }),

   computed: {
        loggedIn(){
            var bool = false
            if (this.$store.state.auth.status.loggedIn && this.$store.state.auth.user != null) {
                bool = true
            }
            return bool
        },
        month(){
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ]

          var date = new Date()
          var month = (monthNames[date.getMonth()])

          return month
        }
    },

  methods: {
    getAll(){
      BookService.getAll()
      .then(response => {
        this.books = response.data
        this.aleatoire()
        if(this.books.length==0)
          this.$router.push({ name: "404" })
        this.books = this.trie(this.books).reverse().slice(0,12)
        
      }).catch(e => {
        this.$router.push({ name: "404" })
      })

    },

    getAut(){
      BookService.getAllAuteur()
      .then(response => {
        this.authors = response.data.slice(0, 9)
      }).catch(e => {
        console.log(e)
      })
    },



    trie(books){
      var list = books

      list.sort(function(a,b){
        return new Date(a.date) - new Date(b.date)
      })
      return list
    },

    aleatoire(){
      var min=0
      var max=this.books.length
      var order_by = []

      order_by = this.books.sort(function(a, b) {
          return parseFloat(b.purchased) - parseFloat(a.purchased)
      })

      var random = Math.floor(Math.random() * (max - min)) + min;

      this.random = this.books[random]
      this.best = order_by[0]
      this.trending = this.books[this.books.lastIndex]
    },

    getCat(){
      BookService.getAllCat()
        .then(response => {
            this.categories = response.data
            this.topFooter()
        }).catch(e => {
            console.log(e)
            this.$router.push({ name: "404" })
      })
    },

    topFooter(){
      var min=0
      var max=this.categories.length
      var random1 = Math.floor(Math.random() * (max - min)) + min
      var random2 = Math.floor(Math.random() * (max - min)) + min

      this.cat1 = this.categories[random1]
      this.cat2 = this.categories[random2]
      BookService.getCat(this.cat1.id)
      .then((result) => {
       this.bookCat1 = result.data.slice(0,3)
      })

      BookService.getCat(this.cat2.id)
      .then((result) => {
       this.bookCat2 = result.data.slice(0,3)
      })

    }
  },

  mounted(){
    this.getAll()
    this.getAut()
    this.getCat()
  }

}
</script>
