<template>
  <div class="nav">
    <div class="welcome">Welcome subhadip</div>
    <div class="logout" @click="logout">Logout</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.LOGOUT();
      this.$router.push({ name: "Login" });
    },
    ...mapMutations({
      LOGOUT: "auth/LOGOUT",
    }),
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  background-color: #838f9c;
  color: white;
  padding: 10px;
}
.welcome {
  font-size: 20px;
  font-weight: 600;
}
.logout {
  cursor: pointer;
}
</style>
