// Function to get the value of a cookie by name
function getCookie(name) {
    // Split all cookies into an array
    const cookies = document.cookie.split(';');
    
    // Loop through the cookies array
    for (let cookie of cookies) {
        // Split the cookie into name and value
        const [cookieName, cookieValue] = cookie.trim().split('=');
        
        // If the cookie name matches, return its value
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    
    // If the cookie is not found, return null
    return null;
  }
  
  /* // Function to load posts from API and update the blog management table
  async function loadPostsToTableFromAPI() {
    try {
        // Fetch access token or API key from sessionStorage
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found');
        }
  
        // Make an HTTP GET request to your API endpoint
        const response = await fetch('http://localhost:8080/blogs', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
  
        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch posts from API');
        }
  
        // Extract JSON data from the response
        const posts = await response.json();
  
        const blogTableBody = document.querySelector('.admin-content table tbody');
  
        // Clear existing table rows
        blogTableBody.innerHTML = '';
  
        // Loop through the retrieved posts and populate the table
        posts.forEach((post, index) => {
            const { postTitle, postCategory, formattedDate } = post;
  
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td data-title="SN">${index + 1}</td>
                <td data-title="Title">${postTitle}</td>
                <td data-title="Author">${postCategory}</td>
                <td data-title="edit"><a href="/blog/index.html" class="edit">edit</a></td>
                <td data-title="delete"><a href="#" class="delete" onclick="deleteBlog(${index})">delete</a></td>
                <td data-title="publish">${formattedDate}</td>
            `;
  
            blogTableBody.appendChild(newRow);
        });
    } catch (error) {
        console.error('Error fetching posts from API:', error.message);
    }
  }
  
  // Update the event listener to call loadPostsToTableFromAPI instead of loadPostsToTable
  document.addEventListener('DOMContentLoaded', function () {
    // Call the function to load posts from the API during page load
    loadPostsToTableFromAPI();
  
    // ... (your existing code)
  }); */
  
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
                        <td data-title="Id"><a href="/blogs/blog1.html?id=${_id}">${_id}</a></td>
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
  
  // Function to delete a blog post
  window.deleteBlog = function (_id) {
    // Assuming you need to make a separate DELETE request to the API
    fetch(`/blogs/${_id}`, {
        method: 'DELETE',
        headers: {
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
        // After successful deletion, reload the posts
        loadPostsToTable();
    })
    .catch(error => {
        console.error('There was a problem deleting the blog post:', error);
    });
  };
  document.addEventListener('DOMContentLoaded', function () {
    // Call the function to load posts to the table during page load
    loadPostsToTable();
  
    // ... (your existing code)
  
  });
  