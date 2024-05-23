require('dotenv').config()
const { Router } = require("express");
const { postUserPayment } = require("./db.js");

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_STRIPE_SECRET_KEY = process.env.WEBHOOK_STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const endpointSecret = WEBHOOK_STRIPE_SECRET_KEY;

const app = Router();

app.post('/stripe', (req, res) => {
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
