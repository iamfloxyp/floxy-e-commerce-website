document.addEventListener('DOMContentLoaded', () => {
    const deliveryForm = document.getElementById('delivery-form');

    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zipCode = document.getElementById('zip-code').value;
        const country = document.getElementById('country').value;
        const phone = document.getElementById('phone').value;

        const deliveryInfo = {
            fullName,
            address,
            city,
            state,
            zipCode,
            country,
            phone,
        };

        // Save delivery information to localStorage or send to server
        localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));

        // Redirect to order summary or payment page
        window.location.href = 'order-summary.html'; // Update with actual order summary or payment page path
    });
    
});