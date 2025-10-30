// Recebe o comando do popup e executa o script de criar teste
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "criarTeste") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: criarTesteRapido
      });
    });
  }
});

// Função injetada na aba
function criarTesteRapido() {
  async function executar() {
    const userSpan = document.querySelector('span.text-small.text-inherit');
    if (!userSpan || userSpan.textContent.trim().toLowerCase() !== "calicecup") {
      alert("⚠️ Usuário não está logado. Faça login primeiro.");
      return;
    }

    console.log("✅ Usuário logado. Iniciando criação de teste...");
    if (!window.location.href.includes("/dashboard")) {
      console.log("➡️ Indo para /dashboard...");
      window.location.href = "https://painel.fun/dashboard";
      await new Promise((r) => setTimeout(r, 4000));
    }

    const botaoInterval = setInterval(() => {
      const botao = document.querySelector('a[href="/users"].bg-amber-500 span.truncate');
      if (botao && botao.textContent.includes("Teste rápido")) {
        clearInterval(botaoInterval);
        console.log("⚡ Botão 'Teste rápido' encontrado. Clicando...");
        botao.closest("a").click();
        aguardarPopup();
      }
    }, 1000);

    function aguardarPopup() {
      console.log("🕐 Aguardando pop-up...");
      const checkPopup = setInterval(() => {
        const popup = document.querySelector('section[data-open][aria-modal="true"]');
        if (popup) {
          clearInterval(checkPopup);
          const campo = popup.querySelector('input[name="username"]');
          if (campo) {
            campo.focus();
            campo.value = "Teste1";
            campo.dispatchEvent(new Event("input", { bubbles: true }));
            console.log("✍️ Campo 'Nome de usuário' preenchido com 'Teste1'.");
          }
        }
      }, 1000);
    }
  }
  executar();
}
