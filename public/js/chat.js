let user = null;
let socket = null;

const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';

    if(token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch('http://localhost:3000/api/auth', {
        headers: {
            'x-token': token
        }
    });

    const { auth: userDB, token: newToken } = await resp.json();
    localStorage.setItem('token', newToken);

    user = userDB;
    document.title = user.name;

    await connectSocket();
}

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on("connect", () => {
        console.log("online");
    });

    socket.on("disconnect", () => {
        console.log("offline");
    });

    socket.on("recibir-mensaje", showMessages);

    socket.on("usuarios-activos", showUsers);

    socket.on("mensaje-privado", (payload) => {
        console.log(payload);
    });
}

const showUsers = (users) => { 
    let html = '';
    users.forEach(({ name, uid }) => {
        html += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = html;
}

const showMessages = (messages) => {
    let html = '';

    messages.forEach(({ name, message }) => {
        html += `
            <li>
                <p>
                    <span class="text-primary">${name} dice: </span>
                    <span>${message}</span>
                </p>
            </li>
        `;
    });

    ulMensajes.innerHTML = html;
}

txtMensaje.addEventListener('keyup', e => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;

    if(e.keyCode !== 13) return;
    if(mensaje.length === 0) return;
    
    txtMensaje.value = '';
    socket.emit('enviar-mensaje', { uid, mensaje });
});

const main = async () => {
    await validateJWT();
}

main();
//const socket = io();