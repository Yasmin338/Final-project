// ---------------------------Signup
const signUpForm =document.getElementById('signUp')
signUpForm?.addEventListener('submit',(e)=>{
    e.preventDefault()
   const name = document.getElementById('name').value
   const email = document.getElementById('email').value
   const userName = document.getElementById('userName').value
   const password = document.getElementById('password').value
const userData = {
    name,
    userName,
    email,
    password
}
const users = []
users.push(userData)
localStorage.setItem('user',JSON.stringify(users))
window.location.href = 'Html/login.html'
})
// ---------------------------Signup

signUpForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value;

    const userData = {
        name,
        userName,
        email,
        password,
        isAdmin: false // يمكنك تعديلها يدويًا لمستخدم أدمن
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(u => u.userName === userName || u.email === email);
    if (exists) {
        alert("المستخدم موجود بالفعل");
        return;
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'Html/login.html';
});


//------------------------ Login
const loginForm =document.getElementById('login')
loginForm?.addEventListener('submit',(e)=>{
    e.preventDefault()
   const userNameInput = document.getElementById('userName').value
   const passwordInput = document.getElementById('password').value
   const errorMsg = document.getElementById('errorMsg')

const userData = JSON.parse(localStorage.getItem('user')) 
const foundUser = userData.find( user => user.userName == userNameInput)

if(!foundUser){
    errorMsg.textContent = 'User not found'
}
else if(foundUser.password !== passwordInput){
    errorMsg.textContent = "Incorrect Password"
}
else{
   errorMsg.textContent = ''
   alert('Logged in successfully')
}
window.location.href = 'home.html'

})
//------------------------ Login

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const userNameInput = document.getElementById('userName').value;
    const passwordInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.userName === userNameInput);

    if (!foundUser) {
        errorMsg.textContent = 'User not found';
    } else if (foundUser.password !== passwordInput) {
        errorMsg.textContent = "Incorrect Password";
    } else {
        errorMsg.textContent = '';
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        alert('Logged in successfully');
        if (foundUser.isAdmin) {
            window.location.href = 'Html/admin.html';
        } else {
            window.location.href = 'home.html';
        }
    }
});
