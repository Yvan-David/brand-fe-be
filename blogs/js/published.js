document.addEventListener('DOMContentLoaded', function () {
    // Make a fetch request to get the blog data from the server
    const queryParams = new URLSearchParams(window.location.search);
    const blogId = queryParams.get('id');
    localStorage.setItem('blogId', blogId);

    fetch(`https://backend-brand-production.up.railway.app/blogs/${blogId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch blog data');
            }
            return response.json();
        })
        .then(blogData => {
            // Get the container where blogs will be added
            const article = document.querySelector('.article');
            const imgElement = document.querySelector('.header-img');
            //const banner = document.querySelector(".banner");
            const blogTitle = document.querySelector(".title");
            const publish = document.querySelector(".published");
            console.log(blogData)
            // Populate the DOM with the retrieved blog data
            blogTitle.innerHTML = blogData.title;
            publish.innerHTML = blogData.date;
            article.innerHTML = blogData.body;
            imgElement.src = blogData.image;
            displayComments(blogData);
            displayLikes();
           // banner.style.backgroundImage = 'url(' + blogData[18].image + ')';
        })
        .catch(error => {
            console.error('Error fetching blog data:', error);
            // Handle error, e.g., display an error message to the user
        });
});
function displayComments(blog) {
    const name = localStorage.getItem('currentUsername');
    var commentsContainer = document.querySelector('.comments');
    commentsContainer.innerHTML = "";

    blog.comments.forEach(comment => {
        var commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p class="comment-text">${name}</p>
            <p class="comment-text">${comment.text}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// const publishBtn = document.querySelector("#publish");
/* publishBtn.addEventListener("click", e => {
    addComment();
}) */
function addComment() {
    var commentInput = document.querySelector(".usercomment");
    if (commentInput === "") {
        document.getElementById('error').innerText = "blank comment";
        setTimeout(function () {
            document.getElementById('error').innerText = "";
        }, 2000);

        return;
    }
    document.getElementById('error').innerText = "";

    var check = localStorage.getItem('currentUserEmail');
    if (check === null || check === "") {
        window.location.href = '/index.html'; 
        return;
    }
    var blogId = localStorage.getItem('blogId');
    var userId = localStorage.getItem('userId');

    var token = localStorage.getItem('token');

    if (userId === null) {
        return;
    }
    var comment = {
        text: commentInput.value
    };

    const url = `https://backend-brand-production.up.railway.app/blogs/${blogId}/comment/${userId}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        //console.log(JSON.stringify(comment))
        //console.log(response)
    .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            location.reload();
            return response.json();
        })
/*         .then(updatedBlog => {
            document.getElementById('comment').value=""
            displayComments(updatedBlog);
        }) */
        .catch(error => {
            console.error('Error adding comment:', error);
        });
}
function likeBlog() {
    var check = localStorage.getItem('currentUserEmail');
    if (check === null || check === "") {
        window.location.href = '/index.HTML'; 
        return;
    }
    var blogId = localStorage.getItem('blogId');
    var userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('currentUserEmail');
    const url = `https://backend-brand-production.up.railway.app/blogs/${blogId}/like/${userId}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to like blog');
            }
            displayLikes();
            return response.json();
        })
        .catch(error => {
            console.error('Error liking blog:', error);
        });
}

function displayLikes() {
    var blogId = localStorage.getItem('blogId');
    const url = `https://backend-brand-production.up.railway.app/blogs/${blogId}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            return response.json();
        })
        .then(blog => {
            var likesElement = document.querySelector('.like-count');
            likesElement.textContent = `${blog.likes.length} Likes`;
        })
        .catch(error => {
            console.error('Error fetching blog:', error);
        });
}
