/* 
document.addEventListener('DOMContentLoaded', function () {
    // Check if there are blogs in local storage
    if (localStorage.length > 0) {
        // Get the container where blogs will be added
        const article = document.querySelector('.article');
        const banner = document.querySelector(".banner");
        const blogTitle = document.querySelector(".title");
        const publish = document.querySelector(".published");


        let blogData = JSON.parse(localStorage.getItem('doc'));

        blogTitle.innerHTML = blogData.title;


        publish.innerHTML = blogData.date;

        article.innerHTML = blogData.article;

        banner.style.backgroundImage = 'url(' + blogData.bannerImageUrl + ')';
        localStorage.removeItem('doc')

    }
});
 */