"use strict";

const button = document.getElementById('register');
const errorDiv = document.getElementById('errorsMessage');

const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const reEnterPassword = document.getElementById('reEnterPassword');
const birthYear = document.getElementById('birthYear');
const checkbox = document.getElementById('terms');

let errors = [];

    // Ввожу переменную для проверки валидации, в каждом кейсе с ошибкой isOk будет false
let isOk = true; 

class User {
    constructor (login, email, password, birthYear, country) {
        this.login = login;
        this.email = email;
        this.password = password;
        this.birthYear = birthYear;
        this.country = country;
    }
}

const checkValidity = (input) => {
    let validity = input.validity;

    isOk = true;

    if (validity.valueMissing) {
        errors.push(`Please fill in the ${input.name} field.`);
        isOk = false;
    }

    if (validity.typeMismatch) {
        errors.push(`Please enter a valid ${input.name}`);
        isOk = false;
    }

    if (validity.rangeOverflow) {
        const max = input.max;
        errors.push('Your year of birth should be less than ' + max);
        isOk = false;
    }

    if (validity.rangeUnderflow) {
        const min = input.min;
        errors.push('Your year of birth should be more than ' + min);
        isOk = false;
    }

    if (validity.tooShort) {
        errors.push(`Your ${input.name} is too short.`);
        isOk = false;
    }

};

const checkValidLogin = () => {
    const reg = /^[a-z0-9_-]{3,16}$/i;
    const valid = reg.test(login.value);
    console.log(login.value);
    if (!valid) {
        errors.push('Your Login should be from 3 to 16 characters long and can only contain letters, numbers or "-" and "_".');
        isOk = false;
    }
};

const checkValidEMail = () => {
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const valid = reg.test(email.value);
    if (!valid) {
        errors.push(`Please enter a valid Email address.`);
        isOk = false;
    }
};

const checkStrongPassword = () => {
    const reg = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/;
    const valid = reg.test(password.value);
    if (!valid) {
        errors.push(`Your Password is not strong enough.`);
        isOk = false;
    }
};

const checkEqualPassword = () => {
    if (password.value != reEnterPassword.value) {
        errors.push(`Please enter the same passwords in both password fields.`);
        isOk = false;
    }
};

const checkAge = () => {
    const age = 2022 - birthYear.value;

    if (age < 13) {
        errors.push(`Sorry, you must be at least 13 years old in order to use this website.`);
        isOk = false;
    }
};

const checkCheckbox = () => {
    if (checkbox.checked !== true) {
        errors.push('You must agree to the Steam Subscriber Agreement to continue.');
        isOk = false;
    }
};


// отправка на сервер
const sendToServer = () => {
    const country = document.getElementById('country').options[document.getElementById('country').selectedIndex].value;

    let user = new User (login.value, email.value, password.value, birthYear.value, country);

    fetch ('https://httpbin.org/post',
    {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    .then (response => response.json())
    .then (data => {
        console.log (data);
    })
    .catch (error => console.log(error));
}

const checkAll = () => {
    errorDiv.innerHTML = '';
    errors = [];

    const inputs = document.querySelectorAll('input');

    for (let input of inputs) {
        checkValidity(input);
    }

    checkValidLogin();
    checkValidEMail();
    checkStrongPassword();
    checkEqualPassword();
    checkAge();
    checkCheckbox();

    errorDiv.innerHTML = errors.join('</br>');

    // Проверка валидности на случай, если переменная isOk подкачает
    // if (errorDiv.innerHTML === '') {
    //     alert(`Welcome to the website, ${login.value}!`);
    // }

    // Конечная проверка на валидность по всем пунктам
    if (isOk) {
        alert(`Welcome to the website, ${login.value}!`);
        sendToServer();
    }
};

button.addEventListener('click', checkAll);