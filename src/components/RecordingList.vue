<template>
  <v-list>
    <v-list-item-group>
      <template>
        <v-list-item @click="navigateTo(item)">
          <template>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.broadcastTitle"
              ></v-list-item-title>

              <v-list-item-subtitle
                v-text="item.videoId"
              ></v-list-item-subtitle>

              <v-list-item-subtitle v-text="item.date"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: ["item", "index"],
  computed: {
    videoId() {
      return this.$route.params;
    },
  },
  methods: {
    async navigateTo(item) {
      if (this.$route.path != item.path) {
        this.$router.push({
          name: "RecordingScreen",
          params: { videoId: item.videoId },
        });
      }
      console.log(item);
    },
  },
};
</script>
