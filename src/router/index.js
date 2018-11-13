import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Home from '@/views/Home/Home'
import Login from '@/views/Login/Login'
import Conductor from '@/views/Conductor/Conductor'
import Ruta from '@/views/Ruta/Ruta'
import Mapa from '@/views/Mapa/Mapa'
import Buseta from '@/views/Buseta/Buseta'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    { path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '/Conductor',
      name: 'Conductor',
      component: Conductor
    },
    { path: '/Ruta',
      name: 'Ruta',
      component: Ruta
    },
    { path: '/Mapa',
      name: 'Mapa',
      component: Mapa
    },
    { path: '/Buseta',
      name: 'Buseta',
      component: Buseta
    }
  ]
})
