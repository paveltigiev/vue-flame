const apiUrl = 'https://swapi.dev/api'

export async function getPeoplesRequest() {
  try {
    const response = await fetch(`${apiUrl}/people`)
    const { results } = await response.json()
    return results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getPersonRequest(id: number) {
  try {
    const response = await fetch(`${apiUrl}/people/${id}`)
    const person = await response.json()
    return person
  } catch (error) {
    console.error(error)
    throw error
  }
}
