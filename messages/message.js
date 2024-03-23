const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const publishBtn = document.querySelector('.publish-btn');
const inputElement = document.getElementById('banner-upload');
const token = localStorage.getItem('token');
function loadPostsToTable() {
fetch(`https://backend-brand-production.up.railway.app/messages`, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    })
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
                  const { name, body, email } = post;
                  const newRow = document.createElement('tr');
                  newRow.innerHTML = `
                      <td data-title="SN">${index + 1}</td>
                      <td data-title="Title">${name}</td>
                      <td data-title="message">${body}</td>
                      <td data-title="reply"><a href="#" class="edit">reply</a></td>
                      <td data-title="delete"><a href="#" class="delete">delete</a></td>
                      <td data-title="publish">${email}</td>
                  `;
                  blogTableBody.appendChild(newRow);
              });
          }
      })
      .catch(error => {
          console.error('There was a problem fetching the data:', error);
      });
}


document.addEventListener('DOMContentLoaded', function () {
  loadPostsToTable();
});
