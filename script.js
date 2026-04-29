// ... (mantenha a classe EuroDieselChat anterior)

function handleLogin() {
    const nome = document.getElementById('userNameInput').value.trim();
    const senha = document.getElementById('adminPassField').value;
    const codigo = document.getElementById('accessCodeInput').value.trim();

    if ((nome.toLowerCase() === 'leandro' && senha === ChatApp.adminKey) || 
        (nome !== "" && codigo.toUpperCase().startsWith("EURO-"))) {
        
        localStorage.setItem('euro_session', nome);
        
        // Troca de tela com remoção total do elemento de login
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appMain').style.display = 'flex';
        
        // Ajusta o nome no display
        document.getElementById('meuNomeDisplay').innerText = nome.toUpperCase() + "®";
        
        if (nome.toLowerCase() === 'leandro') {
            document.getElementById('adminPanel').style.display = 'block';
        }
        
        // Força o redimensionamento para garantir o alinhamento
        window.dispatchEvent(new Event('resize'));
    } else {
        alert("Credenciais Inválidas.");
    }
}
