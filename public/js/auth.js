const form = document.querySelector('form');
const error = document.querySelector('#error');

function handleCredentialResponse(response) {
    const body = {id_token: response.credential};

   fetch('http://localhost:3000/api/auth/google', {
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(body)
   })
    .then(resp => resp.json())
    .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.user.email);

        window.location = "chat.html";
    })
    .catch(console.warn);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    error.innerText = "";

    const data = {};

    for(let element of form.elements) {
        if(element.name.length > 0) {
            data[element.name] = element.value;
        }
    }

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(({ msg, token }) => {
        if(msg) {
            error.innerText = msg;
        } else {
            localStorage.setItem('token', token);
            window.location = "chat.html";
        } 
    })
    .catch(err => console.log(err));
});

const button = document.querySelector('#google-signout');

button.onclick = () => {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}