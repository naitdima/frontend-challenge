<template>
  <header class="header">
    <a href="/">
      <Logo class="header__logo" />
    </a>
  </header>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/logo.svg'
</script>

<style scoped>
.header {
  margin: 0 auto;
  padding: 24px 0;
  display: flex;
  max-width: var(--max-width);

  .header-title {
    visibility: hidden;
  }

  .header-logo {
    width: 60px;
  }
}

.header__logo {
  fill: var(--color-foreground3);
}
</style>
