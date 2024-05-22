const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://tlmwywzrefmfiakuqinf.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbXd5d3pyZWZtZmlha3VxaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMTk3MzUsImV4cCI6MjAzMTg5NTczNX0.6QDE2FskwQBZ6nkzzZFrdVf_7rEX0D_dh8nE_0WHvBg'
const supabase = createClient(supabaseUrl, supabaseKey)

async function getBallOwner() {
    let { data: payment, error } = await supabase
        .from('s-1_payment')
        .select('display_name')
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
