require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

async function getBallOwner() {
    let { data: payment, error } = await supabase
        .from('s-1_payment')
        .select('payment')
        .order('payment', { ascending: false })
        .limit(1);


    if (error) {
        console.log('Error getting ball owner => ', error);
        return;
    }

    return payment[0];
}

async function getHighestPayment() {
    let { data: payment, error } = await supabase
        .from('s-1_payment')
        .select('payment')
        .order('payment', { ascending: false })
        .limit(1);


    if (error) {
        console.log('Error getting highest payment => ', error);
        return {
            payment: 0
        };
    }

    return payment[0];
}

async function getTotalPayment() {
    let { data: payment, error } = await supabase
        .from('s-1_payment')
        .select('payment')

    if (error) {
        console.log('Error getting highest payment => ', error);
        return;
    }

    const totalPayment = payment.reduce((total, next) => {
        return total + next.payment
    }, 0)

    return { payment: totalPayment };
}

async function postUserPayment(amount, userId) {
    const { error } = await supabase
        .from('s-1_payment')
        .insert({ payment: amount, user_id: userId });

    if (error) {
        console.log('Error posting user payment => ', error);
        return;
    }
}

module.exports = { getBallOwner, getHighestPayment, getTotalPayment, postUserPayment };
