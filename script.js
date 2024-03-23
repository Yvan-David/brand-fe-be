document.addEventListener('DOMContentLoaded', function () {
    // Make a fetch request to get the blog data from the server
    fetch('https://backend-brand-production.up.railway.app/blogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch blog data');
            }
            return response.json();
        })
        .then(blogData => {
            // Get the container where blogs will be added
            const blogListContainer = document.querySelector('.blog-list');

            // Iterate over each blog entry and create links for them
            blogData.forEach(blog => {
                // Create a link element for each blog
                const blogLink = document.createElement('a');
               // blogLink.href = `/blogs/blog1.html?id=${blog._id}`; // Set the href to the blog id (assuming it's unique)
               // blogLink.textContent = blog.title; // Display the blog title as the link text
                blogLink.classList.add('blog-link');

                // Append the link to the blog list container
                blogListContainer.appendChild(blogLink);

                // Add an event listener to navigate to the clicked blog
                blogLink.addEventListener('click', function (event) {
                    event.preventDefault(); // Prevent the default link behavior
                    navigateToBlog(blog._id); // Call a function to navigate to the clicked blog
                });
            });
        })
        .catch(error => {
            console.error('Error fetching blog data:', error);
            // Handle error, e.g., display an error message to the user
        });
});

// Function to navigate to the clicked blog
function navigateToBlog(blogId) {
    // You can implement the navigation logic here, e.g., redirect to a new page or update the current page content
    //console.log('Navigating to blog with id:', blogId);
   window.location.href = `/blogs/blog1.html?id=${blogId}`;
}

const createBlog = async () => {
    try {
        // Fetch blog data from the API
        const response = await fetch('https://backend-brand-production.up.railway.app/blogs');
        if (!response.ok) {
            throw new Error('Failed to fetch blog data');
        }
        const blogData = await response.json();

        // Get the container where blogs will be added
        const blogSection = document.querySelector(".project-list");

        // Display only the latest three blogs
        const latestBlogs = blogData.slice(-3);
        console.log(latestBlogs)

        // Iterate through the latest three blogs
        latestBlogs.forEach(blog => {
            blogSection.innerHTML += `
                <div class="project">
                    <img src="${blog.image}">
                    <div class="layer">
                        <h3>${blog.title}</h3>
                        <p>${blog.body.substring(0,100)}</p>
                        <a  href="/blogs/blog1.html?id=${blog._id}"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching blog data:', error);
    }
};

createBlog();


document.addEventListener('DOMContentLoaded', async () => {

    
    const form = document.getElementById('form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('message').value;

        // Create object with form data
        const data = {
            name: name,
            email: email,
            body: message
        };
        try {
            // Send a POST request to your server
            const response = await fetch('https://backend-brand-production.up.railway.app/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response)

            if (response.ok) {
                // Optionally, you can clear the form fields after successful publishing
                name = '';
                email = '';
                message = '';
                location.reload(); // Reload the page or perform any other action after successful publishing
            } else {
                console.error('Failed to publish message:', response.json());
                alert('Failed to post message. Please try again later.');
            }
        } catch (error) {
            console.error('Error posting message:', error);
            alert('An error occurred while posting message. Please try again later.');
        }
    }) /* else {
        alert('Please fill in both name, email, and message fields.');
    } */
});
