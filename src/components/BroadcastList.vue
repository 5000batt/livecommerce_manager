<template>
  <v-list>
    <v-list-item-group>
      <template>
        <v-list-item @click="Broadcast">
          <template>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.broadcastTitle"
              ></v-list-item-title>

              <v-list-item-subtitle
                class="text--primary"
                v-text="item.category"
              ></v-list-item-subtitle>

              <v-list-item-subtitle
                v-text="item.unitPrice"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-dialog
          v-bind:key="item.id"
          v-model="dialog"
          persistent
          max-width="600px"
          @click:outside="dialog = false"
        >
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
                    <v-img height="100%" v-bind:src="item.imageUrl"></v-img>
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
                          :items="item.category"
                          v-model="item.category"
                          label="카테고리"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          :items="item"
                          item-text="productName"
                          label="상품이름"
                          v-model="item.productName"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                          label="대표이미지"
                          v-model="item.imageUrl"
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="가격" v-model="item.unitPrice">
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#6441a5" text @click="dialog = false" left absolute>
                등록
              </v-btn>
              <v-btn color="#6441a5" text @click="modBroadcast(item)">
                수정
              </v-btn>
              <v-btn color="#6441a5" text @click="del(item)"> 삭제 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import api2 from "@/api/broadcast";

export default {
  props: ["item", "index"],
  data: () => ({
    dialog: false,
    items: [],
  }),
  mounted() {},
  methods: {
    async Broadcast() {
      this.dialog = true;
    },
    async del(item) {
      this.dialog = false;

      await api2.del(item.id);

      window.location.reload();
    },
    async modBroadcast(item) {
      this.dialog = false;

      console.log(`item: ${item.id}`);
      // console.log(item);
      // console.log(item.broadcastTitle);
      console.log(item.imageUrl);

      const broadcast = {
        broadcastTitle: item.broadcastTitle,
        category: item.category,
        productName: item.productName,
        imageUrl: item.imageUrl,
        unitPrice: item.unitPrice,
        channelId: item.channelId,
      };

      const result = await api2.patch(item.id, broadcast);
      console.log(result);
      console.log(result.data);
      // console.log(item.broadcastTitle);
    },
  },
};
</script>