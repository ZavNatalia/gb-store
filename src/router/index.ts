import { IRoute } from '../models/IRoute'
import * as pages from '../pages/index'

export enum RouteNames {
    HOME = '/',
    EDIT_PRODUCT = '/edit/:productId/:productTitle',
    ALL_PRODUCTS = '/all',
    CATEGORY = '/:currentCategory',
    PRODUCT = '/:category/:productId/:productTitle',
    FAVORITES = '/favorites',
    CART = '/cart',
    ORDERS = '/orders',
}

export const routes: IRoute[] = [
    { path: RouteNames.HOME, component: pages.Home },
    { path: RouteNames.ALL_PRODUCTS, component: pages.Home },
    { path: RouteNames.CATEGORY, component: pages.Home },
    { path: RouteNames.PRODUCT, component: pages.Product },
    { path: RouteNames.FAVORITES, component: pages.Favorites },
    { path: RouteNames.CART, component: pages.Cart },
    { path: RouteNames.ORDERS, component: pages.Orders }
]