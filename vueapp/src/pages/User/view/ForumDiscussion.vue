<template>
<div class="forumDiscussionContent">    
    <div class="forum">
                <v-card
                class="mx-auto"
                outlined
            >
            <v-card-title>
                  <v-icon
                    large
                    left
                >
                    mdi-twitter
                </v-icon>
                <span class="title font-weight-light">{{forum.title}}</span>

             </v-card-title>

            <v-card-subtitle class="pb-0"> 
                <span> Creado por : {{forum.user}}  - {{forum.date}} </span> </v-card-subtitle>

            <v-card-text class="text--primary"> Descripción: {{forum.description}}</v-card-text>
             <v-card-actions>
                 <v-btn
                    color="purple"
                    text
                >
                    Responder
                </v-btn>
             </v-card-actions>
              
            </v-card>
    </div>  
    <div class="forumDiscussion">
        <TreeView :messages="messages" />


    </div>
   

</div>
  
</template>

<script>
const config = require("../../../../config/firebase");

import TreeView from '../../../components/TreeView/TreeView'
export default {
    name :"forumDiscussion",
    data(){
        return{
            messagesOfForum:[],
            parentMessages:[],
            messages:[
                {   
                    id:"AAA",
                    content:"Prueba numero 1 ",
                    date: "14 de abril",
                    forum:"BBB",
                    parent_message: "",
                    user: "Maria",
                    children:[
                                {   
                            id:"BBB",
                            content:"Prueba numero 1 de 1 ",
                            date: "14 de abril",
                            forum:"BBB",
                            parent_message: "AAA",
                            user: "Maria",
                            children:[]
                            
                        }

                    ]

                },

                {   
                    id:"CCC",
                    content:"Prueba numero 2 ",
                    date: "14 de abril",
                    forum:"BBB",
                    parent_message: "",
                    user: "Maria",
                    children:[
                                {   
                            id:"BBB",
                            content:"Prueba numero 2 de 2 ",
                            date: "14 de abril",
                            forum:"BBB",
                            parent_message: "AAA",
                            user: "Maria",
                            children:[]
                            
                        }

                    ]

                }
            ],
        }
    },
    props:['forum'],
    components:{
        TreeView
    },
    mounted(){
       

    },
    created(){
         this.getUserOfForum();
         this.getMessages();
    },
    computed:{

    },
    methods:{
        async getUserOfForum() {
        let forum = this.forum

        await config.db
        .collection("usuarios")
        .doc(forum.user)
        .get()
        .then(query => {
          let user = query.data();
          this.forum.user = user.nombre +" "+user.apellido
     
        });
        
      
    },
    async getMessages(){

        let message={
            id:"", 
            content:"",
            date:"",
            forum:"",
            parent_message:"",
            user:"",
            children:[]
            }

        await config.db
        .collection("mensajes")
        .where("foro","==", this.forum.id+"")
        .get()
        .then(query => {
          query.forEach(u => {
            let data = u.data();
            message = {
            content:data.contenido,
            date:data.fecha,
            forum:data.foro,
            parent_message:data.mensaje_padre,
            user:data.usuario,
            id:u.id,
            children:data.children
             }
        this.messagesOfForum.push(message)
        console.log(message)
          });
        });
        this.getParentsMessages();
    },

    async getParentsMessages(){
        console.log("llegue aqui");
        for (var i = 0; i < this.messagesOfForum.length; i++) {
            let message = this.messagesOfForum[i];
            console.log(message)
            let childrenOfMessage=[]
            childrenOfMessage = message.children;
            console.log(childrenOfMessage)
                for (var j = 0; j < childrenOfMessage.length; i++) {
                    let child = childrenOfMessage[i];
                    console.log(child)
                    let messageChild=this.messagesOfForum.find(element => element.id == child);
                    console.log(messageChild)
                    message.children[i]= messageChild;
                }

            }
            
        
    },

    

    

    }

}
</script>

<style>
.forumDiscussionContent {
  width: 100%;

}
.forum{
 margin-top: 15px;
 margin-left: 10px;
 width: 98%;
 height: 30%;

}
.forumDiscussion{
 margin-top: 15px;
 margin-left: 80px;
 width: 90%;
}
</style>