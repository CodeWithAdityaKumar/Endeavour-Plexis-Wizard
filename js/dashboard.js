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

    // Sample upcoming sessions data
    const upcomingSessions = [
        { mentor: 'Dr. Anil Kumar', date: '2024-03-15', time: '14:00' },
        { mentor: 'Prof. Priya Sharma', date: '2024-03-18', time: '10:30' },
        { mentor: 'Dr. Rajesh Verma', date: '2024-03-20', time: '16:00' }
    ];

    const sessionsList = document.getElementById('sessionsList');
    const bookSessionBtn = document.getElementById('bookSession');
    const viewMentorsBtn = document.getElementById('viewMentors');

    // Populate upcoming sessions
    upcomingSessions.forEach(session => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="session-info">
                <strong>${session.mentor}</strong> - ${session.date} at ${session.time}
            </div>
            <div class="session-actions">
                <button class="action-btn"><i class="fas fa-video"></i></button>
                <button class="action-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        sessionsList.appendChild(li);
    });

    // Event listeners for quick action buttons
    bookSessionBtn.addEventListener('click', () => {
        alert('Redirecting to book a session page...');
        // Implement the redirection logic here
    });

    viewMentorsBtn.addEventListener('click', () => {
        alert('Redirecting to view mentors page...');
        // Implement the redirection logic here
    });

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
