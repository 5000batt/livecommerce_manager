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
                <v-dialog v-model="dialog" max-width="600px">
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
                            <v-img
                              height="100%"
                              :src="preview"
                              :alt="productName"
                            ></v-img>
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
                                <v-text-field
                                  label="상품주소"
                                  v-model="productUri"
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
                                  prepend-icon="mdi-image"
                                  accept="image/png, image/jpeg, image/bmp"
                                  v-model="imageFiles"
                                  multiple
                                  @change="previewImage"
                                ></v-file-input>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field label="가격" v-model="price">
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
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-card-text>
                <v-container style="max-height: 700px" class="overflow-y-auto">
                  <broadcast-list
                    v-for="(item, i) in broadcasts"
                    :key="i"
                    :item="item"
                    :index="i"
                    @del="delBroadcast"
                    @reg="regBroadcast"
                  >
                  </broadcast-list>
                </v-container>
              </v-card-text>
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
    broadcasts: [],
    products: [],
    category: [],
    files: [],
    name: [],
    price: "",
    images: "",
    productUri: "",
    broadcastTitle: "",
    productName: "",
    categoryName: [],
    imageFiles: [],
    id: "",
    preview: "",
  }),
  mounted() {
    this.getBroadcasts();

    const twitch = document.createElement("script");
    twitch.innerHTML = `
      new Twitch.Embed("twitch-embed", {
          width: "100%",
          height: 780,
          channel: "wjddnjs813",
          // video: "951261050",
          // only needed if your site is also embedded on embed.example.com and othersite.example.com
          parent: ["embed.example.com", "othersite.example.com"]
        });
      `;
    document.body.appendChild(twitch);
  },
  methods: {
    async getBroadcasts() {
      const result = await api2.list();
      // console.log(result);
      // console.log(result.data);

      if (result.status == 200) {
        this.broadcasts = result.data;
        // products가 object로 나옴
        // console.log(this.broadcasts[0].product);
        // console.log(this.broadcasts[0].files[0].dataUrl);
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
      this.imageFiles = [];
      this.price = "";
      this.images = "";
      this.preview = "";
      this.productUri = "";
    },
    async updateProduct(a) {
      let price = this.products.map((a) => a.price);
      let images = this.products.map((a) => a.images);
      let id = this.products.map((a) => a.id);
      // console.log(a);
      for (let j = 0; j < this.products.length; j++) {
        if (a == this.name[j]) {
          this.price = price[j];
          this.images = images[j];
          this.id = id[j];
          // console.log("imageUrl:" + this.imageUrl);
          // console.log(this.id);
        }
      }
    },
    async addBroadcasts() {
      this.dialog = false;

      const broadcast = {
        broadcastTitle: this.broadcastTitle,
        category: this.category,
        productName: this.productName,
        images: this.images,
        price: this.price,
        productUri: this.productUri,
        product: { id: this.id },
      };

      // console.log(this.id);
      const result = await api2.post(broadcast);
      // console.log(this.title);
      // console.log(result);
      // console.log(result.status);
      // console.log(result.data);

      if (result.status == 200) {
        const newBroadcast = result.data;
        // console.log(newBroadcast);
        // console.log(newBroadcast.id);

        newBroadcast.imageFiles = [];
        // console.log(newBroadcast.imageFiles);
        // console.log(this.imageFiles);
        // console.log(this.imageFiles.length);

        if (this.imageFiles && this.imageFiles.length > 0) {
          for (let file of this.imageFiles) {
            const form = new FormData();
            form.append("data", file);

            const result = await api2.uploadFile(newBroadcast.id, form);
            console.log(result.status);
            console.log(result.data);

            newBroadcast.imageFiles.push({
              ...result.data,
            });
          }
        }

        // console.log(newBroadcast);

        this.broadcasts.unshift(newBroadcast);
      }

      location.reload();
    },
    async delBroadcast(index, id) {
      console.log(`index:${index} - id:${id}`);
      const result = await api2.del(id);
      console.log(result);
      console.log(result.data);

      if (result.status == 200) {
        this.broadcasts.splice(index, 1);
      }
    },
    async regBroadcast(index, id) {
      console.log(`index:${index} - id:${id}`);

      const result = await api2.register(id, this.broadcasts[index]);
      console.log(result);
      console.log(result.data);
    },
    previewImage() {
      const reader = new FileReader();
      console.log(this.imageFiles);
      console.log(this.imageFiles[0]);
      reader.readAsDataURL(this.imageFiles[0]);
      reader.onload = () => {
        this.preview = reader.result;
      };
    },
  },
  // ...
};
</script>
