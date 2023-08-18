import { createStore } from 'vuex'
import { getPeoplesRequest, getPersonRequest } from '@/api/api'

interface State {
  people: object[] | null
  person: object | null
  loading: boolean
}

export default createStore({
  state: {
    people: null,
    person: null,
    loading: false,
  } as State,

  getters: {
    people(state: State): object[] | null {
      return state.people
    },
    person(state: State): object | null {
      return state.person
    },
    loading(state: State): boolean {
      return state.loading
    },
  },

  mutations: {
    setPeople(state: State, payload: object[]): void {
      state.people = payload
    },
    setPerson(state: State, payload: object): void {
      state.person = payload
    },
    setLoading(state: State, payload: boolean): void {
      state.loading = payload
    },
  },

  actions: {
    async getPeoples({ commit }): Promise<void> {
      commit('setLoading', true)
      const results = await getPeoplesRequest()
      commit('setPeople', results)
      commit('setLoading', false)
    },
    async getPerson({ commit }, id: number): Promise<void> {
      commit('setLoading', true)
      const person = await getPersonRequest(id)
      commit('setPerson', person)
      commit('setLoading', false)
    },
  },
})
