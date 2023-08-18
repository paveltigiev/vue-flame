<template>
  <the-navbar />
  <h1>Favorites</h1>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import TheNavbar from '../components/TheNavbar.vue';

export default defineComponent({
  components: { TheNavbar },
	setup() {
		return {
		}
	},

});
</script>
