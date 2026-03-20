// ============================================================
// University of Zimbabwe - Faculty of Medicine & Health Sciences
// JavaScript Interactivity Assignment
// ============================================================

console.log("UZ FMHS website loaded successfully.");

// ============================================================
// LEVEL 1 - REQUIREMENT 2: Dynamic Text Update on Page Load
// Updates the welcome heading with a personalised greeting
// ============================================================

const welcomeMessage = document.querySelector('#welcomeMessage');

if (welcomeMessage) {
    const hours = new Date().getHours();
    let greeting = "Good day";

    if (hours < 12) {
        greeting = "Good morning";
    } else if (hours < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    welcomeMessage.textContent = `${greeting} — Welcome to the Faculty of Medicine and Health Sciences`;
    console.log("Welcome message updated based on time of day:", greeting);
}

// ============================================================
// LEVEL 1 - REQUIREMENT 1: Button Interaction
// Reveal extra info when "Learn More" button is clicked
// ============================================================

const revealBtn = document.querySelector('#revealBtn');
const extraInfo = document.querySelector('#extraInfo');

if (revealBtn && extraInfo) {
    revealBtn.addEventListener('click', () => {
        const isHidden = extraInfo.classList.contains('hidden-info');

        if (isHidden) {
            extraInfo.classList.remove('hidden-info');
            revealBtn.querySelector('span').textContent = 'Show Less';
            console.log("Extra info section revealed.");
        } else {
            extraInfo.classList.add('hidden-info');
            revealBtn.querySelector('span').textContent = 'Learn More About Us';
            console.log("Extra info section hidden.");
        }
    });
}

// ============================================================
// LEVEL 2 - REQUIREMENT 4: Dark / Light Mode Toggle
// Bonus: Saves preference using localStorage
// ============================================================

const themeToggle = document.querySelector('#themeToggle');
const themeLabel = document.querySelector('#themeLabel');

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeLabel) themeLabel.textContent = '☀️ Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        if (themeLabel) themeLabel.textContent = '🌙 Dark Mode';
    }
};

// Load saved theme preference on page load
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);
console.log("Theme loaded from localStorage:", savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        console.log("Theme toggled to:", newTheme);
    });
}

// ============================================================
// LEVEL 2 - REQUIREMENT 5: Hamburger Navigation Menu
// Opens and closes on mobile screen sizes
// ============================================================

const hamburgerBtn = document.querySelector('#hamburgerBtn');
const navLinks = document.querySelector('#navLinks');

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('nav-open');

        if (isOpen) {
            navLinks.classList.remove('nav-open');
            hamburgerBtn.classList.remove('active');
            console.log("Navigation menu closed.");
        } else {
            navLinks.classList.add('nav-open');
            hamburgerBtn.classList.add('active');
            console.log("Navigation menu opened.");
        }
    });

    // Close menu if user clicks a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            hamburgerBtn.classList.remove('active');
        });
    });
}

// ============================================================
// LEVEL 2 - REQUIREMENT 6: Contact Form Handling
// Validates inputs and prevents empty submissions
// ============================================================

const submitBtn = document.querySelector('#submitBtn');
const formMessage = document.querySelector('#formMessage');

const showFormMessage = (text, isError) => {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = isError ? 'form-message error' : 'form-message success';
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 4000);
};

if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Contact form submission attempted.");

        const nameInput = document.querySelector('#nameInput');
        const emailInput = document.querySelector('#emailInput');
        const messageInput = document.querySelector('#messageInput');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Input validation
        if (!name) {
            showFormMessage("Please enter your full name.", true);
            console.log("Form error: name field is empty.");
            return;
        }

        if (!email || !email.includes('@')) {
            showFormMessage("Please enter a valid email address.", true);
            console.log("Form error: invalid email address.");
            return;
        }

        if (!message) {
            showFormMessage("Please write a message before submitting.", true);
            console.log("Form error: message field is empty.");
            return;
        }

        // Success — clear form
        showFormMessage(`Thank you, ${name}! Your message has been received. We will be in touch shortly.`, false);
        console.log("Form submitted successfully by:", name);

        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (messageInput) messageInput.value = '';
    });
}

console.log("All JavaScript event listeners initialised.");
