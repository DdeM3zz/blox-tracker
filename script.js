// Функция для получения последнего пользователя
async function fetchLatestUser() {
    const userCard = document.getElementById('userCard');
    const loader = userCard.querySelector('.loader');
    const lastUpdate = document.getElementById('lastUpdate');
    
    // Показываем загрузку
    loader.style.display = 'block';
    userCard.innerHTML = '';
    userCard.appendChild(loader);
    userCard.appendChild(document.createTextNode('Загрузка данных...'));
    
    try {
        // Эмуляция API (в реальности нужно использовать Roblox API или веб-скрейпинг)
        // Здесь просто генерация случайного пользователя для демонстрации
        await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация задержки сети
        
        const randomId = Math.floor(Math.random() * 10000000) + 1;
        const randomUsername = `User${Math.floor(Math.random() * 10000)}`;
        const randomDate = new Date().toISOString();
        
        // В реальном проекте здесь будет запрос к Roblox API:
        // const response = await fetch('https://api.roblox.com/...');
        // const data = await response.json();
        
        const userData = {
            id: randomId,
            username: randomUsername,
            created: randomDate,
            profileUrl: `https://www.roblox.com/users/${randomId}/profile`
        };
        
        // Обновляем UI
        displayUser(userData);
        lastUpdate.textContent = new Date().toLocaleString();
    } catch (error) {
        userCard.innerHTML = `<p style="color: red;">Ошибка при загрузке данных: ${error.message}</p>`;
    }
}

// Функция для отображения пользователя
function displayUser(user) {
    const userCard = document.getElementById('userCard');
    userCard.innerHTML = `
        <div class="user-info">
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Имя пользователя:</strong> ${user.username}</p>
            <p><strong>Дата регистрации:</strong> ${new Date(user.created).toLocaleString()}</p>
            <p><strong>Профиль:</strong> <a href="${user.profileUrl}" target="_blank">${user.profileUrl}</a></p>
        </div>
    `;
}

// Загружаем данные при старте
document.addEventListener('DOMContentLoaded', fetchLatestUser);

// Обновляем каждые 5 минут
setInterval(fetchLatestUser, 5 * 60 * 1000);
