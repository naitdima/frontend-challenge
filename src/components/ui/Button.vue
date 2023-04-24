<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 12px 16px;
  border: 1px solid var(--color-foreground3);
  background-color: var(--color-foreground3);
  color: var(--color-foreground4);
  font-family: inherit;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;

  &:hover {
    border-color: var(--color-foreground3);
    background-color: var(--color-foreground4);
    color: var(--color-foreground3);
  }

  &:active {
    border-color: var(--color-foreground2);
    background-color: var(--color-foreground4);
    color: var(--color-foreground2);
  }

  &:disabled {
    background-color: var(--color-background2);
    color: var(--color-foreground2);
    cursor: not-allowed;
  }
}
</style>
