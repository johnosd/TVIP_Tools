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
        criarTesteRapido(); // 👉 Executa automaticamente o teste rápido
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

// === FUNÇÕES DE CRIAÇÃO DE TESTE ===

// Cria o teste rápido automaticamente após o login
async function criarTesteRapido() {
  // 1. Verifica se o usuário está logado
  const userSpan = document.querySelector('span.text-small.text-inherit');
  if (!userSpan || userSpan.textContent.trim().toLowerCase() !== "calicecup") {
    console.warn("⚠️ Usuário não está logado. Cancelando criação de teste.");
    return;
  }

  console.log("✅ Usuário logado confirmado. Iniciando criação de teste...");

  // 2. Redireciona para /dashboard se necessário
  if (!window.location.href.includes("/dashboard")) {
    console.log("➡️ Redirecionando para /dashboard...");
    window.location.href = "https://painel.fun/dashboard";
    await new Promise(r => setTimeout(r, 4000)); // espera carregar
  }

  // 3. Localiza o botão “Teste rápido”
  const encontrarBotao = setInterval(() => {
    const botaoTeste = document.querySelector('a[href="/users"].bg-amber-500 span.truncate');
    if (botaoTeste && botaoTeste.textContent.includes("Teste rápido")) {
      clearInterval(encontrarBotao);
      console.log("⚡ Botão 'Teste rápido' encontrado. Clicando...");
      botaoTeste.closest("a").click();

      // 4. Aguarda o pop-up aparecer
      aguardarPopupTeste();
    }
  }, 1000);
}

// Aguarda o pop-up e preenche o campo “Nome de usuário”
function aguardarPopupTeste() {
  console.log("🕐 Aguardando pop-up 'Adicionar novo usuário'...");

  const tentar = setInterval(() => {
    const popup = document.querySelector('section[data-open][aria-modal="true"]');
    if (popup) {
      clearInterval(tentar);
      console.log("✅ Pop-up detectado!");

      // 5. Preenche o campo name="username"
      const inputUsername = popup.querySelector('input[name="username"]');
      if (inputUsername) {
        inputUsername.focus();
        inputUsername.value = "Teste1";
        inputUsername.dispatchEvent(new Event("input", { bubbles: true }));
        console.log("✍️ Campo 'Nome de usuário' preenchido com 'Teste1'.");
      } else {
        console.warn("⚠️ Campo 'username' não encontrado dentro do pop-up.");
      }
    }
  }, 1000);
}
