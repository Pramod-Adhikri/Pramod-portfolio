document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            if (mobileMenu) {
                mobileMenu.classList.add('hidden'); // Close mobile menu on link click
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm && contactMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

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
                    // Success: Show success message and reset form
                    contactMessage.classList.remove('text-red-600', 'hidden');
                    contactMessage.classList.add('text-green-600');
                    contactMessage.textContent = 'Message sent! I will get back to you soon.';
                    contactForm.reset();
                } else {
                    // Error: Show error message
                    contactMessage.classList.remove('text-green-600', 'hidden');
                    contactMessage.classList.add('text-red-600');
                    contactMessage.textContent = 'Failed to send message. Please try again later.';
                }
            } catch (error) {
                // Network or other error: Show error message
                contactMessage.classList.remove('text-green-600', 'hidden');
                contactMessage.classList.add('text-red-600');
                contactMessage.textContent = 'An error occurred. Please try again later.';
            }
        });
    }
});
// Highlight active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) { // Adjust for header height
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});