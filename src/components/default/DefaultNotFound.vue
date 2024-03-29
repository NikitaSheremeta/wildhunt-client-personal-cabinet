<template>
  <div class="not-found">
    <div class="wrapper">
      <h2 class="title" v-text="computedTitle" />

      <p class="description" v-text="computedDescription" />

      <div class="code">
        <span class="number">4</span>

        <div class="head">
          <div ref="leftEye" class="eye">
            <span data-depth="2" class="pupil"></span>
          </div>
          <div ref="rightEye" class="eye">
            <span data-depth="2" class="pupil"></span>
          </div>
        </div>

        <span class="number">4</span>
      </div>

      <BaseLink class="button" color="secondary" :label="labels.NOT_FOUND.GO_BACK" @click="backButton" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useBackButton } from '@/hooks/useBackButton';
import Parallax from 'parallax-js';
import BaseLink from '@/components/base/BaseLink';
import { labels } from '@/utils/labels';

export default {
  name: 'DefaultNotFound',
  components: {
    BaseLink
  },
  setup() {
    const leftEye = ref(null);
    const rightEye = ref(null);

    const backButton = useBackButton();

    const route = useRoute();

    const computedTitle = computed(() => (route.meta['title'] ? route.meta['title'] : labels.NOT_FOUND.TITLE));

    const computedDescription = computed(() =>
      route.meta['description'] ? route.meta['description'] : labels.NOT_FOUND.DESCRIPTION
    );

    onMounted(() => {
      const leftEyeParallax = new Parallax(leftEye.value);
      const rightEyeParallax = new Parallax(rightEye.value);

      leftEyeParallax.invert(0, 0);
      rightEyeParallax.invert(0, 0);
    });

    return {
      leftEye,
      rightEye,
      backButton,
      computedTitle,
      computedDescription,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.container,
.row,
.not-found {
  height: 100%;
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-weight: $font-weight-regular;
      margin: 0;
    }

    .description {
      margin-top: 8px;
      margin-bottom: 24px;
      text-align: center;
    }

    .code {
      display: flex;
      align-items: center;
      gap: 32px;

      .number {
        margin-bottom: 40px;
        line-height: 0;
        font-size: 280px;
        font-weight: $font-weight-bold;
      }

      .head {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 320px;
        height: 320px;
        background-image: url('../../assets/img/enderman-head.svg');
        background-size: 100%;
        background-repeat: no-repeat;

        .eye {
          position: relative;
          display: flex;
          justify-content: center;
          top: 160px;
          width: 120px;
          height: 40px;
          background-color: $white;
          overflow: hidden;

          .pupil {
            position: absolute;
            width: 40px;
            height: 40px;
            background-color: $enderman;
          }
        }
      }
    }

    .button {
      margin-top: 24px;
    }
  }

  @include media-breakpoint-only(sm) {
    .wrapper {
      .code {
        .number {
          margin-top: 8px;
          font-size: 212px;
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .wrapper {
      .code {
        .head {
          width: 240px;
          height: 240px;

          .eye {
            top: 119px;
            width: 90px;
            height: 30px;

            .pupil {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-down(xs) {
    .wrapper {
      .code {
        .number {
          display: none;
        }
      }
    }
  }
}
</style>
