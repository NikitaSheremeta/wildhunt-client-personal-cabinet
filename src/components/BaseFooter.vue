<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="grid">
          <div class="some">
            <img
              class="logo"
              src="../assets/img/logo-mini.svg"
              alt="Minecraft Wild Hunt"
            />
            <span>© 2022 minecraft-wildhunt.com</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="grid">
          <div class="copyright">
            <span class="copyright-text">
              Все права защищены. Копирование материалов сайта запрещено.
              <br />Мы предоставляем ознакомительный и бесплатный вариант игры
              Minecraft. <br />Приобрести полную весрию можно на сайте
              Minecraft.net
            </span>
          </div>
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
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  margin-top: 48px;
  padding: 24px 0;
  background-color: $gray-900;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 3fr;
  width: 100%;
}

.some {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .logo {
    margin-right: 16px;
    margin-bottom: 8px;
    width: 32px;
  }
}

.copyright {
  display: flex;
  align-items: center;

  &-text {
    line-height: $line-height-secondary;
    color: $font-color-secondary;
    font-size: $font-size-xs;
  }
}

.information {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .base-link {
    margin: 0 16px;
    line-height: $line-height-secondary;
    font-size: $font-size-xs;
  }
}

.contacts {
  display: flex;
  justify-content: flex-end;
}
</style>
