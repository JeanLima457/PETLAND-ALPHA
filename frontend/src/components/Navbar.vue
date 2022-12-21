<template>
    <div id="nav">
        <router-link to="/" id="logo-container">
            <img src="/img/partytimelogo.png">
        </router-link>
        <h2 id="nav-title">Party Time</h2>
        <div class="nav-links"></div>
        <router-link to="/">Home</router-link>
        <router-link to="/login" v-show="!authenticared">Entrar</router-link>
        <router-link to="/register" v-show="!authenticared">Cadastrar</router-link>
        <router-link to="/dashboard" v-show="!authenticared">Dashboard</router-link>
        <router-link to="/profile" v-show="!authenticared">Configurações</router-link>
        <button @click="logout($event)" v-show="authenticated">Sair</button>
    </div>
</template>


<script>

import { mapState } from 'vuex';

    export default {
        name: "Navbar",
        methods: {
            logout(e) {
            
                e.preventDefault();
            
            //Emitir evento para o usuário deslogar
                this.$store.commit("logout");
            
            //redirecionar para página pública
            this.$router.push("/");

            }
        },
        computed: {
            ...mapState([
                'authenticated'
            ])

        }

    }

</script>


<style scoped>
    #nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #EEE;
    }

    #nav a{
        text-decoration: none;
        margin-left: 15px;
    }

    #nav img {

        width: 35px;

    }
    #nav-title {
        font-size: 3rem;
        font-weight: 300;
    }
    #logo-container, #nav-links {
        width: 400px;
    }
    #nav-links {
        display: flex;
        justify-content: flex-end;
    }
    button {
        background-color: #FFF;
        border: none;
        font-size: 16px;
        cursor: pointer;

    }
    button:hover {
        color: #C1B696
    }
</style>