<template>
  <div class="home-page">
    <router-link to="/peoples">Peoples</router-link> |
    <router-link to="/favorites">Favorites</router-link>
  </div>
</template>

<style scoped>
  .home-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
    font-size: 6em;
    padding: 32px;
  }
</style>
