<template>
  <section  class="todo">
    <div class="contaiber-fluid">
      <div class="row flex-xl-nowrap">
        <div class="col-12 col-md-3 col-xl-2 bd-sidebar fondocolor p-0">
          
            <Lateral>
              
            </Lateral>
        </div>
        <main class="col-12 col-md-9 col-xl-10 p-0 ">
         <Menu></Menu>
      
    <hr class="m-0">
        </main>
      </div>
    </div>
    <footer class="py-4 bg-dark">

      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Your Website 2018</p>
      </div>
      <!-- /.container -->
    </footer>
  </section>

</template>
<script>
import Menu from '@/layout/Menu'
import Lateral from '@/layout/Lateral'
  
export default {
  
    name:'Home',
     data () {
    return {
      login:true,
      correo:'',
      clave:'',
      
    }
  },
   methods: {
    
  },components:{
			Menu,
			Lateral
		},
}
</script>
<style>




</style>
