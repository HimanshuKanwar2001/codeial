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
          let newPost=newPostDom(data.data.post);
          $('#post-list-container>ul').prepend(newPost);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
  
  <small>
    <a class="post-comments" href="/posts/destroy/${post.id}">X</a>
  </small>
   ${post.content}
  <br />
  <small> ${post.user.name} </small>

  <div class="post-comments">
   
    <form action="/comments/create" method="post">
      <input
        type="text"
        name="content"
        placeholder="Type Here to add comment..."
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add Comment" />
    </form>

   

    <div class="post-comments-list">
      <ul id="post-comments-${post.commets}}">
        

      </ul>
    </div>
  </div>
</li>
`);
  };

  createPost();
}
