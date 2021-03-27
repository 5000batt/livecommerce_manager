<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <div id="twitch-embed"></div>
        </v-col>
        <v-col cols="12" sm="4">
          <v-dialog v-model="dialog" persistent max-width="600px" @click:outside="dialog = false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                absolute
                right
                @click="addBroadcast()"
              >
                방송 정보추가
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">방송 정보</span>
                <v-btn color="blue darken-1" @click="dialog = false" right absolute icon><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-img height="100%" v-bind:src="imageUrl"></v-img>
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
                          <v-autocomplete
                            label="상품이름"
                            :items="name"
                            @change="updateProduct"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input
                            label="대표이미지"
                            v-model="imageUrl"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12">
                          <!-- <v-text-field
                            label="가격"
                            v-for="item in list"
                            v-bind:key="item.id"
                            >{{ item.unitPrice }}</v-text-field
                          > -->
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
import api from "@/api/product";

export default {
  // ...
  components: {
  },
  data() {
    return {
      dialog: false,
      items: ["광장시장", "그냥시장"],
      list: [],
      name: [],
      unitPrice: [],
      imageUrl: [],
    };
  },
  mounted() {

    const twitch = document.createElement("script");
    twitch.innerHTML = `
      new Twitch.Embed("twitch-embed", {
          width: 854,
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
    async addBroadcast() {
      console.log("--getProduct--");
      const result = await api.list();
      // console.log(result);
      // console.log(result.data);
      if (result.status == 200) {
        this.list = result.data;
      }
      // businessNumber가 "111-11-11111" 인 것만 필터링
      const businessNumber = this.list.filter(function (person) {
        return person.businessNumber == "111-11-11111";
      });
      this.list = businessNumber
      // name 값들을 배열로 추출
      let name = this.list.map(a => a.name);
      // console.log(name);
      this.name = name;
      
      // for (let j = 0; businessNumber.length; j++) {
      //   this.name.push(businessNumber[j].name);
      // }
    },
    updateProduct(a) {
      // businessNumber가 "111-11-11111" 인 것만 필터링
      // const businessNumber = this.list.filter(function (person) {
      //   return person.businessNumber == "111-11-11111";
      // });
      let unitPrice = this.list.map(a => a.unitPrice)
      let imageUrl = this.list.map(a => a.imageUrl)
      console.log(a);
      for (let j = 0; j < this.list.length; j++) {
        if ( a == this.name[j]) {
        this.unitPrice = unitPrice[j]
        this.imageUrl = imageUrl[j]
        }
      }
    },
  },
  // ...
};
</script>
