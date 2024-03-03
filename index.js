const game = () => {
    const button = document.querySelector('#start');
    const body = document.querySelector('#game');
    const bodyRect = body.getBoundingClientRect();
    const inputTime = document.querySelector('#game-time');
    const elementTime = document.querySelector('#time');

    const headerStart = document.querySelector('#time-header');
    const headerResult = document.querySelector('#result-header');
    const result = document.querySelector('#result');
    let score = 0;
    const colors = [];
    generateColors();
    button.addEventListener('click', startGame);
    body.addEventListener('click', handleBox);

    function startGame() {
        hide(button);
        body.classList.add('_started');

        show(headerStart);
        hide(headerResult);
        elementTime.textContent = inputTime.value;
        inputTime.classList.add('_disabled');
        score = 0;
        const interval = setInterval(() => {
            let time = parseFloat(elementTime.textContent);
            if (time <= 0) {
                clearInterval(interval);
                endGame();
            } else {
                elementTime.textContent = (time - 0.1).toFixed(1);
            }
        }, 100)

        renderBox();
    }

    function endGame() {
        clearBody();
        show(button);
        body.classList.remove('_started');

        hide(headerStart);
        show(headerResult);
        inputTime.classList.remove('_disabled');
        result.textContent = score;
    }

    function renderBox() {
        const options = {
            size: getRandomValue(40, 150),
            color: colors[getRandomValue(0, colors.length)],
            top() {
                return getRandomValue(0, bodyRect.height - this.size);
            },
            left() {
                return getRandomValue(0, bodyRect.width - this.size);
            },
        }
        const box = `
            <div data-box style="height:${options.size}px; width:${options.size}px; background-color:${options.color}; top:${options.top()}px; left:${options.left()}px;"></div>
        `;

        clearBody();
        body.insertAdjacentHTML('beforeend', box);
    }

    function handleBox(e) {
        const target = e.target;
        const box = target.closest('[data-box]');
        if (box) {
            score++;
            renderBox();
        }
    }

    function clearBody() {
        body.innerHTML = '';
    }

    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function show(el) {
        el.classList.remove('hide');
    }

    function hide(el) {
        el.classList.add('hide');
    }

    inputTime.addEventListener('input', function () {
        if (headerStart.classList.contains('hide')) {
            show(headerStart);
            hide(headerResult);
        }
        if (this.value == '') this.value = 1;
        elementTime.textContent = parseFloat(this.value).toFixed(1);
    })


    function generateColors() {
        let color;
        while (colors.length < 100) {
            do {
                color = Math.floor((Math.random() * 1000000) + 1);
            } while (colors.indexOf(color) >= 0);
            colors.push("#" + ("000000" + color.toString(16)).slice(-6));
        }
    }
};

game();