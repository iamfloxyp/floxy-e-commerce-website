document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');
    const itemCountElement = document.getElementById('cart-item-count');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingElement = document.getElementById('shipping-fee');
    const checkoutTotalElement = document.getElementById('checkout-total');
    const checkOutButton = document.querySelector('.checkout-btn button');
    const cardholderNameInput = document.getElementById('cardholder-name');
    const paymentOptions = document.querySelectorAll('.payment-option i');

    // Function to retrieve cart items from localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    // Function to save updated cart items to localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to calculate and render cart items in the HTML
    function renderCart() {
        const cart = getCart();
        itemsContainer.innerHTML = '';
        let totalItems = 0;
        let subtotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('items-pick');
            itemElement.innerHTML = `
                <div class="img-item">
                    <img src="${item.image}" alt="${item.productName}">
                    <h5>${item.productName}</h5>
                </div>
                <div class="quantity">
                    <i class="fa fa-plus" data-id="${item.productName}"></i>
                    <h4>${item.quantity}</h4>
                    <i class="fa fa-minus" data-id="${item.productName}"></i>
                </div>
                <div class="items-details">
                    <div class="item-price">$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</div>
                    <i class="fa fa-trash" data-id="${item.productName}"></i>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
            totalItems += item.quantity;
            subtotal += parseFloat(item.price.replace('$', '')) * item.quantity;
        });

        itemCountElement.textContent = `You have ${totalItems} items in your cart`;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

        // Calculate shipping fee as 2% of subtotal, or $0 if subtotal is 0
        const shippingFee = subtotal === 0 ? 0 : (subtotal * 0.02).toFixed(2);
        shippingElement.textContent = `$${shippingFee}`;
        
        // Calculate total including subtotal and shipping
        const total = (parseFloat(subtotal) + parseFloat(shippingFee)).toFixed(2);
        totalElement.textContent = `$${total}`;
        checkoutTotalElement.textContent = `$${total}`;

        // Save the cart total to localStorage
        localStorage.setItem('cartTotal', total);
    }

    // Function to update quantity of cart items
    function updateQuantity(productName, change) {
        let cart = getCart();
        const item = cart.find(item => item.productName === productName);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            if (change === 0) {
                cart = cart.filter(item => item.productName !== productName);
            }
        } else {
            // If item not found, add it to cart
            const newItem = {
                productName: productName,
                image: 'path/to/default/image.jpg', // Update with actual path
                price: '$100', // Update with actual price
                quantity: 1
            };
            cart.push(newItem);
        }
        saveCart(cart); // Save updated cart to localStorage
        renderCart(); // Re-render the cart in the HTML
    }

    // Event listener for plus, minus, and trash icons
    itemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-plus')) {
            const productName = e.target.dataset.id;
            updateQuantity(productName, 1);
        } else if (e.target.classList.contains('fa-minus')) {
            const productName = e.target.dataset.id;
            updateQuantity(productName, -1);
        } else if (e.target.classList.contains('fa-trash')) {
            const productName = e.target.dataset.id;
            updateQuantity(productName, 0); // Remove item from cart
        }
    });

    // Event listener for checkout button to navigate to delivery information page
    checkOutButton.addEventListener('click', () => {
        window.location.href = 'delivery.html'; // Update with actual delivery information page path
    });

    // Payment option selection handling
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Retain cardholder's name input on page load
    const savedCardholderName = localStorage.getItem('cardholderName');
    if (savedCardholderName) {
        cardholderNameInput.value = savedCardholderName;
    }

    // Save cardholder's name input on change
    cardholderNameInput.addEventListener('input', () => {
        localStorage.setItem('cardholderName', cardholderNameInput.value);
    });

    renderCart(); // Initial rendering of cart on page load
});