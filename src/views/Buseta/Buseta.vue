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
                <b-modal id="modallg" size="lg" title="Registrar Buseta" >
                <div>
                    <b-container fluid>
                      <b-form validated  @submit="onSubmit" @reset="onReset" v-if="show" >
                        <b-row>
                          <b-col>
                            <b-form-group id="Placa"
                                      label="Placa:"
                                      label-for="placa"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="placa"
                                        type="text"
                                        v-model="form.placa"
                                        required
                                        placeholder="Ingresa la placa"
                                        >
                          </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="Marca"
                                        label="Marca:"
                                        label-for="marca"
                                        label-cols="3"
                                        horizontal>
                                  
                            <b-form-input id="marca"
                                          type="text"
                                          v-model="form.marca"
                                          required
                                          placeholder="Ingresa la placa"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="CapacidaddePie"
                                        label="Capacidad de Pie:"
                                        label-for="CapacidaddePie"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="CapacidaddePie"
                                          type="text"
                                          v-model="form.CapacidaddePie"
                                          required
                                          placeholder="Cap. de pasajeros de Pie"
                                          >
                            </b-form-input>
                          </b-form-group>
                         
                          </b-col>

                          <b-col>
                            <b-form-group id="modelo"
                                      label="Modelo:"
                                      label-for="modelo"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="Modelo"
                                        type="text"
                                        v-model="form.modelo"
                                        required
                                        placeholder="Ingresa el modelo"
                                        >
                          </b-form-input>
                        </b-form-group>
                          <br>
                        <b-form-group id="Capacidadsentados"
                                        label="Capacidad sentados:"
                                        label-for="Capacidadsentados"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="Capacidadsentados"
                                          type="text"
                                          v-model="form.Capacidadsentados"
                                          required
                                          placeholder="Cap. de pasajeros sentados"
                                          >
                            </b-form-input>
                          </b-form-group>
                       
                          </b-col>
                        </b-row> 
                        <hr class="m-1">
                        <b-row>
                          <b-col sm="12"><label> Asiganle horarios a la buseta</label></b-col>
                         <br>
                            <b-col sm="5">
                              <br>
                            <b-form-group id="inicio"
                                      label="H. inicio:"
                                      label-for="inicio"
                                      label-cols="5"
                                      horizontal>
                            <b-form-input id="inicio"
                                          type="time"
                                          v-model="inicio"
                                          required>
                            </b-form-input>
                            </b-form-group>
                            </b-col>
                            <b-col sm="5">
                              <br>
                            <b-form-group id="fin"
                                      label="H. fin:"
                                      label-for="fin"
                                      label-cols="5"
                                      horizontal>
                            <b-form-input id="fin"
                                          type="time"
                                          v-model="fin"
                                          required>
                            </b-form-input>
                            </b-form-group>
                            </b-col>
                            <b-col sm="2">
                              <br>
                             <b-button @click="agregarHorario()" variant="primary" style="text-center">Agregar</b-button>
                            </b-col>
                          </b-row>
                          <ul >
                            <li v-for="horario in form.horarios" v-bind:key="horario.inicio"  class="hizquierda"> 
                              {{horario.inicio}} - {{horario.fin}}
                              <b-button @click="eliminarhorario(index,horario.inicio)" class="btn btn-outline-danger btnIzq"><span class="icon-close"></span></b-button>
                            </li>
                          </ul>
                        <br>
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
                
              <!--<template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>-->
                <template slot="actions" slot-scope="row">
                  <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                  <b-button variant="outline-secondary" size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
                    Actualizar
                  </b-button>
                  <b-button variant="outline-secondary" size="sm" @click.stop="borrar(row.item, row.index, $event.target)" class="mr-1">
                    Eliminar
                  </b-button>
                  <b-button variant="outline-secondary" size="sm" @click.stop="row.toggleDetails">
                    Detalles 
                  </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                  <b-card>
                    <ul>
                      <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
                    </ul>
                  </b-card>
                </template>
              </b-table>
              <b-row>
                <b-col md="12" class="my-1">
                  <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
              </b-row>
              <!-- Info modal -->
              <b-modal id="modalborrar"  title="Eliminar Buseta">
                <div class="text-center">
                  <h4>Estas seguro que deseas eliminar esta buseta</h4>
                  <b-button  variant="danger" style="text-center">Eliminar</b-button>
                </div>
                <div slot="modal-footer" >
                </div>
              </b-modal>
            <!-- Info modal -->
              <b-modal id="modalactualizar" size="lg" title="Actualizar Información de buseta" >
                <div>
                    <b-container fluid>
                      <b-form validated  @submit="onSubmit" @reset="onReset" v-if="show" >
                        <b-row>
                          <b-col>
                            <b-form-group id="Placa"
                                      label="Placa:"
                                      label-for="placa"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="placa"
                                        type="text"
                                        v-model="form.placa"
                                        required
                                        placeholder="Ingresa la placa"
                                        >
                          </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="Marca"
                                        label="Marca:"
                                        label-for="marca"
                                        label-cols="3"
                                        horizontal>
                                  
                            <b-form-input id="marca"
                                          type="text"
                                          v-model="form.marca"
                                          required
                                          placeholder="Ingresa la placa"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="CapacidaddePie"
                                        label="Capacidad de Pie:"
                                        label-for="CapacidaddePie"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="CapacidaddePie"
                                          type="text"
                                          v-model="form.CapacidaddePie"
                                          required
                                          placeholder="Ingresa la capacidad de Pie"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          </b-col>

                          <b-col>
                            <b-form-group id="`modelo`"
                                      label="Modelo:"
                                      label-for="modelo"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="Modelo"
                                        type="text"
                                        v-model="form.modelo"
                                        required
                                        placeholder="Ingresa el modelo"
                                        >
                          </b-form-input>
                        </b-form-group>
                          <br>
                        <b-form-group id="capacidadsentados"
                                      label="Capacidad sentados:"
                                      label-for="capacidadsentados"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="capacidadsentados"
                                        type="text"
                                        v-model="form.capacidadsentados"
                                        required
                                        placeholder="Ingresa la capacidad sentados"
                                        >
                          </b-form-input>
                        </b-form-group>
                       
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
  { marca:"7am - 10am", modelo: 40, placa: "AB5J55D" },
  { marca:"7am - 10am", modelo: 21, placa: "AG5J55D" },
  { marca:"10am - 15pm",modelo: 9, placa: "AG5J55D", //_rowVariant: 'success'
  },
  { marca:"10am - 5pm", modelo: 89, placa: "AC5J55D" },
  { marca: "5pm - 10pm", modelo: 38, placa:"AG5J55D" },
  { marca:"5pm - 10pm", modelo: 27, placa: "DJ5J55D" },
  { marca: "7am - 12pm", modelo: 40, placa: "AG5J55D" },
  { marca: "7am - 12pm", modelo: 87, placa: "AG5J55D",
    //_cellVariants: { ruta: 'danger', horario: 'warning' }
  },
  { marca: "12pm - 5pm", modelo: 26, placa: "HC5J55D" },
  { marca: "12pm - 5pm", modelo: 22, placa: "AG5J55D" },
  { marca: "5pm - 10pm", modelo: 29, placa: "AG5J55D" },
  { marca: "5pm - 10pm", modelo: 38, placa: "AG5J55D" },
]
export default {
  
    name:'Buseta',
     data () {
    return {
      inicio:'',
      fin:'',
      horariosMostrar:[],
      form: {
        correo: '',
        nombre: '',
        cedula:'',
        telefono:'',
        direccion:'',
        nLicencia:'',
        categorial:'',
        buseta:'',
        turno:'',
        horarios:[],
      },
      categorias: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn','Corns','cebolla','cebollin','cebollon'
      ],
      
      show: true,
    
      items: items,
      fields: [
        { key: 'placa', label: 'Placa', sortable: true, sortDirection: 'desc' },
        { key: 'modelo', label: 'Modelo', sortable: true, 'class': 'text-center' },
        { key: 'marca', label: 'Marca',sortable: true,},
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
      modalInfo: { title: '', content: '' }
    
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
   methods: {
     onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalactualizar', button)
    },
    borrar (item, index, button) {
      
      this.$root.$emit('bv::show::modal', 'modalborrar', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    agregarHorario(){
       if(this.inicio!="" && this.fin!=""){
        this.form.horarios.push({
        inicio:this.inicio,
        fin:this.fin,
      })
      }
      this.inicio='',
      this.fin=''
    },
    eliminarhorario(index,id){
    this.form.horarios.splice(index,1);
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
td,th {
  text-align: center;
}

.hizquierda{
  text-align: left
}

</style>
