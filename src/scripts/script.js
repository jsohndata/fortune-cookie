document.addEventListener('DOMContentLoaded', () => {
    const cookieImg = document.getElementById('cookie-img');
    const fortuneContainer = document.querySelector('.fortune');
    const fortuneMessage = document.querySelector('.fortune h2');
    const fortuneAuthor = document.querySelector('.fortune span');
    const fortuneImage = document.querySelector('.fortune img');
    const mainContainer = document.querySelector('main');

    const setRandomBackgroundColor = () => {
        const randomColor = `#${Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('')}`;
        document.documentElement.style.setProperty('--initial-bg-color', randomColor);
        mainContainer.style.backgroundColor = randomColor;
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
        fortuneMessage.textContent = randomMessage.message;
        fortuneAuthor.textContent = randomMessage.author;
        fortuneImage.src = "./src/images/"+randomMessage.image;

        mainContainer.classList.add('transition-background');
        cookieImg.classList.add('crazy-animation');

        setTimeout(() => {
            cookieImg.style.display = 'none';
            fortuneContainer.classList.add('show');
        }, 1000);
    };

    setRandomBackgroundColor();
    cookieImg.classList.add('shiny');
    cookieImg.addEventListener('click', handleClick);
});
