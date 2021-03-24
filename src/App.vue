<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>라이브 커머스 관리자</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="navigateTo(item)"
          >
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
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    drawer: true,
    selectedItem: 0,
    items: [
      { text: "방송관리", icon: "mdi-message-video", path: "/" },
      { text: "녹화관리", icon: "mdi-record-rec", path: "/recording" },
      { text: "방송가이드", icon: "mdi-television-guide", path: "/guide" },
    ],
  }),
  methods: {
    navigateTo(item) {
      if (this.$route.path != item.path) {
        this.$router.push(item.path);
      }
    },
  },
};
</script>
