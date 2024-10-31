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


    return (
        <div>
             <input 
                type="text" 
                onChange={(e) => setInputValue(e.target.value)} 
                value={inputValue}
                onKeyDown={handleKeyDown}  // Attach key press handler
            />

            {TodoList.map((item,index)=>{
               return <div key={index}  className="todoItem">{item} </div>
            })}
        </div>
    );
}

export default Todo;
