<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form>
      <label class="label" for="email">Name</label>
      <div>
        <input
          class="input"
          id="email"
          type="email"
          v-model="name"
          required
          autofocus
        />
      </div>
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
import CONFIG from "@/config.js";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        axios
          .post(`${CONFIG.backendURL}/user/create`, {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (
              response.status == 200 &&
              response.data &&
              response.data.success == 1
            ) {
              this.$router.push("/login");
            }
          })
          .catch(function (error) {
            console.error(error.response);
          });
      }
    },
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
