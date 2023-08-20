<template>
  <the-navbar />
  <div class="h-bar">
    <h1>Person</h1>
    <div class="button-group">
      <button
        class="btn"
        @click="toggleFavorite(person, currentFavorites)"
        v-if="!loading"
      >
        {{ favoriteButtonText(person, currentFavorites) }}
      </button>
      <button
        class="btn"
        @click="nextPerson"
        v-if="!loading"
      >
        Next person
      </button>
    </div>
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
import { toggleFavorite } from '@/helpers/favorites'
import { favoriteButtonText } from '@/helpers/favorites'
import TheNavbar from '@/components/TheNavbar.vue'
import TheLoading from '@/components/TheLoading.vue'
import Person from '@/types/person'

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
    const loading = computed<boolean>(() => store.getters.loading)
    const person = computed<Person>(() => store.getters.person)
    const currentFavorites = computed<Person[]>(() => store.getters.currentFavorites)

    const nextPerson = () => {
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
      currentFavorites,
      nextPerson,
      toggleFavorite,
      favoriteButtonText
    }
  }
})
</script>
