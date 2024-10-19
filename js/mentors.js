import mentorProfiles from './mentorProfiles.js';

document.addEventListener('DOMContentLoaded', function() {
    const mentorList = document.getElementById('mentorList');
    const mentorSearch = document.getElementById('mentorSearch');
    const searchButton = document.getElementById('searchButton');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImage = document.querySelector('.logo-image');

    let allMentors = [];

    // Fetch mentors from local storage
    function getMentorsFromLocalStorage() {
        const mentors = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));
            if (value && value.userType === 'mentor') {
                mentors.push(value);
            }
        }
        return mentors;
    }

    // Combine mentors from local storage and mentorProfiles
    allMentors = [...getMentorsFromLocalStorage(), ...mentorProfiles];

    // Remove duplicates based on id
    allMentors = allMentors.filter((mentor, index, self) =>
        index === self.findIndex((t) => t.id === mentor.id)
    );

    function displayMentors(mentors) {
        mentorList.innerHTML = '';
        mentors.forEach(mentor => {
            const mentorCard = document.createElement('div');
            mentorCard.className = 'mentor-card';
            mentorCard.innerHTML = `
                <img src="${mentor.profileImage || mentor.image || '../images/default-profile.png'}" alt="${mentor.fullName || mentor.name}">
                <h2>${mentor.fullName || mentor.name}</h2>
                <p><strong>Department:</strong> ${mentor.department}</p>
                <p><strong>Expertise:</strong> ${mentor.expertise ? mentor.expertise.join(', ') : 'Not specified'}</p>
                <button class="book-session" data-mentor-id="${mentor.id}">Book Session</button>
            `;
            mentorList.appendChild(mentorCard);
        });
    }

    function searchMentors() {
        const searchTerm = mentorSearch.value.toLowerCase();
        const filteredMentors = allMentors.filter(mentor => 
            (mentor.fullName || mentor.name).toLowerCase().includes(searchTerm) ||
            mentor.department.toLowerCase().includes(searchTerm) ||
            (mentor.expertise && mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm)))
        );
        displayMentors(filteredMentors);
    }

    searchButton.addEventListener('click', searchMentors);
    mentorSearch.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchMentors();
        }
    });

    // Book session functionality
    mentorList.addEventListener('click', function(e) {
        if (e.target.classList.contains('book-session')) {
            const mentorId = e.target.getAttribute('data-mentor-id');
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            if (loggedInUser) {
                window.location.href = `auth/dashboard/bookSession.html?mentorId=${mentorId}`;
            } else {
                window.location.href = 'auth/login.html';
            }
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
            logoImage.src = '../images/logoSlietWhite.png';
        } else {
            logoImage.src = '../images/logoSliet.png';
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

    // Initial display of all mentors
    displayMentors(allMentors);
});
