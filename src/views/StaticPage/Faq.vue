<template>
    <div class="FAQ">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">FAQ</router-link>
        </nav>
        <div class="title">
            <h2>Frequently Asked Questions</h2>
        </div>
        <div class="body">
            <div class="faq">
                <div class="accordion">
                    <h3>Shopping</h3>
                    <div class="card">
                        <div>
                            <button>
                                <span>
                                    Delivery charges for orders from the Online Shop?
                                </span>
                                <div>
                                    <font-awesome-icon :icon="[ 'fas', 'chevron-down' ]" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse">
                        <p>
                            A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum.
                        </p>
                    </div>
                    <div class="card">
                        <div>
                            <button>
                                <span>
                                    How long will delivery take?
                                </span>
                                <div>
                                    <font-awesome-icon :icon="[ 'fas', 'chevron-down' ]" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse">
                        <p>
                            A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum.
                        </p>
                    </div>
                    <div class="card">
                        <div>
                            <button>
                                <span>
                                    Do I receive an invoice for my order?
                                </span>
                                <div>
                                    <font-awesome-icon :icon="[ 'fas', 'chevron-down' ]" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse">
                        <p>
                            A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum.
                        </p>
                    </div>
                </div>




                <div class="accordion">
                    <h3>Payment</h3>
                    <div class="card">
                        <div>
                            <button>
                                <span>
                                    When the order payment is taken of my bank account?
                                </span>
                                <div>
                                    <font-awesome-icon :icon="[ 'fas', 'chevron-down' ]" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse">
                        <p>
                            A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum.
                        </p>
                    </div>
                    <div class="card">
                        <div>
                            <button>
                                <span>
                                    What should I do if I receive a damaged or wrong product?
                                </span>
                                <div>
                                    <font-awesome-icon :icon="[ 'fas', 'chevron-down' ]" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse">
                        <p>
                            A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum.
                        </p>
                    </div>
                    <div class="card">
                        <div>
                            <button>
                                <span>
                                    Can I change or cancel my order?What is “package tracking” in my orders?
                                </span>
                                <div>
                                    <font-awesome-icon :icon="[ 'fas', 'chevron-down' ]" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse">
                        <p>
                            A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum.
                        </p>
                    </div>
                    <div class="card">
                        <div>
                            <button>
                                <span>
                                    What is “package tracking” in my orders?
                                </span>
                                <div>
                                    <font-awesome-icon :icon="[ 'fas', 'chevron-down' ]" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse">
                        <p>
                            A placerat ac vestibulum integer vehicula suspendisse nostra aptent fermentum tempor a magna erat ligula parturient curae sem conubia vestibulum ac inceptos sodales condimentum cursus nunc mi consectetur condimentum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="ligne"></div>
        <Footer></Footer>
    </div>
</template>

<style lang="scss" scoped>
    *{
        font-family: inter,Helvetica, Arial, sans-serif;
    }

    nav{
        padding: 24px 54px;
        display: flex;
        align-items: center;
        font-size: .875rem;
        border-bottom: 1px solid #eae8e4;
        & a{
            display: block;
            text-decoration: none;
            color: #161619;
        }
    }

    .title{
        text-align: center;
        padding: 48px 0;

        & h2{
            font-weight: 600;
            font-size: 1.875rem;
            margin: .25rem 0;
        }
    }

    .body{
        margin-left: auto;
        margin-right: auto;
        border-bottom: 1px solid #eae8e4;
        padding: 0 15px;
        max-width: 60%;
        @media only screen and (max-width: 768px){
            max-width: 100%;
        }
        
        .faq{
            padding-bottom: 4px;

            .accordion{
                padding: 0 0 4px;
                margin-bottom: 56px;

                h3{
                    font-weight: 600;
                    margin-bottom: 32px;
                    font-size: 1.25rem;
                    line-height: 1.2;
                }
            }
            .card{
                border-radius: 0;
                position: relative;
                display: flex;
                flex-direction: column;

                button{
                    cursor: default;
                    padding: 16px 24px;
                    box-shadow: none;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border: 1px solid #000;
                    width: 100%;
                    line-height: 1.5;
                    background-color: #fff;
                    
                    span{
                        font-size: 1rem;
                        display: inline-block;
                    }
                }
            }
            .collapse{
                    padding: 24px;
                    margin: 0 4px;
                    display: block;

                    p{
                        margin-bottom: 16px;
                    }
                }
        }
    }

    .ligne{
        width: 100%;
        border-bottom: 1px solid #eae8e4;
    }
   
</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "FAQ",
  
  components: {
    Header,
    Footer
  },

   data(){
        return {
            
        }
    },
    

}
</script>
