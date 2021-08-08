import axios from "axios";

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get('http://localhost:8080/basicauth', {
            headers: {authorization: this.createBasicAuthToken(username,password)}
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password) // this syntax is standard-> Basic mert:123 //sending basic auth header
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem("authenticatedUser", username)
        this.setupAxiosInterceptions(this.createBasicAuthToken(username,password))
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("authenticatedUser")
        return user !== null;
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem("authenticatedUser")
        if (user === null) return ""
        return user
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser")
    }

    setupAxiosInterceptions(basicAuthHeader) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()