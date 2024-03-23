const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const publishBtn = document.querySelector('.publish-btn');
const inputElement = document.getElementById('banner-upload');
function loadPostsToTable() {
  fetch('https://backend-brand-production.up.railway.app/blogs')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const blog_records = data || [];
          const blogTableBody = document.querySelector('.admin-content table tbody');
      
          // Clear existing table rows
          if (blogTableBody) {
              blogTableBody.innerHTML = '';
          
              blog_records.forEach((post, index) => {
                  const { title, _id, createdAt } = post;
                  const newRow = document.createElement('tr');
                  newRow.innerHTML = `
                      <td data-title="SN">${index + 1}</td>
                      <td data-title="Title">${title}</td>
                      <td data-title="Id">${_id}</td>
                      <td data-title="edit"><a href="/blogs/editor.html?id=${_id}">edit</a></td>
                      <td data-title="delete"><a href="#" class="delete" onclick="deleteBlog('${_id}')">delete</a></td>
                      <td data-title="publish">${createdAt.toLocaleString()}</td>
                  `;
                  blogTableBody.appendChild(newRow);
              });
          }
      })
      .catch(error => {
          console.error('There was a problem fetching the data:', error);
      });
}
let editbutton = document.getElementById('button');
editbutton.innerText = 'Edit';
editbutton.classList.add('editBlogbtn');


editbutton.addEventListener('click', function() {
    // Retrieve the ID of the clicked blog
    let clickedBlogID = blogDiv.dataset.blogId;
    console.log(clickedBlogID);
    
    window.location.href = `createnewblog.html?id=${clickedBlogID}`;

});

// Function to delete a blog post
function deleteBlog(_id) {
    
    const token = localStorage.getItem('token');

  // Assuming you need to make a separate DELETE request to the API
  fetch(`https://backend-brand-production.up.railway.app/blogs/${_id}`, {
      method: 'delete',
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      // After successful deletion, reload the posts
      loadPostsToTable();
  })
  .catch(error => {
      console.error('There was a problem deleting the blog post:', error);
  });
};
function editBlog(_id) {
    Window.location.href = "/blogs/editor.html"
};
document.addEventListener('DOMContentLoaded', function () {
  // Call the function to load posts to the table during page load
  loadPostsToTable();

  // ... (your existing code)

});

window.onload = function() {
    var userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
    var adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');

    if (userIsLoggedIn) {
        window.location.href = "/users/index.html";
    }else if(!adminIsLoggedIn){
        window.location.href = "/index.html";
    }
};
