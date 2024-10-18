document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.getElementById('theme-toggle-checkbox');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menuIcon.contains(event.target) && !navMenu.contains(event.target)) {
            menuIcon.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Theme toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Initialize the page
    displayFacultyProfiles();
    setupBookingForm();
    setupChatSystem();
});

// Sample faculty data (in a real application, this would come from a backend)
const facultyData = [
    {
        name: "Dr. Manoj Kumar",
        designation: "Professor & Head",
        expertise: "Computer Networks, Distributed Systems",
        availableSlots: [
            { date: "2024-03-01", time: "10:00 AM", booked: false },
            { date: "2024-03-01", time: "2:00 PM", booked: false },
            { date: "2024-03-02", time: "11:00 AM", booked: false }
        ]
    },
    // Add more faculty members here
];

// Function to display faculty profiles
function displayFacultyProfiles() {
    const facultyList = document.getElementById('faculty-list');
    facultyData.forEach((faculty, index) => {
        const facultyCard = document.createElement('div');
        facultyCard.classList.add('faculty-card');
        facultyCard.innerHTML = `
            <h3>${faculty.name}</h3>
            <p>${faculty.designation}</p>
            <p>Expertise: ${faculty.expertise}</p>
            <button onclick="showBookingForm(${index})">Book Session</button>
        `;
        facultyList.appendChild(facultyCard);
    });
}

// Function to show booking form for a specific faculty member
function showBookingForm(facultyIndex) {
    const bookingForm = document.getElementById('booking-form');
    bookingForm.style.display = 'block';
    
    const selectedMentor = document.getElementById('selected-mentor');
    selectedMentor.value = facultyIndex;
    
    populateTimeslots(facultyIndex);
}

// Function to populate available timeslots
function populateTimeslots(facultyIndex) {
    const timeslotSelect = document.getElementById('timeslot');
    timeslotSelect.innerHTML = '';
    
    facultyData[facultyIndex].availableSlots.forEach((slot, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${slot.date} at ${slot.time}`;
        option.disabled = slot.booked;
        if (slot.booked) {
            option.textContent += " (Booked)";
        }
        timeslotSelect.appendChild(option);
    });
}

// Setup booking form
function setupBookingForm() {
    document.getElementById('mentor-booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const facultyIndex = document.getElementById('selected-mentor').value;
        const slotIndex = document.getElementById('timeslot').value;
        const studentName = document.getElementById('student-name').value;
        const studentEmail = document.getElementById('student-email').value;
        
        // In a real application, you would send this data to a server
        facultyData[facultyIndex].availableSlots[slotIndex].booked = true;
        
        alert('Booking successful! You will receive a confirmation email shortly.');
        this.reset();
        document.getElementById('booking-form').style.display = 'none';
        
        // Show chat section after booking
        document.getElementById('chat-section').style.display = 'block';
    });
}

// Setup chat system
function setupChatSystem() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('p');
            messageElement.textContent = `You: ${message}`;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            
            // Simulate mentor response
            setTimeout(() => {
                const responseElement = document.createElement('p');
                responseElement.textContent = `Mentor: Thank you for your message. I'll get back to you soon.`;
                chatMessages.appendChild(responseElement);
            }, 1000);
        }
    });
}
