<template>
  <div class="app w-full h-full relative">
    <LayoutDefault />
  </div>
</template>

<script lang="ts">
import '../style/main.css';
import {defineComponent} from 'vue';
import LayoutDefault from './Layout/LayoutDefault.vue';

export default defineComponent({
  name: 'App',
  components: {LayoutDefault},
  setup() {
    return {
    };
  },
});
</script>
