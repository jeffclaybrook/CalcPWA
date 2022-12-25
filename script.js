const themekey = 'themekey';

const toggleTheme = () => {
    theme.value = theme.value === 'light'
    ? 'dark'
    : 'light';
    setTheme()
}

const getTheme = () => {
    return localStorage.getItem(themekey)
    ? localStorage.getItem(themekey)
    : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const setTheme = () => {
    localStorage.setItem(themekey, theme.value);
    updateTheme()
}

const updateTheme = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value);
    document.querySelector('#theme-btn')?.setAttribute('aria-label', theme.value)
}

const theme = {
    value: getTheme()
}

window.onload = () => {
    updateTheme()
}

window.matchMedia('(preferes-color-scheme: dark)').addEventListener
('change', ({ matches: isDark }) => {
    theme.value = isDark
    ? 'dark'
    : 'light';
    setTheme()
})

const addRipple = (e) => {
    const el = e.currentTarget;
    const cir = document.createElement('span');
    const dia = Math.max(el.clientWidth, el.clientHeight);
    const rad = dia / 2;
    cir.style.width = cir.style.height = `${dia}px`;
    cir.style.left = `${e.clientX - el.offsetLeft - rad}px`;
    cir.style.top = `${e.clientY - el.offsetTop - rad}px`;
    cir.classList.add('ripple');
    const ripple = el.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();
    el.appendChild(cir)
}

const screen = document.getElementById('screen');
const symbolBtns = document.querySelectorAll('.symbol');
const numberBtns = document.querySelectorAll('.number');
const buttons = [...symbolBtns, ...numberBtns];

for (const button of buttons) {
    button.addEventListener('click', addRipple)
}

const wipe = () => screen.value = '';
const show = (n) => screen.value += n;
const calc = () => {
    const val = eval(screen.value);
    const num = parseFloat(val);
    const res = num.toFixed(8);
    screen.value = res;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('serviceWorker.js')
            .then(res => console.log('service worker registered'))
            .catch(err => console.log('service worker not registered', err));
    })
}