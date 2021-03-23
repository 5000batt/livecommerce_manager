<template>
<v-app>
    <v-app-bar color="primary" dark>
    <!-- -->
                          <!--click -> e.stopPropagation-->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    
      <v-app-bar-title>라이브 커머스 관리자</v-app-bar-title>
    
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <!-- -->
    <v-list dense>
      <!-- <v-subheader>MENU</v-subheader> -->
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" @click="navigateTo(item)">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer>
    <!-- -->
  </v-footer>
</v-app>  
</template>
<script>
  export default {
    name: 'App',
    data: () => ({
      drawer: true, // drawer의 기본 값
      selectedItem: 0,
      items: [
        /* https://cdn.materialdesignicons.com/5.4.55/ */
        { text: '방송관리', icon: 'mdi-message-video', path: '/' },
        { text: '녹화관리', icon: 'mdi-record-rec', path: '/contacts' },
        { text: '방송가이드', icon: 'mdi-television-guide', path: '/feeds' },
      ],     
    }),
    methods: {
      navigateTo(item) {
        /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
        // 현재 경로와 다르면
        if(this.$route.path != item.path){
          // 라우터에 경로 추가
          this.$router.push(item.path);
        }
      }
    }
  }
</script>
