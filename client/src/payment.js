// This is your test publishable API key.
const stripe = Stripe("pk_test_51PIuVU01Btym0RJXsFKVqyth9qMmMh108saxDNXWszDxDcp1kpBBtTyQZ6R5aCpgpUIDhyOB1JhPaI84GBkWd7Ms006Ok7qIPn");

let elements;

async function renderForm() {
  if (await isLoggedIn()) {
    document.querySelector("#claim-button").disabled = true;
    initialize();
    checkStatus();

    document
      .querySelector("#payment-form")
      .addEventListener("submit", handleSubmit);
  } else {
    document.querySelector('#login-warning').textContent = 'Please, login before claiming';
  }
}


// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("http://localhost:4242/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: 'night',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const linkElement = elements.create(
    "linkAuthentication",
    {
      defaultValues: {
        email: "test@email.com",
      }
    }
  );
  linkElement.mount("#link-element");

  const paymentElement = elements.create(
    "payment",
    {
      layout: "accordion",
    }
  );
  paymentElement.mount("#payment-element");

  document.querySelector("#payment-form").classList.remove("hidden");
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:3000/",
    },
  });

  if (!error) {
    document.querySelector("#claim-button").disabled = false;
  }

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}