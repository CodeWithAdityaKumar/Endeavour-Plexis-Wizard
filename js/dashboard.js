import { initializeUserActions } from './userActions.js';
import { initializeMentorActions } from './mentorActions.js';
import mentorProfiles from './mentorProfiles.js';

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        window.location.href = '../login.html';
        return;
    }

    const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
    
    // Display user information
    document.getElementById('userName').textContent = userData.fullName;
    const userProfileImage = document.getElementById('userProfileImage');
    
    if (userData.profileImage) {
        userProfileImage.src = userData.profileImage;
    } else {
        userProfileImage.src = '../../../images/default-profile.png';
    }

    // Show appropriate actions based on user type
    const userActions = document.getElementById('userActions');
    const mentorActions = document.getElementById('mentorActions');
    if (userData.userType === 'mentor') {
        mentorActions.style.display = 'block';
        initializeMentorActions();
        displayUpcomingSessions(userData);
    } else {
        userActions.style.display = 'block';
        initializeUserActions();
        displayUpcomingSessions(userData);
    }

    function displayUpcomingSessions(userData) {
        const sessionsList = document.getElementById('sessionsList');
        let upcomingSessions;

        if (userData.userType === 'mentor') {
            // For mentors, get accepted session requests
            upcomingSessions = userData.sessionRequests ? userData.sessionRequests.filter(session => session.status === 'accepted') : [];
        } else {
            // For students, get their booked sessions
            upcomingSessions = JSON.parse(localStorage.getItem(`sessions_${loggedInUserEmail}`)) || [];
        }
        
        sessionsList.innerHTML = ''; // Clear existing content
        
        if (upcomingSessions.length === 0) {
            sessionsList.innerHTML = '<li>No upcoming sessions.</li>';
            return;
        }

        upcomingSessions.forEach(session => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="session-info">
                    <strong>${userData.userType === 'mentor' ? session.studentName : session.mentorName}</strong> - ${session.date} at ${session.time}
                </div>
                <div class="session-actions">
                    <button class="action-btn join-session" data-session-id="${session.id}"><i class="fas fa-video"></i></button>
                    <button class="action-btn cancel-session" data-session-id="${session.id}"><i class="fas fa-times"></i></button>
                </div>
            `;
            sessionsList.appendChild(li);
        });
    }

    // Event delegation for session actions
    const sessionsList = document.getElementById('sessionsList');
    sessionsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('join-session')) {
            const sessionId = e.target.getAttribute('data-session-id');
            joinSession(sessionId);
        } else if (e.target.classList.contains('cancel-session')) {
            const sessionId = e.target.getAttribute('data-session-id');
            if (confirm('Are you sure you want to cancel this session?')) {
                cancelSession(sessionId);
            }
        }
    });

    function joinSession(sessionId) {
        // Implement join session logic
        console.log(`Joining session ${sessionId}`);
        alert(`Joining session ${sessionId}`);
        // In a real application, you might redirect to a video call or open a modal
    }

    function cancelSession(sessionId) {
        if (userData.userType === 'mentor') {
            userData.sessionRequests = userData.sessionRequests.filter(session => session.id !== sessionId);
            localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
        } else {
            let sessions = JSON.parse(localStorage.getItem(`sessions_${loggedInUserEmail}`)) || [];
            sessions = sessions.filter(session => session.id !== sessionId);
            localStorage.setItem(`sessions_${loggedInUserEmail}`, JSON.stringify(sessions));
        }
        displayUpcomingSessions(userData);
    }

    // Add event listener for Add Availability button (only for mentors)
    const addAvailabilityBtn = document.getElementById('addAvailability');
    if (addAvailabilityBtn && userData.userType === 'mentor') {
        addAvailabilityBtn.addEventListener('click', () => {
            window.location.href = 'addAvailability.html';
        });
    }

    // Add event listener for View Session Requests button (only for mentors)
    const viewRequestsBtn = document.getElementById('viewRequests');
    if (viewRequestsBtn && userData.userType === 'mentor') {
        viewRequestsBtn.addEventListener('click', () => {
            window.location.href = 'sessionRequests.html';
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../../../index.html';
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImage = document.querySelector('.logo-image');

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
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

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
