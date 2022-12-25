const themekey = 'themekey';

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setTheme();
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
    updateTheme();
}

const updateTheme = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value);
    document.getElementById('theme-btn')?.setAttribute('aria-label', theme.value);
}

const theme = { value: getTheme() }

window.onload = () => updateTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setTheme();
})

const addRipple = (e) => {
    const element = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${dia}px`;
    circle.style.left = `${e.clientX - element.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - element.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();
    element.appendChild(circle);
}

const screen = document.getElementById('screen');
const symbols = document.querySelectorAll('.symbol');
const numbers = document.querySelectorAll('.number');
const buttons = [...symbols, ...numbers];
for (const button of buttons) {
    button.addEventListener('click', addRipple);
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
        .regist('serviceWorker.js')
        .then(res => console.log('Service worker registered', res))
        .catch(err => console.log('Service worker not registered', err))
    })
}