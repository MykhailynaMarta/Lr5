document.addEventListener('DOMContentLoaded', function () {
    var cartIcon = document.querySelector('.cart');
    var emptyCartModal = document.getElementById('emptyCartModal');
    
    cartIcon.addEventListener('click', function () {
        var cartItemCount = parseInt(document.getElementById('cartItemCount').innerText);

        if (cartItemCount === 0) {
            emptyCartModal.style.display = 'block';
        } else {
            window.location.href = 'cart.html';
        }
    });

    const addToCartButtons = document.querySelectorAll('.column-btn__buy');
    const addingToCartModal = document.getElementById('addingToCartModal');
    const productNameAdd = document.getElementById('productNameAdd');
    const productPriceAdd = document.getElementById('productPriceAdd');
    const productQuantityAdd = document.getElementById('productQuantityAdd');
    const totalPriceAdd = document.getElementById('totalPriceAdd');
    const btnAddToCart = document.getElementById('btnAddToCart');
    const addedToCartModal = document.getElementById('addedToCartModal');
    const cartItemCountElement = document.getElementById('cartItemCount');

    addToCartButtons.forEach(addToCartButton => {
        addToCartButton.addEventListener('click', function () {
            addingToCartModal.style.display = 'block';

            const productName = this.closest('.columns').querySelector('.name-of-product').innerText;
            const productPrice = this.closest('.columns').querySelector('.price-text').innerText;

            productNameAdd.innerText = productName;
            productPriceAdd.innerText = productPrice;
            productQuantityAdd.value = "1";
            updateTotalPrice();
            localStorage.setItem('productName', productName);
            localStorage.setItem('productPrice', productPrice);
            localStorage.setItem('productQuantity', productQuantityAdd.value);
        });
    });

    productQuantityAdd.addEventListener('input', updateTotalPrice);

    btnAddToCart.addEventListener('click', function () {
        addedToCartModal.style.display = 'block';
        addingToCartModal.style.display = 'none';

        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const newItem = {
            productName: productNameAdd.innerText,
            productPrice: productPriceAdd.innerText,
            productQuantity: parseInt(productQuantityAdd.value),
        };

        existingCartItems.push(newItem);

        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
        cartItemCountElement.textContent = existingCartItems.length;
    });

    function updateTotalPrice() {
        var pricePerItem = parseFloat(productPriceAdd.innerText);
        var quantity = parseInt(productQuantityAdd.value);
        var total = pricePerItem * quantity;
        totalPriceAdd.innerText = total.toFixed(2);
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    document.querySelectorAll(".close").forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            const modal = closeButton.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    document.querySelectorAll(".btnAdd").forEach(function (btnAdd) {
        function addToCart() {
            cartItemCountElement.textContent = parseInt(cartItemCountElement.textContent) + 1;
        }

        btnAdd.addEventListener('click', function () {
            addToCart();
        });
    });
});
