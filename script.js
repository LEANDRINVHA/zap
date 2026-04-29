class EuroDieselChat {
    constructor() {
        this.colaboradores = [
            { id: 1, nome: "Manoel", online: true },
            { id: 2, nome: "Eduardo", online: true },
            { id: 3, nome: "Vitor", online: false }
        ];
        this.adminKey = "EURO2026";
        this.renderizarLista();
    }

    // Como saber se está online? 
    // No código, verificamos a propriedade 'online' de cada objeto.
    renderizarLista() {
        const list = document.getElementById('contactList');
        list.innerHTML = '';
        this.colaboradores.forEach(colab => {
            const statusClass = colab.online ? 'status-indicator' : 'status-off';
            const item = document.createElement('div');
            item.className = 'contact-item';
            item.onclick = () => this.abrirChat(colab.id);
            item.innerHTML = `
                <div class="avatar-mini">${colab.nome[0]}</div>
                <div class="contact-info">
                    <h4>${colab.nome}</h4>
                    <small><span class="${statusClass}"></span> ${colab.online ? 'Disponível' : 'Ausente'}</small>
                </div>`;
            list.appendChild(item);
        });
    }

    // FUNÇÃO ESPECIAL: REMOVER CREDENCIAIS
    // Isso limpa o login e obriga a digitar a senha novamente
    removerCredenciais() {
        if(confirm("Leandro®, deseja remover suas credenciais de acesso deste dispositivo?")) {
            localStorage.removeItem('euro_diesel_session');
            window.location.reload(); // Reinicia o sistema
        }
    }
}

const ChatApp = new EuroDieselChat();

// No HTML, adicione este botão dentro do seu painel lateral ou header:
// <button onclick="ChatApp.removerCredenciais()" class="btn-danger-soft">REMOVER MEU ACESSO</button>
