const btnLogin = document.querySelector("#btn-login");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const errorMessage = document.querySelector("#error-message");

btnLogin.addEventListener("click", async () => {
  const email = inputEmail.value;
  const password = inputPassword.value;

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    localStorage.setItem("token", data.token);

    //redirige vers l'accueil
    window.location.href = "index.html";
  } else {
    //affiche l'erreur
    errorMessage.textContent = "Identifiants incorrects, veuillez réessayer.";
  }
});
