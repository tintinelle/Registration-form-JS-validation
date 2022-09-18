"use strict";

const button = document.getElementById('register');
const errorDiv = document.getElementById('errorsMessage');

const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const reEnterPassword = document.getElementById('reEnterPassword');
const birthYear = document.getElementById('birthYear');
const checkbox = document.getElementById("terms");

let errors = [];

const checkValidity = (input) => {
    let validity = input.validity;

    if (validity.valueMissing) {
        errors.push(`Please fill in the ${input.name} field.`);
    }

    if (validity.typeMismatch) {
        errors.push(`Please enter a valid ${input.name}`);
    }

    if (validity.rangeOverflow) {
        const max = input.max;
        errors.push('Your year of birth should be less than ' + max);
    }

    if (validity.rangeUnderflow) {
        const min = input.min;
        errors.push('Your year of birth should be more than ' + min);
    }

    if (validity.tooShort) {
        errors.push(`Your ${input.name} is too short.`);
    }
};

const checkValidLogin = () => {
    const reg = /^[a-z0-9_-]{3,16}$/i;
    const valid = reg.test(login.value);
    console.log(login.value);
    if (!valid) {
        errors.push('Your Login should be from 3 to 16 characters long and can only contain letters, numbers or "-" and "_".');
    }
};

const checkValidEMail = () => {
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const valid = reg.test(email.value);
    if (!valid) {
        errors.push(`Please enter a valid Email address.`);
    }
};

const checkStrongPassword = () => {
    const reg = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/;
    const valid = reg.test(password.value);
    if (!valid) {
        errors.push(`Your Password is not strong enough.`);
    }
};

const checkEqualPassword = () => {
    if (password.value != reEnterPassword.value) {
        errors.push(`Please enter the same passwords in both password fields.`);
    }
};

const checkAge = () => {
    const age = 2022 - birthYear.value;

    if (age < 13) {
        errors.push(`Sorry, you must be at least 13 years old in order to use this website.`);
    }
};

const checkCheckbox = () => {
    if (checkbox.checked !== true) {
        errors.push('You must agree to the Steam Subscriber Agreement to continue.');
    }
};

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

    if (errorDiv.innerHTML === '') {
        alert(`Welcome to the website, ${login.value}!`);
    }
};

button.addEventListener('click', checkAll);