document.addEventListener('DOMContentLoaded', () => {
    const cookieImg = document.getElementById('cookie-img');
    const fortuneDisplay = document.getElementById('fortune');
    const container = document.getElementById('container');

    const setRandomBackgroundColor = () => {
        const randomColor = `#${Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('')}`;
        document.documentElement.style.setProperty('--initial-bg-color', randomColor);
        container.style.backgroundColor = randomColor;
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch('messages.json');
            const data = await response.json();
            return data.messages;
        } catch (error) {
            console.error('Error loading messages:', error);
            return [];
        }
    };

    const getRandomMessage = messages => messages[Math.floor(Math.random() * messages.length)];

    const handleClick = async () => {
        const messages = await fetchMessages();
        const randomMessage = getRandomMessage(messages);
        fortuneDisplay.textContent = randomMessage;
        container.classList.add('transition-background');
        cookieImg.classList.add('crazy-animation');

        setTimeout(() => {
            cookieImg.style.display = 'none';
            fortuneDisplay.classList.add('show');
        }, 1000);
    };

    setRandomBackgroundColor();
    cookieImg.classList.add('shiny');
    cookieImg.addEventListener('click', handleClick);
});
