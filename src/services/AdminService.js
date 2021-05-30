import http from "../http-common"

class AdminService {

  getUsers(){
    return http.get("/user/all")
  }

  getBook(id){
    return http.get(`/user/${id}/`)
  }


  getOrders(){
    return http.get("/checkout/all")
  }

  getCoupons(){
    return http.get("/coupon/all")
  }

  getOrder(id){
    return http.get(`/checkout/${id}/`)
  }

  getCoupon(id){
    return http.get(`/coupon/${id}/`)
  }

  getProfiles(){
    return http.get("/profile/all")
  }

  postAuthor(data){
    return http.post("/auteurs/add/", {
      name: data.name,
      image: data.image
    })
  }

  postBook(data){
    return http.post("/books/add/", {
      author: data.author,
      category: data.category,
      title: data.title,
      date: data.date,
      quantity: data.quantity,
      isbn: data.isbn,
      image: data.image,
      description: data.text,
      price: data.price,
      purchased: 0
    })
  }

  postCoupon(data){
    return http.post("/coupon/add/", {
      code: data.code,
      percent: data.percent,
      expiration: data.expiration
    })
  }

  putCoupon(data){
    return http.put(`/coupon/${data.id}/`, {
      code: data.code,
      percent: data.percent,
      expiration: data.expiration
    })
  }

  postCat(data){
    return http.post("/categories/add/", {
      name: data.name,
      min: data.min
    })
  }

  putAuthor(data){
    return http.put(`/auteurs/${data.id}/`, {
      name: data.name,
      image: data.image
    })
  }

  putCat(data){
    return http.put(`/categories/${data.id}/`, {
      name: data.name,
      min: data.min
    })
  }

  putBook(data){
    return http.put(`/books/${data.id}/`, {
      author: data.author,
      category: data.category,
      title: data.title,
      date: data.date,
      quantity: data.quantity,
      isbn: data.isbn,
      image: data.image,
      description: data.text,
      price: data.price,
      purchased: data.purchased
    })
  }

  updateUser(data){
    return http.put(`/user/${data.id}/`, {
      username: data.username,
      email: data.email,
      role: data.admin,
    })
  }

  putCheck(data){
    return http.put(`/checkout/modify/${data.id}/`, {
      status: data.status,
    })
  }

  getAuthor(id){
    return http.get(`/auteurs/${id}/`)
  }

  getUser(id){
    return http.get(`/user/${id}/`)
  }

  getCat(id){
    return http.get(`/categories/${id}/`)
  }

  deleteAuthor(id){
    return http.delete(`/auteurs/${id}/`)
  }

  deleteUser(id){
    return http.delete(`/user/${id}/`)
  }

  deleteCat(id){
    return http.delete(`/categories/${id}/`)
  }

  deleteBook(id){
    return http.delete(`/books/${id}/`)
  }

  deleteOrder(id){
    return http.delete(`/checkout/${id}/`)
  }

  deleteCoupon(id){
    return http.delete(`/coupon/${id}/`)
  }

}

export default new AdminService()