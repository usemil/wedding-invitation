document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Populate Config Details ---
    const namesDisplay = document.getElementById("names-display");
    const dateDisplay = document.getElementById("date-display");
    const venueDisplay = document.getElementById("venue-display");

    namesDisplay.innerHTML = `${weddingConfig.brideName} <br>♡<br> ${weddingConfig.groomName}`;
    venueDisplay.textContent = weddingConfig.venue;

    // Format the date beautifully (e.g., "Saturday, August 8, 2026")
    const weddingDateObj = new Date(weddingConfig.weddingDate);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    dateDisplay.textContent = weddingDateObj.toLocaleDateString('en-US', dateOptions);

    // --- 2. Animations (Splash & Envelope) ---
    const splashScreen = document.getElementById("splash-screen");
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const openBtn = document.getElementById("open-btn");

    setTimeout(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
            splashScreen.classList.add("hidden");
            envelopeScreen.classList.remove("hidden");
        }, 800); 
    }, 2000); 

    openBtn.addEventListener("click", () => {
        envelopeScreen.classList.add("slide-up-away");
        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            setTimeout(() => {
                mainContent.classList.add("fade-in-content");
            }, 50);
        }, 1000); 
    });

    // --- 3. Live Countdown Timer ---
    function updateCountdown() {
        const now = new Date().getTime();
        const target = weddingDateObj.getTime();
        const difference = target - now;

        if (difference < 0) {
            document.getElementById("countdown").innerHTML = "<h3>It's Wedding Time! 🎉</h3>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Add leading zero if number is less than 10
        document.getElementById("days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately so there's no 1-second delay
    // --- 4. Scroll Reveal (Story Timeline) ---
    // This watches the screen and triggers animations when elements appear
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
            }
        });
    }, { threshold: 0.1 }); // Triggers when 10% of the element is visible

    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 5. Interactive Floating Hearts ---
    // Listens for clicks anywhere on the screen
    document.body.addEventListener('click', function(e) {
        // Don't spawn a heart if they click the "Tap to Open" button
        if(e.target.tagName === 'BUTTON') return;

        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️'; // Try changing this to 🌸 if you prefer!
        
        // Randomize the start position slightly left or right of the tap
        const randomX = (Math.random() - 0.5) * 40; 
        
        heart.style.left = `${e.clientX + randomX}px`;
        heart.style.top = `${e.clientY}px`;
        
        document.body.appendChild(heart);
        
        // Clean up: Remove the heart from the DOM after animation finishes
        setTimeout(() => {
            heart.remove();
        }, 1500);
    });
});