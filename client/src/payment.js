import { isLoggedIn } from './auth';
import { getUserEmail, getUserId } from './user';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

export async function renderBuyButton() {
  if (await isLoggedIn()) {
    document.querySelector("#claim-button").disabled = true;
    document.querySelector("#buy-button").innerHTML = `
    <stripe-buy-button
      buy-button-id="buy_btn_1PJGHy01Btym0RJXIpyraWVl"
      publishable-key="${STRIPE_PUBLISHABLE_KEY}"
      customer-email="${await getUserEmail()}"
      client-reference-id="${await getUserId()}"
      >
    </stripe-buy-button>
    `;
  } else {
    document.querySelector('#login-warning').textContent = '⚠️ Please, login before claiming';
  }
}
