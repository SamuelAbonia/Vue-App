<template>
  <div class="registerContent">
    <v-container>
      <v-row class="mx-2" justify="center">
        <v-col
          style="background:whitesmoke;border-radius:20px;border:2px solid white;padding:25px"
          xs="12"
          sm="12"
          md="6"
        >
          <h1>{{title}}</h1>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row justify="center">
              <v-col md="5" sm="12">
                <v-text-field v-model="names" :rules="nameRules" label="Nombres" required></v-text-field>
              </v-col>

              <v-col md="5" sm="12">
                <v-text-field
                  v-model="lastnames"
                  :rules="lastnamesRules"
                  label="Apellidos"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col md="6" sm="12">
                <v-text-field v-model="email" :rules="emailRules" label="Correo" required></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.emailMatch]"
                  :type="showPassword ? 'text' : 'password'"
                  name="input-10-2"
                  label="Contraseña"
                  hint="Mínimo 8 caracteres"
                  value
                  class="input-group--focused"
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                  v-model="conPassword"
                  :append-icon="showConPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required,rules.samePassword]"
                  :type="showConPassword ? 'text' : 'password'"
                  name="input-10-2"
                  label="Confirmar contraseña"
                  hint="Mínimo 8 caracteres"
                  value
                  class="input-group--focused"
                  required
                  @click:append="showConPassword = !showConPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col md="3" sm="12">
                <v-btn
                  :disabled="disabledButtonRegister"
                  color="primary"
                  @click="sendRegisterData()"
                  style="margin:5px;background:#08799C"
                >Registrarse</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import shajs from "sha.js";
const config = require("../../../config/firebase");

export default {
  name: "Register",
  data: function() {
    return {
      COLLECTION: "usuarios",
      title: "Registro",
      names: "",
      lastnames: "",
      email: "",
      password: "",
      conPassword: "",
      showPassword: false,
      showConPassword: false,

      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        samePassword: value =>
          value === this.password || "Las contraseñas no coinciden"
      },
      nameRules: [
        name => !!name || "El nombre es requerido",
        name => name.length > 2 || "El nombre debe ser más largo a 3 caracteres"
      ],
      lastnameRules: [
        lastname => !!lastname || "El apellido es requerido",
        lastname =>
          lastname.length > 3 || "El apellido debe ser más largo a 3 caracteres"
      ],
      emailRules: [
        email => !!email || "El correo es requerido",
        email =>
          /^[a-zA-Z0-9_.+-]+@(correo.icesi.edu|icesi.edu)\.co$/.test(email) ||
          "El correo no es valido"
      ]
    };
  },
  computed: {
    disabledButtonRegister() {
      return (
        !this.names &&
        !this.lastname &&
        !this.email &&
        !this.password &&
        this.conPassword === this.password
      );
    }
  },
  methods: {
    sendRegisterData() {
      config.db
        .collection(this.COLLECTION)
        .add({
          contraseña: shajs("sha512")
            .update(this.password)
            .digest("hex"),
          apellido: this.lastnames,
          nombre: this.names,
          email: this.email,
          activo: false
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          alert("Usuario registrado exitosamente");
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style>
.registerContent {
  background-image: url("./img/background.jpg");
  background-color: rgba(243, 243, 243, 0.5);
  background-blend-mode: color;
  background-size: cover;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.linkStyle {
  color: #313131 !important;
}
.error {
  color: crimson;
}
</style>