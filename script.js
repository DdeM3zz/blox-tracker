// Конфигурация
const CONFIG = {
    updateInterval: 1500, // 1.5 секунды
    baseUserId: 6000000000, // Примерный текущий диапазон ID
    usernameVariants: ['Pro', 'Master', 'King', 'Queen', 'Player', 'Gamer', 'Roblox', 'Cool', 'Super']
};

// Глобальные переменные
let lastUserId = CONFIG.baseUserId;
let updateIntervalId = null;

// Улучшенная имитация API Roblox
async function mockRobloxApiRequest() {
    // Имитация сетевой задержки
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 400));
    
    // Генерация правдоподобных данных
    lastUserId += 1 + Math.floor(Math.random() * 3); // ID увеличиваются
    const username = generateUsername();
    const creationDate = new Date();
    
    // Иногда добавляем небольшую задержку к дате (1-60 минут)
    creationDate.setMinutes(creationDate.getMinutes() - Math.floor(Math.random() * 60));
    
    return {
        id: lastUserId,
        username: username,
        created: creationDate.toISOString(),
        profileUrl: `https://www.roblox.com/users/${lastUserId}/profile`,
        isVerified: Math.random() > 0.9 // 10% шанс
    };
}

// Генератор правдоподобных имён
function generateUsername() {
    const prefix = ['xX', 'The', ''][Math.floor(Math.random() * 3)];
    const suffix = ['_YT', '_TV', '123', '2023', ''][Math.floor(Math.random() * 5)];
    const main = CONFIG.usernameVariants[Math.floor(Math.random() * CONFIG.usernameVariants.length)];
    return `${prefix}${main}${suffix}`.replace(/\s+/g, '');
}

// Отображение пользователя с дополнительной информацией
function displayUser(user) {
    const userCard = document.getElementById('userCard');
    const verifiedBadge = user.isVerified ? '<span class="verified-badge">✓</span>' : '';
    
    userCard.innerHTML = `
        <div class="user-info">
            <h2>${user.username}${verifiedBadge}</h2>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Зарегистрирован:</strong> ${formatDate(user.created)}</p>
            <p><strong>Ссылка:</strong> <a href="${user.profileUrl}" target="_blank">Открыть профиль</a></p>
            <p class="user-meta">Примерное время регистрации: ${formatExactTime(user.created)}</p>
        </div>
    `;
}

// Форматирование даты
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU') + ' в ' + date.toLocaleTimeString('ru-RU');
}

// Точное время с секундами
function formatExactTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Остальной код (fetchLatestUser, startAutoUpdate, stopAutoUpdate) остаётся таким же,
// как в предыдущем примере, только использует новую mockRobloxApiRequest
