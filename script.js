class EuroDieselChat {
    constructor() {
        this.colaboradores = [
            { id: 1, nome: "Manoel", online: true },
            { id: 2, nome: "Eduardo", online: true },
            { id: 3, nome: "Vitor", online: false }
        ];
        this.adminKey = "EURO2026";
        this.chatAtivoId = null;
        this.renderizarLista();
        this.verificarSessao();
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
                <div class="contact-info">
                    <h4>${colab.nome}</h4>
                    <small>${colab.online ? '<span class="status-dot pulse"></span> Online' : '<span class="status-dot off"></span> Ausente'}</small>
                </div>`;
            list.appendChild(item);
        });
    }

    abrirChat(id) {
        this.chatAtivoId = id;
        const colab = this.colaboradores.find(c => c.id === id);
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('mainChat').style.display = 'flex';
        document.getElementById('currentChatName').innerText = colab.nome;
        document.getElementById('currentChatStatus').innerHTML = colab.online ? 'Online agora' : 'Visto por último recentemente';
        this.renderizarLista();
    }

    removerCredenciais() {
        if (confirm("Leandro®, deseja encerrar sua sessão e remover suas credenciais deste navegador?")) {
            localStorage.removeItem('euro_session');
            window.location.reload();
        }
    }

    verificarSessao() {
        if (localStorage.getItem('euro_session')) {
            this.liberarLayout(localStorage.getItem('euro_session'));
        }
    }

    liberarLayout(nome) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appMain').style.display = 'flex';
        document.getElementById('meuNomeDisplay').innerText = nome.toUpperCase() + "®";
        if (nome.toLowerCase().includes('leandro')) {
            document.getElementById('adminPanel').style.display = 'block';
        }
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

    if (nome.toLowerCase() === 'leandro' && senha === ChatApp.adminKey) {
        localStorage.setItem('euro_session', nome);
        ChatApp.liberarLayout(nome);
    } else if (nome !== "" && codigo.toUpperCase().startsWith("EURO-")) {
        ChatApp.liberarLayout(nome);
    } else {
        alert("Acesso negado. Verifique os dados.");
    }
}

function gerarConviteWhatsApp() {
    const token = `EURO-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const texto = encodeURIComponent(`Olá! Leandro® convidou você para o sistema EURO DIESEL®.\nCódigo: ${token}\nAcesse: ${window.location.href}`);
    window.open(`https://wa.me/5569981128233?text=${texto}`);
    document.getElementById('inviteDisplay').innerText = "Convite: " + token;
}
