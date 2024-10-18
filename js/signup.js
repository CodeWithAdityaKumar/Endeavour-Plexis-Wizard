document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImage = document.querySelector('.logo-image');
    const profileImageInput = document.getElementById('profileImage');
    const userTypeSelect = document.getElementById('userType');
    const departmentGroup = document.getElementById('departmentGroup');
    let base64Image = '';

    profileImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function() {
            base64Image = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'mentor') {
            departmentGroup.style.display = 'block';
        } else {
            departmentGroup.style.display = 'none';
        }
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const education = document.getElementById('education').value;
        const userType = document.getElementById('userType').value;
        const department = document.getElementById('department').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Generate a unique ID for the user
        const userId = Date.now().toString();

        const userData = {
            id: userId,
            fullName,
            email,
            phone,
            education,
            userType,
            password,
            profileImage: base64Image
        };

        if (userType === 'mentor') {
            userData.department = department;
        }

        // Store user data in local storage
        localStorage.setItem(email, JSON.stringify(userData));

        // Also store the user ID in a separate list for easy access
        let userIds = JSON.parse(localStorage.getItem('userIds')) || [];
        userIds.push(userId);
        localStorage.setItem('userIds', JSON.stringify(userIds));

        alert('Signup successful! Please log in.');
        window.location.href = 'login.html';
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
            logoImage.src = '../../images/logoSlietWhite.png';
        } else {
            logoImage.src = '../../images/logoSliet.png';
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
