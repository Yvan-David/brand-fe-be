document.addEventListener('DOMContentLoaded', loadPosts);

function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    postsContainer.innerHTML = ''; // Clear current posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${post.image}" alt="Post Image">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Example function to add a new post (you would call this when submitting a form)
function addNewPost(title, body, image) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ title, body, image });
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts(); // Refresh the posts displayed
}
