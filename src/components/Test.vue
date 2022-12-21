<template>
    <!-- https://www.youtube.com/watch?v=UxxajLWwzqY -->

    <!-- New Interface -->
    <div class="main">
        <div class="search">
            <div class="heading">
                <h1>
                    YTBlender
                </h1>
                <p class="tagline">Download Youtube Videos For Free!</p>
            </div>
            <form @submit.prevent="handleSubmit" class="input-container">
                <input v-model="videoURL" type="text" name="VideoURL" placeholder="Paste URL for a Video"
                    class="custom-field">
                <button class="searchbtn">Search</button>
            </form>
        </div>
        <!-- Results Div -->
        <div class="results">
            <!-- Spinner -->
            <div v-if="spinnerLoad === true">
                <Spinner />
            </div>
            <!-- Success Check -->
            <div v-if="successCheck === true" class="video-display">
                <div class="thumbnail">
                    <img :src="thumbnailURL" alt="">
                </div>
                <div class="video">
                    <div class="videotitle">{{ videoTitle }}</div>
                    <div class="videolength"> 20:35 </div>

                    <!-- DROPDOWN! -->
                    <div class="format-btn-div">
                        <div id="formats-dropdown">
                            <a href="#" id="format-btn">Select Format</a>
                            <ul id="dropdown-content">
                                <li><a :href="videoLink_mp3_64" download target="_blank"> Audio MP3 - 64kb </a></li>
                                <li><a :href="videoLink_mp3_128" download target="_blank"> Audio MP3 - 128kb </a></li>
                                <li><a :href="videoLink_aac" download target="_blank"> Audio AAC</a></li>
                                <li><a :href="videoLink_1080" download target="_blank"> Video 1080p </a></li>
                                <li><a :href="videoLink_720" download target="_blank"> Video 720p </a></li>
                                <li><a :href="videoLink_480" download target="_blank"> Video 480p </a></li>
                                <li><a :href="videoLink_240" download target="_blank"> Video 240p </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Failure Check -->
            <div v-else-if="successCheck === false" class="error">
                <p> {{ failureMessage }}</p>
            </div>
        </div>

        <!-- Terms -->
        <div class="terms-text">By using our service you are accepting our <a href="/">Terms of Service.</a>
        </div>
        <div class="coffee">
            <button>Buy Me a Coffee</button>
        </div>
        <div class="description">
            <h2>What is YTBlender?</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a
                page
                when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable
                English. Many
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
                versions
                have
                evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the
                like).
            </p>
            <h2>Features:</h2>
            <p>1) No Ads</p>
            <p>2) Lots of Different Formats</p>
            <p>3) Quick, Easy & Safe</p>

        </div>
    </div>


    <footer>
        <div class="inside-footer">
            <div class="footer-links">
                <a href="/">Contact Us</a>
                <a href="/">Privacy Policy</a>
                <a href="/">Terms of Use</a>
            </div>
            <div class="copyright">© 2022 YTBlender. All Rights Reserved.</div>
        </div>
    </footer>



</template>

<script>
import { throwStatement } from '@babel/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'


export default {
    name: 'Converter',
    components: { Spinner },

    data() {
        return {
            spinnerLoad: false,
            videoURL: '',
            videoID: '',
            failureMessage: '',
            successCheck: null,
            videoTitle: '',
            channelTitle: '',
            // Converted Formats
            videoLinkFormatMedium: undefined,
            videoLinkFormat_720: undefined,
            videoLinkMedium: undefined,
            videoLink_720: undefined,
            thumbnail320: undefined,
            thumbnailURL: undefined,

        }
    },
    methods: {
        async handleSubmit() {
            this.spinnerLoad = true
            if (this.videoURL === undefined || this.videoURL === "" || this.videoURL === null) {
                this.successCheck = false
                this.failureMessage = "Please enter a valid Youtube URL!"
                console.log(this.successCheck)
            } else {
                this.successCheck = true

                const regex = /(https\:\/\/www\.youtube\.com\/watch\?v=)/
                this.videoID = this.videoURL.split(regex)[2];

                console.log(this.successCheck)
                console.log(this.videoID)

                // FETCH YT API

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': process.env.VUE_APP_API_KEY,
                        'X-RapidAPI-Host': process.env.VUE_APP_API_HOST
                    }
                };

                const fetchAPI = await fetch(`https://yt-api.p.rapidapi.com/dl?id=${this.videoID}`, options)


                const fetchResponse = await fetchAPI.json()
                console.log(fetchResponse)

                if (fetchResponse.status === "OK") {
                    this.successCheck = true
                    this.videoTitle = fetchResponse.title
                    this.channelTitle = fetchResponse.channelTitle
                    this.videoLinkFormatMedium = fetchResponse.formats.find(item => item.quality === 'medium')
                    this.videoLinkFormat_720 = fetchResponse.formats.find(item => item.quality === 'hd720')
                    this.videoLinkMedium = this.videoLinkFormatMedium.url
                    this.videoLink_720 = this.videoLinkFormat_720.url
                    this.thumbnail320 = fetchResponse.thumbnail.find(item => item.width === 320)
                    this.thumbnailURL = this.thumbnail320.url

                } else {
                    this.successCheck = false
                    this.failureMessage = fetchResponse.messages

                }
            }
            this.spinnerLoad = false;

        }

    }
}


</script>

<style scoped>
.main {
    padding: 1em;
    /* background: rgb(255, 208, 208); */
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 50vw;
    align-items: center;
    margin: 0 auto;
}

@media (max-width: 800px) {
    .main {
        height: 100%;
        width: 85vw;
        align-items: center;
        margin: 0 auto;
    }
}

.search {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}

.heading {
    display: flex;
    flex-flow: column;
    align-items: center;
    font-size: 2em;

}

.heading h1 {
    margin: 5px;
    font-size: 1.2em
}

.heading p {
    margin-top: 5px;
    text-align: center;
    font-size: .65em;
}

footer {
    border-top: 1px solid #fec6c6;
    padding: 1em;
    /* background: white; */
    display: flex;
    flex-flow: column;
    height: 100%;
    max-width: 66%;
    align-items: center;
    margin: 0 auto;
    margin-top: 20px;
}

@media (max-width: 800px) {
    footer {

        width: 85vw;
        justify-content: space-around;
        align-items: center;
        margin: 0 auto;
    }
}

/* Input Section */


.input-container {
    /* background: green; */
    width: 50vw;
    font-size: 2em;
    display: flex;
    align-content: center;
    justify-content: center;
}

@media (max-width: 800px) {
    .input-container {
        width: 85vw;
        flex-direction: column;
        align-items: center;

    }
}



.custom-field {
    /* border: 1px solid #cd1a1a; */
    border: none;
    outline: none;
    border-radius: 5px;
    width: 50vw;
    padding: 0.6em;
    font-size: 0.7em;
}

.custom-field:hover {
    border: 1px solid #cd1a1a;
}


@media (max-width: 800px) {
    .custom-field {
        width: fit-content;
        margin-bottom: 10px;
    }
}

.searchbtn {
    background-color: #cd1a1a;
    color: white;
    border: none;
    /* border: 1px solid #cd1a1a; */
    padding: 12px;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 0.6em;
    cursor: pointer;
}


@media (max-width: 800px) {
    .searchbtn {
        margin-left: 0;

    }
}

.coffee {
    display: flex;
    align-content: center;
    justify-content: center;
    padding-top: 0.5em;
    padding-bottom: 1.2em;
}

.coffee button {
    cursor: pointer;
}

.terms-text {
    font-size: 1.3em;
    padding-top: 1em;
    text-align: center;
    margin-bottom: 10px;
}

.coffee button {
    background-color: rgba(255, 221, 0);
    color: rgb(86, 78, 31);
    border: 1px solid rgb(86, 78, 31);
    border-radius: 5px;
    font-size: 1em;
    padding: .5em;
}

.description {
    /* border: 1px solid #cd1a1a; */
    margin-top: 20px;
    background: white;
    padding: 10px;


}

.results {
    width: 50vw;
    margin: 10px;
    display: flex;
    flex-direction: column;
    background: white;
    /* border: 1px solid #cd1a1a; */
    word-wrap: break-word;
}

@media (max-width: 800px) {
    .results {
        width: 85vw;
        word-wrap: break-word;
        overflow-wrap: break-word;
        display: flex;
        flex-direction: column;
    }
}

.video-display {
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    margin-bottom: 10px;
}



@media (max-width: 800px) {
    .video-display {
        width: 85vw;
        display: flex;
        flex-direction: column;
    }
}

.thumbnail {
    margin-top: 10px;
    display: flex;
    align-content: center;
    justify-content: center;
}

.thumbnail img {
    border-radius: 3%;
    object-fit: scale-down;
}

.videotitle {
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
    font-size: 1.5em;
    word-wrap: break-word;
}

@media (max-width: 800px) {

    .video,
    .videotitle,
    .videolength {
        margin-left: 0px;
    }
}

.videolength {
    text-align: center;
    font-style: italic;
    font-size: 1.1em;
    margin-top: 10px;
}

@media (max-width: 800px) {

    .video,
    .videotitle,
    .videolength {
        margin-left: 0px;
    }
}


/* Dropdown Stuff */

#formats-dropdown ul {
    display: none;
    position: relative;
    top: -55px;
    padding: 55px 0 0 0;
    margin: 0;


}

@media (max-width: 800px) {

    ul {
        margin-left: 0px;
    }
}

#formats-dropdown ul:hover {
    display: block;
}


#dropdown-content li {
    background: white;
    padding: 10px;
    list-style: none;
    color: black;
}

#dropdown-content li a {
    text-decoration: none;
    color: black;
}

#dropdown-content li:hover {
    background: #eee;
    cursor: pointer;
    color: black;
}

#dropdown-content li a:hover {
    color: rgb(84, 2, 2);
}

#format-btn {
    margin-top: 10px;
    /* margin-left: 40px; */
    display: inline-block;
    padding: 10px;
    background: #cd1a1a;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

@media (max-width: 800px) {

    #format-btn {
        margin-left: 0px;
    }
}

#formats-dropdown {
    display: inline-block;
}

#formats-dropdown:active ul {
    display: block;
}

#formats-dropdown:active ul:hover {
    display: block;
}

#formats-dropdown:active #format-btn {
    display: inline-block;
    padding: 10px;
    background: #cd1a1a;
    color: white;
}

.format-btn-div {
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>