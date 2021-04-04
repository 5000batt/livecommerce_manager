<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="11">
          <recording-list
            v-for="(item, i) in recordings"
            :key="i"
            :item="item"
            :index="i"
          >
          </recording-list>
        </v-col>
        <v-col cols="12" md="1">
          <template>
            <v-dialog v-model="dialog" max-width="300px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#6441a5"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="getBroadcast()"
                >
                  녹화 추가
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">녹화 정보</span>
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
                      <v-col cols="12">
                        <v-text-field
                          label="비디오 아이디"
                          v-model="videoId"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          label="방송제목"
                          :items="title"
                          v-model="broadcastTitle"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="방송날짜"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#6441a5" text @click="addRecordings">
                    저장
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RecordingList from "@/components/RecordingList.vue";
import api2 from "@/api/broadcast";
import api4 from "@/api/recording";

export default {
  components: {
    RecordingList,
  },
  data: () => ({
    dialog: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    broadcasts: [],
    title: [],
    broadcastTitle: "",
    videoId: "",
    path: "/RecordingScreen",

    recordings: [],
  }),
  mounted() {
    this.getRecording();
  },
  methods: {
    async getBroadcast() {
      const result = await api2.list();
      // console.log(result);
      // console.log(result.data);

      if (result.status == 200) {
        this.broadcasts = result.data;
      }

      let title = this.broadcasts.map((a) => a.broadcastTitle);

      this.title = title;
      // console.log(title);
      console.log(this.date);

      this.videoId = "";
      this.broadcastTitle = "";
      this.date = "";
    },
    async addRecordings() {
      this.dialog = false;
      console.log(this.videoId);
      console.log(this.broadcastTitle);
      console.log(this.data);

      const recording = {
        videoId: this.videoId,
        broadcastTitle: this.broadcastTitle,
        date: this.date,
        path: this.path,
      };

      const result = await api4.post(recording);

      console.log(result);
      console.log(result.status);
      console.log(result.data);

      const newRecording = result.data;

      if (result.status == 200) {
        this.recordings.unshift(newRecording);
      }
    },
    async getRecording() {
      const result = await api4.list();
      console.log(result);
      console.log(result.data);

      if (result.status == 200) {
        this.recordings = result.data;
      }
    },
  },
};
</script>