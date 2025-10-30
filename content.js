// === CONFIGURAÇÃO ===
const usuario = "Calicecup";
const senha = "102030";

// === FUNÇÕES DE LOGIN ===

// Preenche os campos de login
function preencherCampos() {
  const userInput = document.querySelector('input[name="username"], input[type="text"]');
  const passInput = document.querySelector('input[name="password"], input[data-type="password"]');

  if (!userInput || !passInput) {
    console.warn("⚠️ Campos de login ainda não encontrados...");
    return false;
  }

  userInput.focus();
  userInput.value = usuario;
  userInput.dispatchEvent(new Event("input", { bubbles: true }));

  passInput.focus();
  passInput.value = senha;
  passInput.dispatchEvent(new Event("input", { bubbles: true }));

  console.log("✅ Campos preenchidos. Aguardando resolução do captcha...");
  return true;
}

// Clica no botão "Entrar"
function clicarBotaoLogin() {
  const botao = document.querySelector('button[type="submit"], button');
  if (botao) {
    console.log("🚀 Tentando efetuar login...");
    botao.click();
    aguardarConfirmacaoDeLogin();
  } else {
    console.warn("⚠️ Botão de login não encontrado.");
  }
}

// Aguarda o aparecimento do nome do usuário para confirmar login
function aguardarConfirmacaoDeLogin() {
  console.log("🕐 Aguardando confirmação do login...");
  const verificar = setInterval(() => {
    const userSpan = document.querySelector('span.text-small.text-inherit');
    if (userSpan && userSpan.textContent.trim().toLowerCase() === usuario.toLowerCase()) {
      clearInterval(verificar);
      console.log("✅ Login confirmado!");
      setTimeout(() => {
        simularTeclaESC();
        console.log("ℹ️ Para criar um teste rápido, utilize o botão 'Criar teste' na extensão.");
      }, 2000);
    }
  }, 1000);
}

// Simula pressionamento da tecla ESC
function simularTeclaESC() {
  console.log("🧹 Simulando pressionamento de ESC para fechar pop-ups...");
  const escEvent = new KeyboardEvent("keydown", {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    which: 27,
    bubbles: true
  });
  document.dispatchEvent(escEvent);
}

// Verifica se o captcha foi resolvido
function monitorarCaptcha() {
  const recaptchaResponse = document.getElementById("g-recaptcha-response");
  if (!recaptchaResponse) {
    console.warn("⚠️ reCAPTCHA não encontrado. Tentando novamente...");
    setTimeout(monitorarCaptcha, 1000);
    return;
  }

  let valorAnterior = recaptchaResponse.value;

  const checar = setInterval(() => {
    if (recaptchaResponse.value && recaptchaResponse.value !== valorAnterior) {
      clearInterval(checar);
      console.log("✅ Captcha resolvido. Efetuando login...");
      clicarBotaoLogin();
    }
  }, 1000);
}

// === EXECUÇÃO PRINCIPAL ===
window.addEventListener("load", () => {
  const tentarPreencher = setInterval(() => {
    if (preencherCampos()) {
      clearInterval(tentarPreencher);
      monitorarCaptcha();
    }
  }, 500);
});

// (As funções de criação de teste agora são executadas manualmente via popup da extensão.)
