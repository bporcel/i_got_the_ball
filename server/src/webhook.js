const { Router } = require("express");
const { postUserPayment } = require("./db.js");

const stripe = require("stripe")('sk_test_51PIuVU01Btym0RJXQ8gsn5SAJkiAYaA4wJJznNiKThle0Xtj8GsuyOl4R4ern4s9IQP4rC9F7WlFeWQVsGot2iBl00B3unod3i');
const endpointSecret = "whsec_cf385a7fdaffbade96591b03cf4a027d124bf6b90ebb4137433c31198d41055f";

const app = Router();

app.post('/webhook-stripe', (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log('Webhook event error => ', err.message)
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const payload = event.data.object;
            postUserPayment(payload.amount_total, payload.client_reference_id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
});

module.exports = app;
