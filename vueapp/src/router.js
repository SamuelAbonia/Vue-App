import Router from 'vue-router'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Admin from './pages/Admin/Admin'
import UserManagement from "./pages/Admin/views/UserManagement"

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
              }
          ]
      },
      
      
    ]
  })