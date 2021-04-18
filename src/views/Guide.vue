<template>
  <div>
    <h1>[방송 준비사항]</h1>
    <v-row>
      <v-col>
        <h2>Twitch</h2>
        <ol>
          <li>
            <a href="https://www.twitch.tv/" target="_blank"
              >Twtich 회원 가입</a
            >
            <v-img
              width="400"
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FAeL0H%2FbtqMi0sgA2h%2FVoSHgHeO8rvvFkdMTXcT81%2Fimg.png"
            ></v-img>
            채널 아이디 확인
          </li>
          <br />
          <li>
            <a href="https://dev.twitch.tv/console" target="_blank"
              >client Id key 발급</a
            >(녹화 이용 시)
          </li>
          <v-img
            width="400"
            src="https://blog.twitch.tv/assets/uploads/4e50d848b834a12e22a0e6554e6dfcc9.jpeg"
          ></v-img>
        </ol>
      </v-col>
      <v-col>
        <h2>OBS Studio</h2>
        <v-card width="400" height="620" class="d-flex flex-column">
          <v-container>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-img
                  max-width="200"
                  height="200"
                  src="https://static.twitchcdn.net/assets/obs_logors_1x-52d53b14faec28b76e16.png"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
          <v-card-title>Open Broadcaster Software</v-card-title>
          <v-card-subtitle>
            <a href="https://obsproject.com/" target="_blank"
              >https://obsproject.com/</a
            >
          </v-card-subtitle>
          <v-card-text>
            녹화와 생방송을 위한 무료 오픈 소스 소프트웨어입니다. 누구나 소스
            코드를 이용하여 응용 프로그램을 더욱 발전시킬 수 있습니다.
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions
            ><v-btn
              width="380"
              color="#6441a5"
              dark
              href="https://obsproject.com/"
              target="_blank"
              >다운로드</v-btn
            >
          </v-card-actions>
          <v-card-actions>
            <v-btn
              width="380"
              href="https://obsproject.com/help"
              target="_blank"
              depressed
              color="white"
              class="purple--text"
            >
              설정 안내
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
