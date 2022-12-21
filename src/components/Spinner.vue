<template>
    <div class="spin">

    </div>
</template>

<script>

</script>

<style>
.spin {
    display: block;
    width: 40px;
    height: 40px;
    margin: 30px auto;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #cd1a1a;
    animation: spin 1s ease infinite;
}

@keyframes spin {
    to {
        transform: rotateZ(360deg)
    }
}
</style>