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
    height: calc(100vh - 64px);
    gap: 16px;
    font-size: 6em;
  }
</style>
