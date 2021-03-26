import React, { Fragment, useState } from 'react';

const InputTodo = () => { // we are creating a component function
    const [description, setDescription] = useState ("");  // this function is to display what we have in the text-box.
    // 'description' has the previous value which is nothing so "". 'setDescription' is the function that updated the 'description' with new updated value.


    const onSubmitForm = async () => {
        try {
            const body = { description };  // body here is refering to text-field 'value'. Anything from the text-field goes to 'description' column. We can name it anything we want
            await fetch("http://localhost:5000/todos", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (err) {
            console.err(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center my-5">Input Todo</h1>
            <form className="d-flex">

                <input type="text" placeholder="Add Todo" className="form-control" 
                value={description} onChange={ e => setDescription(e.target.value) }/> {/* on change, an event 'e' occurs on the function 'setDescription'. the value in this text-box is targeted */}
                {/* onClick, the setDescription function is evoked which gets the target value from the textfield and updates the 'description' variable*/}
                <button className="btn btn-success"
                onClick = {() => onSubmitForm()}>Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;