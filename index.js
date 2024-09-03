document.addEventListener('DOMContentLoaded', function () {
    // Function to save data to Chrome storage
    function saveData() {
        // Collect all data
        const userInfo = {
            firstname: document.getElementById('Firstname').value,
            lastname: document.getElementById('Lastname').value,
            phone: document.getElementById('Phone').value,
            email: document.getElementById('Email').value,
            linkedin: document.getElementById('linkedin').value,
            address: document.getElementById('Address').value,
            city: document.getElementById('City').value,
            state: document.getElementById('State').value,
            zip: document.getElementById('Zip').value,
            experiences: [],
            education: []
        };

        // Collecting experiences data
        const experiencesEntries = document.querySelectorAll('.experience-entry');
        experiencesEntries.forEach((entry) => {
            const experience = {
                jobTitle: entry.querySelector('[name="job-title"]').value,
                companyName: entry.querySelector('[name="company-name"]').value,
                city: entry.querySelector('[name="experience-city"]').value,
                state: entry.querySelector('[name="experience-state"]').value,
                startDate: entry.querySelector('[name="start-date"]').value,
                endDate: entry.querySelector('[name="end-date"]').value,
                description: entry.querySelector('[name="description"]').value
            };
            userInfo.experiences.push(experience);
        });

        // Collecting education data
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach((entry) => {
            const education = {
                school: entry.querySelector('[name="school"]').value,
                degree: entry.querySelector('[name="degree"]').value,
                fieldOfStudy: entry.querySelector('[name="field-of-study"]').value,
                city: entry.querySelector('[name="education-city"]').value,
                state: entry.querySelector('[name="education-state"]').value,
                graduationDate: entry.querySelector('[name="graduation-date"]').value
            };
            userInfo.education.push(education);
        });

        // Save data to Chrome storage
        chrome.storage.sync.set({ userInfo }, function () {
            console.log('Data saved automatically!');
        });
    }

    // Add event listeners to all input fields to save data immediately when changed
    document.querySelectorAll('input, textarea').forEach((input) => {
        input.addEventListener('input', saveData);
    });

    // Add listeners for dynamically added experience and education inputs
    document.getElementById('experience-container').addEventListener('input', saveData);
    document.getElementById('education-container').addEventListener('input', saveData);

    // For adding experience
    document.getElementById('add-experience').addEventListener('click', function () {
        const experienceContainer = document.getElementById('experience-container');

        const newExperienceContainer = document.createElement('div');
        newExperienceContainer.className = 'experience-entry';
        newExperienceContainer.innerHTML = `
            <label for="job-title">Job/Position Title:</label>
            <input type="text" class="job-title" name="job-title" required>

            <label for="company-name">Company Name:</label>
            <input type="text" class="company-name" name="company-name" required>

            <label for="experience-city">City</label>
            <input type="text" class="experience-city" name="experience-city" required>

            <label for="experience-state">State</label>
            <input type="text" class="experience-state" name="experience-state" required>

            <label for="start-date">Start Date</label>
            <input type="date" class="start-date" name="start-date" required>

            <label for="end-date">End Date</label>
            <input type="date" class="end-date" name="end-date" required>

            <label for="description">Description</label>
            <textarea class="description" name="description" required></textarea>

            <!-- Add a Remove Experience button -->
            <button class="remove_exp" type="button">Remove Experience</button>
        `;
        experienceContainer.appendChild(newExperienceContainer);
        saveData(); // Save immediately after adding new experience
    });

    // For adding education
    document.getElementById('add-education').addEventListener('click', function () {
        const educationContainer = document.getElementById('education-container');

        const newEducationContainer = document.createElement('div');
        newEducationContainer.className = 'education-entry';
        newEducationContainer.innerHTML = `
            <label for="school">School</label>
            <input type="text" class="school" name="school" required>

            <label for="degree">Degree</label>
            <input type="text" class="degree" name="degree" required>

            <label for="field-of-study">Field of Study</label>
            <input type="text" class="field-of-study" name="field-of-study" required>

            <label for="education-city">City</label>
            <input type="text" class="education-city" name="education-city" required>

            <label for="education-state">State</label>
            <input type="text" class="education-state" name="education-state" required>

            <label for="graduation-date">Graduation Date</label>
            <input type="date" class="graduation-date" name="graduation-date" required>

            <!-- Add a Remove Education button -->
            <button class="remove-edu" type="button">Remove Education</button>
        `;
        educationContainer.appendChild(newEducationContainer);
        saveData(); // Save immediately after adding new education
    });

    // Load saved data when the extension is opened
    chrome.storage.sync.get('userInfo', function (data) {
        if (data.userInfo) {
            document.getElementById('Firstname').value = data.userInfo.firstname || '';
            document.getElementById('Lastname').value = data.userInfo.lastname || '';
            document.getElementById('Phone').value = data.userInfo.phone || '';
            document.getElementById('Email').value = data.userInfo.email || '';
            document.getElementById('linkedin').value = data.userInfo.linkedin || '';
            document.getElementById('Address').value = data.userInfo.address || '';
            document.getElementById('City').value = data.userInfo.city || '';
            document.getElementById('State').value = data.userInfo.state || '';
            document.getElementById('Zip').value = data.userInfo.zip || '';

            // Load experiences
            const experienceContainer = document.getElementById('experience-container');
            experienceContainer.innerHTML = ''; // Clear existing entries to avoid duplication
            if (data.userInfo.experiences) {
                data.userInfo.experiences.forEach((exp) => {
                    const newExperienceContainer = document.createElement('div');
                    newExperienceContainer.className = 'experience-entry';
                    newExperienceContainer.innerHTML = `
                        <label for="job-title">Job/Position Title:</label>
                        <input type="text" class="job-title" name="job-title" value="${exp.jobTitle}" required>

                        <label for="company-name">Company Name:</label>
                        <input type="text" class="company-name" name="company-name" value="${exp.companyName}" required>

                        <label for="experience-city">City</label>
                        <input type="text" class="experience-city" name="experience-city" value="${exp.city}" required>

                        <label for="experience-state">State</label>
                        <input type="text" class="experience-state" name="experience-state" value="${exp.state}" required>

                        <label for="start-date">Start Date:</label>
                        <input type="date" class="start-date" name="start-date" value="${exp.startDate}" required>

                        <label for="end-date">End Date:</label>
                        <input type="date" class="end-date" name="end-date" value="${exp.endDate}" required>

                        <label for="description">Description</label>
                        <textarea class="description" name="description" required>${exp.description}</textarea>

                        <!-- Add a Remove Experience button -->
                        <button class="remove_exp" type="button">Remove Experience</button>
                    `;
                    experienceContainer.appendChild(newExperienceContainer);
                });
            }

            // Load education entries
            const educationContainer = document.getElementById('education-container');
            educationContainer.innerHTML = ''; // Clear existing entries to avoid duplication
            if (data.userInfo.education) {
                data.userInfo.education.forEach((edu) => {
                    const newEducationContainer = document.createElement('div');
                    newEducationContainer.className = 'education-entry';
                    newEducationContainer.innerHTML = `
                        <label for="school">School</label>
                        <input type="text" class="school" name="school" value="${edu.school}" required>

                        <label for="degree">Degree</label>
                        <input type="text" class="degree" name="degree" value="${edu.degree}" required>

                        <label for="field-of-study">Field of Study</label>
                        <input type="text" class="field-of-study" name="field-of-study" value="${edu.fieldOfStudy}" required>

                        <label for="education-city">City</label>
                        <input type="text" class="education-city" name="education-city" value="${edu.city}" required>

                        <label for="education-state">State</label>
                        <input type="text" class="education-state" name="education-state" value="${edu.state}" required>

                        <label for="graduation-date">Graduation Date</label>
                        <input type="date" class="graduation-date" name="graduation-date" value="${edu.graduationDate}" required>

                        <!-- Add a Remove Education button -->
                        <button class="remove-edu" type="button">Remove Education</button>
                    `;
                    educationContainer.appendChild(newEducationContainer);
                });
            }
        }
    });

    // Event listener for removing experience entries
    document.getElementById('experience-container').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('remove_exp')) {
            const experienceEntry = event.target.closest('.experience-entry');
            experienceEntry.remove();
            saveData(); // Save data after removal
        }
    });

    // Event listener for removing education entries
    document.getElementById('education-container').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('remove-edu')) {
            const educationEntry = event.target.closest('.education-entry');
            educationEntry.remove();
            saveData(); // Save data after removal
        }
    });
});
