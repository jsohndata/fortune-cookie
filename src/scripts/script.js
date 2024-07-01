document.addEventListener('DOMContentLoaded', () => {
    const cookieImg = document.querySelector('.cookie img');
    const fortuneContainer = document.querySelector('.message');
    const fortuneMessage = document.querySelector('.message h1');
    const fortuneAuthor = document.querySelector('.message span');
    const fortuneImage = document.querySelector('.message img');
    const mainContainer = document.querySelector('main');

    // Ensure .message is hidden initially
    fortuneContainer.style.display = 'none';

    // const setRandomBackgroundColor = () => {
    //     const randomColor = `#${Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('')}`;
    //     document.documentElement.style.setProperty('--initial-bg-color', randomColor);
    //     mainContainer.style.backgroundColor = randomColor;
    // };

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

        mainContainer.classList.add('transition-background');
        cookieImg.classList.add('disappear-animation');

        setTimeout(() => {
            cookieImg.style.display = 'none';
            fortuneContainer.style.display = 'block';
            fortuneContainer.classList.add('show');
        }, 1000);
    };

    // setRandomBackgroundColor();
    cookieImg.classList.add('pulse-animation');
    cookieImg.addEventListener('click', handleClick);
});
