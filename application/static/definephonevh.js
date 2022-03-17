// 1.関数の定義
function setHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--phone-vh', `${vh}px`);
}

setHeight();
window.addEventListener('resize', setHeight);