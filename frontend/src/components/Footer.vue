<template>
    <footer>
        <h3> Party Time &copy; 2021</h3>
        <P>o melhor lugar para compartilhar seus eventos!</P>

    </footer>
</template>

<script>
export default {
    name: "footer"
}
</script>

<style scoped>

    footer {
        background-color: #25282E;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    footer h3 {
        color: #FFF;
        margin-bottom: 15px;
        font-weight: 300;
        font-size: 1.6rem;
    }
    footer p {
        color: #C1B696;
    }
</style>