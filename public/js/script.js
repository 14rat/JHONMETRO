const indicator = document.getElementById('indicator');
const indicatorImg = document.getElementById('indicator-img');
const scale = document.querySelector('.scale');
const labelsContainer = document.getElementById('labels');
const emotionTitle = document.getElementById('emotion-title');

let isDragging = false;

// Mapeamento de emoções para posições no gradiente
const emotionPositions = {
    "😡 Furioso": 0,    // Vermelho (início do gradiente)
    "🤔 Precisamos conversar": 0.5, // Branco (meio do gradiente)
    "😊 Feliz": 1,      // Rosa (final do gradiente)
    "🥰 Apaixonado": 1  // Rosa (final do gradiente)
};

// Carregar dados do Jhonmetro
fetch('/api/jhonmetro')
    .then(response => response.json())
    .then(data => {
        if (data.success && data.data.length > 0) {
            // Atualiza a imagem do indicador
            indicatorImg.src = `images/${data.data[0].image}`;
            emotionTitle.textContent = data.data[0].caption; // Atualiza o título da emoção
            updateIndicatorPosition(data.data[0].caption); // Posiciona o indicador

            // Cria as legendas dinamicamente
            labelsContainer.innerHTML = data.data.map(item => `<span>${item.caption}</span>`).join('');
        }
    });

// Lógica de arrastar o indicador
indicator.addEventListener('mousedown', () => {
    isDragging = true;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const scaleRect = scale.getBoundingClientRect();
        let newPosition = e.clientX - scaleRect.left;
        newPosition = Math.max(0, Math.min(newPosition, scaleRect.width - indicator.offsetWidth)); // Limita o movimento
        indicator.style.left = `${newPosition}px`;

        updateIndicator(newPosition / scaleRect.width);
    }
});

function updateIndicator(position) {
    fetch('/api/jhonmetro')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length > 0) {
                const index = Math.floor(position * (data.data.length - 1));
                indicatorImg.src = `images/${data.data[index].image}`;
                emotionTitle.textContent = data.data[index].caption; // Atualiza o título da emoção
                indicator.setAttribute('data-emotion', data.data[index].caption);
                updateIndicatorPosition(data.data[index].caption); // Posiciona o indicador
            }
        });
}

function updateIndicatorPosition(emotion) {
    const position = emotionPositions[emotion] || 0; // Posição padrão (vermelho)
    const scaleRect = scale.getBoundingClientRect();
    const newPosition = position * (scaleRect.width - indicator.offsetWidth); // Ajuste para não sair da reta
    indicator.style.left = `${newPosition}px`;
}
