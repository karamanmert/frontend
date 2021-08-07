import React, {Component} from "react";
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import AuthenticationService from "./AuthenticationService";
import TodoDataService from "../../api/todo/TodoDataService";

//redirect to ListTodosComponent
class TodoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate: moment(new Date()).format("YYYY-MM-DD")  //moment is a js lib that helps you to format Dates..
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser();
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1){
            TodoDataService.createTodo(username,todo).then(
                () => {
                    this.props.history.push(`/todos`)
                }
            )
            console.log(values)
            console.log(values.targetDate)
        }else {
            TodoDataService.updateTodo(username, this.state.id, todo).then(
                () => {
                    this.props.history.push(`/todos`)
                }
            )

        }
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = "Enter a description"
        } else if (values.description.length < 5) {
            errors.description = "Description should have at least 5 characters."
        }
        if (!moment(values.target).isValid()) {
            errors.targetDate = "Enter a valid target date."
        }
        return errors;
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser();

        if (this.state.id === -1){ //id -1 se yani yoksa, retrieve işlemini gerçekleştirme
            return
        }

        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(new Date()).format("YYYY-MM-DD")
            }))
    }

    render() {

        let {description, targetDate} = this.state
        /*let description = this.state.description
        let targetDate = this.state.targetDate
         */
        /*
        let test ={a:1,b:2,c:3}
        let {a,b,c} = test
        console.log(a) -> 1,,, b->2, c->3
        */
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{
                        description,  // if name and value are excatly the same normalde -> description : description olmalı..
                        targetDate
                        /*
                        let name ="mert"
                        let course="js"
                        let details={name:name, course: course}
                        console.log(details) ->
                        {name:"mert", course:"js"}
                        let details2= {name,course}
                        console.log(details2) ->
                        {name:"mert", course:"js"}

                        */
                    }}
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            validateOnChange={false}
                            validateOnBlur={false}
                            enableReinitialize={true}
                    >
                        {/*
                          validateOnChange="false"
                    validateOnBlur="false"   todocomponent sayfasında validasyonlarda save'e basılmadan yukarda hata çıkmasın diye
                            */}
                        {
                            () => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

export default TodoComponent;