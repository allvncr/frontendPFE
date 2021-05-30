<template>
    <div class="Contact">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link>
            <span class="breadcrumb-separator mx-2">
                <font-awesome-icon icon="angle-right"/>
            </span>
            <router-link to="">Terms and Conditions</router-link>
        </nav>

        <div class="title">
            <h2>Terms and Conditions</h2>
        </div>
        <div class="body">
            <div class="text">
                <h3>Intellectual Propertly</h3>
                <ol>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis diam erat. Duis velit lectus, posuere a blandit sit amet, tempor at lorem. Donec ultricies, lorem sed ultrices interdum.</li>
                    <li> Leo metus luctus sem, vel vulputate diam ipsum sed lorem. Donec tempor arcu nisl, et molestie massa scelerisque ut. Nunc at rutrum leo. Mauris metus mauris, tristique quis sapien eu, rutrum vulputate enim.</li>
                    <li>Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum.</li>
                    <li>Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus.</li>
                    <li>Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue.</li>
                    <li>Pellentesque vitae eros eget enim mollis placerat.</li>
                </ol>
            </div>
            <div class="text">
                <h3>Termination</h3>
                <ol>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis diam erat. Duis velit lectus, posuere a blandit sit amet, tempor at lorem. Donec ultricies, lorem sed ultrices interdum.</li>
                    <li> Leo metus luctus sem, vel vulputate diam ipsum sed lorem. Donec tempor arcu nisl, et molestie massa scelerisque ut. Nunc at rutrum leo. Mauris metus mauris, tristique quis sapien eu, rutrum vulputate enim.</li>
                    <li>Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum.</li>
                    <li>Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus.</li>
                    <li>Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue.</li>
                    <li>Pellentesque vitae eros eget enim mollis placerat.</li>
                </ol>
            </div>
            <div class="text">
                <h3>Termination</h3>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms and Conditions.</p>
            </div>
            <div class="text">
                <h3>Hyperlinks</h3>
                <p>Our website may contain hyperlinks. These hyperlinks connect you to sites of other organisations which are not our responsibility. We have used our reasonable endeavours in preparing our own website and the information included in it is done so in good faith. However, we have no control over any of the information you can access via other websites. Therefore, no mention of any organisation, company or individual to which our website is linked shall imply any approval or warranty as to the standing and capability of any such organisations, company or individual on the part of The Book Depository.</p>
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
        margin: 0 45px;
        padding: 0 15px;
        border-bottom: 1px solid #eae8ea;
        & div{
            margin-bottom: 56px;

            & h3{
                margin-bottom: 24px;
                padding-bottom: 4px;
                font-size: 1.25rem;
                font-weight: 600;
            }

            & ol li{
                margin-bottom: 4px;
                font-size: .875rem;
            }

            & p{
                line-height: 1.72;
                font-size: .875rem;
            }
        }
    }
    

</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Terms",
  
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
