<template>
  <div class="verify">
    <h3>Verify Acount</h3>
    <p>Code value : ABCD1234</p>
    <form>
      <div>
        <label class="label" for="vf">Verification code</label>
        <div>
          <input class="input" id="vf" type="text" v-model="code" required />
        </div>
      </div>
      <div>
        <button class="button" type="submit" @click="handleSubmit">
          Verify
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      code: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    user: function (newData) {
      if (newData.isVerified) {
        console.log("verified");
        this.$router.push({ name: "Login" });
      }
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.code.length > 0) {
        const verification_data = {
          id: this.user.userId,
          code: this.code,
        };
        console.log(verification_data);
        this.verificationAction(verification_data);
      }
    },
    ...mapActions({
      verificationAction: "auth/verifyAccountAction",
    }),
  },
  mounted: function () {
    if (this.user.is_verified) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style scoped>
.verify {
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
