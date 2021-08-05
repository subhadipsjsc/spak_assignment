<template>
  <div class="login">
    <h1>Login</h1>
    <p>{{ error }}</p>
    <form>
      <label class="label" for="email">E-Mail Address</label>
      <div>
        <input
          class="input"
          id="email"
          type="email"
          v-model="email"
          required
          autofocus
        />
      </div>
      <div>
        <label class="label" for="password">Password</label>
        <div>
          <input
            class="input"
            id="password"
            type="password"
            v-model="password"
            required
          />
        </div>
      </div>
      <div>
        <button class="button" type="submit" @click="handleSubmit">
          Login
        </button>
      </div>
      <div style="margin-top: 10px">
        New user , Please
        <router-link to="/signup"> click here </router-link> to signup
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  computed: {
    ...mapGetters({
      user_and_token: "auth/user_and_token",
      auth_errors: "auth/auth_errors",
    }),
  },
  watch: {
    user_and_token: function (val) {
      if (val.user != null && val.token == "") {
        this.$router.push({ name: "VerifyUser" });
      } else if (val.user != null && val.token != "") {
        this.$router.push({ name: "Home" });
      }
    },
    auth_errors: function (val) {
      if (val != "") {
        this.error = val;
      }
    },
  },
  methods: {
    handleSubmit(e) {
      this.error = "";
      e.preventDefault();
      if (this.password.length > 0) {
        const loginData = {
          email: this.email,
          password: this.password,
        };
        this.loginAction(loginData);
      } else {
        this.error = "Email and Password , both mandetory";
      }
    },
    ...mapActions({
      loginAction: "auth/loginAction",
    }),
  },
  mounted: function () {
    if (this.user_and_token.token != "") {
      this.$router.push({ name: "Home" });
    } else if (this.user_and_token && this.user_and_token.user) {
      this.email = this.user_and_token.user.email || "";
    }
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a9aaab;
  min-height: 600px;
}
.label {
  margin: 5px;
}
.input {
  margin: 5px;
  height: 20px;
  width: 250px;
}
.button {
  margin: 5px;
  height: 25px;
  width: 260px;
}
</style>
