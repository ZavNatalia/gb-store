import { IRoute } from '../models/IRoute'
import * as pages from '../pages/index'

export enum RouteNames {
    HOME = '/',
    EDIT_PRODUCT = '/edit/:productId/:productTitle',
    ALL_PRODUCTS = '/all',
    CATEGORY = '/:currentCategory',
    PRODUCT = '/:currentCategory/:productId/:productTitle',
    FAVOURITES = '/favourites',
    CART = '/cart',
}

export const routes: IRoute[] = [
    { path: RouteNames.HOME, component: pages.Home },
    { path: RouteNames.ALL_PRODUCTS, component: pages.Home },
    { path: RouteNames.CATEGORY, component: pages.Home },
    { path: RouteNames.PRODUCT, component: pages.Product },
    { path: RouteNames.FAVOURITES, component: pages.Favourites },
    { path: RouteNames.CART, component: pages.Cart },
]

export const adminRoutes: IRoute[] = [
    { path: RouteNames.HOME, component: pages.Admin },
    { path: RouteNames.ALL_PRODUCTS, component: pages.Admin },
    { path: RouteNames.CATEGORY, component: pages.Admin },
    { path: RouteNames.PRODUCT, component: pages.Product },

]