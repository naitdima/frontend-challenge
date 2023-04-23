<template>
  <label class="input">
    <input
      class="input__field"
      :class="{ 'input__field_error': error }"
      v-model="innerValue"
      :placeholder="placeholder"
      v-maska:[maskOptions]
    />
    <p class="input__error">{{ error }}</p>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { vMaska } from 'maska'

const props = defineProps<{
  modelValue: string
  placeholder: string
  mask: string
  error: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const innerValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})

const maskOptions = computed(() => {
  return {
    mask: props.mask
  }
})
</script>

<style scoped>
.input {
  display: inline-block;
  position: relative;
  padding-bottom: 14px;
}

.input__field {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid var(--color-foreground1);
  background: transparent;
  color: var(--color-foreground3);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--color-foreground3);
    color: var(--color-foreground3);
  }
}

.input__field_error {
  border-color: var(--color-primary-red1);

  &:focus {
    border-color: var(--color-primary-red1);
  }
}

.input__error {
  margin: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  font-size: 10px;
  line-height: 14px;
  color: var(--color-primary-red1);
}
</style>
