import http from "../http-common"

class CartService {
  getCart(user){
    return http.get(`/shop/cart/${user.id}/`)
  }

  addToCart(data){
    return http.post(`/shop/adding/`,{
      ide: data.user.id,
      book: data.book,
      quantity: data.quantity
    })
  }

  removeToCart(id){
    return http.delete(`/shop/cart/${id}/`)
  }

  update(id, params){
    return http.get(`/shop/modify/${id}/`, {params} )
  }

  updateq(id, params){
    return http.get(`/shop/modifyq/${id}/`, {params} )
  }

  order(data){
    return http.post(`/checkout/add/`,{
      shoppingCart: data.cart,
      total: data.total,
      email: data.email,
      notes: data.message,
      status: data.status,
      delivery: data.delivery,
    })
  }

  getCountry() {
    return http.get("https://restcountries.eu/rest/v2/all");
  }
  
  getOrder(params){
    return http.get(`/checkout/orders/`, {params} )
  }

}

export default new CartService()