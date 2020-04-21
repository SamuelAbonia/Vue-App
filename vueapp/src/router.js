import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Admin from './pages/Admin/Admin'
import UserManagement from "./pages/Admin/views/UserManagement"
import GeneralForum from "./pages/User/view/forumTest"
import User from './pages/User/User'
import forumDiscussion from './pages/User/view/ForumDiscussion'
import TopicManagement from "./pages/Admin/views/TopicsManagement"

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        component: Login
      },
      {
        path: '/login',
        component: Login
      },
      {
        path:'/signup', 
        component:Register
      },
      {
          path:'/adminPane',
          component: Admin,
          name: "Admin",
          redirect: "/adminPane/userManagement",
          children:[
              {
                  name:"userManagement",
                  path: "userManagement",
                  component: UserManagement,
              },
              {
                  name:"topicManagement",
                  path:"topicManagement",
                  component: TopicManagement,
              }
          ]
      },
      {
        path: '/userPane',
        component: User,
        name: "User",
        redirect: "/userPane/generalForum",
        children:[
          {
            name:"generalForum",
            path:"generalForum",
            component: GeneralForum,
          },
          {
            name:"forumDiscussion",
            path:"forumDiscussion",
            props: (route)=>({...route.params}),
            component: forumDiscussion,
          }
        ]
      }
      
      
    ]
  })