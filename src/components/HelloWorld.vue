<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { showMessageOne } from "./messageIndex.ts";
defineProps<{ msg: string }>();

const count = ref(0);

const rgb = ref("rgb(0,0,0)");

watch(count, (count) => {
  if (count > 0) {
    showMessageOne(
      `${count}`,
      (close: any) => {
        close();
      },
      `${rgb.value}`
    );
  }
});
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
