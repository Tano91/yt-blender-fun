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
                    class="custom-field">
                <button class="searchbtn">Get Video</button>
                <button @click="handleMP3" class="searchbtn_mp3">Get mp3</button>
            </form>

        </div>
        <!-- Results for Video Div -->
        <div class="results-video">
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
                    <div class="videotitle">{{ videoTitle }}</div>
                    <div class="videolength"> <b>Duration:</b> {{ videoLength }} Minutes </div>

                    <!-- Format Buttons -->

                    <button v-if="videoFormat_1080_Link !== undefined"><a :href="videoFormat_1080_Link" download
                            target="_blank"> Video 1080p </a></button>
                    <button v-if="videoFormat_720_Link !== undefined"><a :href="videoFormat_720_Link" download
                            target="_blank"> Video 720p </a></button>
                    <button v-if="videoFormat_480_Link !== undefined"><a :href="videoFormat_480_Link" download
                            target="_blank"> Video 480p </a></button>
                    <button v-if="videoFormat_360_Link !== undefined"><a :href="videoFormat_360_Link" download
                            target="_blank"> Video 360p </a></button>


                </div>
            </div>
            <!-- Failure Check -->
            <div v-else-if="successCheck === false" class="error">
                <p> {{ failureMessage }}</p>
            </div>
        </div>

        <div class="results-mp3">
            <!-- Spinner -->
            <div v-if="spinnerLoad === true">
                <Spinner />
            </div>
            <!-- Success Check -->
            <div v-if="successCheck_mp3 === true" class="video-display">
                <div class="thumbnail">
                    <img :src="thumbnail_URL" alt="">
                </div>
                <div class="video">
                    <div class="videotitle">{{ videoTitle }}</div>
                    <div class="videolength"> <b>Duration:</b> {{ videoLength }} Minutes </div>

                    <!-- Format Button -->

                    <button v-if="videoFormat_mp3_Link !== undefined"><a :href="videoFormat_mp3_Link" download
                            target="_blank"> Download MP3 </a></button>


                </div>
            </div>
            <!-- Failure Check -->
            <div v-else-if="successCheck_mp3 === false" class="error">
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
            // Spinner State
            spinnerLoad: false,
            //Youtube Link Variables
            videoURL: '',
            videoID: '',
            // Success / Failure Check Varaibles
            failureMessage: '',
            successCheck: null,
            successCheck_mp3: null,
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
            videoFormat_mp3_Link: undefined,

            mp3_btn_clicked: false
        }
    },
    methods: {
        convert(value) {
            return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : "00");
        },
        handleFormats(res) {
            for (let item of res.adaptiveFormats) {
                if (item.quality === "hd1080" && item.mimeType.includes("video/mp4")) {
                    this.videoFormat_1080_Link = item.url;
                } else if (
                    item.quality === "hd720" &&
                    item.mimeType.includes("video/mp4")
                ) {
                    this.videoFormat_720_Link = item.url;
                } else if (
                    item.quality === "large" &&
                    item.mimeType.includes("video/mp4")
                ) {
                    this.videoFormat_480_Link = item.url;
                } else if (
                    item.quality === "medium" &&
                    item.mimeType.includes("video/mp4")
                ) {
                    this.videoFormat_360_Link = item.url;
                }
            }
            console.log(this.videoFormat_1080_Link)
        },

        handleMP3() {
            this.mp3_btn_clicked = true;
        },
        async handleSubmit() {
            if (this.mp3_btn_clicked === true) {
                console.log('button clicked!')
            }
            this.spinnerLoad = true
            if (this.videoURL === undefined || this.videoURL === "" || this.videoURL === null) {
                this.successCheck = false
                this.failureMessage = "Please enter a valid Youtube URL!"
            } else {
                this.successCheck = true

                const regex = /(https\:\/\/www\.youtube\.com\/watch\?v=)/
                this.videoID = this.videoURL.split(regex)[2];

                // FETCH YT-API

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
                    //Set SuccessCheck & Assign Title & Length values

                    this.successCheck = true
                    this.videoTitle = fetchResponse.title
                    this.videoLength = this.convert(fetchResponse.lengthSeconds)

                    //Find & Assign Thumbnail
                    this.thumbnail_320 = fetchResponse.thumbnail.find(item => item.width === 320)
                    this.thumbnail_URL = this.thumbnail_320.url

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

</style>