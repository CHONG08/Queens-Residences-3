// Hero Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.left = (index === slideIndex) ? '0' : '100%';
    });
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

showSlides();

// Lightbox for Gallery Images
function openLightbox(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    lightboxImage.src = img.src;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

function showForm(formType) {
    // Hide both forms initially
    document.getElementById('call-form').style.display = 'none';
    document.getElementById('online-form').style.display = 'none';

    // Show the selected form based on button click
    if (formType === 'call') {
        document.getElementById('call-form').style.display = 'block';
    } else if (formType === 'online') {
        document.getElementById('online-form').style.display = 'block';
    }
}

function handleSubmit(event, formType) {
    event.preventDefault(); // Prevent form submission

    // Get the form elements
    const form = event.target;
    const name = form.querySelector(`#${formType}-name`);
    const email = form.querySelector(`#${formType}-email`);
    const phone = form.querySelector(`#${formType}-phone`);
    const property = form.querySelector(`#${formType}-property`);
    const time = form.querySelector(`#${formType}-time`);

    // Clear previous error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());

    let isValid = true;

    // Helper function to display error messages
    function showError(inputElement, message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.textContent = message;
        inputElement.parentElement.appendChild(errorDiv);
    }

    // Check for empty fields
    if (!name.value) {
        showError(name, 'Full Name is required.');
        isValid = false;
    }
    if (!email.value) {
        showError(email, 'Email is required.');
        isValid = false;
    }
    if (!phone.value) {
        showError(phone, 'Phone Number is required.');
        isValid = false;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.value && !emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate phone format
    const phoneRegex = /^\d{10}$/; // Adjust for your region's phone format
    if (phone.value && !phoneRegex.test(phone.value)) {
        showError(phone, 'Please enter a valid phone number.');
        isValid = false;
    }

    // For the Online Viewing Form, check additional fields
    if (formType === 'online') {
        if (!property.value) {
            showError(property, 'Please select a property type.');
            isValid = false;
        }
        if (!time.value) {
            showError(time, 'Please select a booking time.');
            isValid = false;
        }
    }

    

    // If everything is valid, proceed with the submission
    if (isValid) {
        let message = `Name: ${name.value}\nEmail: ${email.value}\nPhone: ${phone.value}`;

        if (formType === 'online') {
            message += `\nProperty: ${property.value}\nTime: ${time.value}`;
        }

        // Depending on the form type, either open WhatsApp or email
        if (formType === 'call') {
            // Create WhatsApp message URL (change your number below)
            const whatsappUrl = `https://wa.me/0164771238?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        } else if (formType === 'online') {
            // Create mailto link (change your email below)
            const mailtoLink = `mailto:example@gmail.com?subject=Contact Form Submission&body=${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
        }
    }
}


function callWhatsapp() {
    const whatsappNumber = "60164771238"; 
    const message = encodeURIComponent("Hello, I would like to get more information about Queens Waterfront 3? "); 
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank'); 
}

