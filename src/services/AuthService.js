import http from "../http-common"

class AuthService{
    login(user){
        return http
            .post('/user/signin/', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if(response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data
            }).catch(e =>{
                console.log(e.data)
            })
    } 

    logout(){
        localStorage.removeItem('user')
    }

    verifyEmail(params){
        return http.get('/user/forgot/', {params})
    }

    changePassword(data){
        return http.put(`/user/password/${data.email}/${data.pass}/`)
    }

    register(user) {
        return http.post('/user/signup/', {
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.admin
        })
    }

    updateUser(data){
        console.log(data)
        return http.put(`/user/${data.id}/`, {
          username: data.username,
          email: data.email,
          role: data.admin,
        })
      }

    
    getProfile(params){
        return http.get(`/profile/user/`, {params})
    }


    createProfile(data){
        return http.post(`/profile/add/`,{
            iduser: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            country: data.country,
            address: data.address,
            city: data.city,
            zipcode: data.zipcode,
            phone: data.phone,
        })
    }

    updateProfile(data){
        return http.put(`/profile/modify/${data.id}/`,{
            iduser: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            country: data.country,
            address: data.address,
            city: data.city,
            zipcode: data.zipcode,
            phone: data.phone,
        })
    }
}

export default new AuthService()