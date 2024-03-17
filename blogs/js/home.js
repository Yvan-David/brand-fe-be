/* const createBlog = () => {
    if (localStorage.length > 0) {
        // Get the container where blogs will be added
        const article = document.querySelector('.article');
        const banner = document.querySelector(".banner");
        const blogTitle = document.querySelector(".title");
        const publish = document.querySelector(".published");
        const blogSection = document.querySelector(".project-list");
        // Iterate through local storage items
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);

            // Check if the key is a blog (you may need to implement a more specific check)
            if (key.startsWith('blog-')) {
                // Parse the JSON data from local storage
                let blogData = JSON.parse(localStorage.getItem(key));
                blogSection.innerHTML += `
                <div class="project">
                <img src="${blogData.bannerImageUrl}">
                <div class="layer">
                    <h3>${blogData.title.substring(0, 100)}</h3>
                    <p>${blogData.article.substring(0,100)}</p>
                    <a href="/blogs/published.html"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
                </div>
                `
                published(key);
            }
        }
    }
}
createBlog();

function published(key){
    let reading = localStorage.getItem('doc') ? JSON.parse(localStorage.getItem('doc')) : [];

        // Add the new blog key to the array
        reading.push(key);
    
        // Store the updated array of blog keys in local storage
        localStorage.setItem('doc', JSON.stringify(reading));
} */