class EuroDieselChat {
    constructor() {
        this.colaboradores = JSON.parse(localStorage.getItem('euro_diesel_staff')) || [
            { id: 1, nome: "Manoel", mensagens: [] },
            { id: 2, nome: "Eduardo", mensagens: [] }
        ];
        this.adminKey = "EURO2026"; // Sua senha Master
        this.usuarioLogado = null;
        this.chatAtivoId = null;
        this.renderizarLista();
    }

    // Trava de Segurança
    autenticar(nome, senha, codigo) {
        if (nome.toLowerCase() === 'leandro') {
            return senha === this.adminKey;
        }
        // Colaboradores precisam de um código com 8+ caracteres começando com EURO-
        return codigo.startsWith("EURO-") && codigo.length >= 10;
    }

    renderizarLista() {
        const list = document.getElementById('contactList');
        if(!list) return;
        list.innerHTML = '';
        
        this.colaboradores.forEach(colab => {
            const item = document.createElement('div');
            item.className = `contact-item ${this.chatAtivoId === colab.id ? 'active' : ''}`;
            item.onclick = () => this.abrirChat(colab.id);
            item.innerHTML = `
                <div class="avatar-mini">${colab.nome[0]}</div>
                <div class="contact-info">
                    <h4>${colab.nome}</h4>
                    <p>Clique para conversar</p>
                </div>
            `;
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

// Funções de Interface (UI)
function toggleAdminFields(valor) {
    const adminArea = document.getElementById('adminArea');
    const colabArea = document.getElementById('colabArea');
    if (valor.toLowerCase() === "leandro") {
        adminArea.style.display = "block";
        colabArea.style.display = "none";
    } else {
        adminArea.style.display = "none";
        colabArea.style.display = "block";
    }
}

function handleLogin() {
    const nome = document.getElementById('userNameInput').value;
    const senha = document.getElementById('adminPassField').value;
    const codigo = document.getElementById('accessCodeInput').value;

    if (ChatApp.autenticar(nome, senha, codigo)) {
        ChatApp.usuarioLogado = nome;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appMain').style.display = 'flex';
        document.getElementById('meuNomeDisplay').innerText = nome + "®";
        
        if(nome.toLowerCase() === 'leandro') {
            document.getElementById('adminPanel').style.display = 'block';
        }
    } else {
        alert("Acesso Negado! Verifique seus dados.");
    }
}

function enviarMensagem() {
    const input = document.getElementById('msgInput');
    if(!input.value || !ChatApp.chatAtivoId) return;

    const colab = ChatApp.colaboradores.find(c => c.id === ChatApp.chatAtivoId);
    colab.mensagens.push({ tipo: 'sent', texto: input.value });
    input.value = '';
    ChatApp.renderizarMensagens();
}

function gerarConviteWhatsApp() {
    const token = `EURO-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const msg = encodeURIComponent(`Olá! Leandro® convidou você para o sistema EURO DIESEL®.\nSeu código de acesso: ${token}`);
    window.open(`https://wa.me/5569981128233?text=${msg}`);
    document.getElementById('inviteDisplay').innerText = "Convite gerado: " + token;
}
