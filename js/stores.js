const API_URL = "https://localhost:8443/status?token=MUDE_ESSE_TOKEN";

// Converte MB para GB e formata
function formatGB(mb) {
    if (!mb || isNaN(mb)) return '-';
    return (mb / 1024).toFixed(1) + ' GB';
}

async function loadServerStatus() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        document.getElementById('worldSize').innerText = formatGB(data.world_size_mb);
        document.getElementById('totalPlayers').innerText = data.total_joins;
        document.getElementById('players').innerText = `${data.online_players}/${data.max_players}`;
        document.getElementById('server-status').innerHTML =
            `<span class="status-dot"></span> <span>Servidor Online</span>`;
    } catch (err) {
        console.error(err);
        document.getElementById('players').innerText = 'Erro';
        document.getElementById('server-status').innerHTML =
            `<span class="offline-dot"></span> <span>Servidor Offline</span>`;
        document.getElementById('worldSize').innerText = '-';
        document.getElementById('totalPlayers').innerText = '-';
    }
}

async function loadPlayers() {
    const list = document.querySelector('.players');
    list.innerHTML = '<li>Carregando...</li>';

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const players = data.players ?? [];
        document.getElementById('players').innerText = `${players.length}/${data.max_players}`;

        if (players.length === 0) {
            list.innerHTML = '<li>Nenhum jogador online</li>';
            return;
        }

        list.innerHTML = players.map(p => `
            <li style="display:flex;align-items:center;gap:8px;">
                <img src="https://mc-heads.net/avatar/${p.name}" width="24" height="24">
                <span>${p.name}</span>
            </li>
        `).join('');
    } catch (err) {
        console.error(err);
        list.innerHTML = '<li style="color:red;">Erro ao carregar jogadores</li>';
    }
}

// Carrega ao iniciar
loadServerStatus();
loadPlayers();

// Atualiza a cada 30 segundos
setInterval(() => {
    loadServerStatus();
    loadPlayers();
}, 30000);
