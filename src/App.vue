<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  menu: [{
          href: '/',
          title: 'Dashboard',
          icon: 'fa fa-user'
        },
        {
          href: '#',
          title: 'Charts',
          icon: 'fa fa-chart-area'
        },
        {
          href: '#',
          title: 'Tables',
          icon: 'fa fa-table'
        }

      ]
      }
</script>

<style>

</style>
