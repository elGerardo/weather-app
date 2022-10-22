<template>
    <footer class="footer">
        <a href="https://mycoolpersonalsite.netlify.app/">Visit my website </a>
        <a href="https://github.com/elGerardo">My GitHub</a>
    </footer> 
</template>
<script>
export default({
    data() {
        return
    },
})
</script>
<style>
footer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
footer a{
    text-decoration: none;
    margin: 1rem auto;
    color: black;
}

footer a:hover{
    color: #172029;
}
</style>
