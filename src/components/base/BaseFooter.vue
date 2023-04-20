<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="grid">
          <span class="copyright" v-text="copyright" />

          <div class="navigation">
            <BaseLink
              v-for="item in state.navigation"
              :key="item.label"
              color="secondary"
              :label="item.label"
              :href="item.to"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="grid">
          <span class="policy">
            Все права защищены. Копирование материалов сайта запрещено.
            <br />Мы предоставляем ознакомительный и бесплатный вариант игры Minecraft. <br />Приобрести полную весрию
            можно на сайте Minecraft.net'
          </span>

          <div class="information">
            <BaseLink
              v-for="item in state.information"
              :key="item.label"
              color="secondary"
              :label="item.label"
              :href="item.to"
              :icon-left="item.icon"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue';
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'BaseFooter',
  components: {
    BaseLink
  },
  setup() {
    const state = reactive({
      navigation: [
        {
          label: 'Главная',
          to: '/'
        },
        {
          label: 'Магазин',
          to: 'shop'
        },
        {
          label: 'Форум',
          to: 'forum'
        },
        {
          label: 'Новости',
          to: 'news'
        },
        {
          label: 'Wiki',
          to: 'wiki'
        },
        {
          label: 'FAQ',
          to: 'faq'
        },
        {
          label: 'Скачать лаунчер',
          to: 'download-launcher'
        }
      ],
      information: [
        {
          label: 'Техническая поддержка',
          to: 'support',
          icon: 'chat-messages'
        },
        {
          label: 'Пользовательское соглашение',
          to: 'terms',
          icon: 'file-contract'
        },
        {
          label: 'Политика конфиденциальности',
          to: 'privacy-policy',
          icon: 'file-lines'
        }
      ]
    });

    const copyright = computed(() => `© ${new Date().getFullYear()} minecraft-wildhunt.com`);

    return {
      state,
      copyright
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
  padding: 32px 0;
  width: 100%;
  background-color: $gray-900;

  .grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    width: 100%;
  }

  .navigation,
  .information {
    display: flex;
    justify-content: flex-end;
    gap: 32px;
  }

  .information {
    align-items: flex-end;

    .base-link {
      line-height: $line-height-secondary;
      font-size: $font-size-xs;
    }
  }

  .copyright,
  .policy {
    color: $font-color-secondary;
  }

  .policy {
    line-height: $line-height-secondary;
    font-size: $font-size-xxs;
  }
}
</style>
