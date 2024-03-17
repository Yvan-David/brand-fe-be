/* 
document.addEventListener('DOMContentLoaded', function () {
    // Check if there are blogs in local storage
    if (localStorage.length > 0) {
        // Get the container where blogs will be added
        const article = document.querySelector('.article');
        const banner = document.querySelector(".banner");
        const blogTitle = document.querySelector(".title");
        const publish = document.querySelector(".published");
        // Iterate through local storage items
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);

            // Check if the key is a blog (you may need to implement a more specific check)
            if (key.startsWith('blog-')) {
                // Parse the JSON data from local storage
                let blogData = JSON.parse(localStorage.getItem(key));

                blogTitle.innerHTML = blogData.title;


                publish.innerHTML = blogData.date;

                article.innerHTML = blogData.article;

                banner.style.backgroundImage = 'url(' + blogData.bannerImageUrl + ')';

            }
        }
    }
}); */