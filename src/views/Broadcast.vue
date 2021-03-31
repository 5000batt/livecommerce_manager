<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="9">
          <div id="twitch-embed"></div>
        </v-col>
        <v-col cols="12" md="3">
          <template>
            <v-card height="780">
              <v-card-title>
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="600px"
                  @click:outside="dialog = false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#6441a5"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="getProduct()"
                    >
                      방송 정보추가
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">방송 정보</span>
                      <v-btn
                        color="#6441a5"
                        @click="dialog = false"
                        right
                        absolute
                        icon
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-img height="100%" v-bind:src="imageUrl"></v-img>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-row no-gutters>
                              <v-col cols="12">
                                <v-text-field
                                  label="방송제목"
                                  v-model="broadcastTitle"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-autocomplete
                                  :items="categoryName"
                                  label="카테고리"
                                  v-model="category"
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12">
                                <v-autocomplete
                                  label="상품이름"
                                  :items="name"
                                  @change="updateProduct"
                                  v-model="productName"
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12">
                                <v-file-input
                                  label="대표이미지"
                                  v-model="imageFile"
                                  chips
                                ></v-file-input>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field label="가격" v-model="unitPrice">
                                </v-text-field>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#6441a5" text @click="addBroadcasts">
                        저장
                      </v-btn>
                      <!-- <v-btn color="blue darken-1" text @click="dialog = false">
                        수정
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        삭제
                      </v-btn> -->
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <broadcast-list
                    v-for="(item, i) in items"
                    :key="i"
                    :item="item"
                    :index="i"
                  >
                  </broadcast-list>
                </v-container>
              </v-card-text>
              <v-footer absolute>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-text-field
                    color="#6441a5"
                    label="방송채널"
                    v-model="channelId"
                    >입력</v-text-field
                  >
                  <v-btn color="#6441a5" text @click="broadcast"
                    >방송출력</v-btn
                  >
                  <!-- <v-btn color="primary" text>방송등록</v-btn> -->
                </v-card-actions>
              </v-footer>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BroadcastList from "@/components/BroadcastList.vue";
import api from "@/api/product";
import api2 from "@/api/broadcast";
import api3 from "@/api/category";

export default {
  // ...
  components: {
    BroadcastList,
  },
  data: () => ({
    dialog: false,
    category: [],
    items: [],
    products: [],
    name: [],
    unitPrice: "",
    imageUrl: "",
    channelId: "",
    broadcastTitle: "",
    productName: "",
    categoryName: [],
    imageFile: [],
  }),
  mounted() {
    this.getBroadcasts();
  },
  methods: {
    async getBroadcasts() {
      const result = await api2.list();
      console.log(result);
      console.log(result.data);

      if (result.status == 200) {
        this.items = result.data;
      }
    },
    async getProduct() {
      // console.log("--getProduct--");
      const result = await api.list();
      // console.log("imageUrl:" + this.imageUrl);
      const result2 = await api3.category();
      // console.log(result2);
      // console.log(result2.data);
      if (result.status == 200) {
        this.products = result.data;
      }
      if (result2.status == 200) {
        this.category = result2.data;
      }
      // console.log(this.category);
      let category = this.category.map((a) => a.category);
      // console.log(category);
      this.categoryName = category;
      // businessNumber가 "111-11-11111" 인 것만 필터링
      // const businessNumber = this.list.filter(function (person) {
      //   return person.businessNumber == "111-11-11111";
      // });
      // this.list = businessNumber;
      // name 값들을 배열로 추출
      let name = this.products.map((a) => a.name);
      // console.log(name);
      this.name = name;

      // for (let j = 0; businessNumber.length; j++) {
      //   this.name.push(businessNumber[j].name);
      // }
      this.broadcastTitle = "";
      this.category = [];
      this.productName = "";
      this.imageFile = [];
      this.unitPrice = "";
      this.channelId = "";
      this.imageUrl = "";
    },
    updateProduct(a) {
      // businessNumber가 "111-11-11111" 인 것만 필터링
      // const businessNumber = this.list.filter(function (person) {
      //   return person.businessNumber == "111-11-11111";
      // });
      let unitPrice = this.products.map((a) => a.unitPrice);
      let imageUrl = this.products.map((a) => a.imageUrl);
      console.log(a);
      for (let j = 0; j < this.products.length; j++) {
        if (a == this.name[j]) {
          this.unitPrice = unitPrice[j];
          this.imageUrl = imageUrl[j];
          // console.log("imageUrl:" + this.imageUrl);
        }
      }
    },
    async addBroadcasts() {
      this.dialog = false;

      const broadcast = {
        broadcastTitle: this.broadcastTitle,
        category: this.category,
        productName: this.productName,
        imageUrl: this.imageUrl,
        unitPrice: this.unitPrice,
        channelId: this.channelId,
      };
      console.log(this.productName);
      const result = await api2.post(broadcast);
      // console.log(this.title);

      console.log(result.status);
      // console.log(result.data);

      window.location.reload();
    },
    broadcast() {
      // console.log(this.channelId);
      const twitch = document.createElement("script");
      twitch.innerHTML =
        `
      new Twitch.Embed("twitch-embed", {
          width: "100%",
          height: 780,
          channel: "` +
        this.channelId +
        `",
          // video: "951261050",
          // only needed if your site is also embedded on embed.example.com and othersite.example.com
          parent: ["embed.example.com", "othersite.example.com"]
        });
      `;
      document.body.appendChild(twitch);
    },
  },
  // ...
};
</script>
