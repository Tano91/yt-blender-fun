<template>
    <!-- 
        div class="format-btn-container">
                        <button id="format-btn">Select Format</button>
                    </div>
                    <ul class="formats-dropdown">
                        <li>
                            <button class="formats-btn">
                                <a :href="videoLink_mp3_64" download target="_blank"> Audio MP3 - 64kb </a>
                                <a :href="videoLink_mp3_128" download target="_blank"> Audio MP3 - 128kb </a>
                                <a :href="videoLink_aac" download target="_blank"> Audio AAC</a>
                                <a :href="videoLink_1080" download target="_blank"> Video 1080p </a>
                                <a :href="videoLink_720" download target="_blank"> Video 720p </a>
                                <a :href="videoLink_480" download target="_blank"> Video 480p </a>
                                <a :href="videoLink_240" download target="_blank"> Video 240p </a>
                            </button>
                        </li>
                    </ul>
                </div>
-->

    <div class="formats-dropdown">
        <button class="format-btn">
            Select Format
        </button>
        <div class="dropdown-content">
            <a :href="videoLink_mp3_64" download target="_blank"> Audio MP3 - 64kb </a>
            <a :href="videoLink_mp3_128" download target="_blank"> Audio MP3 - 128kb </a>
            <a :href="videoLink_aac" download target="_blank"> Audio AAC</a>
            <a :href="videoLink_1080" download target="_blank"> Video 1080p </a>
            <a :href="videoLink_720" download target="_blank"> Video 720p </a>
            <a :href="videoLink_480" download target="_blank"> Video 480p </a>
            <a :href="videoLink_240" download target="_blank"> Video 240p </a>
        </div>
    </div>



</template>


<style scoped>
.format-btn {
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
}

.formats-dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.formats-dropdown:hover .dropdown-content {
    display: block;
}

.formats-dropdown:hover .format-btn {
    background-color: #3e8e41;
}
</style>