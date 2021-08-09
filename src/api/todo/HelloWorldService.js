import axios from "axios";

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get("http://localhost:8080/hello-world")
    }

    executeHelloWorldBeanService() {
        return axios.get("http://localhost:8080/hello-world-bean")
    }

    executeHelloWorldPathVariableService(name) {
        // let username = "mert";
        // let password = "123";
        // let basicAuthHeader = 'Basic ' + window.btoa(username+":"+password) // this syntax is standard-> Basic mert:123 //sending basic auth header...
        // console.log(basicAuthHeader)
        // console.log(`http://localhost:8080/hello-world-path/${name}`)
        return axios.get(`http://localhost:8080/hello-world-path/${name}`
            // ,
            // {
            //     headers: {
            //         "Authorization": basicAuthHeader  //YOUR_HEADER_VALUE
            //     }
            //}
        )
    }
}

export default new HelloWorldService();