<template>
  <twitch-player
    :channel="channel"
  ></twitch-player>
</template>

<script>
  import TwitchPlayer from 'vue-twitch-player';

  export default {
    // ...
    components: {
      TwitchPlayer,
    },
    data() {
      return {
        channel: 'wjddnjs813',
      };
    },
    // ...
  };
</script>
