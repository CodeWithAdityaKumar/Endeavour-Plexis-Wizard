const mentorProfiles = [
    {
        id: 1,
        name: "Dr. Anil Kumar",
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        department: "Computer Science",
        expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
        experience: "15 years",
        bio: "Dr. Anil Kumar is a senior professor with extensive experience in AI and ML. He has published numerous papers in top-tier conferences and journals.",
        availableSlots: [
            { day: "Monday", time: "10:00 AM - 11:00 AM", status: "available" },
            { day: "Wednesday", time: "2:00 PM - 3:00 PM", status: "booked" },
            { day: "Friday", time: "11:00 AM - 12:00 PM", status: "available" }
        ]
    },
    {
        id: 2,
        name: "Dr. Priya Sharma",
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        department: "Computer Science",
        expertise: ["Software Engineering", "Web Development", "Cybersecurity"],
        experience: "12 years",
        bio: "Dr. Priya Sharma specializes in software engineering and web technologies. She has industry experience and conducts workshops on cybersecurity.",
        availableSlots: [
            { day: "Tuesday", time: "9:00 AM - 10:00 AM", status: "available" },
            { day: "Thursday", time: "3:00 PM - 4:00 PM", status: "available" },
            { day: "Friday", time: "1:00 PM - 2:00 PM", status: "booked" }
        ]
    },
];

export default mentorProfiles;
