<template>
    <div class="About">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">About Us</router-link>
        </nav>
        
        <div class="title">
            <h2>About Us</h2>
        </div>
        <div class="body">
            <figure>
                <img src="https://demo4.madrasthemes.com/bookworm/wp-content/uploads/2020/08/img1-1.jpg">
            </figure>

            <div class="d-block">
                <div class="colum">
                    <div class="entete">
                        <h3>Welcome to Bookworm</h3>
                        <p>
                            <em>“Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model search for eolved over sometimes by accident, sometimes on purpose ”</em>
                        </p>
                    </div>
                    <div>
                        <h4>
                            What we really do?
                        </h4>
                        <p>
                            Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum. Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus. Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue. Pellentesque vitae eros eget enim mollis placerat. Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus. Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue. Pellentesque vitae eros eget enim mollis placerat.
                        </p>
                    </div>
                    <div class="double">
                        <div>
                            <h5>
                                Our Vision
                            </h5>
                            <p>
                                Pellentesque sodales augue eget ultricies ultricies. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sagittis ultrices condimentum.
                            </p>
                        </div>
                        <div>
                            <h5>
                                Our Vision
                            </h5>
                            <p>
                                Pellentesque sodales augue eget ultricies ultricies. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sagittis ultrices condimentum.
                            </p>
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
        margin-bottom: 72px;
        border-bottom: 1px solid #eae8e4;

        & figure{
            margin-bottom: 16px;

            & img{
                max-width: 100%;
                height: auto;
            }
        }

        & .d-block{
            @media only screen and (max-width: 768px){
                margin: 0;
                padding: 0 15px;
            }
            margin: 0 175px;
            background-color: #fff;
            position: relative;

            & .colum{
                @media only screen and (max-width: 768px){
                    margin: 0;
                    padding: 0;

                    .entete{
                        text-align: center;
                        h3{
                            font-size: 1.25rem;
                        }
                    }
                }
                margin: -112px 0 0;
                padding: 48px 24px 0 72px;

                & div{
                    margin-bottom: 48px;

                    & h3{
                        font-weight: 600;
                        margin-bottom: 48px;
                        font-size: 2.5rem;
                    }

                    & p{
                        margin-bottom: 16px;
                    }

                    & p em{
                        font-style: italic;
                    }

                    & h4{
                        margin-bottom: 24px;
                        font-size: 24px;
                    }
                }

                & .double{
                     @media only screen and (max-width: 768px){
                        flex-direction: column;
                    }
                    display: flex;
                    margin-left: -15px;

                    & div{
                        @media only screen and (max-width: 768px){
                            width: 100%;
                        }
                        padding: 0 15px;
                        width: 50%;
                        text-align: justify;
                        
                        & h5{
                            margin-bottom: 16px;
                            font-size: 1.25rem;
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

export default {
  name: "About",
  
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
