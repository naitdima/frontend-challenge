<template>
  <form @submit.prevent="emit('submit', state.isin)">
    <InputText
      :model-value="state.isin"
      :error="v$.isin.$errors[0]?.$message"
      mask="@@*********#"
      @update:modelValue="onChangeISIN"
    />
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'

const emit = defineEmits<{
  (e: 'submit', isin: string): void
}>()

const state = reactive({
  isin: ''
})

const rules = {
  isin: {
    required,
    minLength: helpers.withMessage('At least 12 characters', minLength(12))
  }
}

const v$ = useVuelidate(rules, state)

function onChangeISIN(value) {
  state.isin = value.toUpperCase()
  v$.value.isin.$touch()
}
</script>

<style scoped>
.main {
  max-width: var(--max-width);
  margin: 0 auto;
}

.heading1 {
  font-weight: 700;
}

.component-list {
  padding: 0 0 0 12px;
}
</style>
