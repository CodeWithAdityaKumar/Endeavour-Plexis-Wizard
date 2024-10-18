export function initializeUserActions() {
    const bookSessionBtn = document.getElementById('bookSession');
    const viewMentorsBtn = document.getElementById('viewMentors');

    if (bookSessionBtn) {
        bookSessionBtn.addEventListener('click', bookSession);
    }

    if (viewMentorsBtn) {
        viewMentorsBtn.addEventListener('click', viewMentors);
    }
}

function bookSession() {
    // Implement booking session logic here
    console.log("Booking a session...");
    // For now, we'll just show an alert
    alert("Redirecting to session booking page...");
    // In a real application, you might redirect to a booking page or open a modal
}

function viewMentors() {
    // Implement view mentors logic here
    console.log("Viewing mentors...");
    // For now, we'll just show an alert
    alert("Redirecting to mentors list...");
    // In a real application, you might redirect to a page listing all mentors
}
