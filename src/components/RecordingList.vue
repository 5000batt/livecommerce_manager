<template>
  <v-list>
    <v-list-item-group>
      <template>
        <v-list-item>
          <template>
            <v-card outlined width="100%">
              <v-row align="center">
                <v-col cols="12" md="3" @click="navigateTo(item)">
                  <v-img height="150" width="300" :src="thumbNail"> </v-img>
                </v-col>
                <v-col cols="12" md="8">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.broadcastTitle"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="item.videoId"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="item.date"
                    ></v-list-item-subtitle>
                    <v-col cols="12" md="1">
                      <v-card-actions>
                        <v-btn right absolute top @click="del(item)"
                          ><v-icon>mdi-delete</v-icon></v-btn
                        >
                      </v-card-actions>
                    </v-col>
                  </v-list-item-content>
                </v-col>
              </v-row>
            </v-card>
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
  data: () => ({
    thumbNail: "",
  }),
  mounted() {
    this.fetchVideos();
  },
  methods: {
    fetchVideos: function () {
      // console.log(this.item.videoId);
      //963484987
      //961108794
      // let fetchLink = "https://api.twitch.tv/kraken/videos/961108794";
      let fetchLink =
        `https://api.twitch.tv/kraken/videos/` + this.item.videoId;
      console.log(fetchLink);
      fetch(fetchLink, {
        method: "get",
        headers: new Headers({
          Accept: "Bearer application/vnd.twitchtv.v5+json",
          "Client-ID": "g3gnxt6eiqtcf12w6yv2uv2md10zgw",
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          // console.log(data.preview.large);
          this.thumbNail = data.preview.large;
        });
    },
    async navigateTo(item) {
      if (this.$route.path != item.path) {
        this.$router.push({
          name: "RecordingScreen",
          params: { videoId: item.videoId },
        });
      }
      console.log(item);
    },
    del() {
      this.$emit("del", this.index, this.item.id);
    },
  },
};
</script>
