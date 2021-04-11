<template>
  <v-list>
    <v-list-item-group>
      <template>
        <v-list-item @click="Broadcast(item)">
          <template>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.broadcastTitle"
              ></v-list-item-title>
              <v-list-item-subtitle
                class="text--primary"
                v-text="item.category"
              ></v-list-item-subtitle>
              <v-list-item-subtitle v-text="item.price"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-dialog v-bind:key="item.id" v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">방송 정보</span>
              <v-btn color="#6441a5" @click="dialog = false" right absolute icon
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <div v-for="(file, i) in item.files" :key="i">
                      <v-img
                        height="100%"
                        :src="file.dataUrl"
                        :alt="file.fileName"
                      ></v-img>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-text-field
                          label="방송제목"
                          v-model="item.broadcastTitle"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="categoryName"
                          v-model="item.category"
                          label="카테고리"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          :items="name"
                          label="상품이름"
                          @change="updateProduct"
                          v-model="item.productName"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                          label="대표이미지"
                          prepend-icon="mdi-image"
                          accept="image/png, image/jpeg, image/bmp"
                          v-model="item.files"
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="가격" v-model="item.price">
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#6441a5" text @click="reg(item)" left absolute>
                등록
              </v-btn>
              <v-btn color="#6441a5" text @click="modBroadcast(item)">
                수정
              </v-btn>
              <v-btn color="#6441a5" text @click="del(item)"> 삭제 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- <v-divider v-if="index < items.length - 1" :key="index"></v-divider> -->
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import api from "@/api/product";
import api2 from "@/api/broadcast";
import api3 from "@/api/category";

export default {
  props: ["item", "index"],
  data: () => ({
    dialog: false,
    category: [],
    categoryName: [],
    products: [],
    name: [],
    broadcasts: [],
    price: "",
  }),
  mounted() {},
  methods: {
    async Broadcast() {
      this.dialog = true;

      const result = await api.list();
      const result2 = await api2.list();
      const result3 = await api3.category();

      if (result.status == 200) {
        this.products = result.data;
      }

      if (result2.status == 200) {
        this.broadcasts = result2.data;
      }

      if (result3.status == 200) {
        this.category = result3.data;
      }

      let name = this.products.map((a) => a.name);
      let category = this.category.map((a) => a.category);

      this.name = name;
      this.categoryName = category;

      // console.log(this.item);
      console.log(this.item.files);
      // this.broadcasts.unshift(newBroadcast);
      // console.log(this.broadcasts[this.index].files[0].dataUrl);
      // this.item.files.unshift(this.broadcasts[this.index].files[0].dataUrl);
    },
    async modBroadcast(item) {
      this.dialog = false;

      console.log(`item: ${item.id}`);
      // console.log(item);
      // console.log(item.broadcastTitle);
      // console.log(item.imageUrl);

      const broadcast = {
        broadcastTitle: item.broadcastTitle,
        category: item.category,
        productName: item.productName,
        // imageUrl: item.imageUrl,
        price: item.price,
        channelId: item.channelId,
      };

      const result = await api2.patch(item.id, broadcast);
      console.log(result);
      console.log(result.data);
      // console.log(item.broadcastTitle);
    },
    async updateProduct(a) {
      let price = this.products.map((a) => a.price);
      // let id = this.products.map((a) => a.id);
      console.log(a);
      for (let j = 0; j < this.products.length; j++) {
        if (a == this.name[j]) {
          this.price = price[j];
          // this.id = id[j];
          // console.log("imageUrl:" + this.imageUrl);
          // console.log(this.id);
        }
      }
    },
    del() {
      this.dialog = false;

      this.$emit("del", this.index, this.item.id);
    },
    reg() {
      this.dialog = false;

      this.$emit("reg", this.index, this.item.id);
    },
    // async regBroadcast(item) {
    //   this.dialog = false;

    //   const broadcast = {
    //     broadcastTitle: item.broadcastTitle,
    //     category: item.category,
    //     productName: item.productName,
    //     images: item.files[0].dataUrl,
    //     price: item.price,
    //     channelId: item.channelId,
    //   };
    //   console.log(item.files[0].dataUrl);

    //   const result = await api2.register(item.id, broadcast);
    //   console.log(result);
    //   console.log(result.data);
    // },
  },
};
</script>