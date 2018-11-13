<template>
  <div class="login">
    <br><br><br><br><br><br>
    <div class="centro">

    <b-form  >
      
      <div class="container p-2">
        <h4>Formulario de Ingreso</h4>
       <br>
        <b-form-group id="correo"
                    label-for="correo"
                    >
        <b-form-input id="correo"
                      type="text"
                      v-model="correo"
                      required
                      placeholder="Ingresa el correo"
                      >
        </b-form-input>
      </b-form-group>
      <br>
      <b-form-group id="clave"
                    label-for="clave"
                    >
      <b-form-input id="clave"
                      type="password"
                      v-model="password"
                      required
                      placeholder="Ingrela la clave"
                      >
      </b-form-input>
      </b-form-group>
      <div class="text-center">
        
         <b-button type="submit" variant="primary" style="text-center"  v-on:click="login">Entrar</b-button>
        
      </div>
      
       <b-button type="reset" variant="link">Olvide mi contraseña</b-button>
      </div>
    </b-form>
    </div>
    <br><br><br><br><br><br>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  components: {
      
   },
  data() {
    return {
       urlBase:"http://59ff215b.ngrok.io/rutcucuta/public",
        correo: '',
        password: '',
    }
  },
  methods: {
    login(){
       console.log("holamundo")
      
      axios.get(this.urlBase+'/v1/buseta/listar',{
         headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJoZWFkZXIiOnsiaWQiOjMsInVzZXIiOiJlbXByZXNhMkBnbWFpbC5jb20iLCJlbWFpbCI6ImVtcHJlc2EyQGdtYWlsLmNvbSJ9LCJwYXlsb2FkIjp7ImlhdCI6IjIwMTgtMTEtMTIgMTg6MDg6MDMiLCJleHAiOiIyMDE4LTExLTEyIDIwOjA4OjAzIn19.C14uv9mAlUs1a_a5dfiBZ070vNU3mbiS64W_Yri1jUU',
                  'Content-Type':'application/json'}
      }
      )
			.then(response =>{
				console.log(response.data)
      })
     
     
      /*
			axios.post(this.urlBase+'/v2/login',{
				codigo: 1151515,
        clave:  "1234",
        tipo: "estudiante"
			})
			.then(response =>{
				console.log(response.data)
				if(response.data.respuesta == 111){
					console.log("entro");
					this.setCookie('Autorizacion',response.data.data.token,1);
					this.$router.push(
					{
						name:'Home',
					}
					)
				}else{
				  this.entro = false;
					console.log("no entro")
					this.$router.push('/')
				}
      })
     */
    
		},
		setCookie(nombre,valor,exdays){
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = nombre + "=" + valor + ";" + expires + ";path=/";
		}
   
  }
  
}
</script>

<style>

 .centro{
  border: 1px solid white !important;
  border-radius: 5px !important;
  background-color: white;
  margin:0 auto;
  width: 50%;
  padding: 10px;
  color:#5c88c5;
 }
 .login{
   height:100%;
   background: #5c88c5 ;
   color:white;
 }
 .btn{
   
 }
  .fondoclaro{
    background: #5c88c5  !important;
    color: white!important;
  }
 

 
</style>
