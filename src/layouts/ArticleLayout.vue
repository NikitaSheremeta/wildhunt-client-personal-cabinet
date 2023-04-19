<template>
  <ArticleHeader />

  <section class="content">
    <router-view />
  </section>
  <CustomFooter />
</template>

<script>
import ArticleHeader from '@/components/custom/ArticleHeader';
import CustomFooter from '@/components/base/BaseFooter';

export default {
  name: 'ArticleLayout',
  components: {
    ArticleHeader,
    CustomFooter
  }
};
</script>
