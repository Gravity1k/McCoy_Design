function scrollToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);
    if (!targetSection) return; // Check if target section exists
    const yOffset = -80; // Adjust this value to fine-tune the scrolling position
    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.navbar_menu');
    const mobileToggle = document.querySelector('#mobile-menu');

    mobileMenu.classList.toggle('active');
    mobileToggle.classList.toggle('is-active');
}

document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.querySelector('#mobile-menu');
    mobileToggle.addEventListener('click', function () {
        toggleMobileMenu();
    });

    const navbarLinks = document.querySelectorAll('.navbar_links');
    navbarLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const sectionId = this.getAttribute('href'); // Get the href attribute

            if (sectionId.startsWith('index.html')) {
                event.preventDefault(); // Prevent default anchor behavior
                const fragment = sectionId.substring(sectionId.indexOf('#'));

                if (window.location.pathname.endsWith('index.html')) {
                    // Already on index.html, just scroll to the section
                    scrollToSection(fragment);
                } else {
                    // Not on index.html, navigate to index.html with fragment
                    window.location.href = sectionId;
                }
            } else {
                event.preventDefault(); // Prevent default anchor behavior
                scrollToSection(sectionId);
            }

            // Close the mobile menu after clicking on a link if the menu is active
            if (document.querySelector('.navbar_menu.active')) {
                toggleMobileMenu();
            }
        });
    });
});