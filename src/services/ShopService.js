import http from "../http-common"

class ShopService {

  getAll(){
    return http.get("/books/all")
  }

  getBook(id){
    return http.get(`/books/${id}/`)
  }

  getAllCat(){
    return http.get("/categories/all")
  }

  getCat(id){
    return http.get(`/books/category/${id}/`)
  }

  getAllAuteur(){
    return http.get("/auteurs/all")
  }

  getAuteur(id){
    return http.get(`/books/auteurs/${id}/`)
  }

  getW(id){
    return http.get(`/wish/all/${id}/`)
  }

  addW(data){
    return http.post(`/wish/add/`,{
      idu: data.id,
      book: data.book
    })
  }

  deleteW(id){
    return http.delete(`/wish/${id}`)
  }
  
  getCoupon(params){
    return http.get("/coupon/reduce/", { params })
  }
}

export default new ShopService()