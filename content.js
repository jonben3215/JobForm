// content.js

// Fetch user information from Chrome storage and autofill detected fields
chrome.storage.sync.get('userInfo', (data) => {
    if (data && data.userInfo) {
        const { 
            firstname, lastname, email, phone, linkedin, address, city, state, zip, 
            experiences, education 
        } = data.userInfo;

        // Function to fill input fields with the specified value
        const fillField = (selector, value) => {
            const field = document.querySelector(selector);
            if (field) {
                field.value = value;
                field.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input events to simulate user input
                console.log(`Filled field: ${selector} with value: ${value}`);
            } else {
                console.warn(`Field not found for selector: ${selector}`);
            }
        };

        // Fill personal information fields
        fillField('input[name="Firstname"], input[id="Firstname"]', firstname);
        fillField('input[name="Lastname"], input[id="Lastname"]', lastname);
        fillField('input[type="email"], input[name="Email"], input[id="Email"]', email);
        fillField('input[type="tel"], input[name="Phone"], input[id="Phone"]', phone);
        fillField('input[name="linkedin"], input[id="linkedin"], input[type="url"]', linkedin);
        fillField('input[name="Address"], input[id="Address"]', address);
        fillField('input[name="City"], input[id="City"]', city);
        fillField('input[name="State"], input[id="State"]', state);
        fillField('input[name="Zip"], input[id="Zip"]', zip);

        // If you have functionality to add job experience dynamically, ensure IDs or names are appropriately set up in the generated HTML
        // Fill job experience fields (if dynamically added, may require further handling)
        if (experiences && experiences.length > 0) {
            experiences.forEach((exp, index) => {
                // Modify these selectors based on how dynamic experience fields are named or indexed in your actual form setup
                fillField(`input[name="jobTitle-${index}"], input[id="job-title-${index}"]`, exp.jobTitle);
                fillField(`input[name="companyName-${index}"], input[id="company-name-${index}"]`, exp.companyName);
                fillField(`input[name="experienceCity-${index}"], input[id="experience-city-${index}"]`, exp.city);
                fillField(`input[name="experienceState-${index}"], input[id="experience-state-${index}"]`, exp.state);
                fillField(`input[name="startDate-${index}"], input[id="start-date-${index}"]`, exp.startDate);
                fillField(`input[name="endDate-${index}"], input[id="end-date-${index}"]`, exp.endDate);
                fillField(`textarea[name="description-${index}"], textarea[id="description-${index}"]`, exp.description);
            });
        }

        // Fill education fields (assumes forms have sections for education)
        if (education && education.length > 0) {
            education.forEach((edu, index) => {
                fillField(`input[name="school-${index}"], input[id="school-${index}"]`, edu.school);
                fillField(`input[name="degree-${index}"], input[id="degree-${index}"]`, edu.degree);
                fillField(`input[name="fieldOfStudy-${index}"], input[id="field-of-study-${index}"]`, edu.fieldOfStudy);
                fillField(`input[name="educationCity-${index}"], input[id="education-city-${index}"]`, edu.city);
                fillField(`input[name="educationState-${index}"], input[id="education-state-${index}"]`, edu.state);
                fillField(`input[name="graduationDate-${index}"], input[id="graduation-date-${index}"]`, edu.graduationDate);
            });
        }
    } else {
        console.warn('No user info found in Chrome storage.');
    }
});
