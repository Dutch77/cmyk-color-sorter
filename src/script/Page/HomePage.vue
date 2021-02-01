<template>
  <CmykColorSorter />
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue';
import di from '../DependecyInjection/vue';
import CmykColorSorter from "../App/CmykColorSorter.vue";

export default defineComponent({
  name: 'ThankYouPage',
  components: {CmykColorSorter},
  setup() {
    const {} = di();

    return {
    };
  },
});
</script>
