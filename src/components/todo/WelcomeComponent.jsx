import React, {Component} from 'react'
import HelloWorldService from "../../api/todo/HelloWorldService";
import {Link} from "react-router-dom";

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            welcomeMessage: ""
        }

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage}
                            className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>

            </>
        )
    }

    retrieveWelcomeMessage() {
        /*
        HelloWorldService.executeHelloWorldService()
            .then(respond => this.handleSuccessfulResponse(respond))       //->service başarılı olursa ne yapsın?
        //.catch()    //->service başarısız olursa ne yapsın?
        */


        /*
        HelloWorldService.executeHelloWorldBeanService()
            .then(respond => this.handleSuccessfulResponse(respond))
         */
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        console.log(response)
        this.setState({welcomeMessage : response.data.message})  //ilk durumda string çağırınca response.data yeterli
        // artık bir JSON aldıgımız için data.message dememiz lazım.
    }
    handleError(error){
        console.log(error.response)
        let errorMessage = '';

        if (error.message){  //if there is a errormsg
            errorMessage+=error.message
        }
        if (error.response && error.response.data){ //if anything in response data.
            errorMessage+=error.response.data.message;
        }

        this.setState({welcomeMessage: errorMessage})
    }
}

export default WelcomeComponent