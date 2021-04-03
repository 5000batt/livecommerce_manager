<template>
  <div id="twitch-embed"></div>
</template>

<script>
export default {
  computed: {
    videoId() {
      return this.$route.params.videoId;
    },
  },
  mounted() {
    const twitch = document.createElement("script");
    twitch.innerHTML =
      `
      new Twitch.Embed("twitch-embed", {
          width: "100%",
          height: 780,
          // channel: "",
          video: "` +
      this.videoId +
      `",
          // only needed if your site is also embedded on embed.example.com and othersite.example.com
          parent: ["embed.example.com", "othersite.example.com"]
        });
      `;
    document.body.appendChild(twitch);
  },
};
</script>