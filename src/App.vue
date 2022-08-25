<script setup lang="ts">
import PresumedCalculator from "./components/PresumedCalculator.vue";
</script>

<template>
  <div class="app">
    <h1>Auditoria financeira</h1>

    <PresumedCalculator />
  </div>
</template>

<style scoped>
.app {
  width: min(calc(100% - 2em), 50em);
  padding-block: 3em;
  margin-inline: auto;
}
</style>
