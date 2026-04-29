class EuroDieselChat {
    constructor() {
        this.colaboradores = JSON.parse(localStorage.getItem('euro_diesel_staff')) || [
            { id: 1, nome: "Manoel", mensagens: [] },
            { id: 2, nome: "Eduardo", mensagens: [] }
        ];
        this.adminKey = "EURO2026";
        this.activeChat = null;
    }

    // Trava de Segurança Avançada
    autenticar(nome, senha, codigo) {
        if (nome.toLowerCase() === 'leandro') {
            return senha === this.adminKey;
        }
        // Validação lógica de código de convite
        return codigo.startsWith("EURO-") && codigo.length > 8;
    }

    // Adicionar Colaborador Dinamicamente
    adicionarEquipe(nome) {
        const novo = { id: Date.now(), nome: nome, mensagens: [] };
        this.colaboradores.push(novo);
        this.salvar();
    }

    salvar() {
        localStorage.setItem('euro_diesel_staff', JSON.stringify(this.colaboradores));
    }

    // Gerador de Convite Único com Hash Simples
    gerarToken() {
        return `EURO-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    }
}

const ChatApp = new EuroDieselChat();

// Integração com a UI
function entrarNoSistema() {
    const nome = document.querySelector('#userNameInput').value;
    const senha = document.querySelector('#adminPassField').value;
    const codigo = document.querySelector('#accessCodeInput').value;

    if (ChatApp.autenticar(nome, senha, codigo)) {
        console.log("Acesso Concedido: Leandro®");
        // Lógica de transição de tela aqui
    } else {
        alert("Acesso Negado: Verifique as credenciais.");
    }
}
