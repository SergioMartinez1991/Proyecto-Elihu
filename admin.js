var userNameInput = document.getElementById('userName');
var lastNameInput = document.getElementById('lastName');
var telephoneInput = document.getElementById('telephone');
var emailInput = document.getElementById('email');
var institutionInput = document.getElementById('institution');
var systemInput = document.getElementById('system');

var contentUsers = document.getElementById('users');

var formulario = document.getElementById('new-user')
formulario.addEventListener('submit', newUser);

var edit = false;

eventListeners();
function eventListeners() {
    userNameInput.addEventListener('change', dateUser);
    lastNameInput.addEventListener('change', dateUser);
    telephoneInput.addEventListener('change', dateUser);
    emailInput.addEventListener('change', dateUser);
    institutionInput.addEventListener('change', dateUser);
    systemInput.addEventListener('change', dateUser);
}

const userObj = {
    userName: '',
    lastName: '',
    telephone: '',
    email: '',
    institution: '',
    system: ''
}


function dateUser(e) {
    userObj[e.target.name] = e.target.value;
}

class Users {
    constructor() {
        this.users = []
    }
    addUser(user) {
        this.users = [...this.users, user];
    }
    editUser(updataUser) {
        this.users = this.users.map(user => user.id === updataUser.id ? updataUser : user)
    }

    deleteUser(id) {
        this.users = this.users.filter(user => user.id !== id);
    }
}

class UI {
    printAlert(mensaje, tipo) {
        const divMessaje = document.createElement('div');
        divMessaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        
        if (tipo === 'error') {
            divMessaje.classList.add('alert-danger');
        } else {
            divMessaje.classList.add('alert-success');
        }

        divMessaje.textContent = mensaje;

        var div = document.getElementById('content').insertBefore(divMessaje, document.querySelector('.add-user'));

        setTimeout(() => {divMessaje.remove();
        }, 3000);
    }

    printUsers({ users }) { 

        this.clearHTML();

        users.forEach(user => {
            const { userName, lastName, telephone, email, institution, system, id } = user;

            const divUser = document.createElement('div');
           

            const userNameP = document.createElement('p');
            userNameP.innerHTML = `<span class="font-weight-bolder" >Nombre: </span> ${userName}`;

            const lastNameP = document.createElement('p');
            lastNameP.innerHTML = `<span class="font-weight-bolder">Apellido: </span> ${lastName}`;

            const telephoneP = document.createElement('p');
            telephoneP.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telephone}`;

            const emailP = document.createElement('p');
            emailP.innerHTML = `<span class="font-weight-bolder">Correo electronico: </span> ${email}`;

            const institutionP = document.createElement('p');
            institutionP.innerHTML = `<span class="font-weight-bolder">Institución: </span> ${institution}`;

            const systemP = document.createElement('p');
            systemP.innerHTML = `<span class="font-weight-bolder">Sistema Operativo: </span> ${system}`;

            const btnDelete = document.createElement('button');
            btnDelete.onclick = () => deleteUser(id); 
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            const btnEdit = document.createElement('button');
            btnEdit.onclick = () => loadEdit(user);

            btnEdit.classList.add('btn', 'btn-info');
            btnEdit.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            divUser.appendChild(userNameP);
            divUser.appendChild(lastNameP);
            divUser.appendChild(telephoneP);
            divUser.appendChild(emailP);
            divUser.appendChild(institutionP);
            divUser.appendChild(systemP);
            divUser.appendChild(btnDelete)
            divUser.appendChild(btnEdit)

            contentUsers.appendChild(divUser);
        });
    }

    clearHTML() {
        while (contentUsers.firstChild) {
            contentUsers.removeChild(contentUsers.firstChild);
        }
    }
}

const ui = new UI();
const adminUsers = new Users();

function newUser(e) {
    e.preventDefault();

    const { userName, lastName, telephone, email, institution, system } = userObj;
    if (userName === '' || lastName === '' || telephone === '' || email === '' || institution === '' || system === '') {
        ui.printAlert('Todos los campos son Obligatorios', 'error')
        return;
    }

    if (edit) {
        adminUsers.editUser({ ...userObj });
        ui.printAlert('Guardado Correctamente');
        formulario.querySelector('button[type="submit"]').textContent = 'Guardar usuario';
        edit = false;

    } else {
        userObj.id = Date.now();
        adminUsers.addUser({ ...userObj });
        ui.printAlert('Se agrego correctamente un usuario a la bitácora')
    }
    ui.printUsers(adminUsers);
    reiniciarObjeto();
    formulario.reset();
}

function reiniciarObjeto() {
    userObj.ususerName = '';
    userObj.lastName = '';
    userObj.telephone = '';
    userObj.email = '';
    userObj.institution = '';
    userObj.system = '';
}

function deleteUser(id) {
    adminUsers.deleteUser(id);
    ui.printUsers(adminUsers)
}

function loadEdit(user) {
    const { userName, lastName, telephone, email, institution, system, id } = user;
    userObj.userName = userName;
    userObj.lastName = lastName;
    userObj.telephone = telephone;
    userObj.email = email
    userObj.institution = institution;
    userObj.system = system;
    userObj.id = id;

    userNameInput.value = userName;
    lastNameInput.value = lastName;
    telephoneInput.value = telephone;
    emailInput.value = email;
    institutionInput.value = institution;
    systemInput.value = system;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    edit = true;
}
