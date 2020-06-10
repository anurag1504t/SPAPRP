console.log("Entered Successfully");
const btn = document.querySelector('.myBtn');
const userId = document.querySelector('#userId');
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const url = "http://localhost:3000/users/" + userId;
btn.addEventListener('click', () => {
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
});
document.getElementById("myBtn").addEventListener("click", console.log("Hello"));

