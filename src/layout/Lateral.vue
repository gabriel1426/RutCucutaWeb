<template>
    <div class="default">
        <b-navbar vertical class="w-100 p-0" toggleable="md">
          
            <b-navbar-toggle   target="nav_collapse"></b-navbar-toggle>
            <b-collapse  is-nav id="nav_collapse">
              <b-list-group class="w-100  p-0">
                <br><br>
                <router-link  to="/">
                <b-list-group-item href="#" button class="lista pl-20 listas"><i class="fas fa-home"></i>&nbsp;&nbsp;Home</b-list-group-item>
                </router-link>
                <router-link  to="/Conductor">
                <b-list-group-item href="#" button class="lista  pl-20 listas"><i class="far fa-address-card"></i>&nbsp;&nbsp;Conductores</b-list-group-item>
                </router-link>
                  <router-link  to="/Buseta">
                <b-list-group-item href="#" button class="lista  pl-20 listas"><i class="fas fa-bus"></i>&nbsp;&nbsp;Buseta</b-list-group-item>
                </router-link>
                <router-link  to="/Ruta">
                <b-list-group-item href="#" button class="lista pl-20 listas"><i class="fas fa-map-marked-alt"></i>&nbsp;&nbsp;Rutas</b-list-group-item>
                </router-link>
                <router-link  to="/Perfil">
                <b-list-group-item href="#" button class="lista pl-20 listas"><i class="fas fa-user"></i>&nbsp;&nbsp; Mis datos</b-list-group-item>
                </router-link>
                <router-link  to="/Mapa">
                <b-list-group-item href="#" button class="lista pl-20 listas"><i class="fas fa-user"></i>&nbsp;&nbsp; Mapa</b-list-group-item>
                </router-link>
              </b-list-group>
            </b-collapse>
          </b-navbar>
    </div>
</template>
<script>
export default{
	name:'Lateral',
	components:{
		
	}
}
</script>
<style>
.fondocolor{
  background-color:#5c88c5  !important;
}

button.listas:hover{
   background-color: rgb(87, 108, 129) !important;
}

.lista{
  background-color: #5c88c5  !important;
  color:white !important;
}
</style>

