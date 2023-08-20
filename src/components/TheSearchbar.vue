<template>
  <div class="searchbar">
		<input
			type="text"
			placeholder="Search by name..."
			v-model="name"
			class="search-input"
			ref="inputRef"
			@focus="handleFocus"
			@blur="handleBlur" 
		>
    <div
			class="clear-btn"
			v-if="isQueryNotEmpty"
			@click="clearQuery"
		>
			&#10006;
		</div>
		<div
			class="dropdown-list"
			v-if="isListVisible"
		>
			<div v-if="searching">
				Searching...
			</div>
			<div
				v-for="(item, i) in foundPeople"
				:key="i"
				class="dropdown-list-item link"
				@mousedown="openPerson(item.url)"
			>
				{{ item.name }}
			</div>
		</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Person from '@/types/person'

export default defineComponent({
  setup () {
    const store = useStore()
		const router = useRouter()
    const searching = computed<boolean>(() => store.getters.searching)
    const foundPeople = computed<Person[]>(() => store.getters.foundPeople)
		const name = ref<string>('')
		const isSearchFocused = ref<boolean>(false);

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

		const findPeople = (query: string): void => {
			if (debounceTimer) {
				clearTimeout(debounceTimer)
			}

			debounceTimer = setTimeout((): void => {
				store.dispatch('findPeople', query)
			}, 1000)
		};

    watch(name, (query: string): void => {
      findPeople(query)
    })

    const openPerson = (url: string): void => {
      const localUrl = url.replace("https://swapi.dev/api/people/", "/peoples/").slice(0, -1)
      router.push(localUrl)
    }

		onUnmounted((): void => {
			store.dispatch('findPeople', '')
    })

		return {
			name,
			searching,
			foundPeople,
			isQueryNotEmpty: computed<boolean>(() => name.value !== ''),
			isListVisible: computed<boolean>(() => isSearchFocused.value && (searching.value || foundPeople.value?.length > 0 ? true : false)),
			handleFocus: (): boolean => isSearchFocused.value = true,
      handleBlur: (): boolean => isSearchFocused.value = false,
			clearQuery: (): void => {
				name.value = ''
			},
			openPerson
		}
  }
})
</script>

<style scoped>
.searchbar {
	position: relative;
}
.search-input {
	position: relative;
	color: var(--primary-color);
	border: 1px solid var(--primary-color);
	background: var(--additional-color);
	padding: 8px 32px 8px 16px;
	border-radius: 8px;
	cursor: pointer;
	font-weight: bold;
	width: 200px;
	height: 33px;
	box-sizing: border-box;
}
.search-input:focus {
	outline: none;
}
.clear-btn {
	position: absolute;
	cursor: pointer;
	padding: 5px;
	right: 7px;
	top: 2px;
}
.dropdown-list {
	position: absolute;
	right: 0;
	top: 36px;
	display: flex;
	flex-direction: column;
	color: var(--primary-color);
	border: 1px solid var(--primary-color);
	background: var(--additional-color);
	padding: 8px 16px;
	border-radius: 8px;
	width: 200px;
	box-sizing: border-box;
	max-height: 200px;
	overflow-y: scroll;
	z-index: 9999;
}
.dropdown-list-item {
	margin: 8px 0;
}
</style>
