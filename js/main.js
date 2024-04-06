const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const $form = document.getElementById('password-form');
const $password = document.querySelector('[name=password]');
const $password2 = document.querySelector('[name=password2]');
const $errorPass = document.getElementById('id_error_password');
const $errorPass2 = document.getElementById('id_error_password2');

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (!token || !uuidRegex.test(token)) {
  window.location.replace('https://seo.unsta.edu.ar/login/index.php');
}

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

    return;
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

    return;
  } else {
    $password?.classList.remove('is-invalid');
    $password2?.classList.remove('is-invalid');

    if ($errorPass && $errorPass2) {
      $errorPass.innerText = '';
      $errorPass2.innerText = '';
    }
  }

  // SI VISTE ESTE MENSAJE, FELICIDADES, EVITASTE CAER EN PHISHING
  // ESTE ES UN PROYECTO DE TESIS FINAL. POR FAVOR LLENÁ EL SIGUIENTE FORMULARIO
  // TOMA 2 MINUTOS 🙏🏻
  // https://forms.gle/5M4QRaNf4rRQEo1i6

  await fetch(
    'https://phish-server-tfi-d57910f14e33.herokuapp.com/api/v1/register/form',
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  window.location.replace('https://seo.unsta.edu.ar/login/index.php');
});

const getDni = async () => {
  const response = await fetch(
    `https://phish-server-tfi-d57910f14e33.herokuapp.com/api/v1/register/dni?token=${token}`,
    {
      credentials: 'include',
    }
  );
  const data = await response.json();

  if (data.dni) {
    document.getElementById('dni').innerText = data.dni;
  } else {
    window.location.replace('https://seo.unsta.edu.ar/login/index.php');
  }
};

getDni();
