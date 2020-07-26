<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/randomizer">Randomizer</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import "./assets/stylesheets/app.css";
</style>
