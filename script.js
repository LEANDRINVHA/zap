class EuroDieselChat {
    constructor() {
        this.colaboradores = JSON.parse(localStorage.getItem('euro_diesel_staff')) || [
            { id: 1, nome: "Manoel", mensagens: [] },
            { id: 2, nome: "Eduardo", mensagens: [] },
            { id: 3, nome: "Vitor", mensagens: [] }
        ];
        this.adminKey = "EURO2026";
        this.usuarioLogado = null;
        this.chatAtivoId = null;
        this.renderizarLista();
    }

    autenticar(nome, senha, codigo) {
        const n = nome.toLowerCase().trim();
        if (n === 'leandro') {
            return senha === this.adminKey;
        }
        return codigo.toUpperCase().startsWith("EURO-");
    }

    renderizarLista() {
        const list = document.getElementById('contactList');
        if (!list) return;
        list.innerHTML = '';
        this.colaboradores.forEach(colab => {
            const item = document.createElement('div');
            item.className = `contact-item ${this.chatAtivoId === colab.id ? 'active' : ''}`;
            item.onclick = () => this.abrirChat(colab.id);
            item.innerHTML = `
                <div class="avatar-mini">${colab.nome[0]}</div>
                <div class="contact-info"><h4>${colab.nome}</h4><p>Online</p></div>`;
            list.appendChild(item);
        });
    }

    abrirChat(id) {
        this.chatAtivoId = id;
        const colab = this.colaboradores.find(c => c.id === id);
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('mainChat').style.display = 'flex';
        document.getElementById('currentChatName').innerText = colab.nome;
        this.renderizarLista();
        this.renderizarMensagens();
    }

    renderizarMensagens() {
        const box = document.getElementById('msgBox');
        box.innerHTML = '';
        const colab = this.colaboradores.find(c => c.id === this.chatAtivoId);
        colab.mensagens.forEach(m => {
            const div = document.createElement('div');
            div.className = `message ${m.tipo}`;
            div.innerText = m.texto;
            box.appendChild(div);
        });
        box.scrollTop = box.scrollHeight;
    }
}

const ChatApp = new EuroDieselChat();

function toggleAdminFields(valor) {
    const adminArea = document.getElementById('adminArea');
    const colabArea = document.getElementById('colabArea');
    if (valor.toLowerCase().trim() === "leandro") {
        adminArea.style.display = "block";
        colabArea.style.display = "none";
    } else {
        adminArea.style.display = "none";
        colabArea.style.display = "block";
    }
}

function handleLogin() {
    const nome = document.getElementById('userNameInput').value.trim();
    const senha = document.getElementById('adminPassField').value;
    const codigo = document.getElementById('accessCodeInput').value.trim();

    if (ChatApp.autenticar(nome, senha, codigo)) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appMain').style.display = 'flex';
        document.getElementById('meuNomeDisplay').innerText = nome.toUpperCase() + "®";
        if (nome.toLowerCase() === 'leandro') document.getElementById('adminPanel').style.display = 'block';
    } else {
        alert("Acesso Negado! Verifique seus dados.");
    }
}

function enviarMensagem() {
    const input = document.getElementById('msgInput');
    if (!input.value || !ChatApp.chatAtivoId) return;
    const colab = ChatApp.colaboradores.find(c => c.id === ChatApp.chatAtivoId);
    colab.mensagens.push({ tipo: 'sent', texto: input.value });
    input.value = '';
    ChatApp.renderizarMensagens();
}

function gerarConviteWhatsApp() {
    const token = `EURO-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const texto = encodeURIComponent(`Olá! Leandro® convidou você para o chat EURO DIESEL®.\nCódigo: ${token}\nAcesse: ${window.location.href}`);
    window.open(`https://wa.me/5569981128233?text=${texto}`);
    document.getElementById('inviteDisplay').innerText = "Convite: " + token;
}
