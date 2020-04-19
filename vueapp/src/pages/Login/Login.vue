<template>
  <div class="LoginContent">
      <v-container>
        <v-row class="mx-2" justify="center">
          <v-col style="background:whitesmoke; border-radius:20px;padding:25px;border:2px solid white" xs="10" sm="10" md="5" lg="5" xl="5">
             <v-form lazy-validation ref="form"  v-model="valid">
          <h1>Inicio de Sesión</h1>
          <br />
          <v-text-field @keyup.13="formSubmit" :rules="emailRules" label="E-mail" required v-model="email"></v-text-field>
          <v-text-field
            @keyup.13="formSubmit"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Password"
            v-model="password"
            :rules="passwordRules"
          ></v-text-field>
           <p>
            ¿No tienes una cuenta?,
            <router-link class="linkStyle" to="/signup">Regístrate</router-link>
          </p>

          <router-link class="linkStyle" to="/recover">Olvidé mi contraseña</router-link>
          <br />
          <br />
          <v-btn color="primary" style="margin:10px;background:#08799C" >Ingresar</v-btn>
        </v-form>
          </v-col>
        </v-row>
       
      </v-container>
  </div>
</template>

<script>
export default {
name: "Login",
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      valid:false,
      msg:'',
      emailRules: [
        v => !!v || 'El correo electrónico es obligatorio'
      ],
      passwordRules: [
        v => !!v || 'La contraseña es obligatoria',
      ]
    };
  },
  methods:{

  },
}
</script>

<style>
.LoginContent {
  background-image: url("./img/background.jpg");
  background-color: rgba(243, 243, 243, 0.4);
  background-blend-mode: color;
  background-size: cover;
  min-height: 100vh;
  height:auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}


.linkStyle {
  color: #313131 !important;
}

</style>