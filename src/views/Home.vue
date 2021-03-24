<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <div id="twitch-embed"></div>
        </v-col>
        <v-col cols="12" sm="4">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                absolute
                right
              >
                방송 정보추가
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">방송 정보</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-img
                        height="100%"
                        src="https://picsum.photos/id/11/500/300"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field label="방송제목"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select :items="items" label="카테고리"></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete label="상품이름"></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input label="대표이미지"></v-file-input>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="가격"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  저장
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  수정
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  삭제
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- <v-col cols="12" sm="4">
            <v-btn color="primary"></v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn color="primary"></v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn color="primary"></v-btn>
          </v-col> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import TwitchPlayer from "vue-twitch-player";

export default {
  // ...
  components: {
    // TwitchPlayer,
  },
  data() {
    return {
      // channel: "wjddnjs813",
      dialog: false,
      items: ["광장시장", "의정부시장"],
    };
  },
  mounted() {
    // const library = document.createElement("script");
    // library.src = "https://embed.twitch.tv/embed/v1.js";
    // document.body.appendChild(library);

    const twitch = document.createElement("script");
    twitch.innerHTML = `
      new Twitch.Embed("twitch-embed", {
          width: 854,
          height: 480,
          channel: "wjddnjs813",
          // video: "951261050",
          // only needed if your site is also embedded on embed.example.com and othersite.example.com
          parent: ["embed.example.com", "othersite.example.com"]
        });
      `;
    document.body.appendChild(twitch);
  },
  // ...
};
</script>
