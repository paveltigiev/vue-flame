<template>
  <div v-if="loading" class="loading">Loading</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    return {
      loading: computed(() => store.getters.loading)
    }
  }
})
</script>

<style scoped>

.loading {
  display: flex;
  font-size: 2em;
}
.loading:after {
  content: '...';
  display: inline-block;
  overflow: hidden;
  width: 28px;
  animation: progres 3s infinite linear;
}
@keyframes progres{
    0%{
      width: 0px;
    }
    20%{
        width: 9px;
    }
    40%{
        width: 18px;
    }
    60%{
        width: 28px;
    }
    80%{
        width: 18px;
    }
    100%{
        width: 9px;
    }
};
</style>
