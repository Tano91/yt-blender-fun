<template>
    <!-- https://www.youtube.com/watch?v=UxxajLWwzqY -->

    <!-- New Interface -->
    <div class="main">
        <div class="search">
            <div class="heading">
                <h1>
                    YTBlender
                </h1>
                <p>Download Youtube Videos For Free!</p>
            </div>
            <form @submit.prevent="handleSubmit" class="input-container">
                <input v-model="videoURL" type="text" name="VideoURL" placeholder="Paste URL for a Video"
                    class="custom-field">
                <button class="searchbtn">Search</button>
            </form>
        </div>
        <!-- Display Div -->
        <div class="results">
            <div class="loader"></div>
            <div v-if="successCheck === true">
                <div class="thumbnail">
                    <img :src="thumbnailURL" alt="">
                </div>
                <div class="video">
                    <div class="videotitle">{{ videoTitle }}</div>
                    <div class="videolength"> videoLength </div>
                    <div class="format-btn-container">
                        <button id="format-btn">Select Format</button>
                    </div>
                    <ul class="formats">
                        <li>
                            <button>
                                <a :href="videoLinkhd720" download target="_blank"> Video 720p </a>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else-if="successCheck === false" class="error">
                <p> {{ failureMessage }}</p>
            </div>
        </div>
        <div class="terms-text">By using our service you are accepting our <a href="/">Terms of Service.</a></div>
        <div class="coffee">
            <button>Buy Me a Coffee</button>
        </div>
        <div class="description">
            <h2>What is YTBlender?</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
            <h2>Features:</h2>
            <ul>
                <li>No Ads.</li>
                <li>Lots of Different Formats</li>
                <li>Quick, Easy & Safe</li>
            </ul>
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


export default {
    name: 'Converter',

    data() {
        return {
            videoURL: '',
            videoID: '',
            failureMessage: '',
            successCheck: null,
            videoTitle: '',
            channelTitle: '',
            videoLinkFormatMedium: undefined,
            videoLinkFormathd720: undefined,
            videoLinkMedium: undefined,
            videoLinkhd720: undefined,
            thumbnail320: undefined,
            thumbnailURL: undefined,

        }
    },
    methods: {
        async handleSubmit() {
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
                    this.videoLinkFormathd720 = fetchResponse.formats.find(item => item.quality === 'hd720')
                    this.videoLinkMedium = this.videoLinkFormatMedium.url
                    this.videoLinkhd720 = this.videoLinkFormathd720.url
                    this.thumbnail320 = fetchResponse.thumbnail.find(item => item.width === 320)
                    this.thumbnailURL = this.thumbnail320.url

                } else {
                    this.successCheck = false
                    this.failureMessage = fetchResponse.messages

                }
            }

        }

    }
}


</script>

<style scoped>
.main {
    padding: 1em;
    background: rgb(255, 208, 208);
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 50vw;
    align-items: center;
    margin: 0 auto;
}

@media (max-width: 800px) {
    .main {
        height: 100vh;
        width: 85vw;

        align-items: center;
        margin: 0 auto;
    }
}

.heading {
    display: flex;
    flex-flow: column;
    align-items: center;
    font-size: 2em;

}

.heading h1 {
    margin: 5px;
}

.heading p {
    margin-top: 5px;
}

footer {
    padding: 1em;
    background: rgb(208, 234, 255);
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
}

@media (max-width: 800px) {
    footer {
        height: 100%;
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
    overflow: hidden;
    display: flex;
    align-content: center;
    justify-content: center;
}

::placeholder {
    font-size: 1.2em;
    padding-left: 20px;
}

@media (max-width: 800px) {
    .input-container {
        width: 85vw;
    }
}

.search {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}

.custom-field {
    border: 1px solid #cd1a1a;
    outline: none;
    border-radius: 5px;
    width: 50vw;
}

@media (max-width: 800px) {
    .custom-field {
        width: 100vw;
    }
}

.searchbtn {
    background-color: #cd1a1a;
    color: white;
    border: 1px solid #cd1a1a;
    padding: 12px;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 0.6em;
    cursor: pointer;
}


@media (max-width: 800px) {
    .searchbtn {
        margin-left: 0;
        margin-left: 2vw;
    }
}

.coffee {
    padding-top: 0.5em;
    padding-bottom: 1.2em;
}

.coffee button {
    cursor: pointer;
}

.terms-text {
    font-size: 1.3em;
    padding-top: 1em;
}

.coffee button {
    background-color: #cd1a1a;
    color: white;
    border: 1px solid #cd1a1a;
    padding: 12px;
    border-radius: 5px;
    font-size: 1em;
    padding: .5em;
}

.description {
    background: rgb(255, 227, 227);
    padding: 10px;


}
</style>