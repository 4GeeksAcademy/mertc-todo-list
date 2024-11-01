import React, { useState } from "react";

const Todo = () => {
    const [inputValue, setInputValue] = useState(' ');
    const [TodoList, setTodoList] = useState([]);

   
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { // Check if Enter key is pressed
            if (inputValue.trim() === '') return; // Prevent adding empty todos
            setTodoList((prevTodoList) => [...prevTodoList, inputValue]); // Create a new array
            setInputValue(''); // Clear the input field after adding
        }
    };

    const DeleteTask = (indexToDelete) => {
        setTodoList(TodoList.filter((_, index) => index !== indexToDelete));
      };
      
    return (
        <div className="bg-white w-25">
            <h1 className="text-center mt-5"> To Do!</h1>
            {/* Task input */}
             <input 
                className="w-75"
                type="text" 
                onChange={(e) => setInputValue(e.target.value)} 
                value={inputValue}
                onKeyDown={handleKeyDown}
            />
            {/* Write Task list on screen */}

            {TodoList.length > 0 ? (
                TodoList.map((item, index) => (
                    <div key={index}  className="todoItem d-flex justify-content-between shadow mb-1 p-3 bg-body rounded"> 
                        {item}  
                        <span className="delete-icon me-1" onClick={() => DeleteTask(index)}>
                            X
                        </span> 
                    </div>
                ))
            ) : (
            <p className="d-flex justify-content-center shadow 1 p-3 bg-body rounded">No tasks, add a task</p>
            )}

            {/* How many task left */}
            <div className="items-left"> {TodoList.length} item left  </div>

           
        </div>
    );
}

export default Todo;
