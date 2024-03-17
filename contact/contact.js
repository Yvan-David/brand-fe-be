
function dispData(){
const data = localStorage.getItem("users");
const users = JSON.parse(data)

const createTable= (users)=>{
    return `
        <table id="table">
            <thead>
                <th>SN</th>
                <th>Username</th>
                <th>Email</th>
                <th colspan="3">Action</th>
            </thead>
            <tbody>
                ${createTableData(users)}
            </tbody>
        </table>
    `;
};

const createTableData = (users) => {
    let html = "";
    users.forEach((user) => {
        html += `
            <tr>
                <td data-title="SN">1</td>
                <td data-title="Username">${user.username}</td>
                <td data-title="Email">${user.email}</td>
                <td  data-title="edit"><a href="#" class="edit">edit</a></td>
                <td data-title="delete"><a href="#"  class="delete">delete</a></td>
                <td data-title="publish"><a href="#"  class="publish">publish</a></td>
            </tr>
        `
    });
    return html;
}
document.getElementById("table").innerHTML =`${createTable(users)}`;
}
//dispData();
//document.getElementById("table").innerHTML =`${createTable(users)}`;