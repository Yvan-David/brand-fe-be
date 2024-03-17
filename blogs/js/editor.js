const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const publishBtn = document.querySelector('.publish-btn');

publishBtn.addEventListener('click', async () => {
    if (articleField.value.length && blogTitleField.value.length) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }
        const docName = `blog-${blogTitle}-${id}`;
        const data = new Date();

        // Get the values
        const title = blogTitleField.value;
        const article = articleField.value;
        const date = data.toLocaleString(); // Use toLocaleString to get a readable date

        // Create an object to store blog data
        const blogData = {
            title: title,
            body: article, // Assuming your server expects 'body' instead of 'article'
        };
        console.log("why")
        try {
            // Example function to make a POST request to an API endpoint while including a cookie for authentication
            function postDataWithCookie(url, data, cookieValue) {
                // Construct the request headers
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Cookie', cookieValue); // Include the cookie in the headers

                // Construct the request options
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                };

                // Make the POST request
                fetch(url, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Handle the response data
                        console.log(data);
                    })
                    .catch(error => {
                        // Handle errors
                        console.error('There was a problem with the fetch operation:', error);
                    });
            }
            function getCookie(cookieName) {
                // Split document.cookie string into individual cookies
                const cookies = document.cookie.split(';');
            
                // Iterate over each cookie
                for (let cookie of cookies) {
                    // Split cookie into name and value
                    const [name, value] = cookie.trim().split('=');
                    // Check if cookie name matches the desired name
                    if (name === cookieName) {
                        // Return decoded cookie value
                        return decodeURIComponent(value);
                    }
                }
                // Return null if cookie with given name is not found
                return null;
            }
            // Example usage: Posting data to an API endpoint with authentication cookie
            const apiUrl = 'http://localhost:8080/blogs';
            const postData = blogData;
            const authenticationCookie = getCookie('AD_AUTH'); // Replace with your actual cookie value

            postDataWithCookie(apiUrl, postData, authenticationCookie);

            // Send a POST request to your server
/*             const response = await fetch('http://localhost:8080/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogData)
            });
            console.log(response)

            if (response.ok) {
                // Optionally, you can clear the form fields after successful publishing
                blogTitleField.value = '';
                articleField.value = '';
                location.reload(); // Reload the page or perform any other action after successful publishing
            } else {
                console.error('Failed to publish blog:', response.status);
                alert('Failed to publish blog. Please try again later.');
            } */
        } catch (error) {
            console.error('Error publishing blog:', error);
            alert('An error occurred while publishing the blog. Please try again later.');
        }
    } else {
        alert('Please fill in both title and article fields.');
    }
});
