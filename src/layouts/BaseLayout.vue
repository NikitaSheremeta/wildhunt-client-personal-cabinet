<template>
  <BaseHeader />
  <router-view />
</template>

<script>
import BaseHeader from '../components/BaseHeader';

export default {
  components: {
    BaseHeader
  }
};
</script>
