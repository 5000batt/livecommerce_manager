<template>
  <div class="about">
    <div id="twitch-embed"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const twitch = document.createElement("script");
    twitch.innerHTML = `
        new Twitch.Embed("twitch-embed", {
            width: "100%",
            height: 780,
            // channel: "wjddnjs913",
            video: "960740701",
            // only needed if your site is also embedded on embed.example.com and othersite.example.com
            parent: ["embed.example.com", "othersite.example.com"]
          });
        `;
    document.body.appendChild(twitch);
  },
};
</script>