<template>
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
          <span class="sr-only">内容</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand">
          <span style="color: white;">首页</span>
        </router-link>
      </div>
      <div class="collapse navbar-collapse navbar-ex1-collapse">
        <ul class="nav navbar-nav" id="pMenu">
          <li>
            <a class="dropdown-toggle" style="cursor: pointer;" data-toggle="dropdown">
              Table
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Table</li>
              <li>
                <router-link :to="{ name: 'TableClientPager' }" class="dropdown-toggle">
                  TableClientPager
                </router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link :to="{ name: 'FormDemo' }">Form</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Charts' }">ECharts</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle ng-binding" data-toggle="dropdown">
              <span class="glyphicon glyphicon-user"></span>&nbsp;
              {{ user.username }}
            </a>
            <ul class="dropdown-menu">
              <li @click="logout">
                <a style="cursor:pointer;">
                  <span class="glyphicon glyphicon-off"></span>&nbsp; 退出
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NavHeader',
    computed: {
      user() {
        return this.$store.state.user.info
      }
    },
    methods: {
      async logout() {
        await this.$confirm('是否退出?')
        this.$store.dispatch('logout')
      }
    }
  }
</script>
