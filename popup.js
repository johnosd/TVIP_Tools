document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("criarTeste");
  const status = document.getElementById("status");
  if (!botao || !status) {
    return;
  }

  botao.addEventListener("click", () => {
    botao.disabled = true;
    botao.textContent = "Criando teste...";
    status.textContent = "Iniciando rotina de criação...";

    chrome.runtime.sendMessage({ action: "criarTeste" }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        status.textContent = "Não foi possível acionar o teste. Tente novamente.";
      } else if (response?.status === "erro") {
        status.textContent = response.message || "Erro ao criar teste.";
      } else {
        status.textContent = "Rotina de criação acionada.";
      }
      botao.disabled = false;
      botao.textContent = "Criar teste";
    });
  });
});
