{
    //method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostFrom = $("#new-post-form");

    newPostFrom.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostFrom.serialize(),
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}


//method to create a post in DOM