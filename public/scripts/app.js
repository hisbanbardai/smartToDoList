// Client facing scripts here


$(document).ready(function() {

  const renderTodos = function(response) {
    console.log(response);
    const $todosList = $('#eat-todo-list');
      $todosList.empty();


      for(const todo of response.toDos) {

        const todoName = $('<h3>').text(todo.name);
        $todosList.prepend(todoName);
        // $('#todo-container').prepend(addNewTodo(response.toDos));

      }
    
  }

  // const addNewTodo = function(todo) {
  //   const $todo = $(`

  //     <div id="to-watch-category" class="category1"> 
  //       <h1>To watch</h1>
  //       <div id="watch-todo-list" class="todo">
  //         <h3> To do 1</h3>
  //       </div>
  //     </div>

  //     <div class="category2"> 
  //       <h1>To eat</h1>
  //       <div class="todo">
  //         <h3> To do 1</h3>
  //       </div>
  //     </div>

  //     <div class="category3"> 
  //       <h1>To read</h1>
  //       <div class="todo">
  //         <h3> To do 1</h3>
  //       </div>
  //     </div>

  //     <div class="category4"> 
  //       <h1>To buy</h1>
  //       <div class="todo">
  //         <h3> To do 1</h3>
  //       </div>
  //     </div>
      
  //   `);

  //   return $todo;
  // };




  // Define an escape function to safely escape HTML content
  // const escape = function(str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };


  // Function to submit the form
  $('#myForm').on('submit', function(event) {
    
    event.preventDefault();
    
    // Serialize the form data
    const todo = $('#myForm').serialize();
    console.log($(this).serialize());

    $.post("/to-dos", todo).then($loadTodos)      
    
    $("#todo-text").val(" "); // clear the text after submitting the form

  });

  // Function to load todos
  const $loadTodos = function() {
    console.log('test');      
    $.ajax({
      url: '/api/todo',
      method: 'GET',
    })
    .then(renderTodos)
    .catch(error => console.log("Error: ", error)); 
  }

  $loadTodos();
  
});



