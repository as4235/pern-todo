import React, {Fragment, useState} from 'react';

const EditTodo = ({todo}) => {   //{todo} is used cux, we passed this value through the edit button and we are getting it here.
        // description has the previous todo value, 'setDescription' is the function that updates todo with new value.
    
    const[description, setDescription] =useState(todo.description);

    const editText = async (id) => {
        try {
            const body = { description };
            await fetch(`http://localhost:5000/todos/${id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    return(
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}> {/* we are getting all the description in the todo, so we are metioning the todo_id here to get the particular todo */}
            Edit
            </button>

            <div className="modal" id={`id${todo.todo_id}`} onChange={e => setDescription(e.target.value)}>  {/* we are getting all the description in the todo, so we are metioning the todo_id here to get the particular todo */}
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="close" data-dismiss="modal"
                        onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <input type="text" className="form-control" value={description} /* 'description' is declared in the useState */
                        onChange={e => setDescription(e.target.value)}/> {/* on change of the 'value', get the target new 'value' and pass it to setDescription variable we declared in the useState. */}
                    </div>

                    <div className="modal-footer">
                        
                        <button type="button" className="btn btn-warning" 
                        data-dismiss="modal" onClick={() => editText(todo.todo_id)} >Edit</button>

                        <button type="button" className="btn btn-danger" data-dismiss="modal"
                        onChange={e => setDescription(e.target.value)}  >Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;