import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

//Kullanıcı giriş yapmadan /welcome gibi yerlere ilerleyemesin.
class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
            /*
                let x=[1,2,3]
                function sum(a,b,c) {return a+b+c}
                sum(...x) -> 6
            */
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute