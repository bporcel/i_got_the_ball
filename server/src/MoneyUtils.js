function formatMoney(amount) {
    return amount / 100;
}

function calculatePrize(totalPayment, highestPayment) {
    return highestPayment + (totalPayment - highestPayment) / 2;
}

module.exports = { formatMoney, calculatePrize };