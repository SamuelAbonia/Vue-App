<template>
  <div class="userManagementContent">
    <v-data-table
      no-data-text="No hay usuarios por el momento"
      :headers="headers"
      :items="users"
      sort-by="firstName"
      class="elevation-1"
    >
      <template v-slot:item.roles="{ item }">
        <v-chip
          :key="role.id"
          v-for="role in item.roles"
          :color="getColor()"
          dark
        >{{ role.role.name }}</v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.firstName"
                        :rules="nameRules"
                        label="Nombre"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.lastName"
                        :rules="lastnameRules"
                        label="Apellido"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.identification"
                        label="Identificación"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.email"
                        :rules="emailRules"
                        label="Email"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-show="editedIndex === -1">
                      <v-text-field
                        v-model="editedItem.password"
                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.min]"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-2"
                        hint="Mínimo 8 caracteres"
                        value
                        class="input-group--focused"
                        label="Contraseña"
                        outlined
                        required
                        @click:append="showPassword = !showPassword"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-show="editedIndex === -1">
                      <v-text-field
                        v-model="editedItem.conPassword"
                        :append-icon="showConPassword ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.samePassword]"
                        :type="showConPassword ? 'text' : 'password'"
                        name="input-10-2"
                        label="Confirmar contraseña"
                        hint="Mínimo 8 caracteres"
                        value
                        class="input-group--focused"
                        outlined
                        required
                        @click:append="showConPassword = !showConPassword"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
name:"userManagement",
data() {
    return {
      dialog: false,
      headers: [
        { text: "Nombre", align: "left", sortable: false, value: "firstName" },
        { text: "Apellido", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "Activo", value: "roles" },
      ],
      editedIndex: -1,
      editedItem: {
        firstName: "",
        lastName: "",
        email: "",
        active: false,
        roles: [],
        password: "",
        conPassword: ""
      },
      defaultItem: {
        firstName: "",
        lastName: "",
        email: "",
        roles: []
      },
      showPassword: false,
      showConPassword: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        samePassword: value =>
          value === this.editedItem.password || "Las contraseñas no coinciden"
      },
      nameRules: [
        firstName => !!firstName || "El nombre es requerido",
        firstName =>
          firstName.length > 2 || "El nombre debe ser más largo a 3 caracteres"
      ],
      lastnameRules: [
        lastname => !!lastname || "El apellido es requerido",
        lastname =>
          lastname.length > 3 || "El apellido debe ser más largo a 3 caracteres"
      ],
      emailRules: [
        email => !!email || "El correo es requerido",
        email => /^[a-zA-Z0-9_.+-]+@(correo.icesi.edu|icesi.edu)\.co$/.test(email) ||  "El correo no es valido"
      ]
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
   
  },
}
</script>

<style>

</style>