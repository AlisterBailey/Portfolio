document.addEventListener("DOMContentLoaded", () => {
    // load header content
    const headerContainer = document.getElementById("header");

    fetch("header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;

            // initialize hamburger menu and theme switch after the header is injected
            initializeHamburgerMenu();
            initializeThemeSwitch();
        })
        .catch(err => console.error("Failed to load header:", err));

    // initialize hamburger menu
    function initializeHamburgerMenu() {
        const hamMenu = document.querySelector('.ham-menu');
        const offScreenMenu = document.querySelector('.off-screen-menu');

        if (hamMenu && offScreenMenu) {
            hamMenu.addEventListener('click', () => {
                hamMenu.classList.toggle('active');
                offScreenMenu.classList.toggle('active');
            });
        } else {
            console.error("HamMenu or OffScreenMenu elements not found!");
        }
    }

    // initialize theme switch
    function initializeThemeSwitch() {
        const themeSwitch = document.getElementById('theme-switch');

        // get the lightmode value from localStorage
        let lightmode = localStorage.getItem('lightmode') || 'inactive';  // default to 'inactive' if not found

        const enableLightmode = () => {
            document.body.classList.add('lightmode');
            localStorage.setItem('lightmode', 'active');
        };

        const disableLightMode = () => {
            document.body.classList.remove('lightmode');
            localStorage.removeItem('lightmode');  // properly remove the item
        };

        // apply lightmode if stored value is active
        if (lightmode === "active") enableLightmode();

        if (themeSwitch) {
            themeSwitch.addEventListener("click", () => {
                lightmode = localStorage.getItem('lightmode');
                lightmode !== "active" ? enableLightmode() : disableLightMode();
            });
        } else {
            console.error("ThemeSwitch element not found!");
        }
    }
});