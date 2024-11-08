<script setup lang="ts">
import { Dice } from 'dice'

import { onMounted, ref } from 'vue'

const container = ref<HTMLDivElement>()
onMounted(() => {
  const dice = new Dice({ element: container.value!, diceColor: 0xFF0000, shadowEnable: true, modlePath: '/dice/dice.glb' })
  console.log(dice)
  dice.onLoaded(() => {
    console.log('load')
    dice.renderer.setClearAlpha(0)
    // dice.renderer.setClearColor(0xFF0000)
  })
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
