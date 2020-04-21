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

         <v-treeview
            open-all
            :items="messages"
        >
        </v-treeview>

    </div>
   

</div>
  
</template>

<script>

export default {
    name :"forumDiscussion",
    data(){
        return{
            forum:{
                title:"¿Como hacer un tree views personalizado?",
                description:"Realizar foro",
                subject:"VUE",
                date:"13 de abril de 2020",
                user:"Maria Paula Vargas"
            },
            messages:[],
        }
    },
    created:{

    },
    computed:{

    },
    methods:{

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
 width: 100%;
}
</style>