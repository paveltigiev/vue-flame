<template>
  <header class="top-header">
    <nav class="top-header-nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/peoples">People</router-link> |
      <router-link to="/favorites">Favorites</router-link>
    </nav>
  </header>
</template>

<style scoped>
  .top-header-nav {
    border-bottom: 1px solid var(--primary-color);
    padding-bottom: 32px;
  }
</style>
