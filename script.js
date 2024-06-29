document.addEventListener('DOMContentLoaded', () => {
    const cookieImg = document.getElementById('cookie-img');
    const fortuneDisplay = document.getElementById('fortune');
    const container = document.getElementById('container');
    let clickCount = 0;

    // Set random background color on load
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    document.documentElement.style.setProperty('--initial-bg-color', getRandomColor());
    container.style.backgroundColor = getRandomColor();

    // Load messages from JSON
    async function loadMessages() {
        try {
            const response = await fetch('messages.json');
            const data = await response.json();
            return data.messages;
        } catch (error) {
            console.error('Error loading messages:', error);
            return [];
        }
    }

    function getRandomMessage(messages) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    cookieImg.classList.add('shiny');

    cookieImg.addEventListener('click', async () => {
        clickCount += 1;

        if (clickCount === 1 || clickCount === 2) {
            cookieImg.classList.add('shake');
            setTimeout(() => {
                cookieImg.classList.remove('shake');
            }, 500);
        } else if (clickCount === 3) {
            const messages = await loadMessages();
            const randomMessage = getRandomMessage(messages);
            fortuneDisplay.textContent = randomMessage;
            container.classList.add('transition-background');
            cookieImg.classList.add('crazy-animation');

            setTimeout(() => {
                cookieImg.style.display = 'none';
                fortuneDisplay.classList.add('show');
            }, 1000);

            clickCount = 0;
        }
    });
});
