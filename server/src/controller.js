const { Router } = require("express")
const { getBallOwner, getHighestPayment, getTotalPayment } = require("./db.js")
const { formatMoney, calculatePrize } = require("./MoneyUtils.js")

const app = Router();

app.get("", async (req, res) => {
    res.send('Health-check')
});

app.get("/ball-owner", async (req, res) => {

    const owner = await getBallOwner();

    console.log('server owner => ', owner)

    res.send({
        owner: owner.payment,
    });
});

app.get("/prize", async (req, res) => {

    const highestPayment = await getHighestPayment();
    const totalPayment = await getTotalPayment();
    const prize = calculatePrize(totalPayment.payment, highestPayment.payment);

    console.log('Prize => ', formatMoney(prize))

    // res.send({
    //     payment: formatMoney(prize),
    // });
});

app.get("/min-payment", async (req, res) => {
    // const { payment } = await getHighestPayment();
    // const minPayment = payment + 100;

    // console.log('Minimum Payment => ', formatMoney(minPayment))

    // res.send({
    //     payment: formatMoney(minPayment),
    // });
});

module.exports = app;
