<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 4px 12px;
  border: none;
  border-radius: 2px;
  background: var(--color-primary-blue2);
  color: var(--color-foreground3);
  font-family: inherit;

  &:hover {
    cursor: pointer;
    background: var(--color-primary-blue3);
  }

  &:active {
    background: var(--color-primary-blue1);
  }

  &:disabled {
    background: var(--color-primary-blue1);
    color: var(--color-foreground1);
    cursor: not-allowed;
  }
}
</style>
