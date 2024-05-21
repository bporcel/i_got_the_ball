const { Router } = require("express")
const { getBallOwner, getHighestPayment, getTotalPayment } = require("./db.js")
const { formatMoney, calculatePrize } = require("./MoneyUtils.js")

const app = Router();
const stripe = require("stripe")('sk_test_51PIuVU01Btym0RJXQ8gsn5SAJkiAYaA4wJJznNiKThle0Xtj8GsuyOl4R4ern4s9IQP4rC9F7WlFeWQVsGot2iBl00B3unod3i');

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 12000,
        currency: "eur",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.get("/ball-owner", async (req, res) => {

    const owner = await getBallOwner();

    console.log('server owner => ', owner)

    res.send({
        owner: owner.display_name,
    });
});

app.get("/prize", async (req, res) => {

    const highestPayment = await getHighestPayment();
    const totalPayment = await getTotalPayment();
    const prize = calculatePrize(totalPayment.payment, highestPayment.payment);

    console.log('Prize => ', formatMoney(prize))

    res.send({
        payment: formatMoney(prize),
    });
});

module.exports = app;
