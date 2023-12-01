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
    console.log(todo);
    const element = `
    <div class='todo' data-id=${todo.id || todo.editedToDo[0].id}>
    <h3 class='todo-text'>${todo.name}</h3>
      <input type="checkbox" class="mark-complete" style="cursor: pointer;">
      <div class='todo-function-button'>
      <button class='delete-button'>Delete</button>
      <button class='edit-button'>Edit</button>
      </div>
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
  $(".todo-main-container").on("click", ".delete-button", function (event) {
    todoElement = $(this).closest('.todo');
    todo = todoElement.data("todo");

    console.log("delete");
    $("#overlay, #deleteConfirmationModal").fadeIn();
    // $(".complete-question").hide();
    // $(".delete-question").show();

    // Handle close button click
    $("#delete-closeButton, #delete-cancelButton").on("click", function () {
      // Close the modal and uncheck checkbox
      $("#overlay, #deleteConfirmationModal").fadeOut();
    });

    // Handle confirm button click
    $("#delete-confirmButton").off("click").on("click", function () {
      const todoId = todoElement.data("id");

      $.ajax({
        url: `/api/todo/delete/${todoId}`,
        type: "POST",
      })
        .done((data) => {
          console.log("delete todo", data);
          todoElement.remove();
          $("#overlay, #deleteConfirmationModal").fadeOut(0.1);
          $loadTodos();
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          if (jqXHR.status === 404) {
            $("body").html(
              "<html><body><h3>You are not logged in. Please <a href='/login'>login</a> or <a href='/sign-up'>register</a> first.</h3></body></html>\n"
            );
          }
          // Handle the failure, log the error
          console.log("Error:", textStatus, errorThrown);
        });
    });
  });

  // Function to edit a todo
  $(".todo-main-container").on("click", ".edit-button", function (event) {
    // Inititally dropdown value should be default
    $("#categoryDropdown").val("default");

    // Get the to-do item ID from the data attribute
    const todoElement = $(this).closest('.todo');
    const todo = todoElement.data("todo");
    const todoId = todoElement.data("id");
    const todoCategoryId = todo.category_id;
    let newCategoryId;

    $("#overlay, #editCategoryModal").fadeIn();

    $("#categoryDropdown")
      .off("click")
      .on("click", function (event) {
        loadOptions();
      });

    function loadOptions() {
      // Get the dropdown element
      let dropdown = $("#categoryDropdown");

      // Clear existing options before loading new ones
      dropdown.empty();

      // // Add a default option and set it as selected and disabled
      addOption(dropdown, "default", "Select a category");
      dropdown
        .find("option:eq(0)")
        .prop("selected", true)
        .prop("disabled", true);

      // Add additional options dynamically
      $.get("/categories").done((data) => {
        data.categories
          .filter((ele) => ele.id !== todoCategoryId)
          .map((ele) => {
            addOption(dropdown, ele.id, ele.name);
          });

        if (newCategoryId === null || newCategoryId === undefined) {
          dropdown.val("default");
        } else {
          dropdown.val(newCategoryId);
        }
      });
    }

    // Function to add an option to the dropdown
    function addOption(selectElement, value, text) {
      let option = $("<option></option>").attr("value", value).text(text);
      selectElement.append(option);
    }

    $("#categoryDropdown")
      .off("change")
      .on("change", function (event) {
        console.log(this);
        newCategoryId = $(this).val();
      });

    // Handle close button click
    $("#editCategory-closeButton, #editCategory-cancelButton").on(
      "click",
      function () {
        // Reset newCategoryId to null
        newCategoryId = null;
        // Close the modal
        $("#overlay, #editCategoryModal").fadeOut();
      }
    );

    //Handle confirm button click
    $("#editCategory-confirmButton").on("click", function() {
      if (newCategoryId === undefined || newCategoryId === null) {
        console.log("Please select a category.");
      } else {
        updateToDoCategory();
        // Reset the dropdown selection to the default option after successful edit
        $("#categoryDropdown").val("default");
      }
    });

    function updateToDoCategory() {
      // Send an Ajax request to update the to-do item
      $.ajax({
        url: `/api/todo/${todoId}`,
        method: "POST",
        data: { category_id: newCategoryId, is_complete: false },
        success: function (editedToDo) {
          editedToDo.category_id = newCategoryId;
          editedToDo.name = todo.name;

          const toDoCategory = {
            1: "watch-todo-list",
            2: "eat-todo-list",
            3: "read-todo-list",
            4: "buy-todo-list",
          };

          // Get the jQuery element for the category list corresponding to the new category ID
          const $todosList = $(`#${toDoCategory[newCategoryId]}`);

          // Remove todoEment in current category and append to the updated category
          todoElement.remove();
          const editedToDoElement = createToDoElement(editedToDo);
          $todosList.append(editedToDoElement);

          console.log("To-do item edited successfully", editedToDo);

          $("#overlay, #editCategoryModal").fadeOut(0.1);
          $loadTodos();
        },
        error: function (error) {
          console.error("Error editing to-do item", error);
        },
      });
    }
  });

  // Function to submit the form
  $("#myForm").on("submit", function (event) {
    event.preventDefault();

    $(".add-button").text(`Sorting...`).prop("disabled", true);

    // Slide up error message on click if open
    $(".error-message").slideUp(function () {
      // Serialize the form data
      const todo = $("#myForm").serialize();
      console.log($(this).serialize());

      // Check if submission is empty
      if (todo === "text=") {
        $(".add-button").text(`Add`).removeAttr("disabled");
        $(".error-message").text(`Entry cannot be blank`).slideDown();
      } else {
        // Make AJAX request
        $.post("/api/todo", todo)
          .then((data) => {
            console.log(data);
            $(".add-button").text(`Add`).removeAttr("disabled");

            // Show error if API replies with an error message
            if (data.message) {
              $(".error-message")
                .text(`Entry could not be categorized.`)
                .slideDown();
            } else {
              $loadTodos();
            }
          })
          .catch((error) => {
            $(".add-button").text(`Add`).removeAttr("disabled");
            $(".error-message")
              .text(`Server error - Please try again.`)
              .slideDown();
          });
      }

      $("#todo-text").val(""); // clear the text after submitting the form
    });
  });

  //Function to mark todo as complete
  let todoElement, todo;
  $(".todo-main-container").on("change", ".mark-complete", function () {
    todoElement = $(this).parent();
    todo = todoElement.data("todo");

    if (this.checked) {
      // Show the modal when the checkbox is checked
      $("#overlay, #completeConfirmationModal").fadeIn();
      // $(".complete-question").show();
      // $(".delete-question").hide();
    }
  });

  // Handle close button click
  $("#complete-closeButton, #complete-cancelButton").on("click", function () {
    // Close the modal and uncheck checkbox
    $(".mark-complete").prop("checked", false);
    $("#overlay, #completeConfirmationModal").fadeOut();
  });

  //Handle confirm button click
  $("#complete-confirmButton").on("click", function () {
    const todoId = todoElement.data("id");

    todo.is_complete = true;
    $.ajax({
      url: `/api/todo/${todoId}`,
      method: "POST",
      data: todo,
    })
      .done((data) => {
        // Close the modal
        $("#overlay, #completeConfirmationModal").fadeOut(0.1);
        $loadTodos();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        // Handle the failure, log the error
        console.log("Error:", textStatus, errorThrown);
      });
  });

  // Function to load todos
  const $loadTodos = function () {
    console.log("test");
    $.ajax({
      url: "/api/todo",
      method: "GET",
    })
      .done((data) => {
        const isReadonly = false; 
        $(".todo-text").prop("readonly", isReadonly);
        renderTodos(data);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        if (jqXHR.status === 401) {
          const isReadonly = true; 
          $(".todo-text").prop("readonly", isReadonly);
          $("#myForm").on("submit", function (event) {
            event.preventDefault(); 
            $(".add-button").prop("disabled", true);  
            $(".error-message").text(`You must login or sign up first.`);
          });
        }
        // Handle the failure, log the error
        console.log("Error:", textStatus, errorThrown);
      });
  };

  $loadTodos();
});
