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
                      <b-form validated  @submit="onSubmit" @reset="onReset" v-if="show" >
                        <b-row>
                          <b-col>
                            <b-form-group id="nombre"
                                      label="Nombre:"
                                      label-for="exampleInput2"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="nombre"
                                        type="text"
                                        v-model="form.nombre"
                                        required
                                        placeholder="Enter name"
                                        >
                          </b-form-input>
                        </b-form-group>
                        <br>
                        <b-form-group id="correo"
                                      label="Correo:"
                                      label-for="exampleInput1"
                                      label-cols="3"
                                      horizontal>
                                
                          <b-form-input id="correo"
                                        type="email"
                                        v-model="form.correo"
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
                                        v-model="form.direccion"
                                        required
                                        placeholder="Enter name"
                                        >
                          </b-form-input>
                        </b-form-group>
                        <br>
                        <b-form-group id="categorial"
                                      label="Categiria Lic.:"
                                      label-for="nLicencia"
                                      label-cols="3"
                                      horizontal="1">
                        <b-form-select id="categorial"
                              :options="categorias"
                              required
                              v-model="form.categorial">
                        </b-form-select>
                          
                        </b-form-group>
                        
                        <b-form-group id="turno"
                                      label="Asignar Turno.:"
                                      label-for="turno"
                                      label-cols="3"
                                      horizontal="1">
                        <b-form-select id="turno"
                              :options="turnos"
                              required
                              v-model="form.turno">
                        </b-form-select>
                          
                        </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group id="cedula"
                                      label="Cedula:"
                                      label-for="cedula"
                                      label-cols="3"
                                      horizontal>
                          <b-form-input id="cedula"
                                        type="text"
                                        v-model="form.cedula"
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
                                        v-model="form.telefono"
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
                                        v-model="form.nLicencia"
                                        required
                                        placeholder="Enter name"
                                        >
                          </b-form-input>
                          
                        </b-form-group>
                          
                        <b-form-group id="buseta"
                                      label="Asociar bus:"
                                      label-for="buseta"
                                      label-cols="3"
                                      horizontal>
                        <b-form-select id="buseta"
                              :options="busetas"
                              required
                              v-model="form.buseta">
                        </b-form-select>
                          
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
                <template slot="nombre" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
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
              <b-modal id="modalborrar" size="lg" @hide="resetModal" :title="modalInfo.title" ok-only ok-title="cancelar">
                <div class="text-center">
                  <h4>Estas seguro que deseas eliminar este conductor</h4>
                  <b-button  variant="danger" style="text-center">Eliminar</b-button>
                </div>
              </b-modal>
            <!-- Info modal -->
              <b-modal id="modalInfo" size="lg" @hide="resetModal" :title="modalInfo.title" >
                <div>
                      <b-container fluid>
                        <b-form validated  @submit="onSubmit" @reset="onReset" v-if="show" >
                          <b-row>
                            <b-col>
                              <b-form-group id="nombre"
                                        label="Nombre:"
                                        label-for="exampleInput2"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="nombre"
                                          type="text"
                                          v-model="form.nombre"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="correo"
                                        label="Correo:"
                                        label-for="exampleInput1"
                                        label-cols="3"
                                        horizontal>
                                  
                            <b-form-input id="correo"
                                          type="email"
                                          v-model="form.correo"
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
                                          v-model="form.direccion"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                          </b-form-group>
                          <br>
                          <b-form-group id="categorial"
                                        label="Categiria Lic.:"
                                        label-for="nLicencia"
                                        label-cols="3"
                                        horizontal="1">
                          <b-form-select id="categorial"
                                :options="categorias"
                                required
                                v-model="form.categorial">
                          </b-form-select>
                            
                          </b-form-group>
                          
                          <b-form-group id="turno"
                                        label="Asignar Turno.:"
                                        label-for="turno"
                                        label-cols="3"
                                        horizontal="1">
                          <b-form-select id="turno"
                                :options="turnos"
                                required
                                v-model="form.turno">
                          </b-form-select>
                            
                          </b-form-group>
                            </b-col>

                            <b-col>
                              <b-form-group id="cedula"
                                        label="Cedula:"
                                        label-for="cedula"
                                        label-cols="3"
                                        horizontal>
                            <b-form-input id="cedula"
                                          type="text"
                                          v-model="form.cedula"
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
                                          v-model="form.telefono"
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
                                          v-model="form.nLicencia"
                                          required
                                          placeholder="Enter name"
                                          >
                            </b-form-input>
                            
                          </b-form-group>
                            
                          <b-form-group id="buseta"
                                        label="Asociar bus:"
                                        label-for="buseta"
                                        label-cols="3"
                                        horizontal>
                          <b-form-select id="buseta"
                                :options="busetas"
                                required
                                v-model="form.buseta">
                          </b-form-select>
                            
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
  { horario:"7am - 10am", ruta: 40, nombre: { first: 'Gabriel', last: 'Contreras' } },
  { horario:"7am - 10am", ruta: 21, nombre: { first: 'Larsen', last: 'Shaw' } },
  {
    horario:"10am - 15pm",
    ruta: 9,
    nombre: { first: 'Mini', last: 'Navarro' },
    //_rowVariant: 'success'
  },
  { horario:"10am - 5pm", ruta: 89, nombre: { first: 'Geneva', last: 'Wilson' } },
  { horario: "5pm - 10pm", ruta: 38, nombre: { first: 'Guillermo', last: 'Parada' } },
  { horario:"5pm - 10pm", ruta: 27, nombre: { first: 'Essie', last: 'Dunlap' } },
  { horario: "7am - 12pm", ruta: 40, nombre: { first: 'Thor', last: 'Macdonald' } },
  {
    horario: "7am - 12pm",
    ruta: 87,
    nombre: { first: 'Larsen', last: 'Shaw' },
    //_cellVariants: { ruta: 'danger', horario: 'warning' }
  },
  { horario: "12pm - 5pm", ruta: 26, nombre: { first: 'Mitzi', last: 'Navarro' } },
  { horario: "12pm - 5pm", ruta: 22, nombre: { first: 'Jeferson', last: 'Murillo' } },
  { horario: "5pm - 10pm", ruta: 38, nombre: { first: 'John', last: 'Carney' } },
  { horario: "5pm - 10pm", ruta: 29, nombre: { first: 'Dick', last: 'Dunlap' } }
]
export default {
  
    name:'Conductor',
     data () {
    return {
      
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
      },
      categorias: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn','Corns','cebolla','cebollin','cebollon'
      ],
      show: true,
    
      items: items,
      fields: [
        { key: 'nombre', label: 'Nombre Completo', sortable: true, sortDirection: 'desc' },
        { key: 'ruta', label: 'Ruta', sortable: true, 'class': 'text-center' },
        { key: 'horario', label: 'Horario' },
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
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
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
