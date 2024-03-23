/* const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".comments");
const userName = document.querySelector(".user");
const notify = document.querySelector(".notifyinput");
userId = localStorage.getItem('user')._id;
userComment.addEventListener("input", e => {
    if(!userComment.value) {
        publishBtn.setAttribute("disabled", "disabled");
        publishBtn.classList.remove("abled")
    }else {
        publishBtn.removeAttribute("disabled");
        publishBtn.classList.add("abled")
    }
})
async function addPost() {

    const commentData = {
        text: userComment.value,

    };

    try {
        const response = await fetch(`http://localhost:8080/blogs/${blogId}/comment/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            throw new Error('Failed to add comment');
        }

        // Add the comment to the page
        comments.innerHTML += createCommentElement(commentData);
        userComment.value = "";
        publishBtn.classList.remove("abled");

        let commentsNum = document.querySelectorAll(".parents").length;
        document.getElementById("comment").textContent = commentsNum;
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('An error occurred while adding the comment. Please try again later.');
    }
}
// Function to create HTML for a comment
function createCommentElement(commentData) {
    return `
        <div class="parents">
            <div>
                <p>${commentData.text}</p>
                <div class="engagements"><img src="like.png" id="like"><img src="share.png" alt=""></div>
            </div>    
        </div>`;
}

// Fetch comments from the server when the page is loaded
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`http://localhost:8080/${blogId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const commentsData = await response.json();

        // Add each comment to the page
        commentsData.forEach(commentData => {
            comments.innerHTML += createCommentElement(commentData);
        });

        let commentsNum = document.querySelectorAll(".parents").length;
        document.getElementById("comment").textContent = commentsNum;
    } catch (error) {
        console.error('Error fetching comments:', error);
        alert('An error occurred while fetching comments. Please try again later.');
    }
});
// Function to create HTML for a comment
function createCommentElement(commentData) {
    let index = 0
    return `
        <div class="parents">
            <div>
                <p>${commentData.comments[0]}</p>
                <div class="engagements"><img src="like.png" id="like"><img src="share.png" alt=""></div>
            </div>    
        </div>`;
}

 */