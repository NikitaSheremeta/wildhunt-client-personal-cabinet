<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="grid">
          <span class="copyright">
            {{ copyright }}
          </span>

          <div class="navigation">
            <BaseButton
              v-for="item in navigation"
              :key="item.slot"
              :to="item.to"
              tag-name="a"
              color="secondary"
            >
              {{ item.slot }}
            </BaseButton>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="grid">
          <span class="policy">
            Все права защищены. Копирование материалов сайта запрещено.
            <br />Мы предоставляем ознакомительный и бесплатный вариант игры
            Minecraft. <br />Приобрести полную весрию можно на сайте
            Minecraft.net
          </span>

          <div class="information">
            <BaseButton
              v-for="item in information"
              :key="item.slot"
              :to="item.to"
              :icon-left="item.icon"
              tag-name="a"
              color="secondary"
            >
              {{ item.slot }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import BaseButton from './framework/BaseButton';

export default {
  name: 'BaseFooter',
  components: {
    BaseButton
  },
  data() {
    return {
      navigation: [
        {
          slot: 'Главная',
          to: ''
        },
        {
          slot: 'Магазин',
          to: ''
        },
        {
          slot: 'Форум',
          to: ''
        },
        {
          slot: 'Новости',
          to: ''
        },
        {
          slot: 'Wiki',
          to: ''
        },
        {
          slot: 'FAQ',
          to: ''
        },
        {
          slot: 'Как начать играть',
          to: ''
        }
      ],
      information: [
        {
          slot: 'Техническая поддержка',
          to: '',
          icon: 'chat-messages'
        },
        {
          slot: 'Пользовательское соглашение',
          to: '',
          icon: 'file-contract'
        },
        {
          slot: 'Политика конфиденциальности',
          to: '',
          icon: 'file-lines'
        }
      ]
    };
  },
  computed: {
    copyright() {
      return `© 2021 - ${new Date().getFullYear()} minecraft-wildhunt.com`;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  margin-top: 80px;
  padding: 24px 0;
  background-color: $gray-900;
}

.row {
  .grid {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
  }

  &:first-child {
    margin-bottom: 4px;
  }
}

.navigation,
.information {
  display: flex;
  justify-content: flex-end;

  .base-link {
    margin: 0 16px;

    &:last-child {
      margin-right: 0;
    }
  }
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
</style>
