document.addEventListener('DOMContentLoaded', () => {
    const currencyButtons = document.querySelectorAll('.currency-btn');
    const prices = document.querySelectorAll('.price');

    const currencySymbols = {
        usd: '$',
        eur: '€',
        usdt: '₮'
    };

    function updatePrices(currency) {
        prices.forEach(price => {
            const priceValue = price.dataset[currency];
            const currencySymbol = currencySymbols[currency];
            price.textContent = `${currencySymbol}${priceValue}`;
        });

        currencyButtons.forEach(button => {
            button.classList.remove('active');
            if (button.id === `${currency}-btn`) {
                button.classList.add('active');
            }
        });
    }

    currencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currency = button.id.split('-')[0];
            updatePrices(currency);
        });
    });

    // Set initial state
    updatePrices('usd');
});
