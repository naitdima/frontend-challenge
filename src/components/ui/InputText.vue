<template>
  <label class="input">
    <span v-if="label" class="input__label">
      {{ label }}
    </span>
    <input
      class="input__field"
      :class="{ 'input__field_error': error }"
      v-model="innerValue"
      :placeholder="placeholder"
      v-maska:[maskOptions]
    />
    <span v-show="error" class="input__error">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { vMaska } from 'maska'

const props = defineProps<{
  modelValue: string
  label: string
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

.input__label {
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-foreground1);
}

.input__field {
  box-sizing: border-box;
  padding: 0;
  font-size: 14px;
  line-height: 16px;
  height: 40px;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--color-foreground1);
  background-color: transparent;
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
  display: block;
  left: 0;
  position: absolute;
  font-size: 10px;
  line-height: 14px;
  color: var(--color-primary-red1);
}
</style>
