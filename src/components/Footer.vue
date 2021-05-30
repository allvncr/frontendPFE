<template>
    <div class="footer">
        <footer>
            <div class="contact">
                <router-link class="logo" to="/">
                    Book
                    <span>
                        <i class="fad fa-won-sign"></i>
                    </span>
                    orm
                </router-link>

                <p>
                    1400 Skanes, Suite 02 Eddhis, CA 9622 Tunisia
                </p>
                
                <div class="mail">
                    <p>
                        sale@bookworm.com
                    </p>
                    <p>
                        +216 50-896-365
                    </p>
                </div>
                <ul class="social-icon">
                    <li class="first">
                        <a href="/coming">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/coming">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/coming">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/coming">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="bonk">
                    <h4>Explore</h4>
                    <ul>
                        <li>
                            <a href="/help/about">About us</a>
                        </li>
                        <li v-if="!loggedIn">
                            <a href="/auth/no">Sign in/Join</a>
                        </li>
                        <li>
                            <a href="/404">404 Error</a>
                        </li>
                        <li>
                            <a href="/coming">Coming Soon</a>
                        </li>
                    </ul>
                </div>

                <div class="bonk">
                    <h4>Customer Service</h4>
                    <ul>
                        <li>
                            <a href="/help/faq">Help Center</a>
                        </li>
                        <li>
                            <a href="/help/contact">Contact Us</a>
                        </li>
                        <li>
                            <a href="/shop">Store Pickup</a>
                        </li>
                    </ul>
                </div>

                <div class="bonk">
                    <h4>Policy</h4>
                    <ul>
                        <li>
                            <a href="/help/faq">Return Policy</a>
                        </li>
                        <li>
                            <a href="/help/terms">Terms Of Use</a>
                        </li>
                    </ul>
                </div>

                <div class="bonk">
                    <h4>Categories</h4>
                    <ul>
                        <li v-for="(category, i) in categories" :key="i">
                            <a :href="'/categorie/'+category.id">{{ category.name }}</a>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
        <div class="space">
            <div class="d-flex">
                <p>&copy;2021 Book Worm. All rights reserved</p>
                <!-- <div>
                    <img src="https://demo4.madrasthemes.com/bookworm/wp-content/themes/bookworm/assets/img/credit-cards.png">
                </div> -->
                <p>Site developed by <a href="https://www.facebook.com/vianney.abloyao">Ablo Vianney</a> & <a href="https://www.facebook.com/jeanyannick.gnagoh">Gnagoh Loic</a></p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    p{
        font: 14px inter,Helvetica, Arial,sans-serif;
    }

    .logo{
        display: block;
        text-decoration: none;
        text-transform: uppercase;
        color: #000;
        font-size: 1.5em;
        font-weight: 600;
        margin-bottom: 25px;

        & span{
            color: rgb(223, 35, 35);
            margin: 0 -7px;
        }
    }
    .footer{
        padding: 96px 0 0;
        @media only screen and (max-width: 768px){
            padding: 20px 0 0;;
        }
    }
    footer{
        @media only screen and (max-width: 768px){
            padding: 0;
            margin: 0;
            flex-direction: column;
        }
        border-bottom: 1px solid #eae8e4;
        padding: 0 15px 96px;
        margin: 0 45px;
        display: flex;

        .contact{
            width: 25%;
            margin-bottom: 40px;
            padding: 0 15px;
            @media only screen and (max-width: 768px){
                width: 100%;
            }

            & p{
                margin-bottom: 25px;
            }

            .mail{
                margin-bottom: 25px;
                & p{
                    margin: 0 0 .25rem;
                }
            }
        }

        .social-icon{
            display: flex;
            list-style: none;

            & li{
                border-radius: .25rem;
                font-size: 1rem;
                padding: .75rem 1.2rem;
                
                & a{
                    color: #19110b;
                    text-decoration: none;
                }
                & a:hover{
                    color: #f30b0b;
                }
            }
            & .first{
                padding-left: 0;
            }
        }
        .right{
            width: 75%;
            display: flex;
            @media only screen and (max-width: 768px){
                width: 100%;
                flex-direction: column;
            }
        }
        .bonk{
            @media only screen and (max-width: 768px){
                width: 100%;
            }

            width: 25%;
            padding: 0 15px;
            & h4{
                color: #19110b;
                font-size: 1.125rem;
                font-weight: 600;
                padding-bottom: 4px;
                margin-bottom: 32px;
            }
            & ul{
                list-style: none;

                & a{
                    display: inline-block;
                    color: #19110b;
                    text-decoration: none;
                    font-size: 14px;
                    padding: 9px 0;
                    transition: all .2s ease-in-out;
                }

                & a:hover{
                    color: #f30b0b;
                    padding-left: .75rem;
                }
            }
        }
    }

    .space{
        padding: 32px 0;
        .d-flex{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            margin: 0 45px;

            a{
                text-decoration: none;
                color: #f30b0b;
                font-weight: 600;
            }
            a:hover{
                color: #000;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        .space{
            .d-flex{
                flex-direction: column;
                margin: 0;
                padding: 8px;

                img{
                    max-width: 95%;
                }
            }
        }
    }

</style>

<script>
import BookService from "../services/ShopService"

export default {
    data(){
        return {
            categories: [],
        }
    },
    
    methods:{
        getCat(){
        BookService.getAllCat()
            .then(response => {
                this.categories = response.data
                this.categories = this.categories.slice(0,6)
            }).catch(e => {
                console.log(e)
            })
        },
    },
    computed: {
       loggedIn(){
            var bool = false
            if (this.$store.state.auth.status.loggedIn && this.$store.state.auth.user != null) {
                bool = true
            }
            return bool
        },
    },

    mounted(){
        this.getCat()
    }
}
</script>