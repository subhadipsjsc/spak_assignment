<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form>
      <label class="label" for="name">Name</label>
      <div>
        <input
          class="input"
          id="name"
          type="text"
          v-model="name"
          required
          autofocus
        />
      </div>
      <label class="label" for="email">E-Mail Address</label>
      <div>
        <input class="input" id="email" type="email" v-model="email" required />
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
          Submit
        </button>
      </div>
      <div style="margin-top: 10px">
        Have account , Please
        <router-link to="/login"> click here </router-link> to Login
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters({
      user_and_token: "auth/user_and_token",
    }),
  },
  watch: {
    user_and_token: function (val) {
      if (val.user != null && val.token == "") {
        this.$router.push({ name: "VerifyUser" });
      } else if (val.user != null && val.token != "") {
        this.$router.push({ name: "Login" });
      }
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.name.length > 0 &&
        this.email.length > 0 &&
        this.password.length > 0
      ) {
        console.log("test");
        const signupData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        this.signupAction(signupData);
      }
    },
    ...mapActions({
      signupAction: "auth/signupAction",
    }),
  },
};
</script>

<style scoped>
.signup {
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
