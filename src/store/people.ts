import { Commit } from 'vuex'
import { getPeoplesRequest, findPeopleRequest, getPersonRequest } from '@/api/api'
import Person from '@/types/person'

interface State {
  people: Person[] | []
  foundPeople: Person[] | []
  person: Person | null
}

export default {
	namespaced: true,
  state: {
    people: [],
    foundPeople: [],
    person: null,
  } as State,

  getters: {
    people(state: State): Person[] | [] {
      return state.people;
    },
    foundPeople(state: State): Person[] | [] {
      return state.foundPeople;
    },
    person(state: State): Person | null {
      return state.person
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
    }
  },

  actions: {
    async getPeoples({ commit }: { commit: Commit }): Promise<void> {
      commit('setLoading', true, {root: true})
      const results = await getPeoplesRequest()
      commit('setPeople', results)
      commit('setLoading', false, {root: true})
    },
    async findPeople({ commit }: { commit: Commit }, query: string): Promise<void> {
      commit('setFoundPeople', null)
      if (query) {
        commit('setSearching', true, {root: true})
        const results = await findPeopleRequest(query)
        commit('setFoundPeople', results)
        commit('setSearching', false, {root: true})
      }
    },
    async getPerson({ commit }: { commit: Commit }, id: number): Promise<void> {
      commit('setLoading', true, {root: true})
      const person = await getPersonRequest(id)
      commit('setPerson', person)
      commit('setLoading', false, {root: true})
    }
  }
}
