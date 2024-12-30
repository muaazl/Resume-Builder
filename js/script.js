document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(contactForm);
            const contactData = Object.fromEntries(formData);

            console.log(contactData); // To view the form data

            // Convert form data to a JSON string
            const jsonData = JSON.stringify(contactData);

            // Create a Blob from the JSON string
            const blob = new Blob([jsonData], { type: 'application/json' });

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'contactData.json'; // Name of the file to download
            link.click(); // Trigger download

            contactForm.reset();
            alert('Message sent successfully!');
        });
    }
});
