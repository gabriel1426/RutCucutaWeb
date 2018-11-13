<template>
  <section  class="todo">
    <div class="container-fluid">
      <div class="row flex-xl-nowrap">
        <div class="col-12 col-md-3 col-xl-2 bd-sidebar fondocolor p-0">
            <Lateral>
            </Lateral>
        </div>
        <main class="col-12 col-md-9 col-xl-10 p-0 ">
          <div class="container">
         <Menu></Menu>
          <hr class="m-0">
          <br>
          <b-row>
            <b-col cols="12" md="10"><h2 class="p-3">Listado de conductores</h2></b-col>
            <b-col cols="12" md="2">
              <div  class="text-center">
                <b-btn v-b-modal.modallg variant="primary">Agregar</b-btn>
                <b-modal id="modallg" size="lg" title="Agregar Conductor" >
                <div>
                    <b-container fluid>
                      <b-form validated  @submit="agregarConductor" @reset="onReset" v-if="show" >
                        <b-row>
                          <b-col >
                            <b-form-group class="m-0"
                                      id="nombre"
                                      label="Nombre:"
                                      label-for="exampleInput2"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="nombre"
                                        type="text"
                                        v-model="form.nombre"
                                        required
                                        placeholder="Ingresa el nombre"
                                        >
                          </b-form-input>
                        </b-form-group>
                        <br>
                        <b-form-group class="m-0" id="correo"
                                      label="Correo:"
                                      label-for="exampleInput1"
                                      label-cols="3"
                                      horizontal>
                                
                          <b-form-input id="correo"
                                        type="email"
                                        v-model="form.correo"
                                        required
                                        placeholder="Ingresa el correo"
                                        >
                          </b-form-input>
                        </b-form-group>
                        <br>
                        <b-form-group class="m-0" id="direccion"
                                      label="Direccion:"
                                      label-for="direccion"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="direccion"
                                        type="text"
                                        v-model="form.direccion"
                                        required
                                        placeholder="Ingresa la direccion"
                                        >
                          </b-form-input>
                        </b-form-group>
                        <br>
                        <b-form-group class="m-0" id="categorial"
                                      label="Categiria Lic.:"
                                      label-for="categorial"
                                      label-cols="3"
                                      horizontal>
                        <b-input-group>
                        <b-form-select id="categorial"
                              :options="categorias"
                              required
                              v-model="form.categorial">
                              <template slot="first">
                              <!-- this slot appears above the options from 'options' prop -->
                              <option :value=null >-- Selecciona una opción --</option>
                            </template>
                        </b-form-select>

                        </b-input-group>
                        </b-form-group>

                        
                        <div class="form-group row m-0">
                          <label for="seleccionarturno" class="col-sm-3 col-form-label">Asignar Turno.:</label>
                          <div class="col-sm-9">
                            <select  v-model="form.turno" id="seleccionarturno" class="form-control is-valid" required>
                            <option value="null" >-- Selecciona una opción --</option>
                           
                            <option v-bind:value="turno" v-for="(turno ,index) in form.buseta.turnos" v-bind:key="turno.id" v-on:click="cargarTurnos(buseta)">
                              {{index}}.&nbsp;&nbsp;{{ turno.hora }}
                            </option>
                            
                             

                          </select>
                          </div>
                        </div>
                          </b-col>

                          <b-col>
                            <b-form-group class="m-0"  id="cedula"
                                      label="Cedula:"
                                      label-for="cedula"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="cedula"
                                        type="text"
                                        v-model="form.cedula"
                                        required
                                        placeholder="Ingresa la cedula"
                                        >
                          </b-form-input>
                        </b-form-group>
                          <br>
                        <b-form-group class="m-0" id="telefono"
                                      label="Telefono:"
                                      label-for="telefono"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="telefono"
                                        type="number"
                                        v-model="form.telefono"
                                        required
                                        placeholder="Ingresa el telefono"
                                        >
                          </b-form-input>
                        </b-form-group>
                        <br>
                        <b-form-group class="m-0" id="nLicencia"
                                      label="Num. Licencia:"
                                      label-for="nLicencia"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="nLicencia"
                                        type="number"
                                        v-model="form.nLicencia"
                                        required
                                        placeholder="Ingresa el numero de licencia"
                                        >
                          </b-form-input>
                          </b-form-group>
                          <br>
                          <div class="form-group row m-0">
                          <label for="seleccionarBuseta" class="col-sm-3 col-form-label">Buseta</label>
                          <div class="col-sm-9">
                            <select  v-model="form.buseta" id="seleccionarBuseta" class="custom-select form-control is-valid" required >
                               <option value='null' >-- Selecciona una opción --</option>
                            <option v-bind:value="buseta" v-for="(buseta ,index) in busetas" v-bind:key="buseta.placa" v-on:click="cargarTurnos()">
                              {{index}}.&nbsp;&nbsp;{{ buseta.placa }} -- {{ buseta.modelo }}--{{ buseta.marca }}
                            </option>
                          </select>
                          </div>
                        </div>
                        
                          </b-col>
                        </b-row> 
                        <div class="text-center">
                          <b-button type="submit" variant="primary" style="text-center">Registrar</b-button>
                          <b-button type="reset" variant="danger">Limpiar</b-button>
                        </div>
                      </b-form>
                    </b-container>
                  </div>
                  <div slot="modal-footer" >
                  </div>
                </b-modal>
              </div>
            </b-col>
          </b-row>
          <br>
          <template>
            <b-container>
            <!-- User Interface controls -->
              <b-row>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Filtrar" class="mb-0">
                    <b-input-group>
                      <b-form-input v-model="filter" placeholder="Type to Search" />
                      <b-input-group-append>
                        <b-btn :disabled="!filter" @click="filter = ''" class="m-0">Borrar</b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Ordenar por" class="mb-0">
                    <b-input-group>
                      <b-form-select v-model="sortBy" :options="sortOptions">
                        <option slot="first" :value="null">-- none --</option>
                      </b-form-select>
                      <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                        <option :value="false">Asc</option>
                        <option :value="true">Desc</option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Paginación" class="mb-0">
                    <b-form-select :options="pageOptions" v-model="perPage" />
                  </b-form-group>
                </b-col>
              </b-row>
              <br>
            <!-- Main table element -->
              <b-table show-empty
                    stacked="md"
                    :bordered="true"
                    :fixed="false"
                    :hover="true"
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    @filtered="onFiltered">
                
                <template slot="buseta" slot-scope="row">{{row.value.placa}}  &nbsp;&nbsp;
                  <span  v-bind:value="turno" v-for="(turno) in row.value.turnos" v-bind:key="turno.hora">
									{{turno.hora}}/
									</span></template>
              <!--<template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>-->
                <template slot="actions" slot-scope="row">
                  <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                  <b-button variant="outline-secondary" size="sm" @click.stop="modalActualizar(row.item, row.index, $event.target)" class="mr-1">
                    Actualizar
                  </b-button>
                  <b-button variant="outline-secondary" size="sm" @click.stop="modalBorrar(row.item, row.index, $event.target)" class="mr-1">
                    Eliminar
                  </b-button>
                  <b-button variant="outline-secondary" size="sm" @click.stop="row.toggleDetails">
                    Detalles 
                  </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                  <b-card>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Correo</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">D</th>
                          <th scope="col">Handle</th>
                          <th scope="col">Correo</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">D</th>
                          <th scope="col">Handle</th>
                           <th scope="col">D</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th sm="6" v-for="(value, key) in row.item" :key="key" scope="row">
                          <span v-if="key=='buseta'">
                         {{ value.placa}} - {{ value.modelo}} - {{ value.marca}} <br>
                          Turnos:
                        <span v-bind:value="turno" v-for="(turno) in  value.turnos" v-bind:key="turno.hora">
                          {{ turno.hora }}/
                        </span>
                        </span>
                         <span v-else-if="key=='nombre'">
                           {{value.first}} {{value.last}}
                        </span>
											  <span v-else>
                           {{value}}
                        </span>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </b-card>
                </template>
              </b-table>
              <b-row>
                <b-col md="12" class="my-1">
                  <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
              </b-row>
              <!-- borrar modal -->
              <b-modal id="modalborrar"  title="Eliminar Conductor">
                <div class="text-center">
                  <h4>Estas seguro que deseas eliminar este conductor</h4>
                  <b-button  variant="danger" style="text-center" @click="borrarConductor()">Eliminar</b-button>
                </div>
                <div slot="modal-footer" >
                </div>
              </b-modal>
            <!-- modal Actualizar -->
              <b-modal id="modalactualizar" size="lg" title="Actualizar informacion de conductor" >
                <div>
                      <b-container fluid>
                        <b-form validated  @submit="actualizarConductor" @reset="onReset" v-if="show" >
                          <b-row>
                            <b-col>
                              <b-form-group id="nombre"
                                        label="Nombre:"
                                        label-for="nombre"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="nombre"
                                          type="text"
                                          v-model="formActualizar.nombre"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="correo"
                                        label="Correo:"
                                        label-for="correo"
                                        label-cols="3"
                                        horizontal>
                                  
                            <b-form-input id="correo"
                                          type="email"
                                          v-model="formActualizar.correo"
                                          required
                                          placeholder="Enter email"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="direccion"
                                        label="Direccion:"
                                        label-for="direccion"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="direccion"
                                          type="text"
                                          v-model="formActualizar.direccion"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="categorial"
                                        label="Categiria Lic.:"
                                        label-for="categorial"
                                        label-cols="3"
                                        horizontal>
                          <b-input-group>
                          <b-form-select id="categorial"
                                :options="categorias"
                                required
                                v-model="formActualizar.categorial">
                                <template slot="first">
                              <!-- this slot appears above the options from 'options' prop -->
                              <option :value=null >-- Selecciona una opción --</option>
                            </template>
                          </b-form-select>

                          </b-input-group>
                          </b-form-group>
                          
                          <div class="form-group row m-0">
                          <label for="seleccionarturno" class="col-sm-3 col-form-label">Asignar Turno.:</label>
                          <div class="col-sm-9">
                            <select  v-model="formActualizar.turno" id="seleccionarturno" class="form-control is-valid" required>
                             <option :value=null >-- Selecciona una opción --</option>
                           
                              <option v-bind:value="turno" v-for="(turno ,index) in formActualizar.buseta.turnos" v-bind:key="turno.hora" v-on:click="cargarTurnos(buseta)">
                              {{index}}.&nbsp;&nbsp;{{ turno.hora }}
                            </option>
                            
                          </select>
                          </div>
                        </div>
                            </b-col>

                            <b-col>
                              <b-form-group id="cedula"
                                        label="Cedula:"
                                        label-for="cedula"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="cedula"
                                          type="text"
                                          v-model="formActualizar.cedula"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                          </b-form-group>
                            <br>
                          <b-form-group id="telefono"
                                        label="Telefono:"
                                        label-for="telefono"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="telefono"
                                          type="text"
                                          v-model="formActualizar.telefono"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="nLicencia"
                                        label="Num. Licencia:"
                                        label-for="nLicencia"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="nLicencia"
                                          type="number"
                                          v-model="formActualizar.numero_licencia"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                            
                          </b-form-group>
                            
                          <div class="form-group row m-0">
                          <label for="seleccionarBuseta" class="col-sm-3 col-form-label">Buseta</label>
                          <div class="col-sm-9">
                            <select  v-model="formActualizar.buseta" id="seleccionarBuseta" class="custom-select form-control is-valid" required >
                              <option :value=null >-- Selecciona una opción --</option>
                            <option v-bind:value="buseta" v-for="(buseta ,index) in busetas" v-bind:key="buseta.placa" v-on:click="cargarTurnos()">
                              {{index}}.&nbsp;&nbsp;{{ buseta.placa }} -- {{ buseta.modelo }}--{{ buseta.marca }}
                            </option>
                          </select>
                          </div>
                          </div>
                            </b-col>

                          </b-row> 
                          <div class="text-center">
                            <b-button type="submit" variant="primary" style="text-center">Registrar</b-button>
                            <b-button type="reset" variant="danger">Limpiar</b-button>
                          </div>
                          
                        </b-form>
                      </b-container>
                    </div>
                    <div slot="modal-footer" class="w-100">
                </div>
              </b-modal>
            </b-container>
          </template>
          </div>
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

  const items = [
  { correo:"gabriel@gabriel.com", cedula:1090501307, telefono:3195083640, direccion:"call 11 av. 8 #9-37", numero_licencia:1234543, categoria:"Categoria A2",buseta:{placa:"Agfj55d", modelo:2018, marca:"owen",turnos:[{id:1, hora:'7 am - 12 am'},
                                                           {id:2, hora:'12 am - 4 am'}]}, ruta: 40, nombre: 'Juanes Contreras' },

  { correo:"gabriel@gabriel.com", cedula:1090501307, telefono:3195083640, direccion:"call 11 av. 8 #9-37", numero_licencia:1234543, categoria:"Categoria C2",buseta:{placa:"Agfj55d", modelo:2018, marca:"owen",turnos:[{id:1, hora:'7 am - 12 am'},
                                                           {id:2, hora:'1 pm - 4 pm'}]}, ruta: 10, nombre: 'Andres Contreras' },
                                                           { correo:"gabriel@gabriel.com", cedula:1090501307, telefono:3195083640, direccion:"call 11 av. 8 #9-37", numero_licencia:1234543, categoria:"Categoria C2",buseta:{placa:"Agfj55d", modelo:2018, marca:"owen",turnos:[{id:1, hora:'7 am - 12 am'},
                                                           {id:2, hora:'1 pm - 4 pm'}]}, ruta: 10, nombre: 'Camilo Garcia' },
]


export default {
  
    name:'Conductor',
     data () {
    return {
      urlBase:"http://71cef677.ngrok.io/rutcucuta/public/",
      form: {
        correo: '',
        nombre: '',
        cedula:'',
        telefono:'',
        direccion:'',
        nLicencia:'',
        categorial:null,
        buseta:'',
        turno:null
      },
      formActualizar: {
        correo: '',
        nombre: '',
        cedula:'',
        telefono:'',
        direccion:'',
        numero_licencia:'',
        categorial:null,
        buseta:'',
        turno:null
      },
      turnos:[],
      busetas:[
        {placa:"Agfj55d", modelo:2018, marca:"owen",turnos:[{id:1, hora:'7 am - 12 am'},
                                                           {id:2, hora:'12 am - 4 am'}]},
        {placa:"asd3ra", modelo:2010, marca:"chevrolet",turnos:[{id:1, hora:'3 am - 11 am'},
                                                           {id:2, hora:'11 am - 2 am'}]},
        {placa:"asd34q", modelo:2007, marca:"zusuki",turnos:[{id:1, hora:'5 am - 8 am'},
                                                           {id:2, hora:'8 am - 9 am'}]},
        {placa:"asd34", modelo:213, marca:"veneca",turnos:[{id:1, hora:'1 am - 2 am'},
                                                           {id:2, hora:'2 am - 4 am'}]}
      ],
      categorias: [
        'Categoría A1', 'Categoría A2', 'Categoría B1', 'Categoría B2','Categoría B3',
        'Categoría C1','Categoría C2 ','Categoría C3'
      ],
      show: true,
      items: items,
      fields: [
        { key: 'nombre', label: 'Nombre Completo', sortable: true, sortDirection: 'desc' },
        { key: 'ruta', label: 'Ruta', sortable: true, 'class': 'text-center' },
        { key: 'buseta', label: 'Horario' },
        { key: 'actions', label: 'Acciones' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      
      borrarCondutorTemporal:[]
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  mounted: function (){
				
	},
   methods: {

     //acciones con un conductor
     agregarConductor (evt) {
       console.log(this.form)
       axios.post(this.urlBase+'/v1/conductor/registrar',{
       cedula:this.form.cedula,
       nombre:this.form.nombre,
       email:this.form.correo,
       telefono:this.form.telefono,
       direccion:this.form.direccion,
       numero_licencia:this.form.nLicencia,
       categoria_licencia:this.form.categorial,
       turno:this.form.turno,
       buseta:this.form.buseta
      },{
        headers: {'Authorization': value}
      })
      .then(response =>{
       console.log(response);
      this.form.cedula='',
      this.form.nombre='',
      this.form.correo='',
      this.form.telefono='',
      this.form.direccion='',
      this.form.nLicencia='',
      this.form.categorial=''
     })
    },
    actualizarConductor(){

        axios.put(this.urlBase+'/',{
				nombre: this.usuarioNickname,
				correo: this.usuarioCorreo,
				password: this.usuarioPassword,
				privacidad:this.privacidadUsuario,
				imagen_usuario:this.usuarioFoto,
				

			})
			.then(response =>{
				console.log(response);
			})
			this.isDisabled=true
    },
    borrarConductor(){
      axios.post(this.urlBase+'/v1/conductor/registrar',{
       id:this.borrarCondutorTemporal.id
      },{
        headers: {'Authorization': value}
      })
      .then(response =>{
       console.log(response);
      
     })
     this.items.splice(this.borrarCondutorTemporal.index,1);
    },

    //Acciones con los combos iterativos

   

    cargarTurnos(){
      console.log("asas") 
      
       
    },

    // limpiar el formulario
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
     this.form.cedula='',
      this.form.nombre='',
      this.form.correo='',
      this.form.telefono='',
      this.form.direccion='',
      this.form.nLicencia='',
      this.form.categorial=''
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    

    //desplegar los modales de actualizar u eliminar
    modalActualizar (item, index, button) {
      
      this.formActualizar.correo=item.correo;
      this.formActualizar.nombre=item.nombre;
      this.formActualizar.cedula=item.cedula;
      this.formActualizar.telefono=item.telefono;
      this.formActualizar.direccion=item.direccion;
      this.formActualizar.numero_licencia=item.numero_licencia;
      
      this.$root.$emit('bv::show::modal', 'modalactualizar', button)

      
    },
    modalBorrar (item, index, button) {
      console.log(item)
      this.borrarCondutorTemporal.push({
        id:item.horario,
        index:index
        })
      console.log(this.borrarCondutorTemporal)
      this.$root.$emit('bv::show::modal', 'modalborrar', button)
    },

    //filtrado de la tabla
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },components:{
			Menu,
			Lateral
		},
}
</script>
<style>


.todo{
  background-color: white;
}


</style>
