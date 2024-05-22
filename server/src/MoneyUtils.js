function formatMoney(amount) {
    const formatter = Intl.NumberFormat(
        'es-ES',
        {
            style: 'currency',
            currency: 'EUR'
        }
    );

    return formatter.format(amount / 100);
}

function calculatePrize(totalPayment, highestPayment) {
    return highestPayment + (totalPayment - highestPayment) / 2;
}

module.exports = { formatMoney, calculatePrize };