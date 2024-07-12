document.addEventListener('DOMContentLoaded', () => {
    const cookieImg = document.querySelector('.cookie img');
    const container = document.querySelector('.container');
    const message = document.querySelector('.message');
    const fortuneMessage = document.querySelector('.message h1');
    const fortuneAuthor = document.querySelector('.message span');
    const fortuneImage = document.querySelector('.message img');
    const cookie = document.querySelector('.cookie');

    // Ensure .message is hidden initially
    message.style.display = 'none';

    const fetchMessages = async () => {
        try {
            const response = await fetch('./src/data/messages.json');
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
        fortuneMessage.textContent = `‟${randomMessage.message}ˮ`;
        fortuneAuthor.textContent = randomMessage.author;
        fortuneImage.src = "./src/images/" + randomMessage.image;        
        cookie.classList.add('transition-background');
        cookieImg.classList.add('disappear-animation');

        setTimeout(() => {
            cookieImg.style.display = 'none';
            message.style.display = 'block';
            message.classList.add('show');
        }, 1000);
    };

    cookieImg.classList.add('pulse-animation');
    cookieImg.addEventListener('click', handleClick);
});
