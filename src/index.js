import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

//const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
//document.getElementById("jokes").innerHTML = allJokes.join("");



let allUsersUrl = "https://coffeeaddict.dk/CORSWithJavaAndJax-rs/api/person/all"

let getAllUsersBtn = document.getElementById("show_all_users_btn")
let getUserByIdBtn = document.getElementById("get_User_by_id_btn")
let addNewUserBtn = document.getElementById("add_new_user_btn")

let deleteUserBtn = document.getElementById("delete_user_btn")


deleteUserBtn.addEventListener('click', (event) => {
    event.preventDefault
    let inputfields = ` <div class="container" id="delete_user_div"> 
                <input type="text" placeholder="Type id of person to delete" id="ID_To_delete"> <br>

                <button id="delete_Final_User_btn">Delete user</button> 
                </div>` 
    document.getElementById('SinglePage').innerHTML = inputfields ;

    let DeleteUserFinalBtn = document.getElementById("delete_Final_User_btn")

    DeleteUserFinalBtn.addEventListener('click',(event) => {
    event.preventDefault

    const id = document.getElementById("ID_To_delete").value

    deleteUser(id)   
    getAllUsers()
})
})

function deleteUser (id)  {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch("https://coffeeaddict.dk/CORSWithJavaAndJax-rs/api/person/delete/" + id, options);
}



getAllUsersBtn.addEventListener('click', (event) =>  {
    event.preventDefault
    getAllUsers()


})

getUserByIdBtn.addEventListener('click', (event) => {
    event.preventDefault
    let id = document.getElementById('getUserByIdInput').value
    getUserByID(id)
   })


addNewUserBtn.addEventListener('click', (event) => {
    event.preventDefault
let inputfields = ` <div class="container" id="add_New_User_Div"> 
                <input type="text" placeholder="First Name" id="addNewUserfNameField"> <br>
                <input type="text" placeholder="Last Name" id="addNewUserlNameField"> <br>
                <input type="text" placeholder="Phone" id="addNewUserPhoneField"> <br>
                <button id="add_Final_New_User_btn">Add user</button> 
                </div>` 

document.getElementById('SinglePage').innerHTML = inputfields ;
let addUserFinalBtn = document.getElementById("add_Final_New_User_btn")

addUserFinalBtn.addEventListener('click',(event) => {
    event.preventDefault

    const fName = document.getElementById("addNewUserfNameField").value
    const lName = document.getElementById("addNewUserlNameField").value
    const phone = document.getElementById("addNewUserPhoneField").value
    addUser(fName, lName, phone)   
    getAllUsers()
})
})

function addUser(fName, lName, phone) {
    let options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fName: fName,
            lName: lName,
            phone: phone
            
        })
    }
    fetch("https://coffeeaddict.dk/CORSWithJavaAndJax-rs/api/person/add", options);
}






function getAllUsers () {
    fetch(allUsersUrl)
    .then(res => res.json()) //in flow1, just do it
    .then(data => {
    // Inside this callback, and only here, the response data is available
       console.log("data",data)
    
       let tableString = "<table class='table table-bordered table-hover table-sm'> <tr> <th>ID</th><th>First Name</th><th>Last Name</th><th>Phone</th></tr>";
        let userTableArray = data.all.map(data => data = `<tr><td>${data.id} </td><td>${data.fName} </td><td>${data.lName} </td><td>${data.phone} </td></tr>`);
        userTableArray.forEach(data => {
            tableString += data;
                });
        tableString += "</table>";
        document.getElementById("SinglePage").innerHTML = tableString;
    
} ) }

function getUserByID (id)  {
    let  getUserUrl  = "https://coffeeaddict.dk/CORSWithJavaAndJax-rs/api/person/"
    fetch(getUserUrl+id)
.then(res => res.json()) //in flow1, just do it
.then(data => {
// Inside this callback, and only here, the response data is available
   console.log("data",data); 
  //  let result  = data.name
   let result =  `ID: ${data.id}<br> First Name: ${data.fName}<br> Last Name: ${data.lName}<br> Phone: ${data.phone}`
   document.getElementById('SinglePage').innerHTML = result ;

}).catch(err => {
    if (err.status) {
        err.fullError.then(e => console.log(e.detail))
    }
    else { console.log("Network error"); }
})
}