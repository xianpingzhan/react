export default {
    NotFound: ()=> import("@/layouts/404"),
    RouterView: () => import("@/layouts/routerView"),

    Login: () => import("@/view/login/index"),
    Home: () => import("@/view/home/index"),
}