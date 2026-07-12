document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Config Details
    const namesDisplay = document.getElementById("names-display");
    const dateDisplay = document.getElementById("date-display");
    const venueDisplay = document.getElementById("venue-display");

    namesDisplay.innerHTML = `${weddingConfig.brideName} <br>♡<br> ${weddingConfig.groomName}`;
    venueDisplay.textContent = weddingConfig.venue;

    const weddingDateObj = new Date(weddingConfig.weddingDate);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    dateDisplay.textContent = weddingDateObj.toLocaleDateString('en-US', dateOptions);

    // 2. Flow Transitions & Music
    const appContainer = document.getElementById("app-container");
    const splashScreen = document.getElementById("splash-screen");
    const envelopeScreen = document.getElementById("envelope-screen");
    const preludeScreen = document.getElementById("prelude-screen");
    const mainContent = document.getElementById("main-content");
    const openBtn = document.getElementById("open-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    bgMusic.src = weddingConfig.musicSrc;

    // Splash Screen fade out
    setTimeout(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
            splashScreen.classList.add("hidden");
            envelopeScreen.classList.remove("hidden");
        }, 800); 
    }, 2000); 

    // Open Envelope
    openBtn.addEventListener("click", () => {
        // Start Music
        bgMusic.play().catch(e => console.log("Audio play prevented:", e));
        musicBtn.classList.remove("hidden");

        envelopeScreen.classList.add("slide-up-away");
        
        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            preludeScreen.classList.remove("hidden");
            
            setTimeout(() => {
                preludeScreen.style.opacity = "1";
                
                // Keep quote on screen for exactly 3 seconds
                setTimeout(() => {
                    preludeScreen.style.opacity = "0";
                    
                    setTimeout(() => {
                        preludeScreen.classList.add("hidden");
                        mainContent.classList.remove("hidden");
                        appContainer.style.overflow = "auto";
                        
                        setTimeout(() => {
                            mainContent.classList.add("fade-in-content");
                        }, 50);

                    }, 1500); 
                }, 3000); // Changed to 3000ms (3 seconds)
                
            }, 50);
        }, 1000); 
    });

    // 3. Music Pause/Play Toggle
    let isPlaying = true;
    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = "🔇";
        } else {
            bgMusic.play();
            musicBtn.innerHTML = "🎵";
        }
        isPlaying = !isPlaying;
    });

    // 4. Live Countdown Timer
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDateObj.getTime() - now;

        if (difference < 0) {
            document.getElementById("countdown").innerHTML = "<h3>It's Wedding Time! 🎉</h3>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown(); 

    // 5. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden-scroll').forEach((el) => observer.observe(el));

    // 6. Particle System (Click)
    const symbols = ['❤️', '🌸', '✨', '💖'];

    function spawnParticles(x, y, amount) {
        for (let i = 0; i < amount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('floating-particle');
            particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            
            const randomX = (Math.random() - 0.5) * 80; 
            const randomY = (Math.random() - 0.5) * 40;
            
            particle.style.left = `${x + randomX}px`;
            particle.style.top = `${y + randomY}px`;
            
            particle.style.fontSize = `${Math.random() * 1 + 1}rem`;
            particle.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2500);
        }
    }

    document.body.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
        spawnParticles(e.clientX, e.clientY, Math.floor(Math.random() * 3) + 2);
    });

    // 7. Dense Sakura Spawning (FIXED FOR MOBILE VIEW)
    function createSakura() {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        petal.innerHTML = '🌸';
        
        // Fix: Calculate the actual width and height of the phone container
        const containerWidth = appContainer.clientWidth;
        
        // Spawn randomly within the exact pixel width of the app container
        petal.style.left = (Math.random() * containerWidth) + 'px';
        
        // Spawn randomly within the height of the entire scrolling document
        const containerHeight = Math.max(appContainer.scrollHeight, window.innerHeight);
        petal.style.top = (Math.random() * containerHeight) + 'px';
        
        petal.style.fontSize = Math.random() * 0.8 + 1 + 'rem';
        
        const duration = Math.random() * 2 + 3;
        petal.style.animationDuration = duration + 's'; 
        
        appContainer.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }
    
    // Spawn petals frequently
    setInterval(() => {
        createSakura();
        createSakura(); // Two at a time for higher density
    }, 300);

    // 8. Venue & Fake RSVP Logic
    const mapBtn = document.getElementById("map-btn");
    mapBtn.href = weddingConfig.mapLink;
    document.getElementById("venue-text-large").textContent = weddingConfig.venue;

    const sendWishBtn = document.getElementById("send-wish-btn");
    const wishesCard = document.getElementById("wishes-card");
    const thankYouMsg = document.getElementById("thank-you-msg");
    const guestNameInput = document.getElementById("guest-name");

    sendWishBtn.addEventListener("click", () => {
        if (guestNameInput.value.trim() === "") {
            guestNameInput.style.borderColor = "red";
            setTimeout(() => guestNameInput.style.borderColor = "rgba(181, 75, 110, 0.4)", 2000);
            return;
        }

        sendWishBtn.innerHTML = "Sending...";
        
        setTimeout(() => {
            wishesCard.classList.add("hidden");
            thankYouMsg.classList.remove("hidden");
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            let count = 0;
            const burst = setInterval(() => {
                spawnParticles(centerX, centerY, 6);
                count++;
                if(count > 12) clearInterval(burst); 
            }, 100);

        }, 800);
    });
});