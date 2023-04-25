<template>
  <header class="header">
    <a href="/" aria-label="Trade Republic">
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
}

.header__logo {
  width: 60px;
  fill: var(--color-foreground3);
}
</style>
