document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const email = document.getElementById('email');
  const age = document.getElementById('age');
  const message = document.getElementById('message');

  const emailError = document.getElementById('email-error');
  const ageError = document.getElementById('age-error');
  const messageError = document.getElementById('message-error');
  const messageInfo = document.getElementById('message-info');

  function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  function validateAge(value) {
    const num = Number(value);
    return !isNaN(num) && num >= 18 && num <= 99;
  }

  function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function updateMessageInfo() {
    const charCount = message.value.length;
    const wordCount = countWords(message.value);
    messageInfo.textContent = `${wordCount} words | ${charCount} / 5000 characters`;
  }

  form.addEventListener('submit', (e) => {
    let isValid = true;
    emailError.textContent = '';
    ageError.textContent = '';
    messageError.textContent = '';

    if (!validateEmail(email.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!validateAge(age.value)) {
      ageError.textContent = 'Age must be a number between 18 and 99.';
      isValid = false;
    }

    const wordCount = countWords(message.value);
    const charCount = message.value.length;

    if (wordCount > 100) {
      messageError.textContent = 'Message must not exceed 100 words.';
      isValid = false;
    } else if (charCount > 5000) {
      messageError.textContent = 'Message must not exceed 5000 characters.';
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault(); // Prevent form submission if invalid
    }
  });

  message.addEventListener('input', updateMessageInfo);
});
