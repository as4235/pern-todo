import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from "./EditTodo";  

const ListTodos = () => {
    
    const [todos, setTodos] = useState([]);  // empty array because we're getting list of data
    // todos is current state, which is empty. so the page rrenders zero rows. settodos is the state after rendering. So after page renders, the value from the 'res.json' is obatined and updated in the table
    
    async function deleteTodo(id) {
        try {
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (error) {
            console.error(error.message);
        }
    }

    async function getTodos() {
        const res = await fetch("http://localhost:5000/todos");

        const todoArray = await res.json();   // like we use req.body, but here we are getting response and in the form of json
        
        setTodos(todoArray);    // useState sets the state. Here the values from todoArray is set to a state called 'setTodos'
    }

    useEffect(() => {         // useEffect is like ngOnInIt. runs automatically everytime the page loads.
        getTodos();           // useEffect runs the function getTodos and passes the values. There isn't one value so '[]' empty
    }, []);

    return (
        <Fragment>
            {"  "}
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {todos.map(todo => (  // for of method. 'for todo of todos'. we are getting all the value and mentoning here which column to use
                        <tr key={todo.todo_id}>  {/* to uniquely identify each rows */}               
                            <td>{todo.description}</td> 
                            <td><EditTodo todo={todo}/></td> {/* to populate the modal with whatever row we got from the server. We are passing the selected todos value to the modal component 'EditTodo' */}
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;