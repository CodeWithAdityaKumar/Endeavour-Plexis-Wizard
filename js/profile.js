document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    const logoutBtn = document.getElementById('logout');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImage = document.querySelector('.logo-image');
    const profileImageUpload = document.getElementById('profileImageUpload');
    const profileImage = document.getElementById('profileImage');
    const userTypeSelect = document.getElementById('userType');
    const departmentGroup = document.getElementById('departmentGroup');

    // Check if user is logged in
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        window.location.href = '../login.html';
        return;
    }

    // Fetch user data
    let userData = JSON.parse(localStorage.getItem(loggedInUserEmail));

    // Function to update profile display
    function updateProfileDisplay() {
        document.getElementById('fullName').value = userData.fullName;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('education').value = userData.education;
        document.getElementById('userType').value = userData.userType;

        if (userData.userType === 'mentor') {
            departmentGroup.style.display = 'flex';
            document.getElementById('department').value = userData.department || '';
        } else {
            departmentGroup.style.display = 'none';
        }

        document.getElementById('profileName').textContent = userData.fullName;
        document.getElementById('profileEmail').textContent = userData.email;
        document.getElementById('profileType').textContent = userData.userType.charAt(0).toUpperCase() + userData.userType.slice(1);

        if (userData.profileImage) {
            profileImage.src = userData.profileImage;
        } else {
            profileImage.src = '../../../images/default-profile.png';
        }
    }

    // Initial profile display update
    updateProfileDisplay();

    // User type change event
    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'mentor') {
            departmentGroup.style.display = 'block';
        } else {
            departmentGroup.style.display = 'none';
        }
    });

    // Profile form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        userData = {
            ...userData,
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            education: document.getElementById('education').value,
            userType: document.getElementById('userType').value,
        };

        if (userData.userType === 'mentor') {
            userData.department = document.getElementById('department').value;
        } else {
            delete userData.department;
        }

        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
        updateProfileDisplay();
        alert('Profile updated successfully!');
    });

    // Profile image upload
    profileImageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function() {
                compressImage(reader.result, 800, 600, 0.7, function(compressedImage) {
                    profileImage.src = compressedImage;
                    userData.profileImage = compressedImage;
                    try {
                        localStorage.setItem(loggedInUserEmail, JSON.stringify(userData));
                    } catch (e) {
                        if (e.name === 'QuotaExceededError') {
                            alert('Storage quota exceeded. Unable to save the image. Please try a smaller image.');
                        } else {
                            console.error('Error saving user data:', e);
                        }
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../../../index.html';
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

    // Function to compress image
    function compressImage(src, newX, newY, quality, callback) {
        const img = new Image();
        img.src = src;
        img.onload = function() {
            const elem = document.createElement('canvas');
            elem.width = newX;
            elem.height = newY;
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, newX, newY);
            const data = elem.toDataURL('image/jpeg', quality);
            callback(data);
        }
    }
});
