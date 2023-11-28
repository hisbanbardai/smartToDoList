// Client facing scripts here

$(document).ready(function () {
  const renderTodos = function (response) {
    const toDoCategory = {
      1: "watch-todo-list",
      2: "eat-todo-list",
      3: "read-todo-list",
      4: "buy-todo-list",
    };

    let $todosList;

    //no data should be displayed initially
    for (const category in toDoCategory) {
      $todosList = $(`#${toDoCategory[category]}`);
      $todosList.empty();
    }

    for (const todo of response.toDos) {
      $todosList = $(`#${toDoCategory[todo.category_id]}`);
      console.log($todosList);
      const element = createToDoElement(todo);
      $todosList.append(element);
    }

    console.log(response);
  };

  const createToDoElement = function (todo) {
    const element = `
    <div class='todo'>
    <h3>${todo.name}</h3>
    <button class='delete-todo'>Delete</button>
    </div>
    `;
    return $(element).data("todo", todo);
  };

  // Define an escape function to safely escape HTML content
  // const escape = function(str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };

  //Function to delete a todo
  $(".todo-main-container").on("click", ".delete-todo", function (event) {
    console.log("Deleting");
    const todoElement = $(this).parent();
    console.log(todoElement);
    const todo = todoElement.data("todo");
    console.log(todo);

    $.ajax({
      url: `/api/todo/${todo.id}`,
      type: "DELETE",
    })
      .then(() => {
        console.log("delete todo");
        todoElement.remove();
      })
      .catch((error) => console.log("Error: ", error));
  });

  // Function to submit the form
  $("#myForm").on("submit", function (event) {
    event.preventDefault();

    // Serialize the form data
    const todo = $("#myForm").serialize();
    console.log($(this).serialize());

    $.post("/api/todo", todo)
      .then((data) => {
        console.log(data);
        $loadTodos();
      })
      .catch((error) => console.log(error));

    $("#todo-text").val(" "); // clear the text after submitting the form
  });

  // Function to load todos
  const $loadTodos = function () {
    console.log("test");
    $.ajax({
      url: "/api/todo",
      method: "GET",
    })
      .then((renderTodos))
      .catch((error) => console.log("Error: ", error.responseText));
  };

  $loadTodos();
});
