import { viewMentors } from './userActions.js';
import mentorProfiles from './mentorProfiles.js';

document.addEventListener('DOMContentLoaded', function() {
    const mentorList = document.getElementById('mentorList');

    function displayMentorProfiles() {
        mentorProfiles.forEach(mentor => {
            const mentorCard = document.createElement('div');
            mentorCard.className = 'mentor-card';
            mentorCard.innerHTML = `
                <h2>${mentor.name}</h2>
                <p><strong>Department:</strong> ${mentor.department}</p>
                <p><strong>Expertise:</strong> ${mentor.expertise.join(', ')}</p>
                <p><strong>Experience:</strong> ${mentor.experience}</p>
                <p>${mentor.bio}</p>
            `;
            mentorList.appendChild(mentorCard);
        });
    }

    displayMentorProfiles();
    viewMentors();
});
