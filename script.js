// Основной скрипт
let highestFoundId = 6000000000; // Примерное начальное значение
let isSearching = false;
let updateInterval = 1500;

async function findMaxUserId() {
    if (isSearching) return;
    isSearching = true;
    
    try {
        // Имитация бинарного поиска максимального ID
        let currentId = highestFoundId;
        let foundValid = true;
        
        while (foundValid) {
            currentId += 1000; // Шаг поиска
            foundValid = await checkUserExists(currentId);
            
            if (foundValid) {
                highestFoundId = currentId;
                const userData = await getUserData(currentId);
                displayUser(userData);
                updateLastUpdateTime();
            }
        }
    } catch (error) {
        console.error('Search error:', error);
    } finally {
        isSearching = false;
    }
}

// Имитация проверки существования пользователя
async function checkUserExists(userId) {
    // В реальности: запрос к API Roblox
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // 90% шанс что пользователь существует (для демо)
    // В реальности нужно проверять через API
    return Math.random() > 0.1;
}

// Получение данных пользователя (улучшенная версия)
async function getUserData(userId) {
    const now = new Date();
    const createdDate = new Date(now);
    
    // Чем больше ID, тем более свежая дата (но с вариациями)
    const daysOffset = Math.floor(userId / 5000000);
    createdDate.setDate(now.getDate() - daysOffset - Math.random() * 3);
    
    return {
        id: userId,
        username: `User${userId.toString().slice(0, 5)}_${Math.floor(Math.random() * 1000)}`,
        created: createdDate.toISOString(),
        profileUrl: `https://www.roblox.com/users/${userId}/profile`,
        isVerified: userId % 20 === 0 // Каждый 20-й "верифицирован"
    };
}

// Автоматический поиск
function startAutoSearch() {
    setInterval(findMaxUserId, updateInterval);
    findMaxUserId(); // Немедленный запуск
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    startAutoSearch();
    
    // Добавляем информацию о поиске
    const updateInfo = document.querySelector('.update-info');
    updateInfo.innerHTML += `
        <div class="search-info">
            <p>Текущий максимальный ID: <span id="currentMaxId">${highestFoundId}</span></p>
            <p>Статус: <span id="searchStatus">Поиск активен</span></p>
        </div>
    `;
});
