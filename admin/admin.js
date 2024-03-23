function logout() {
    // Clear authentication state
    localStorage.removeItem('adminIsLoggedIn');
    localStorage.removeItem('token')
    localStorage.setItem('currentUserEmail',[]);
    localStorage.setItem('currentUsername',[]);
    localStorage.setItem('userId',[]);

    // Redirect to login page
    window.location.href = "/login/index.HTML";
}
window.onload = function() {
    var userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
    var adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');

    if (userIsLoggedIn) {
        window.location.href = "/users/index.html";
    }else if(!adminIsLoggedIn){
        window.location.href = "/index.html";
    }
};