import { Promise } from 'core-js'
import CartService from '../services/CartService'

var cart = []

export const shop = {
    namespace: true,
    state: cart,
    actions: {
        get({ commit }, user){
            return CartService.getCart(user).then(
                response => {
                    commit('getSucess', response)
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        add({ commit }, data) {
            return CartService.addToCart(data).then(
                response => {
                    commit('addSuccess', response)
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },
        remove({ commit }, id) {
            return CartService.removeToCart(id).then(
                product => {
                    commit('removeSuccess', id)
                    return Promise.resolve(product)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },
        update({ commit }, data) {
            return CartService.update(data.id, data.params).then(
                response => {
                    commit('updateSuccess', response)
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },
        updateq({ commit }, data) {
            return CartService.updateq(data.id, data.params).then(
                response => {
                    commit('updateSuccess', response)
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },
    },

    mutations: {
        getSucess(state, response){
            cart = []
            cart = response.data
        },

        addSuccess(state, response){
            cart.push(response.data)
        },
        removeSuccess(state, id){
            cart.forEach(element => {
                if(element.id==id)
                    cart.pop(element)
            })
        },
        updateSuccess(state, response){
            cart.forEach(element => {
                if(element.id==response.data.id)
                    element.quantity++
            })
        },
    },
}

