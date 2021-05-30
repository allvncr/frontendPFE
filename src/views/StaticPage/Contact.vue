<template>
    <div class="Contact">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">Contact Us</router-link>
        </nav>
        <div class="title">
            <h2>Contact Us</h2>
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
                            <em>We will answer any questions you may have about our online sales, rights or partnership service right here.</em>
                        </p>
                    </div>
                    
                    <div class="double">
                        <div>
                            <h4>
                               Monastir Office
                            </h4>
                            <p>
                                1400 Skanes, Suite 02 Eddhis, CA 9622 <br>
                                Tunisia
                            </p>
                            <span>
                                sale@bookworm.com
                            </span>
                            <span>
                                +216 50-896-365
                            </span>
                        </div>
                        <div>
                            <h4>
                                Abidjan Office
                            </h4>
                            <p>
                                1418 Plateau , Suite 35 Riviera, YOP 9622 <br>
                                Ivory Coast
                            </p>
                            <span>
                                sale@bookworm.com
                            </span>
                            <span>
                                +225 49-791-423
                            </span>
                        </div>
                        
                    </div>
                    <div class="social">
                        <h4>
                            Social Media
                        </h4>
                        <ul>
                            <li>
                                <a href="">
                                    <font-awesome-icon :icon="[ 'fab', 'instagram' ]" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <font-awesome-icon :icon="[ 'fab', 'facebook-f' ]" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <font-awesome-icon :icon="[ 'fab', 'youtube' ]" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <font-awesome-icon :icon="[ 'fab', 'twitter' ]" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="entete">
                        <h3>Get In Touch</h3>
                    </div>
                    <div class="contact">
                        <form @submit.prevent="sendEmail">
                            <div class="field-container">
                                <div class="form">
                                    <label for="from_name">
                                        Name
                                        <span>*</span>
                                    </label>
                                    <input type="text" name="from_name" id="from_name" v-model="name" required minlength="3">
                                </div>
                                <div class="form">
                                    <label for="reply_to">
                                        Email
                                        <span>*</span>
                                    </label>
                                    <input name="reply_to" id="reply_to" type="email" v-model="email" required>
                                </div>
                            </div>
                            <div class="long">
                                <label for="subject">
                                    Subject
                                </label>
                                <input name='subject' id="subject" v-model="subject" type="text" required>
                            </div>
                            <div class="long">
                                <label for="message">
                                    Details please! Your review helps other shoppers.
                                </label>
                                <textarea v-model="message" name="message" id="message" placeholder="What did you like or dislike ?" required>

                                </textarea>
                            </div>
                            <div class="submit">
                                <button type="submit">Submit Message</button>
                            </div>
                        </form>
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

        h2{
            font-weight: 600;
            font-size: 1.875rem;
            margin: .25rem 0;
        }
    }

    .body{
        margin-bottom: 72px;
        border-bottom: 1px solid #eae8e4;

        figure{
            margin-bottom: 16px;

            img{
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

            .colum{
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
                padding: 48px 72px 0 72px;
                

                div{
                    margin-bottom: 48px;

                    h3{
                        font-weight: 600;
                        margin-bottom: 48px;
                        font-size: 2.5rem;
                    }

                    p{
                        margin-bottom: 32px;
                    }

                    p em{
                        font-style: italic;
                    }

                    h4{
                        margin-bottom: 24px;
                        font-size: 24px;
                    }
                }

                .double{
                    @media only screen and (max-width: 768px){
                        flex-direction: column;
                        
                    }
                    display: flex;
                    margin-left: -15px;
                    margin-bottom: 0;

                    div{
                        @media only screen and (max-width: 768px){
                            width: 100%;
                        }
                        padding: 0 15px;
                        width: 50%;
                    }

                    span{
                        display: block;
                        margin-bottom: 4px;
                        cursor: pointer;
                    }
                    span:hover{
                        color: #f75454;
                    }
                }

                .social{
                    margin-bottom: 64px;

                    ul{
                        display: flex;
                        list-style-type: none;

                        a{
                            text-decoration: none;
                            color: #000;
                        }

                        li{
                            padding: 12px 20px;
                        }

                        a:hover{
                            text-decoration: none;
                            color: #f75454;
                        }
                    }
                }

                .contact{
                    @media only screen and (max-width: 768px){
                        .field-container{
                            flex-direction: column;
                        }

                    }
                    .field-container{
                        display: flex;
                        margin: 0;
                    }

                    .form{
                        padding-right: 16px;
                        margin-bottom: 32px;
                        width: 50%;
                        @media only screen and (max-width: 768px){
                            width: 100%;
                        }

                        span{
                            color: #f75454;
                        }

                        input{
                            display: block;
                            width: 100%;
                            padding: .844rem 1rem;
                            font-size: .875rem;
                            font-weight: 400;
                            line-height: 1.5;
                            color: #7c6e65;
                            background-color: #fff;
                            background-clip: padding-box;
                            border: 1px solid #dfdcd7;
                        }
                        
                        
                    }
                    .long{
                        width: 100%;

                        input{
                            display: block;
                            width: 100%;
                            padding: .844rem 1rem;
                            font-size: .875rem;
                            font-weight: 400;
                            line-height: 1.5;
                            color: #7c6e65;
                            background-color: #fff;
                            background-clip: padding-box;
                            border: 1px solid #dfdcd7;
                        }

                        textarea{
                            display: block;
                            width: 100%;
                            padding: .844rem 1rem;
                            font-weight: 400;
                            line-height: 1.5;
                            color: #7c6e65;
                            background-color: #fff;
                            background-clip: padding-box;
                            border: 1px solid #dfdcd7;
                            height: 129px;
                        }
                    }
                }

                .submit{
                    button{
                        border: 1px solid #ddd;
                        font-size: 1em;
                        height: 3.75rem;
                        padding: .75rem 3rem;
                        color: #fff;
                        background-color: #161619;
                        border-color: #161619;
                    }

                    button:hover{
                        background: #fff;
                        color: #161619;
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
import emailjs from 'emailjs-com'

export default {
    name: "Contact",
    
    components: {
        Header,
        Footer
    },

    data(){
        return {
            name: "",
            email: "",
            message: "",
            subject: ""
        }
    },

    methods: {
        sendEmail(e) {
            const serviceID = 'service_edxe69s';
            const templateID = 'template_uwil6t7';
            const userID= "user_mfgYfHYDh8u9tLRKWyGiZ"

            emailjs.sendForm(serviceID, templateID, e.target, userID)
                .then(() => {
                    alert('Sent!')
                    this.name = ''
                    this.email = ''
                    this.message = ''
                    this.subject = ''
                }, (err) => {
                    alert(JSON.stringify(err))
            })
        }
    }
}
</script>
