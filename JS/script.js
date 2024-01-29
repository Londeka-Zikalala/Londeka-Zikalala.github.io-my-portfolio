// JS for intro buttons

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listener for "Contact Me" button
document.querySelector(".intro-contact-btn").addEventListener("click", () => {
    scrollToSection("contact");
});

// Event listener for "View My Work" button
document.querySelector(".intro-project-btn").addEventListener("click", () => {
    scrollToSection("projects");
});

//JS FOR PROJECTS SECTION

document.addEventListener("DOMContentLoaded", function () {
    const commonImageUrl = "images-and-files\Projects-illustration.jpg";
                          
   // Function to set the common image for project images
function setCommonImage(containerId) {
    const projectContainer = document.getElementById(containerId);
    const projectImages = projectContainer ? projectContainer.querySelectorAll(".projectimg img") : [];
    projectImages.forEach((img) => {
        // Check if the image is not inside the links section
        if (!img.closest(".link")) {
            img.src = commonImageUrl;
        }
    });
}

    // Function to handle project click and display floating description
    function handleProjectClick(projectId, description) {
        // Create a floating element
        const floatingDescription = document.createElement("div");
        floatingDescription.classList.add("floating-description");
        floatingDescription.innerHTML = `
            <p>${description}</p>
            <button class="close-btn">Close</button>
        `;

        // Append the floating element to the body
        document.body.appendChild(floatingDescription);

        // Add event listener for the close button
        const closeBtn = floatingDescription.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", closeFloatingDescription);
        }
    }

    // Function to close the floating description
    function closeFloatingDescription() {
        const floatingDescription = document.querySelector(".floating-description");
        if (floatingDescription) {
            floatingDescription.remove();
        }
    }

    // Add event listeners for each project image
    document.querySelectorAll(".projectimg img").forEach((img) => {
        img.addEventListener("click", () => {
            // Get the closest parent element with a class starting with "img"
            const projectContainer = img.closest('[class^="img"]');
            if (projectContainer) {
                // Check for the img elements inside the specific project container
                const projectImages = projectContainer.querySelectorAll("img");
                projectImages.forEach((projectImg) => {
                    const projectId = projectContainer.classList[0];
                    const description = getProjectDescription(projectId);
                    handleProjectClick(projectId, description);
                });
            }
        });
    });

    // Function to get project description (replace with actual data retrieval logic)
    function getProjectDescription(projectId) {
        // Sample descriptions
        const descriptions = {
            "img1": "Description for project 1",
            "img2": "Description for project 2",
            "img3": "Description for project 3",
            "img4": "Description for project 4",
            "img5": "Description for project 5",
            "img6": "Description for project 6",
        };

        return descriptions[projectId] || "No description available.";
    }

    // Set common image for frontend projects
    setCommonImage("frontend-projects");

    // Set common image for full-stack projects
    setCommonImage("full-stack-projects");
});

//JS FOR THE FORM SUBMISSION
document.addEventListener("DOMContentLoaded", function () {
    //function to submit the form to the database
    function submitForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
    
        const formData = {
            name: name,
            email: email,
            message: message,
        };
    //post the message
        fetch('https://portfolio-server-yhj6.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Oops! Something went wrong. Please try again later.');
            });
    }
    //event listener for the submit button
    const submit = document.querySelector('.submit-button')
    submit.addEventListener('click', function(event) {
        event.preventDefault(); 
        submitForm();
    });
});