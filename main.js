document.addEventListener('DOMContentLoaded', () => {
    console.log("Main.js loaded successfully.");
    addDarkModeToggle();
});

function addDarkModeToggle() {
    const header = document.querySelector('nav');
    const btn = document.createElement('button');
    btn.textContent = "Dark Mode";
    btn.className = "button-nav";
    btn.style.cursor = "pointer";
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            btn.textContent = "Light Mode";
        } else {
            btn.textContent = "Dark Mode";
        }
    });
    header.appendChild(btn);
}