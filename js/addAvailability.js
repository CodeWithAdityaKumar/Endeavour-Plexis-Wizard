import { addAvailability, removeAvailability } from './mentorActions.js';

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        showUnauthorizedMessage();
        return;
    }

    const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
    if (userData.userType !== 'mentor') {
        showUnauthorizedMessage();
        return;
    }

    // Show mentor-only content
    document.getElementById('mentorOnlyContent').style.display = 'block';

    const availabilityForm = document.getElementById('availabilityForm');
    const availabilityList = document.getElementById('availabilityList');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImage = document.querySelector('.logo-image');

    function displayAvailability() {
        const availabilities = userData.availableSlots || [];
        const listContainer = document.createElement('div');
        availabilities.forEach((slot, index) => {
            const slotElement = document.createElement('div');
            slotElement.className = 'availability-slot';
            slotElement.innerHTML = `
                <span>${slot.day}: ${slot.startTime} - ${slot.endTime}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            listContainer.appendChild(slotElement);
        });
        availabilityList.innerHTML = '<h2>Your Availability</h2>';
        availabilityList.appendChild(listContainer);
    }

    availabilityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const day = document.getElementById('day').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        
        if (!userData.availableSlots) {
            userData.availableSlots = [];
        }
        
        userData.availableSlots.push({ day, startTime, endTime, status: 'available' });
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
        
        displayAvailability();
        availabilityForm.reset();
    });

    availabilityList.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.getAttribute('data-index');
            userData.availableSlots.splice(index, 1);
            localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
            displayAvailability();
        }
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        updateThemeIcon();
        updateLogo();
    });

    function updateThemeIcon() {
        if (document.body.classList.contains('dark')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    function updateLogo() {
        if (document.body.classList.contains('dark')) {
            logoImage.src = '../../../images/logoSlietWhite.png';
        } else {
            logoImage.src = '../../../images/logoSliet.png';
        }
    }

    // Check for user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        updateThemeIcon();
        updateLogo();
    } else {
        updateLogo();
    }

    // Hamburger menu functionality
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('nav') && !event.target.closest('.nav-links')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Prevent closing when clicking inside the menu
    navLinks.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Initial display of availability
    displayAvailability();

    function showUnauthorizedMessage() {
        document.getElementById('unauthorizedMessage').style.display = 'block';
    }
});
