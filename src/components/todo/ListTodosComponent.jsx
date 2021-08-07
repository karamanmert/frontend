import React, {Component} from 'react'
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListTodosComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            todos: [],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount() {  //-->> The componentDidMount() method is called after the component is rendered.
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    this.setState(
                        {
                            todos: response.data
                        }
                    )
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUser();
        console.log(id + username)
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message: `Delete of todo ${id} successful`})
                    this.refreshTodos()
                }
            )
    }

    updateTodoClicked(id) {
        console.log("update" + id)
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUser();
        // console.log(id + username)
        // TodoDataService.updateTodo(username, id)
        //     .then(
        //         response => {
        //             this.setState({message: `Update of todo ${id} successful`})
        //             this.refreshTodos()
        //         }
        //     )
    }
    addTodoClicked() {
        console.log("create")
        this.props.history.push(`/todos/-1`)
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Target Date</th>
                            <th>IsCompleted?</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.updateTodoClicked(todo.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteTodoClicked(todo.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListTodosComponent