<template>
  <form class="form" @submit.prevent.stop="onSubmit">
    <InputText
      class="form__input"
      :model-value="state.isin"
      :error="error"
      label="ISIN"
      mask="@@*********#"
      placeholder="XX0000000000"
      @update:modelValue="onChangeISIN"
    />
    <Button class="form__btn"> Subscribe </Button>
  </form>
</template>

<script setup lang="ts">
import InputText from '@/components/ui/InputText.vue'
import Button from '@/components/ui/Button.vue'
import { reactive, nextTick, computed, unref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useStocksStore } from '@/store/stocks'
import { helpers, required, minLength } from '@vuelidate/validators'
import type { ComputedRef } from 'vue'

const { subscribe, isISINSubscribed } = useStocksStore()

const state = reactive({
  isin: 'US0378331006'
})

const rules = reactive({
  isin: {
    required,
    minLength: helpers.withMessage('At least 12 characters', minLength(12)),
    unique: helpers.withMessage('Already subscribed', (value: string) => !isISINSubscribed(value))
  }
})

const v$ = useVuelidate(rules, state)

const error: ComputedRef<string> = computed(() => {
  if (v$.value.isin.$errors.length > 0) {
    return unref(v$.value.isin.$errors[0].$message)
  }
  return ''
})

function onChangeISIN(value: string): void {
  state.isin = value.trim().toUpperCase()
}

function onSubmit(): void {
  v$.value.$touch()
  if (v$.value.$error) {
    return
  }
  subscribe(state.isin)
  state.isin = ''
  nextTick(() => v$.value.$reset())
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: flex-start;
}

.form__input {
  flex-grow: 1;
}

.form__btn {
  flex-shrink: 0;
  margin-top: 18px;
  margin-left: 12px;
}
</style>
