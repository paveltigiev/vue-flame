<template>
  <the-navbar />
  <h1>People</h1>
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
        <span @click="open(item.url)" class="link">{{ item.name }}</span>
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
import { useRouter } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheLoading from '@/components/TheLoading.vue'

export default defineComponent({
  components: { TheNavbar, TheLoading },

  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = computed(() => store.getters.loading)
    const people = computed(() => store.getters.people)

		onMounted(async () => {
			await store.dispatch('getPeoples')
		})

    const open = (url: string): void => {
      const localUrl = url.replace("https://swapi.dev/api/people/", "/peoples/").slice(0, -1)
      router.push(localUrl)
    }

    return {
      loading,
      people,
      open
    }
  }
})
</script>

<style scoped>

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}

</style>
