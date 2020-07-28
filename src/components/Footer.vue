<template>
  <div class="footer-container">
    <footer>
      <router-link to="/">Home</router-link>
      <router-link to="/randomizer">Randomizer</router-link>
      <p><slot>©</slot> 2019 Virgil Avram</p>
      <p>Powered by the TicketMaster Api</p>
    </footer>
  </div>
</template>
