<template>
  <the-navbar />
  <div class="h-bar">
    <h1>Person</h1>
    <div @click="next" class="btn" v-if="!loading">Next person</div>
  </div>
  <the-loading />
  <table v-if="!loading">
    <tr v-for="(val, key) in person" :key="val">
      <th>{{ key }}</th>
      <td>{{ val }}</td>
    </tr>
  </table>

</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { RouteLocationRaw } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheLoading from '@/components/TheLoading.vue'

export default defineComponent({
  components: { TheNavbar, TheLoading },
  
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const id = computed(() => {
      const idParam = route.params.id
      return typeof idParam === 'string' ? parseInt(idParam) : idParam
    })
    const loading = computed(() => store.getters.loading)
    const person = computed(() => store.getters.person)

    const next = () => {
      const nextId = Number(id.value) + 1
      const routeLocation: RouteLocationRaw = { path: `/peoples/${nextId}` }
      router.push(routeLocation)
    }

		watch(id, () => {
			store.dispatch('getPerson', id.value)
		})

		onMounted(async () => {
			await store.dispatch('getPerson', id.value)
		})

    return {
      loading,
      person,
      next
    }
  }
})
</script>

<style scoped>
  .h-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
