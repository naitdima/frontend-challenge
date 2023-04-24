<template>
  <form class="form" @submit.prevent="onSubmit">
    <InputText
      class="form__input"
      :model-value="state.isin"
      :error="v$.isin.$errors[0]?.$message ?? ''"
      label="ISIN"
      mask="@@*********#"
      placeholder="XX0000000000"
      @update:modelValue="onChangeISIN"
    />
    <Button class="form__btn"> Subscribe </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive, nextTick, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useStocksStore } from '@/store/stocks'
import { helpers, required, minLength } from '@vuelidate/validators'

const emit = defineEmits<{
  (e: 'submit', isin: string): void
}>()

const stocksStore = useStocksStore()
const { subscribe, isISINSubscribed } = stocksStore

const state = reactive({
  isin: 'US0378331006'
})

const rules = {
  isin: {
    required,
    minLength: helpers.withMessage('At least 12 characters', minLength(12)),
    unique: helpers.withMessage('Already subscribed', (value: string) => !isISINSubscribed(value))
  }
}

const v$ = useVuelidate(rules, state)

function onChangeISIN(value: string) {
  state.isin = value.trim().toUpperCase()
}

function onSubmit() {
  v$.value.$touch()
  if (v$.value.$error) {
    return
  }
  subscribe(state.isin)
  state.isin = ''
  nextTick(() => v$.value.$reset())
}

onMounted(() => {
  // @todo: focus input
})
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
  margin-top: 16px;
  margin-left: 12px;
}
</style>
