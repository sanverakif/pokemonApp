import Vue from 'vue'
import VueRouter from 'vue-router'
import PokemonView from '../views/PokemonView'
import PokemonDetail from '../components/PokemonDetail'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'PokemonView',
        component: PokemonView
    }, {
        path: '/PokemonDetail',
        name: 'PokemonDetail',
        component: PokemonDetail
    },
    {
        path: '/About',
        name: 'AboutView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router