import { inject } from '@vercel/analytics';

inject();

const $form = document.getElementById('password-form');
const $password = document.querySelector<HTMLInputElement>('[name=password]');
const $password2 = document.querySelector<HTMLInputElement>('[name=password2]');
const $errorPass = document.getElementById('id_error_password');
const $errorPass2 = document.getElementById('id_error_password2');

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

$form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const password = $password?.value;
  const repeatedPassword = $password2?.value;

  if (!password) {
    $password?.classList.add('is-invalid');
    if ($errorPass) {
      $errorPass.innerText = '- Obligatorio';
    }
  } else {
    $password?.classList.remove('is-invalid');
    if ($errorPass) {
      $errorPass.innerText = '';
    }
  }

  if (!repeatedPassword) {
    $password2?.classList.add('is-invalid');
    if ($errorPass2) {
      $errorPass2.innerText = '- Obligatorio';
    }
  } else {
    $password2?.classList.remove('is-invalid');
    if ($errorPass2) {
      $errorPass2.innerText = '';
    }
  }

  if (!password || !repeatedPassword) return;

  if (password !== repeatedPassword) {
    $password?.classList.add('is-invalid');
    $password2?.classList.add('is-invalid');

    if ($errorPass && $errorPass2) {
      $errorPass.innerText = 'Las contraseñas no coinciden';
      $errorPass2.innerText = 'Las contraseñas no coinciden';
    }
  } else {
    $password?.classList.remove('is-invalid');
    $password2?.classList.remove('is-invalid');

    if ($errorPass && $errorPass2) {
      $errorPass.innerText = '';
      $errorPass2.innerText = '';
    }
  }

  if (password.length < 8) {
    $password?.classList.add('is-invalid');
    $password2?.classList.add('is-invalid');

    if ($errorPass && $errorPass2) {
      $errorPass.innerText =
        'Las contraseñas deben tener al menos una longitud de 8 caracteres.';
      $errorPass2.innerText =
        'Las contraseñas deben tener al menos una longitud de 8 caracteres.';
    }
  } else {
    $password?.classList.remove('is-invalid');
    $password2?.classList.remove('is-invalid');

    if ($errorPass && $errorPass2) {
      $errorPass.innerText = '';
      $errorPass2.innerText = '';
    }
  }

  await fetch(`${import.meta.env.VITE_BACKEND_URL}/form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  window.location.replace('https://seo.unsta.edu.ar/login/index.php');
});

const sendPingNotification = async () => {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
};

sendPingNotification();
