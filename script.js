document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

   // Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Get ID without '#'
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        }
        if (mobileMenu) {
            mobileMenu.classList.add('hidden'); // Close mobile menu on link click
        }
    });
});

   // Highlight Active Navigation Link Based on Scroll Position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + windowHeight;

    let currentSection = '';

    // Check if scrolled to or near the bottom of the page
    if (scrollPosition >= documentHeight - 50) { // Increased threshold for better detection
        currentSection = 'contact';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // Check if the section is in view
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
    }

    // Debugging: Log the current section to console
    console.log('Current Section:', currentSection);

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact Form Handling with Validation
   const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

if (contactForm && contactMessage) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission and redirection

        // Reset error messages
        nameError.classList.add('hidden');
        emailError.classList.add('hidden');
        messageError.classList.add('hidden');
        contactMessage.classList.add('hidden');

        // Validate form fields
        let hasError = false;
        if (!nameInput.value.trim()) {
            nameError.classList.remove('hidden');
            hasError = true;
        }
        if (!emailInput.value.trim()) {
            emailError.classList.remove('hidden');
            hasError = true;
        }
        if (!messageInput.value.trim()) {
            messageError.classList.remove('hidden');
            hasError = true;
        }

        if (hasError) return;

        // Get form data
        const formData = new FormData(contactForm);

        try {
            // Send the form data to Formspree using fetch
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success: Show success message, reset form, and stay on the same page
                contactMessage.classList.remove('text-red-400', 'hidden');
                contactMessage.classList.add('text-green-400');
                contactMessage.textContent = 'Message sent! I will get back to you soon.';
                contactForm.reset();
            } else {
                // Error: Show error message
                contactMessage.classList.remove('text-green-400', 'hidden');
                contactMessage.classList.add('text-red-400');
                contactMessage.textContent = 'Failed to send message. Please try again later.';
            }
        } catch (error) {
            // Network or other error: Show error message
            contactMessage.classList.remove('text-green-400', 'hidden');
            contactMessage.classList.add('text-red-400');
            contactMessage.textContent = 'An error occurred. Please try again later.';
        }
    });
}

    // Scroll to Top Button
    const scrollToTopButton = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.remove('hidden');
        } else {
            scrollToTopButton.classList.add('hidden');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

