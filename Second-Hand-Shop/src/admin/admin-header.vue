<script>
    
</script>

<template>
	<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-2 shadow">
	  <a class="navbar-brand col-4 col-md-2 mr-0 text-center" href="#">靜宜二手交易網站-後台管理</a>
	  <!-- <input class="form-control form-control-dark w-100" placeholder="Search" aria-label="Search" type="text"> -->
	  <ul class="navbar-nav px-3">
	    <li class="nav-item text-nowrap">
	      <a class="nav-link text-white" href="#" @click.prevent="signout" v-if="isLogin"><b>Sign out</b></a>
	      <router-link class="nav-link text-warning" to="#" v-else><b>Sign in</b></router-link>
	    </li>
	  </ul>
	</nav>
</template>

<style>

</style>