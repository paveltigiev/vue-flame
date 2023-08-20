import { createStore } from 'vuex'
import people from './people'
import favorites from './favorites'

interface State {
  loading: boolean
  searching: boolean
}

export default createStore({
  state: {
    loading: false,
    searching: false,
  } as State,

  getters: {
    loading(state: State): boolean {
      return state.loading
    },
    searching(state: State): boolean {
      return state.searching
    }
  },

  mutations: {
    setLoading(state: State, payload: boolean): void {
      state.loading = payload
    },
    setSearching(state: State, payload: boolean): void {
      state.searching = payload
    }
  },

  actions: {
  },
  modules: {
    people,
    favorites
  }
})
