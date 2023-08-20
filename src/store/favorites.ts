import { Commit } from 'vuex'
import Person from '@/types/person'

interface State {
  currentFavorites: Person[] | []
}

export default {
  namespaced: true,
  state: {
    currentFavorites: [],
  } as State,

  getters: {
    currentFavorites(state: State): Person[] | [] {
      return state.currentFavorites
    }
  },

  mutations: {
    setCurrentFavorites(state: State, payload: Person[]): void {
      state.currentFavorites = payload
    }
  },

  actions: {
    getCurrentFavorites({ commit }: { commit: Commit }) {
      const _currentFavoritesJSON = localStorage.getItem('favoritePeople')
      commit('setCurrentFavorites', _currentFavoritesJSON ? JSON.parse(_currentFavoritesJSON) : [])
    }
  }
}
