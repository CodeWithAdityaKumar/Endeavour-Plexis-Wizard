document.addEventListener('DOMContentLoaded', function() {
    const notificationList = document.querySelector('.notification-list');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImage = document.querySelector('.logo-image');
    const markAllReadBtn = document.getElementById('markAllRead');
    const notificationCount = document.querySelector('.notification-count');
    const logoutBtn = document.getElementById('logout');

    // Check if user is logged in
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        window.location.href = '../login.html';
        return;
    }

    // Function to get notifications from local storage
    function getNotifications() {
        const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
        return userData.notifications || [];
    }

    // Function to save notifications to local storage
    function saveNotifications(notifications) {
        const userData = JSON.parse(localStorage.getItem(loggedInUserEmail));
        userData.notifications = notifications;
        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
    }

    // Function to create notification items
    function createNotificationItem(notification) {
        const li = document.createElement('li');
        li.className = `notification-item ${notification.read ? '' : 'unread'}`;
        li.innerHTML = `
            <div class="notification-content">
                <h3>${notification.message}</h3>
                <p>${new Date(notification.timestamp).toLocaleString()}</p>
            </div>
        `;
        return li;
    }

    // Function to update notification display
    function updateNotificationDisplay() {
        const notifications = getNotifications();
        notificationList.innerHTML = '';
        notifications.forEach(notification => {
            notificationList.appendChild(createNotificationItem(notification));
        });
        updateNotificationCount();
    }

    // Function to update notification count
    function updateNotificationCount() {
        const notifications = getNotifications();
        const unreadCount = notifications.filter(n => !n.read).length;
        notificationCount.textContent = unreadCount;
        notificationCount.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    // Display notifications
    updateNotificationDisplay();

    // Mark all as read functionality
    markAllReadBtn.addEventListener('click', function() {
        const notifications = getNotifications();
        notifications.forEach(n => n.read = true);
        saveNotifications(notifications);
        updateNotificationDisplay();
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

    // Logout functionality
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../../../index.html';
    });
});
