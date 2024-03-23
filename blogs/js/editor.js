
document.addEventListener('DOMContentLoaded', function () {
    // Make a fetch request to get the blog data from the server
    const queryParams = new URLSearchParams(window.location.search);
    const blogId = queryParams.get('id');
    if(blogId){
        console.log(blogId)
        fetch(`https://backend-brand-production.up.railway.app/blogs/${blogId}`)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Failed to fetch blog data');
                }
                return response.json();
            })
            .then(blogData => {
                const blogTitleField = document.querySelector('.title');
                const articleField = document.querySelector('.article');
                const publishBtn = document.querySelector('.publish-btn');
                const banner = document.querySelector('banner');
                console.log(blogData)
                // Populate the DOM with the retrieved blog data
                blogTitleField.innerHTML = blogData.title;
                articleField.innerHTML = blogData.body;
                // setImageFileToInput(blogData, 'image-upload');
               banner.style.backgroundImage = `url(${blogData.image})`;
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
                // Handle error, e.g., display an error message to the user
            });
            const blogTitleField = document.querySelector('.title');
            const articleField = document.querySelector('.article');
            const publishBtn = document.querySelector('.publish-btn');
            const inputElement = document.getElementById('banner-upload');
            
            
            publishBtn.addEventListener('click', async () => {
            
            
                if (articleField.value.length && blogTitleField.value.length) {
                    // Get the values
                    const title = blogTitleField.value;
                    const article = articleField.value;
                    const image = inputElement.files[0]
                    console.log(image)
                    // Create an object to store blog data
                    var formData = new FormData();
                    if(title){formData.append('title',title);}
                    if(article){formData.append('body',article);}
                    if(image){formData.append('image',image);}
                    try {
                        // Send a POST request to your server
                        const token = localStorage.getItem('token');
                        
                        if(!token){return "notoken"}
                        const response = await fetch(`https://backend-brand-production.up.railway.app/blogs/${blogId}`, {
                            method: 'PATCH',
                            headers: {
                                 'Authorization': `Bearer ${token}`,
                            },
                            body: formData
                        });
                        console.log(response)
            
                        if (response.ok) {
                            // Optionally, you can clear the form fields after successful publishing
                            alert('updated successfully.');
                        } else {
                            console.error('Failed to publish blog:', response.json());
                            alert('Failed to publish blog. Please try again later.');
                        }
                    } catch (error) {
                        console.error('Error publishing blog:', error);
                        alert('An error occurred while publishing the blog. Please try again later.');
                    }
                } else {
                    alert('Please fill in both title and article fields.');
                }
            });
            
    } else {
        const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const publishBtn = document.querySelector('.publish-btn');
const inputElement = document.getElementById('banner-upload');


publishBtn.addEventListener('click', async () => {


    if (articleField.value.length && blogTitleField.value.length) {
        // Get the values
        const title = blogTitleField.value;
        const article = articleField.value;
        const image = inputElement.files[0]
        console.log(image)
        // Create an object to store blog data
        var formData = new FormData();
        formData.append('title',title);
        formData.append('body',article);
        formData.append('image',image);
        try {
            // Send a POST request to your server
            const token = localStorage.getItem('token');
            
            if(!token){return "notoken"}
            const response = await fetch('https://backend-brand-production.up.railway.app/blogs', {
                method: 'POST',
                headers: {
                     'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            console.log(response)

            if (response.ok) {
                // Optionally, you can clear the form fields after successful publishing
                blogTitleField.value = '';
                articleField.value = '';
                location.reload(); // Reload the page or perform any other action after successful publishing
            } else {
                console.error('Failed to publish blog:', response.json());
                alert('Failed to publish blog. Please try again later.');
            }
        } catch (error) {
            console.error('Error publishing blog:', error);
            alert('An error occurred while publishing the blog. Please try again later.');
        }
    } else {
        alert('Please fill in both title and article fields.');
    }
});

    }

});

// Assuming you have fetched an image URL and stored it in a variable called imageUrl

// Function to convert URL to Blob
const urlToBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
};

// Function to set the image file to the input element
const setImageFileToInput = async (imageUrl, inputElementId) => {
    const blob = await urlToBlob(imageUrl);
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

    const inputElement = document.getElementById(inputElementId);
    if (inputElement) {
        inputElement.files = new FileList([file]);
    }
};

// Call the function to set the image file to the input element

