<template>
<head>

      <!---
        <router-link to="/">Home</router-link>
        <router-link to="/login" v-show="!authenticared">Entrar</router-link>
        <router-link to="/register" v-show="!authenticared">Cadastrar</router-link>
        <router-link to="/dashboard" v-show="!authenticared">Dashboard</router-link>
        <router-link to="/profile" v-show="!authenticared">Configurações</router-link>
        <button @click="logout($event)" v-show="authenticated">Sair</button>
 -->


	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Responsive Bootstrap4 Shop Template, Created by Imran Hossain from https://imransdesign.com/">

	<!-- title -->
	<title>PETLAND - O Melhor Lugar Para o Seu Pet</title>

	<!-- favicon -->
	<link rel="shortcut icon" type="image/png" href="/img/favicon.png">
	<!-- google font -->
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap" rel="stylesheet">
	<!-- fontawesome -->
	<link rel="stylesheet" href="/css/all.min.css">
	<!-- bootstrap -->
	<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
	<!-- owl carousel -->
	<link rel="stylesheet" href="/css/owl.carousel.css">
	<!-- magnific popup -->
	<link rel="stylesheet" href="/css/magnific-popup.css">
	<!-- animate css -->
	<link rel="stylesheet" href="/css/animate.css">
	<!-- mean menu css -->
	<link rel="stylesheet" href="/css/meanmenu.min.css">
	<!-- main style -->
	<link rel="stylesheet" href="/css/main.css">
	<!-- responsive -->
	<link rel="stylesheet" href="/css/responsive.css">
    <link rel="javascript" href="/js/main.js">
</head>
<body>
	
	<!--PreLoader
    <div class="loader">
        <div class="loader-inner">
            <img src="/img/loader.gif" alt="">
        </div>
    </div>
    PreLoader Ends-->
	
	<!-- header -->
	<div class="top-header-area" id="sticker">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-sm-12 text-center">
					<div class="main-menu-wrap">
						<!-- logo -->
						<div class="site-logo">
							<a href="/">
								<img src="/img/PETLANDLOGO.png" alt="">
							</a>
						</div>
						<!-- logo -->

						<!-- menu start -->
						<nav class="main-menu">
							<ul>
                                <router-link to="/">
								<li class="current-list-item"><a href="/">Início</a></li>
                                </router-link>
									<!--<ul class="sub-menu">
										<li><a href="index.html">Início</a></li>
										<li><a href="index_2.html">Slider Home</a></li>
									</ul>-->
								<li><a href="/PetShop">PetShop</a></li>
								<li><a href="/PetBlog">PetBlog</a></li>
								<li><a href="/Contato">Contato</a></li>
								<li><a href="/QuemSomos">Sobre Nós</a>
                                </li>
									<div class="header-icons">
										<a class="shopping-cart" href="/Carrinho"><i class="fas fa-shopping-cart"></i></a>
										<a class="mobile-hide search-bar-icon" href="#"><i class="fas fa-search"></i></a>
									
										<a class="fas fa-user" href="/Cadastro_Login"></a>
									</div>
								
							</ul>
						</nav>
						<a class="mobile-show search-bar-icon" href="#"><i class="fas fa-search"></i></a>
						<div class="mobile-menu"></div>
						<!-- menu end -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end header -->
	
	<!-- search area -->
	<div class="search-area">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<span class="close-btn"><i class="fas fa-window-close"></i></span>
					<div class="search-bar">
						<div class="search-bar-tablecell">
							<h3>Digite o que Procura:</h3>
							<input type="text" placeholder="Digite Aqui">
							<button type="submit">Pesquisar<i class="fas fa-search"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end search area -->
</body>
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
<style></style>