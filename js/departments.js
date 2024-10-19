document.addEventListener("DOMContentLoaded", function () {
  const departmentList = document.getElementById("departmentList");
  const departmentSearch = document.getElementById("departmentSearch");
  const searchButton = document.getElementById("searchButton");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const sunIcon = themeToggle.querySelector(".sun-icon");
  const moonIcon = themeToggle.querySelector(".moon-icon");
  const logoImage = document.querySelector(".logo-image");

  // Sample department data
  const departments = [
    {
      name: "Computer Science & Engineering",
      image: "https://picsum.photos/id/1/300/200",
      description:
        "Focuses on computer systems, software engineering, and information technology.",
    },
    {
      name: "Mechanical Engineering",
      image: "https://picsum.photos/id/2/300/200",
      description:
        "Deals with design, manufacturing, and maintenance of mechanical systems.",
    },
    {
      name: "Electrical Engineering",
      image: "https://picsum.photos/id/3/300/200",
      description: "Covers electricity, electronics, and electromagnetism.",
    },
    {
      name: "Chemical Engineering",
      image: "https://picsum.photos/id/4/300/200",
      description:
        "Applies physical sciences and life sciences to chemical processes.",
    },
    {
      name: "Civil Engineering",
      image: "https://picsum.photos/id/5/300/200",
      description:
        "Focuses on design, construction, and maintenance of the built environment.",
    },
    {
      name: "Food Engineering",
      image: "https://picsum.photos/id/6/300/200",
      description:
        "Applies engineering principles to food and related industries.",
    },
  ];

  function displayDepartments(departments) {
    departmentList.innerHTML = "";
    departments.forEach((dept) => {
      const departmentCard = document.createElement("div");
      departmentCard.className = "department-card";
      departmentCard.innerHTML = `
                <img src="${dept.image}" alt="${dept.name}">
                <h2>${dept.name}</h2>
                <p>${dept.description}</p>
            `;
      departmentList.appendChild(departmentCard);
    });
  }

  function searchDepartments() {
    const searchTerm = departmentSearch.value.toLowerCase();
    const filteredDepartments = departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(searchTerm) ||
        dept.description.toLowerCase().includes(searchTerm)
    );
    displayDepartments(filteredDepartments);
  }

  searchButton.addEventListener("click", searchDepartments);
  departmentSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchDepartments();
    }
  });

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateThemeIcon();
    updateLogo();
  });

  function updateThemeIcon() {
    if (document.body.classList.contains("dark")) {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }

  function updateLogo() {
    if (document.body.classList.contains("dark")) {
      logoImage.src = "../images/logoSlietWhite.png";
    } else {
      logoImage.src = "../images/logoSliet.png";
    }
  }

  // Check for user's preferred color scheme
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classList.add("dark");
    updateThemeIcon();
    updateLogo();
  } else {
    updateLogo();
  }

  // Hamburger menu functionality
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav") && !event.target.closest(".nav-links")) {
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Prevent closing when clicking inside the menu
  navLinks.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Initial display of all departments
  displayDepartments(departments);
});
