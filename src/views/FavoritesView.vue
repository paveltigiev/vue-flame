<template>
  <the-navbar />
  <div class="h-bar">
    <h1>Favorites</h1>
    <the-searchbar />
  </div>
  <table class="people" v-if="currentFavorites.length > 0">
    <tr>
      <th>name</th>
      <th>height</th>
      <th>mass</th>
      <th>hair_color</th>
      <th>Add Favorite/Remove favorite</th>
    </tr>
    <tr v-for="(person, i) in currentFavorites" :key="i">
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
  <div v-else>
    There is nothing in the favorites. Go to the <router-link to="peoples">people</router-link> to add someone.
  </div>
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
import Person from '@/types/person'

export default defineComponent({
  components: { TheNavbar, TheSearchbar },

  setup() {
    const store = useStore()
    const currentFavorites = computed<Person[]>(() => store.getters['favorites/currentFavorites'])

    onMounted(() => {
      store.dispatch('favorites/getCurrentFavorites')
		})

    return {
      currentFavorites,
      getHairColor,
      openPerson,
      toggleFavorite,
      favoriteButtonText
    }
  }
})
</script>
