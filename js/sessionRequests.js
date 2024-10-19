document.addEventListener('DOMContentLoaded', function() {
    const requestsList = document.getElementById('requestsList');
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');

    if (!loggedInUserEmail) {
        window.location.href = '../login.html';
        return;
    }

    const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));

    if (userData.userType !== 'mentor') {
        window.location.href = 'dashboard.html';
        return;
    }

    function displaySessionRequests() {
        const sessionRequests = userData.sessionRequests || [];
        
        if (sessionRequests.length === 0) {
            requestsList.innerHTML = '<p>No session requests at the moment.</p>';
            return;
        }

        requestsList.innerHTML = '';
        sessionRequests.forEach((request, index) => {
            const requestElement = document.createElement('div');
            requestElement.className = 'request-item';
            requestElement.innerHTML = `
                
                <div class="request-info">
                    <p><strong>Student:</strong> ${request.studentName}</p>
                    <p><strong>Date:</strong> ${request.date}</p>
                    <p><strong>Time:</strong> ${request.time}</p>
                    <p><strong>Status:</strong> ${request.status}</p>
                </div>
                <div class="request-actions">
                    ${request.status === 'pending' ? `
                        <button class="accept-btn" data-index="${index}">Accept</button>
                        <button class="reject-btn" data-index="${index}">Reject</button>
                    ` : ''}
                </div>
            `;
            requestsList.appendChild(requestElement);
        });
    }

    function handleRequestAction(action, index) {
        const sessionRequests = userData.sessionRequests || [];
        const request = sessionRequests[index];

        if (action === 'accept') {
            request.status = 'accepted';
            // Notify the student
            addNotification(request.studentId, `Your session request with ${userData.fullName} for ${request.date} at ${request.time} has been accepted.`);
        } else {
            request.status = 'rejected';
            // Notify the student
            addNotification(request.studentId, `Your session request with ${userData.fullName} for ${request.date} at ${request.time} has been rejected.`);
        }

        // Save updated user data
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));

        // Refresh the display
        displaySessionRequests();
    }

    function addNotification(userId, message) {
        let studentData = JSON.parse(localStorage.getItem(userId));
        if (!studentData) {
            console.error('Student data not found for ID:', userId);
            return;
        }
        if (!studentData.notifications) {
            studentData.notifications = [];
        }
        studentData.notifications.push({
            id: Date.now(),
            message: message,
            timestamp: new Date().toISOString(),
            read: false
        });
        localStorage.setItem(userId, JSON.stringify(studentData));
    }

    requestsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('accept-btn')) {
            const index = e.target.getAttribute('data-index');
            handleRequestAction('accept', parseInt(index));
        } else if (e.target.classList.contains('reject-btn')) {
            const index = e.target.getAttribute('data-index');
            handleRequestAction('reject', parseInt(index));
        }
    });

    displaySessionRequests();

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

    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../../../index.html';
    });
});
