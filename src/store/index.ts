import { createStore } from 'vuex'
import { getPeoplesRequest, findPeopleRequest, getPersonRequest } from '@/api/api'
import Person from '@/types/person'

interface State {
  people: Person[] | null
  foundPeople: Person[] | null
  person: Person | null
  currentFavorites: Person[] | null
  loading: boolean
  searching: boolean
}

export default createStore({
  state: {
    people: null,
    foundPeople: null,
    person: null,
    currentFavorites: null,
    loading: false,
    searching: false,
  } as State,

  getters: {
    people(state: State): Person[] | null {
      return state.people;
    },
    foundPeople(state: State): Person[] | null {
      return state.foundPeople;
    },
    person(state: State): Person | null {
      return state.person
    },
    currentFavorites(state: State): Person[] | null {
      return state.currentFavorites
    },
    loading(state: State): boolean {
      return state.loading
    },
    searching(state: State): boolean {
      return state.searching
    }
  },

  mutations: {
    setPeople(state: State, payload: Person[]): void {
      state.people = payload
    },
    setFoundPeople(state: State, payload: Person[]): void {
      state.foundPeople = payload
    },
    setPerson(state: State, payload: Person): void {
      state.person = payload
    },
    setCurrentFavorites(state: State, payload: Person[]): void {
      state.currentFavorites = payload
    },
    setLoading(state: State, payload: boolean): void {
      state.loading = payload
    },
    setSearching(state: State, payload: boolean): void {
      state.searching = payload
    }
  },

  actions: {
    async getPeoples({ commit }): Promise<void> {
      commit('setLoading', true)
      const results = await getPeoplesRequest()
      commit('setPeople', results)
      commit('setLoading', false)
    },
    async findPeople({ commit }, query: string): Promise<void> {
      commit('setFoundPeople', null)
      if (query) {
        commit('setSearching', true)
        const results = await findPeopleRequest(query)
        commit('setFoundPeople', results)
        commit('setSearching', false)
      }
    },
    async getPerson({ commit }, id: number): Promise<void> {
      commit('setLoading', true)
      const person = await getPersonRequest(id)
      commit('setPerson', person)
      commit('setLoading', false)
    },
    getCurrentFavorites({commit}) {
      const _currentFavoritesJSON = localStorage.getItem('favoritePeople')
      commit('setCurrentFavorites', _currentFavoritesJSON ? JSON.parse(_currentFavoritesJSON) : [])
    }
  },
})
