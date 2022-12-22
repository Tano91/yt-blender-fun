<template>
    <footer>
        <div class="inside-footer">

            <div class="footer-links">
                <a href="mailto:ytblender@gmail.com">Contact Us</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
            </div>

            <div class="copyright">© 2022 Santano McCalla. All Rights Reserved.</div>

        </div>
    </footer>
</template>

<style scoped>
footer {
    border-top: 1px solid #dfdfdf;
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 75vw;
    align-items: center;
    margin: 0 auto;


    font-family: 'Montserrat', sans-serif;

    /* font-family: 'Open Sans', sans-serif; */
}

.inside-footer {
    width: 35%;
    margin-top: 30px;


}

.footer-links {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    margin-bottom: 15px;
    width: 100%;
    justify-content: space-evenly;

    /* background: red; */
}

@media (max-width:800px) {
    .footer-links {
        flex-direction: column;
        align-items: center;

    }
}

.footer-links a {
    text-decoration: none;
    color: #454545;
    text-align: center;
}

.footer-links a:hover {
    color: #cd1a1a;
}

.copyright {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: center;
    margin-bottom: 15px;
    width: 100%;
    color: #454545;
    text-align: center;
}
</style>