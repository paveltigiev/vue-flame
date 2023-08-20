import Person from '@/types/person'

export function toggleFavorite (person: Person, currentFavorites: Person[]): void {
  const index = currentFavorites.findIndex(favorite => favorite.name === person.name)

  if (index !== -1) {
    currentFavorites.splice(index, 1)
  } else {
    currentFavorites.push(person)
  }

  localStorage.setItem('favoritePeople', JSON.stringify(currentFavorites))
}

export function favoriteButtonText(person: Person, currentFavorites: Person[]): string {
  return currentFavorites.some(favorite => favorite?.name === person?.name) ? 'Remove Favorite' : 'Add Favorite'
}
