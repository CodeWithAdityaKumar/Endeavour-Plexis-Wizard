export function initializeMentorActions() {
    const viewRequestsBtn = document.getElementById('viewRequests');

    if (viewRequestsBtn) {
        viewRequestsBtn.addEventListener('click', viewRequests);
    }
}



function viewRequests() {
    // Implement view requests logic here
    console.log("Viewing session requests...");
    // For now, we'll just show an alert
    alert("Redirecting to session requests page...");
    // In a real application, you might redirect to a page listing all session requests
}

export function addAvailability(day, startTime, endTime) {
    const availabilities = JSON.parse(localStorage.getItem('mentorAvailability')) || [];
    availabilities.push({ day, startTime, endTime });
    localStorage.setItem('mentorAvailability', JSON.stringify(availabilities));
}

export function removeAvailability(index) {
    const availabilities = JSON.parse(localStorage.getItem('mentorAvailability')) || [];
    availabilities.splice(index, 1);
    localStorage.setItem('mentorAvailability', JSON.stringify(availabilities));
}
