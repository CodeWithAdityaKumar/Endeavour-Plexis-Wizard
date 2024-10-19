import mentorProfiles from './mentorProfiles.js';

document.addEventListener('DOMContentLoaded', function() {
    const mentorProfile = document.getElementById('mentorProfile');
    const availableSlots = document.getElementById('availableSlots');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImage = document.querySelector('.logo-image');

    // Get logged in user data
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        window.location.href = '../login.html';
        return;
    }
    const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));

    // Get mentor ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const mentorId = urlParams.get('mentorId');

    // Find the mentor profile from mentorProfiles.js or localStorage
    let mentor = mentorProfiles.find(m => m.id === parseInt(mentorId));
    if (!mentor) {
        const allUsers = Object.values(localStorage).map(item => {
            try {
                return JSON.parse(item);
            } catch (e) {
                return null;
            }
        }).filter(item => item && item.userType === 'mentor');
        mentor = allUsers.find(m => m.id === mentorId);
    }

    if (mentor) {
        // Display mentor profile
        mentorProfile.innerHTML = `
            <div class="mentor-card">
                <img src="${mentor.profileImage|| mentor.image || '../../../images/default-profile.png'}" alt="${mentor.name}" class="mentor-image">
                <div class="mentor-info">
                    <h2>${mentor.name || mentor.fullName}</h2>
                    <p><strong>Department:</strong> ${mentor.department}</p>
                    <p><strong>Expertise:</strong> ${mentor.expertise ? mentor.expertise.join(', ') : 'Not specified'}</p>
                    <p><strong>Experience:</strong> ${mentor.experience || 'Not specified'}</p>
                    <p>${mentor.bio || ''}</p>
                </div>
            </div>
        `;

        // Display available slots
        availableSlots.innerHTML = `
            <h2>Available Time Slots</h2>
            <ul class="slot-list">
                ${mentor.availableSlots ? mentor.availableSlots.map(slot => `
                    <li>
                        ${slot.day} ${slot.time || slot.startTime} - ${slot.endTime || ''}
                        ${slot.status === 'available' 
                            ? `<button class="book-btn" data-slot="${slot.day} ${slot.time || slot.startTime}">Book</button>`
                            : '<span class="booked">Booked</span>'
                        }
                    </li>
                `).join('') : '<li>No available slots</li>'}
            </ul>
        `;

        // Add event listener for booking buttons
        availableSlots.addEventListener('click', function(e) {
            if (e.target.classList.contains('book-btn')) {
                const slot = e.target.getAttribute('data-slot');
                bookSession(mentor, slot);
                e.target.textContent = 'Booked';
                e.target.disabled = true;
                e.target.classList.remove('book-btn');
                e.target.classList.add('booked');
            }
        });
    } else {
        mentorProfile.innerHTML = '<p>Mentor not found.</p>';
    }

    function bookSession(mentor, slot) {
        const sessionData = {
            id: Date.now(),
            mentorId: mentor.id,
            mentorName: mentor.name || mentor.fullName,
            studentId: userData.id,
            studentName: userData.fullName,
            date: slot.split(' ')[0],
            time: slot.split(' ')[1],
            status: 'pending'
        };

        // Add session request to mentor's localStorage
        let mentorData = JSON.parse(localStorage.getItem(mentor.email));
        if (!mentorData.sessionRequests) {
            mentorData.sessionRequests = [];
        }
        mentorData.sessionRequests.push(sessionData);
        localStorage.setItem(mentor.email, JSON.stringify(mentorData));

        // Update mentor's available slots
        mentorData.availableSlots = mentorData.availableSlots.map(s => {
            if (s.day === sessionData.date && (s.time === sessionData.time || s.startTime === sessionData.time)) {
                return { ...s, status: 'pending' };
            }
            return s;
        });
        localStorage.setItem(mentor.email, JSON.stringify(mentorData));

        // Add notification for the mentor
        addNotification(mentor.email, `New session request from ${userData.fullName} for ${slot}`);

        // Add notification for the user
        addNotification(loggedInUserEmail, `Session request sent to ${mentor.name || mentor.fullName} for ${slot}`);

        alert(`Session request sent to ${mentor.name || mentor.fullName} for ${slot}`);
    }

    function addNotification(userEmail, message) {
        let userData = JSON.parse(localStorage.getItem(userEmail));
        if (!userData.notifications) {
            userData.notifications = [];
        }
        userData.notifications.push({
            id: Date.now(),
            message: message,
            timestamp: new Date().toISOString(),
            read: false
        });
        localStorage.setItem(userEmail, JSON.stringify(userData));
    }

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
});
