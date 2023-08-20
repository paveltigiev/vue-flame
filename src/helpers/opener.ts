import router from '../router'

export function openPerson(url: string): void {
  const localUrl = url.replace("https://swapi.dev/api/people/", "/peoples/").slice(0, -1)
  router.push(localUrl)
}
