<template>
  <the-navbar />
  <div class="h-bar">
    <h1>People</h1>
    <the-searchbar />
  </div>
  <the-loading />
  <table class="people" v-if="!loading">
    <tr>
      <th>name</th>
      <th>height</th>
      <th>mass</th>
      <th>hair_color</th>
      <th>Add Favorite/Remove favorite</th>
    </tr>
    <tr v-for="(person, i) in people" :key="i">
      <td>
        <span @click="openPerson(person.url)" class="link">{{ person.name }}</span>
      </td>
      <td>{{ person.height }}</td>
      <td>{{ person.mass }}</td>
      <td>{{ getHairColor(person.hair_color) }}</td>
      <td>
        <button
          class="btn"
          @click="toggleFavorite(person, currentFavorites)"
        >
          {{ favoriteButtonText(person, currentFavorites) }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { openPerson } from '@/helpers/opener'
import { toggleFavorite } from '@/helpers/favorites'
import { favoriteButtonText } from '@/helpers/favorites'
import { getHairColor } from '@/helpers/colors'
import TheNavbar from '@/components/TheNavbar.vue'
import TheSearchbar from '@/components/TheSearchbar.vue'
import TheLoading from '@/components/TheLoading.vue'
import Person from '@/types/person'

export default defineComponent({
  components: { TheNavbar, TheSearchbar, TheLoading },

  setup() {
    const store = useStore()
    const loading = computed<boolean>(() => store.getters.loading)
    const people = computed<Person[]>(() => store.getters['people/people'])
    const currentFavorites = computed<Person[]>(() => store.getters['favorites/currentFavorites'])

    onMounted(() => {
      store.dispatch('people/getPeoples')
      store.dispatch('favorites/getCurrentFavorites')
		})

    return {
      loading,
      people,
      currentFavorites,
      getHairColor,
      openPerson,
      toggleFavorite,
      favoriteButtonText
    }
  }
})
</script>
