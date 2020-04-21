<template>
  <div class="userManagementContent">
    <v-card style="width:100%;">
      <v-card-title>
        Usuarios
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        no-data-text="No hay usuarios por el momento"
        :headers="headers"
        :items="users"
        sort-by="firstName"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
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
                        <v-checkbox
                          v-model="editedItem.active"
                          class="mx-2"
                          label="¿Está Activo?"
                          required
                        ></v-checkbox>
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
                      <v-col cols="12" sm="6" md="6">
                        <v-combobox v-model="editedItem.rol" :items="items" label="Rol" chips></v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <div></div>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" v-show="editedIndex === -1">
                        <v-text-field
                          v-model="editedItem.password"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
                          :append-icon="showConPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
const config = require("../../../../config/firebase");
import shajs from "sha.js";

export default {
  name: "userManagement",
  data() {
    return {
      users: [],
      search: "",
      dialog: false,
      headers: [
        { text: "Nombre", align: "left", sortable: false, value: "firstName" },
        { text: "Apellido", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "Mensajes", value: "messages" },
        { text: "Activo", value: "active" },
        { text: "Rol", value: "rol" },
        { text: "Acciones", value: "action", sortable: false }
      ],
      items: ["administrador", "usuario"],
      editedIndex: -1,
      editedItem: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        active: false,
        messages: 0,
        rol: "",
        password: "",
        conPassword: ""
      },
      defaultItem: {
        id: "",
        firstName: "",
        lastName: "",
        messages: 0,
        email: "",
        rol: ""
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
        email =>
          /^[a-zA-Z0-9_.+-]+@(correo.icesi.edu|icesi.edu)\.co$/.test(email) ||
          "El correo no es valido"
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
    this.initialize();
  },
  methods: {
    initialize() {
      this.getUsers();
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
        this.updateUser(this.editedIndex);
      } else {
        this.saveUser(this.editedItem);
        this.users.push(this.editedItem);
      }
      this.close();
      //location.reload();
    },

    async saveUser(user) {
      let newUser = {
        nombre: user.firstName,
        apellido: user.lastName,
        email: user.email,
        activo: user.active,
        contraseña: shajs("sha512")
          .update(user.password)
          .digest("hex")
      };

      config.db
        .collection("usuarios")
        .add(newUser)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    updateUser(index) {
      let updateUser = this.users[index];

      let user = {
        nombre: updateUser.firstName,
        apellido: updateUser.lastName,
        email: updateUser.email,
        activo: updateUser.active
      };

      config.db
        .collection("usuarios")
        .doc(updateUser.id)
        .update(user)
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.users.indexOf(item);
      if (item.messages == 0) {
        confirm("¿Esta seguro que desea eliminar este usuario?") &&
          this.deleteUser(item) &&
          this.users.splice(index, 1);
      } else {
        confirm(
          "No es posible eliminar el usuario al tener mensajes relacionados"
        );
      }
      // location.reload();
    },

    async deleteUser(user) {
      await config.db
        .collection("usuarios")
        .doc(user.id)
        .delete()
        .then(function() {
          alert("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },

    close() {
      this.dialog = false;
      this.showPassword = false;
      this.showPassword = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async getUsers() {
      let usuario = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        messages: 0,
        active: "",
        rol: ""
      };

      await config.db
        .collection("usuarios")
        .get()
        .then(query => {
          query.forEach(u => {
            let data = u.data();

            usuario = {
              firstName: data.nombre,
              lastName: data.apellido,
              email: data.email,
              password: data.contraseña,
              active: data.activo,
              rol: data.rol,
              id: u.id
            };
            this.users.push(usuario);
          });
        });
      this.getNumberOfMessages();
    },

    async getNumberOfMessages() {
      for (var i = 0; i < this.users.length; i++) {
        let user = this.users[i];
        config.db
          .collection("mensajes")
          .where("usuario", "==", user.id + "")
          .get()
          .then(query => {
            user.messages = query.size;
            console.log(user.messages);
          });
      }
    }
  }
};
</script>

<style>
.userManagementContent {
  width: 100%;
  /* margin: 2px 15px; */
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>