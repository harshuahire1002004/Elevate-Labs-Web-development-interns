
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let isValid = true;

  // Reset errors
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  successMessage.textContent = '';

  // Name validation
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Name is required';
    isValid = false;
  }

  // Email validation (regex)
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = 'Enter a valid email';
    isValid = false;
  }

  // Message validation
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'Message is required';
    isValid = false;
  }

  // Success message
  if (isValid) {
    successMessage.textContent = 'Form submitted successfully!';
    form.reset();
  }
});

