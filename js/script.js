// Sample mentor data with dummy images
const mentors = [
    { name: 'Dr. Anil Kumar', expertise: 'Computer Science', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Dr. Priya Sharma', expertise: 'Mechanical Engineering', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Prof. Rajesh Verma', expertise: 'Electrical Engineering', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Dr. Sunita Patel', expertise: 'Chemical Engineering', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'Dr. Vikram Singh', expertise: 'Civil Engineering', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { name: 'Prof. Meera Gupta', expertise: 'Food Engineering', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
];

// Sample department data with dummy images
const departments = [
    { name: 'Computer Science & Engineering', image: 'https://picsum.photos/id/1/300/200' },
    { name: 'Mechanical Engineering', image: 'https://picsum.photos/id/2/300/200' },
    { name: 'Electrical Engineering', image: 'https://picsum.photos/id/3/300/200' },
    { name: 'Chemical Engineering', image: 'https://picsum.photos/id/4/300/200' },
    { name: 'Civil Engineering', image: 'https://picsum.photos/id/5/300/200' },
    { name: 'Food Engineering', image: 'https://picsum.photos/id/6/300/200' },
];

// Function to create mentor items
function createMentorItem(mentor) {
    const div = document.createElement('div');
    div.className = 'mentor-item';
    div.innerHTML = `
        <img src="${mentor.image}" alt="${mentor.name}">
        <h3>${mentor.name}</h3>
        <p>${mentor.expertise}</p>
        <button class="book-session">Book Session</button>
    `;
    
    // Add event listener to the "Book Session" button
    const bookButton = div.querySelector('.book-session');
    bookButton.addEventListener('click', () => {
        alert(`Booking a session with ${mentor.name}`);
        // Here you can implement the actual booking functionality
    });
    
    return div;
}

// Function to create department items
function createDepartmentItem(department) {
    const div = document.createElement('div');
    div.className = 'department-item';
    div.innerHTML = `
    <h3>${department.name}</h3>
    <img src="${department.image}" alt="${department.name}">
    `;
    return div;
}

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const allItems = document.querySelectorAll('.mentor-item, .department-item');
        
        allItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Updated responsive menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
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
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle ? themeToggle.querySelector('.sun-icon') : null;
    const moonIcon = themeToggle ? themeToggle.querySelector('.moon-icon') : null;
    const logoImage = document.querySelector('.logo-image');

    if (themeToggle && sunIcon && moonIcon && logoImage) {
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
                logoImage.src = 'https://codewithadityakumar.github.io/Endeavour_Plexus/images/logoSlietWhite.png';
            } else {
                logoImage.src = 'https://codewithadityakumar.github.io/Endeavour_Plexus/images/logoSliet.png';
            }
        }

        // Check for user's preferred color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
            updateThemeIcon();
            updateLogo();
        } else {
            updateLogo(); // Ensure correct logo is set on initial load
        }
    }

    // Populate mentor grid
    const mentorGrid = document.querySelector('.mentor-grid');
    if (mentorGrid) {
        mentors.forEach(mentor => {
            mentorGrid.appendChild(createMentorItem(mentor));
        });
    }

    // Populate department grid
    const departmentGrid = document.querySelector('.department-grid');
    if (departmentGrid) {
        departments.forEach(department => {
            departmentGrid.appendChild(createDepartmentItem(department));
        });
    }
});
