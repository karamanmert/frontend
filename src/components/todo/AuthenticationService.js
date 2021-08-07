class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem("authenticatedUser",username)
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem("authenticatedUser")
        return user !== null;
    }

    getLoggedInUser(){
        let user = sessionStorage.getItem("authenticatedUser")
        if(user === null) return ""
        return user
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser")
    }

}

export default new AuthenticationService()