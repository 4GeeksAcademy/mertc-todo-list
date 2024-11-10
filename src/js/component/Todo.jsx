import React, { useState, useEffect } from "react";

const Todo = () => {
    const [inputValue, setInputValue] = useState(' ');
    const [TodoList, setTodoList] = useState([ ]);

    useEffect(() => {
      //create user
      fetch('https://playground.4geeks.com/todo/users/mertc', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify({
          "name": "mertc",
          "id": 0
        })})
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(`Here you your data: ${typeof data.todos}  `, data.todos );
        const newTodo = { label: inputValue, is_done: false };
            setTodoList( data.todos); 
           
      })
      .catch(error => {
        console.error('Error:', error);
      });
      // Get Todos from DataBase 
      fetch('https://playground.4geeks.com/todo/users/mertc')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(`Here you your data: ${typeof data.todos}  `, data.todos );
        const newTodo = { label: inputValue, is_done: false };
            setTodoList( data.todos); 
           
      })
      .catch(error => {
        console.error('Error:', error);
      });  
 

      return () => {
         
      };
    }, []);
   
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { // Check if Enter key is pressed
            if (inputValue.trim() === '') return; // Prevent adding empty todos

            AddTask(inputValue);
            
            
            setInputValue(''); // Clear the input field after adding
        }
    };

    const AddTask = (Task) => {
        
        let data = {
          "label": `${Task}`,
          "is_done": false, 
        }
        setTodoList(entry => [...TodoList, data]);
        fetch('https://playground.4geeks.com/todo/todos/mertc', {
          method: 'POST', // Specify the HTTP method
          headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
          },
          body: JSON.stringify(data)})
            .then(response => {
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Successfully failed :', data);
            })
            .catch(error => {
              console.error('Error:', error);
            });  
    }

    const DeleteTask = (indexToDelete) => { 
        setTodoList(TodoList.filter((item) => item.id !== indexToDelete));

        fetch(`https://playground.4geeks.com/todo/todos/${indexToDelete}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              console.log('Here you go deleted and id is:', indexToDelete);
            })
            .catch(error => {
              console.error('Error:', error);
            });

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
                    <div key={item.id}  className="todoItem d-flex justify-content-between shadow mb-1 px-2 bg-body rounded"> 
                        {item.label}  
                        <span className="fs-2 delete-icon me-1" onClick={() => DeleteTask(item.id)}>
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
