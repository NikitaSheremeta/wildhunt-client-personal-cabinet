<template>
  <BaseHeader />
  <section class="content">
    <router-view />
    <div class="parallax" ref="parallax" style="z-index: 0">
      <img
        data-depth="0.05"
        class="parallax-image"
        src="../assets/img/parallax/eye.png"
        alt="Minecraft Wild Hunt"
      />

      <img
        data-depth="0.1"
        class="parallax-image"
        src="../assets/img/parallax/bow.png"
        alt="Minecraft Wild Hunt"
      />

      <img
        data-depth="0.2"
        class="parallax-image"
        src="../assets/img/parallax/book.png"
        alt="Minecraft Wild Hunt"
      />
    </div>
  </section>
  <BaseFooter />
</template>

<script>
import BaseHeader from '../components/BaseHeader';
import BaseFooter from '../components/BaseFooter';
import Parallax from 'parallax-js';

export default {
  components: {
    BaseHeader,
    BaseFooter
  },
  mounted() {
    new Parallax(this.$refs.parallax);
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
}

.parallax {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &-image {
    opacity: 0.8;

    &:first-child {
      width: 40px;
      margin-left: 65%;
      filter: blur(1px);
    }

    &:nth-child(2) {
      margin-top: 25%;
      margin-left: 85%;
      width: 80px;
      filter: blur(2px);
    }

    &:nth-child(3) {
      margin-top: 12.5%;
      margin-left: 7.5%;
      width: 120px;
      filter: blur(3px);
    }
  }
}
</style>
