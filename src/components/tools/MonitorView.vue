<template>
    <div class="monitor-view">
      <video ref="video" class="video-js vjs-default-skin" controls></video>
    </div>
  </template>
  
  <script>
  import Hls from 'hls.js';
  import 'video.js/dist/video-js.css';
  
  export default {
    props: {
      videoUrl: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.initVideo();
    },
    methods: {
      initVideo() {
        if (Hls.isSupported()) {
          const video = this.$refs.video;
          const hls = new Hls();
          hls.loadSource(this.videoUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
          });
        } else if (this.$refs.video.canPlayType('application/vnd.apple.mpegurl')) {
          this.$refs.video.src = this.videoUrl;
          this.$refs.video.addEventListener('loadedmetadata', function () {
            this.play();
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .monitor-view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  