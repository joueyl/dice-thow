<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Dice } from '../dist/index.es'

const container = ref<HTMLDivElement>()
onMounted(() => {
  const dice = new Dice({ element: container.value!, diceColor: 0xFF0000, shadowEnable: false })

  dice.on((number) => {
    // eslint-disable-next-line no-alert
    alert(`结果是${number}`)
  })
})
</script>

<template>
  <div ref="container" class="container" />
</template>

<style scoped>
.container {
  width: 20%;
  height: 300px;
}
</style>
