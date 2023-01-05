document.addEventListener('DOMContentLoaded', (event) => {

    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');


    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
    const searchTerm = searchInput.value;
    // console.log(searchTerm)
    // request to the github user search endpoint
    fetch (`https://api.github.com/search/users?q=${searchTerm}`)
        .then ((response) => response.json())
        .then ((data) => data.items.forEach(element => renderUsers(element)))
    });

function renderUsers(element){
// console.log(element)


const userList = document.getElementById('user-list')
let listItem = document.createElement('li')
listItem.innerText = element.login
userList.appendChild(listItem)

let img = document.createElement('img')
img.src = element.avatar_url
    img.addEventListener('click', function() {
    // console.log(element.login)
    fetch (`https://api.github.com/users/${element.login}/repos`)
    .then((response) => response.json())
    // .then((json) => console.log(json))
    .then((json) => json.forEach(element => renderRepos(element)))
    })
userList.appendChild(img)

let profile = document.createElement('a')
profile.href = element.html_url
userList.appendChild(profile)
profile.innerText = "profile link"
console.log(profile.href)

}    
    function renderRepos(element){
    console.log(element)
    
    let repoList = document.getElementById('repos-list')
    console.log(repoList)
    let repoListItem = document.createElement('a')
    repoListItem.href = element.html_url
    repoList.appendChild(repoListItem)
    repoListItem.innerText = `${element.html_url}`
    }





});




// the repos endpoint will be somewhat similar to the search
// we will need to use the same as :
//  const searchInput = document.getElementById('search');
// searchForm.addEventListener('submit', (event) => {
//     event.preventDefault();

// const searchTerm = searchInput.value;
// BUT FOR THE IMAGE INSTEAD

// fetch (`https://api.github.com/users/users?q=${searchTerm}/repos`)
    //     .then((response) => response.json())
    //     .then((data) => data.items.forEach(element => renderRepos(element)))
