<template>
  <div class="layout h-full w-full">
    <router-view class="h-full w-full" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import di from '../DependecyInjection/vue';
export default defineComponent({
  name: 'LayoutDefault',
  setup() {
    const {} = di();

    return {
    };
  },
});
</script>
