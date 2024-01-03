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
            <!-- Handle Submit for Video Formats -->
            <form @submit.prevent="handleSubmit" class="input-container">
                <input v-model="videoURL" type="text" name="VideoURL" placeholder="Paste URL for a Video"
                    class="custom-input-field">
                <button class="searchbtn">
                    Search
                    <img id="arrow-icon" src="/arrow_icon.svg" alt="">
                </button>
            </form>

        </div>
        <!-- Results for Video Div -->
        <div class="results">
            <!-- Spinner -->
            <div v-if="spinnerLoad === true">
                <Spinner />
            </div>
            <!-- Success Check -->
            <div v-if="successCheck === true" class="video-display">
                <div class="thumbnail">
                    <img :src="thumbnail_URL" alt="">
                </div>
                <div class="video">
                    <div class="videotitle"> <b>{{ videoTitle }}</b> </div>
                    <div class="videolength"> {{ videoLength }}</div>

                    <!-- Format Buttons -->

                    <div class="format-button-container">
                        <button class="format-button" v-if="videoFormat_1080_Link !== undefined"><a
                                :href="videoFormat_1080_Link" download="newfilename" type="video/mp4" target="_blank">
                                Video 1080p
                            </a></button>
                        <button class="format-button" v-if="videoFormat_720_Link !== undefined"><a
                                :href="videoFormat_720_Link" download="newfilename" type="video/mp4" target="_blank">
                                Video 720p
                            </a></button>
                        <button class="format-button" v-if="videoFormat_480_Link !== undefined"><a
                                :href="videoFormat_480_Link" download="newfilename" type="video/mp4" target="_blank">
                                Video 480p
                            </a></button>
                        <button class="format-button" v-if="videoFormat_360_Link !== undefined"><a
                                :href="videoFormat_360_Link" download="newfilename" type="video/mp4" target="_blank">
                                Video 360p
                            </a></button>
                    </div>



                </div>
            </div>
            <!-- Failure Check -->
            <div v-else-if="successCheck === false" class="error">
                <p> {{ failureMessage }}</p>
            </div>
        </div>

        <!-- Terms -->
        <div class="terms-text">By using our service you are accepting our <a href="/terms">Terms of Service.</a>
        </div>
        <div class="coffee">
            <button>
                <img class="coffee-logo" src="/bmc-logo.svg" alt="">
                <a href="https://www.buymeacoffee.com/tano">Buy Me a Coffee</a></button>
        </div>
        <div class="description-container">
            <h2 class="description-header">What is YTBlender?</h2>
            <p class="description">YTBlender is a quick, easy and simple Youtube Downloader Tool that converts videos to
                mp4 format and allows downloads without the need for registration. No need to install software on your
                computer, tablet or mobile device, just copy and paste the Youtube link and watch the magic happen, all
                for free!
            </p>
        </div>

        <div class="description-icons-container-first">
            <div class="description-icon">
                <img class="description-icon-image" src="/no_ads_icon.svg" alt="">
                No Ads
            </div>
            <div class="description-icon">
                <img class="description-icon-image" src="/format_icon.svg" alt="">
                .mp4 Format
            </div>
            <div class="description-icon">
                <img class="description-icon-image" src="/secure_icon.svg" alt="">
                Easy & Safe
            </div>
        </div>
        <div class="description-icons-container-second">
            <div class="description-icon">
                <img class="description-icon-image" src="/paste_icon.svg" alt="">
                Paste Link
            </div>
            <div class="description-icon">
                <img class="description-icon-image" src="/search_icon.svg" alt="">
                Click Search
            </div>
            <div class="description-icon">
                <img class="description-icon-image" src="/download-icon.svg" alt="">
                Download!
            </div>
        </div>
    </div>


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
            // Spinner State
            spinnerLoad: false,
            //Youtube Link Variables
            videoURL: '',
            videoID: '',
            // Success / Failure Check Varaibles
            failureMessage: '',
            successCheck: null,
            //Video Info
            videoTitle: '',
            videoLength: '',
            //Thumbnail Data
            thumbnail_320: undefined,
            thumbnail_URL: undefined,
            // Converted Formats
            videoFormat_1080_Link: undefined,
            videoFormat_720_Link: undefined,
            videoFormat_480_Link: undefined,
            videoFormat_360_Link: undefined,
        }
    },
    methods: {
        convert(value) {
            return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : "00");
        },
        handleFormats(res) {

            for (let arr of Object.entries(res.link)) {
                if (arr[1][2] === "hd720") {
                    this.videoFormat_720_Link = arr[1][0];
                }
                else if (arr[1][2] === "medium") {
                    this.videoFormat_360_Link = arr[1][0];
                }
            }
        },

        async handleSubmit() {
            this.spinnerLoad = true
            if (this.videoURL === undefined || this.videoURL === "" || this.videoURL === null) {
                this.successCheck = false
                this.failureMessage = "Please enter a valid Youtube URL!"
            } else {
                this.successCheck = true

                const regex = /(https\:\/\/www\.youtube\.com\/watch\?v=)/
                this.videoID = this.videoURL.split(regex)[2];

                // FETCH YT-API : Youtube Video Download Info - By: ytjar

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': process.env.VUE_APP_API_KEY,
                        'X-RapidAPI-Host': process.env.VUE_APP_API_HOST
                    }
                };

                const fetchAPI = await fetch(`https://youtube-video-download-info.p.rapidapi.com/dl?id=${this.videoID}`, options)

                const fetchResponse = await fetchAPI.json()
                console.log(fetchResponse)

                if (fetchResponse.status === "ok") {
                    //Set SuccessCheck & Assign Title & Length values

                    this.successCheck = true
                    this.videoTitle = fetchResponse.title
                    this.videoLength = fetchResponse.length

                    //Find & Assign Thumbnail
                    // this.thumbnail_320 = fetchResponse.thumbnail.find(item => item.width === 320)
                    this.thumbnail_URL = fetchResponse.thumb

                    //Assign Formats to Variables
                    this.handleFormats(fetchResponse)

                } else {
                    //Catch any other Error
                    this.successCheck = false
                    this.failureMessage = fetchResponse.messages

                }
            }
            //Re-set Spinner
            this.spinnerLoad = false;

        }

    }
}


</script>

<style scoped>
.main {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 75vw;
    align-items: center;
    margin: 0 auto;
    /* font-family: 'Montserrat', sans-serif; */
    font-family: 'Open Sans', sans-serif;
}

.heading {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}

.heading h1 {
    margin-bottom: 0;
    color: #cd1a1a;
    font-size: 2.5em;
}

.tagline {
    margin-top: 5px;
    margin-bottom: 35px;
    color: #454545;
}


.input-container {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    width: 75vw;

}

@media (max-width: 800px) {
    .input-container {
        display: flex;
        flex-flow: column;
        align-items: center;
    }

}

.custom-input-field {
    border: 1px solid #dfdfdf;
    outline: none;
    width: 60%;
    border-radius: 5px;
    padding: 0.6em;
    font-size: 1.3em;
    height: 56px;
    box-sizing: border-box;
}

.custom-input-field::placeholder {
    color: #dfdfdf
}

.custom-input-field:hover {
    box-sizing: border-box;
    border: 1px solid #cd1a1a;
}

@media (max-width: 800px) {
    .custom-input-field {
        width: 100%;
        margin-bottom: 10px;
    }
}

.searchbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cd1a1a;
    color: white;
    border: none;
    padding: 12px;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 1.5em;
    border: 1px solid #cd1a1a;
    cursor: pointer;
    font-weight: bold;
}

.searchbtn:hover {
    background: white;
    color: #cd1a1a;
}

@media (max-width: 800px) {
    .searchbtn {
        margin-left: 0;
        width: 50%;

    }
}

#arrow-icon {
    width: 30px;
    height: 30px;
    margin-left: 5px;
}

.terms-text {

    text-align: center;
    margin: 20px;
    color: #454545;
}

.terms-text a {
    color: #454545;
}

.coffee {

    margin-top: px;
    margin-bottom: 50px;
}

.coffee button {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;

    background: #FFDD00;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 12px;
    font-size: 1em;
    border: 1px solid #FFDD00;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}

.coffee a:link { 
  text-decoration: none; 
} 
.coffee a:visited { 
  text-decoration: none; 
} 
.coffee a:hover { 
  text-decoration: none; 
} 
.coffee a:active { 
  text-decoration: none; 
}

.coffee button:hover {
    background: white;
    color: black
}

.coffee-logo {
    width: 35px;
    height: 35px;
    margin-right: 10px;
}


/* Results Display Section */

.results {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    width: 75vw;
    padding-bottom: 30px;
    border-bottom: 1px solid #dfdfdf;
}


.video-display {
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: space-between;
}

@media(max-width:800px) {
    .video-display {
        flex-direction: column;
        justify-content: center;
    }
}

.thumbnail img {
    border-radius: 10px;
}

@media(max-width:800px) {
    .thumbnail img {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

@media(max-width:800px) {
    .thumbnail {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.video {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.videotitle {
    text-align: center;
    font-size: 1.2em;
    margin-bottom: 30px;
}

.videolength {
    text-align: center;
}

.format-button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
}

@media(max-width:800px) {
    .format-button-container {
        flex-direction: column;

    }
}

.format-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #cd1a1a;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #cd1a1a;
    cursor: pointer;
    font-weight: bold;
    margin: 8px;
    font-size: 1em;
}

.format-button:hover,
.format-button a:hover {
    background: white;
    color: #cd1a1a;
}

.format-button a {
    text-decoration: none;
    color: white;
}



/* Description Styles */


.description-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #dfdfdf;

    background: white;
    padding: 15px 40px;

}

.description-header {
    margin-top: 30px;
    color: #454545;
    text-align: center;
}

.description {
    text-align: justify;
    margin-bottom: 30px;
    color: #454545;
    line-height: 30px;
}

.description-icons-container-first {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-top: 15px;
    /* background: red; */
    border-bottom: 1px solid #dfdfdf;
    color: #454545;
}


.description-icons-container-second {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-top: 15px;
    /* background: red; */
    /* border-bottom: 1px solid #dfdfdf; */
    color: #454545;
}

@media(max-width:800px) {

    .description-icons-container-first,
    .description-icons-container-second {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
}

.description-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    width: 30%;
    height: 20vh;
    /* background-color: pink; */
}

@media(max-width:800px) {
    .description-icon {
        font-size: 15px;
    }
}

.description-icon-image {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
}

@media (max-width: 800px) {
    .description-icons-container {
        flex-direction: column;
    }
}
</style>
