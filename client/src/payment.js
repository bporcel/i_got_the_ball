// This is your test publishable API key.
const stripe = Stripe("pk_test_51PIuVU01Btym0RJXsFKVqyth9qMmMh108saxDNXWszDxDcp1kpBBtTyQZ6R5aCpgpUIDhyOB1JhPaI84GBkWd7Ms006Ok7qIPn");

let elements;

async function renderBuyButton() {
  if (await isLoggedIn()) {
    document.querySelector("#claim-button").disabled = true;
    document.querySelector("#buy-button").innerHTML = `
    <stripe-buy-button
      buy-button-id="buy_btn_1PJGHy01Btym0RJXIpyraWVl"
      publishable-key="pk_test_51PIuVU01Btym0RJXsFKVqyth9qMmMh108saxDNXWszDxDcp1kpBBtTyQZ6R5aCpgpUIDhyOB1JhPaI84GBkWd7Ms006Ok7qIPn"
      customer-email="${await getUserEmail()}"
      client-reference-id="${await getUserId()}"
      >
    </stripe-buy-button>
    `;
  } else {
    document.querySelector('#login-warning').textContent = '⚠️ Please, login before claiming';
  }
}
