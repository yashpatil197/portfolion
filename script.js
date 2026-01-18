// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Animate On Scroll (AOS)
   /* Initialize Animate On Scroll */
AOS.init({
    // Global settings:
    disable: false, 
    startEvent: 'DOMContentLoaded', 
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate', 
    useClassNames: false, 
    disableMutationObserver: false, 
    debounceDelay: 50, 
    throttleDelay: 99, 
    
    // Settings that control the Fade In/Out behavior:
    
    offset: 120,    // Offset (in px) from the original trigger point
    delay: 0,       // Delay before animation starts
    duration: 800,  // Duration of the animation (how long the fade takes)
    easing: 'ease', // Easing function
    
    once: false,    // CRITICAL: Set to 'false' so it animates every time you scroll to it
    mirror: true,   // CRITICAL: Set to 'true' so elements animate OUT when scrolling past them
    
    anchorPlacement: 'top-bottom', // Defines which position of the element triggers the animation
});

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Position the dot directly at the cursor's location
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate the outline to follow the cursor
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Add cursor grow effect on hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, .project-card');
    
    hoverableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-grow');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-grow');
        });
    });

});

const text = "A passionate Web Developer & UI/UX Designer creating modern and interactive web experiences.";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.querySelector(".typing").textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 40);
    }
}

window.addEventListener("load", typeEffect);

// Hide loader after page loads
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("hidden");
    }
});
// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
/* ================= PROGRESS LOADER ================= */
let progress = 0;
const progressBar = document.getElementById("loader-progress");
const progressText = document.getElementById("loader-percent");
const loader = document.getElementById("loader");

const loadingInterval = setInterval(() => {
    if (progress < 90) {
        progress += Math.floor(Math.random() * 5) + 1;
        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";
    }
}, 200);

window.addEventListener("load", () => {
    clearInterval(loadingInterval);
    progress = 100;
    progressBar.style.width = "100%";
    progressText.textContent = "100%";

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 500);
});
/* ===== DARK / LIGHT MODE ===== */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙";
    }
});
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    // Show button if scrolled down more than 500px
    if (window.scrollY > 500) {
        scrollBtn.classList.add("active");
    } else {
        scrollBtn.classList.remove("active");
    }
});

// Smooth scroll to top when clicked
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// This script fetches your latest stats from GitHub automatically
    fetch('https://api.github.com/users/yashpatil197')
    .then(response => response.json())
    .then(data => {
        // Update the numbers in the HTML
        document.getElementById('gh-repos').innerText = data.public_repos;
        document.getElementById('gh-followers').innerText = data.followers;
        // Ensure avatar is always fresh
        document.getElementById('gh-avatar').src = data.avatar_url;
    })
    .catch(error => {
        console.error('Error fetching GitHub stats:', error);
        // Fallback if GitHub is down
        document.getElementById('gh-repos').innerText = "15+";
        document.getElementById('gh-followers').innerText = "Active";
    });
/* =========================================
   1. GITHUB STATS FETCHER
   ========================================= */
function fetchGitHubStats() {
    fetch('https://api.github.com/users/yashpatil197')
    .then(response => response.json())
    .then(data => {
        const repos = document.getElementById('gh-repos');
        const followers = document.getElementById('gh-followers');
        const avatar = document.getElementById('gh-avatar');

        if (repos) repos.innerText = data.public_repos;
        if (followers) followers.innerText = data.followers;
        if (avatar) avatar.src = data.avatar_url;
    })
    .catch(error => console.error('Error fetching GitHub stats:', error));
}

// Run immediately
fetchGitHubStats();

/* =========================================
   PERMANENT LIGHT MODE FIX (Polling Method)
   ========================================= */

// This function checks the background color every 500ms
setInterval(() => {
    // 1. Get the current background color
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    
    // 2. Check if it is a light color (White, Light Grey, etc.)
    if (bgColor === 'rgb(255, 255, 255)' || bgColor === '#ffffff' || bgColor === 'white' || bgColor.includes('255, 255, 255')) {
        // It is Light Mode -> ADD the fix class
        if (!document.body.classList.contains('force-light-mode')) {
            document.body.classList.add('force-light-mode');
            console.log("Light Mode Detected: Fix Applied");
        }
    } else {
        // It is Dark Mode -> REMOVE the fix class
        if (document.body.classList.contains('force-light-mode')) {
            document.body.classList.remove('force-light-mode');
        }
    }
}, 500); // Checks 2 times every second

/* Fetch GitHub Stats (Keep this) */
function fetchGitHubStats() {
    fetch('https://api.github.com/users/yashpatil197')
    .then(res => res.json())
    .then(data => {
        if(document.getElementById('gh-repos')) document.getElementById('gh-repos').innerText = data.public_repos;
        if(document.getElementById('gh-followers')) document.getElementById('gh-followers').innerText = data.followers;
        if(document.getElementById('gh-avatar')) document.getElementById('gh-avatar').src = data.avatar_url;
    })
    .catch(err => console.error(err));
}
fetchGitHubStats();

