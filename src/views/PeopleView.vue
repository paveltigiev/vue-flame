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
    <tr v-for="(item, i) in people" :key="i">
      <td>
        <span @click="openPerson(item.url)" class="link">{{ item.name }}</span>
      </td>
      <td>{{ item.height }}</td>
      <td>{{ item.mass }}</td>
      <td>{{ item.hair_color === 'n/a' ? '🤷🏻‍♂️' : item.hair_color }}</td>
      <td>
        <button class="btn">Add Favorite</button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { openPerson } from '@/helpers/opener'
import TheNavbar from '@/components/TheNavbar.vue'
import TheSearchbar from '@/components/TheSearchbar.vue'
import TheLoading from '@/components/TheLoading.vue'
import Person from '@/types/person'

export default defineComponent({
  components: { TheNavbar, TheSearchbar, TheLoading },

  setup() {
    const store = useStore()
    const loading = computed<boolean>(() => store.getters.loading)
    const people = computed<Person[]>(() => store.getters.people)

		onMounted(async () => {
			await store.dispatch('getPeoples')
		})

    return {
      loading,
      people,
      openPerson
    }
  }
})
</script>
