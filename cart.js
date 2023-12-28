document.addEventListener('DOMContentLoaded', function () {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const cartContainer = document.getElementById('cartContainer');
    const clearCartButton = document.getElementById('clearCartButton');
    const removeAllItemsButton = document.getElementById('removeAllItemsButton');

    function updateTotalPrice() {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + parseFloat(item.productPrice) * item.productQuantity;
        }, 0);

        const totalPriceElement = document.getElementById('totalPrice');
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    function renderCartItems() {
        cartContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('cart-item');
            itemContainer.innerHTML = `
                <h3>${item.productName}</h3>
                <p class="product-price">${item.productPrice}</p>
                <input type="number" value="${item.productQuantity}" min="1" data-index="${index}">
                <p class="item-total">${(parseFloat(item.productPrice) * item.productQuantity).toFixed(2)}</p>
                <button class="update-quantity-btn" data-index="${index}">Update</button>
                <button class="remove-item-btn" data-index="${index}">&times;</button>
            `;
            cartContainer.appendChild(itemContainer);
        });

        updateTotalPrice();
    }

    renderCartItems();

    cartContainer.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('update-quantity-btn')) {
            const index = parseInt(target.dataset.index);
            const inputElement = cartContainer.querySelector(`input[data-index="${index}"]`);
            updateQuantity(index, inputElement);
        }

        if (target.classList.contains('remove-item-btn')) {
            const index = parseInt(target.dataset.index);
            removeItem(index);
        }
    });

    cartContainer.addEventListener('keypress', function (event) {
        const target = event.target;

        if (event.key === 'Enter' && target.tagName === 'INPUT' && target.hasAttribute('data-index')) {
            const index = parseInt(target.dataset.index);
            updateQuantity(index, target);
        }
    });

    clearCartButton.addEventListener('click', function () {
        localStorage.removeItem('cartItems');
        cartItems = [];
        renderCartItems();
    });

    removeAllItemsButton.addEventListener('click', function () {
        localStorage.removeItem('cartItems');
        cartItems = [];
        renderCartItems();
    });

    function updateQuantity(index, inputElement) {
        const newQuantity = parseInt(inputElement.value);

        if (!isNaN(newQuantity) && newQuantity >= 1) {
            cartItems[index].productQuantity = newQuantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateTotalPrice();
            renderCartItems();
        } else {
            console.log('Invalid quantity input');
        }
    }

    function removeItem(index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }
});
