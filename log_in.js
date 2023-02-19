import { createUser, getUserByUsernameAndPassword } from './src.js';

document.getElementById('b-register').addEventListener('click', function () {
  document.getElementById('registration-div').classList.remove('hide');
  document.getElementById('login-div').classList.add('hide');
});

document.getElementById('b-login').addEventListener('click', function () {
  document.getElementById('login-div').classList.remove('hide');
  document.getElementById('registration-div').classList.add('hide');
});

document
  .querySelector('input[value="option2"]')
  .addEventListener('change', function () {
    document.querySelector('input[value="option1"]').checked = false;
  });
document
  .querySelector('input[value="option1"]')
  .addEventListener('change', function () {
    document.querySelector('input[value="option2"]').checked = false;
  });

document
  .getElementById('button-registration')
  .addEventListener('click', registration);
async function registration() {
  let firstName = document.getElementById('input-firstname').value;
  const lastName = document.getElementById('input-lastname').value;
  const username = document.getElementById('input-username').value;
  const password = document.getElementById('input-password').value;
  const address = document.getElementById('input-address').value;
  const phoneNumber = document.getElementById('input-phonenumber').value;

  const radioButtons = document.getElementsByName('gender');
  let gender;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      gender = radioButtons[i].value;
    }
  }
  const admin = document.getElementById('admin').checked;
  if (
    firstName == '' ||
    lastName == '' ||
    username == '' ||
    password == '' ||
    address == '' ||
    phoneNumber == '' ||
    gender == undefined
  ) {
    alert('PLEASE FILL IN ALL INPUTS!');
  } else {
    await createUser(
      firstName,
      lastName,
      username,
      password,
      address,
      phoneNumber,
      gender,
      admin
    );
    document.getElementById('input-firstname').value = '';
    document.getElementById('input-lastname').value = '';
    document.getElementById('input-username').value = '';
    document.getElementById('input-password').value = '';
    document.getElementById('input-address').value = '';
    document.getElementById('input-phonenumber').value = '';
    document.getElementById('admin').checked = true;
    document.getElementById('neadmin').checked = false;
    document.getElementById('login-div').classList.remove('hide');
    document.getElementById('registration-div').classList.add('hide');
  }
}
const btnLogin = document.getElementById('button-login');
btnLogin.addEventListener('click', login);
async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  if (username == '' || password == '') {
    alert('PLEASE FILL IN ALL INPUTS!');
    return;
  }
  const user = await getUserByUsernameAndPassword(username, password);

  if (user[0] == undefined) {
    alert('User with such username and password does not exist');
  } else {
    if (user[0].admin == true) {
      window.location.href = `admin?id=${user[0].id}`;
    } else {
      window.location.href = `user?id=${user[0].id}`;
    }
  }
}
