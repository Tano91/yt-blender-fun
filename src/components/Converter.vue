<template>
    <!-- Form Div -->
    <div class="top-container">
        <form @submit.prevent="handleSubmit">
            <h1>Youtube Converter</h1>
            <label for="">Enter Youtube Video URL:</label>
            <!-- Add Required Below! -->
            <input v-model="videoURL" type="text" name="VideoURL" placeholder="Video URL">

            <button>Convert!</button>

        </form>


    </div>
    <!-- Display Div -->

    <div class="bottom-container">
        <div v-if="successCheck === true" class="success">
            <img :src="thumbnailURL" alt="">
            <h2>{{ videoTitle }}</h2>
            <p>
                <b>Channel:</b> {{ channelTitle }}
            </p>


            <button>
                <a :href="videoLinkhd720" download target="_blank"> Download </a>
            </button>


        </div>

        <div v-else-if="successCheck === false" class="error">
            <p> {{ failureMessage }}</p>
        </div>
    </div>

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

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': process.env.VUE_APP_API_KEY,
                        'X-RapidAPI-Host': process.env.VUE_APP_API_HOST
                    }
                };

                const fetchAPI = await fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${this.videoID}`, options)


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

</style>