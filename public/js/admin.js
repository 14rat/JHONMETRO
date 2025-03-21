const loginForm = document.getElementById('login-form');
const adminPanel = document.getElementById('admin-panel');
const uploadForm = document.getElementById('upload-form');

// Autenticação
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Depuração: Verifique as credenciais enviadas
    console.log('Credenciais enviadas:', username, password);

    // Envia as credenciais para o servidor
    fetch('/admin/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loginForm.style.display = 'none';
            adminPanel.style.display = 'block';
        } else {
            alert('Credenciais inválidas!');
        }
    })
    .catch(error => {
        console.error('Erro ao validar credenciais:', error);
        alert('Erro ao validar credenciais.');
    });
});

// Upload de imagem e emoção
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const image = document.getElementById('image').value;
    const emotion = document.getElementById('emotion').value;

    fetch('/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, caption: emotion })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Imagem e emoção adicionadas com sucesso!');
            uploadForm.reset();
        } else {
            alert('Erro ao adicionar imagem e emoção.');
        }
    });
});
to