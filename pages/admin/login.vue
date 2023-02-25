<template>
  <div>
    <div class="text-xl font-bold text-red-700">
      Přihlásit:
    </div>
    <FormKit type="form" submit-label="Přihlásit" @submit="attemptLogin">
      <FormKit
        id="email"
        v-model="email"
        type="text"
        name="email"
        label="E-mail:"
        validation="required"
      />
      <FormKit
        id="password"
        v-model="password"
        type="password"
        name="password"
        label="Heslo:"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
useLoginStore().refresh()

const email = ref('')
const password = ref('')

const attemptLogin = async () => {
  await useLoginStore().login(email.value, password.value)
}
</script>
