document.addEventListener("DOMContentLoaded", () => {
    // Inject names from config
    const namesDisplay = document.getElementById("names-display");
    namesDisplay.innerHTML = `${weddingConfig.brideName} <br>♡<br> ${weddingConfig.groomName}`;

    // Get elements
    const splashScreen = document.getElementById("splash-screen");
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const openBtn = document.getElementById("open-btn");

    // 1. Splash Screen Logic (Hide after 2 seconds)
    setTimeout(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
            splashScreen.classList.add("hidden");
            envelopeScreen.classList.remove("hidden");
        }, 800); // Wait for CSS fade out
    }, 2000); // 2 second loading time

    // 2. Envelope Open Logic
    openBtn.addEventListener("click", () => {
        // Slide envelope up
        envelopeScreen.classList.add("slide-up-away");
        
        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            
            // Trigger fade in for main content
            setTimeout(() => {
                mainContent.classList.add("fade-in-content");
            }, 50);

        }, 1000); // Wait for slide up animation to finish
    });
});