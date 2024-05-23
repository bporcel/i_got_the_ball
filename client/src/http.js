window.addEventListener('DOMContentLoaded', () => {
  getBallOwner();
  getPrize();
  getMinPayment();
});

async function getBallOwner() {
  // const response = await fetch("http://localhost:4242/ball-owner", {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" }
  // });
  // const { owner } = await response.json();

  // console.log('Owner =>', owner)
  // document.querySelector('#ball-owner').textContent = owner ?? 'No one';
}

async function getPrize() {
  // const response = await fetch("http://localhost:4242/prize", {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" }
  // });
  // const { payment } = await response.json();

  // console.log('Prize =>', payment)
  // document.querySelector('#claim').textContent = `${payment}€` ?? '0€';
}

async function getMinPayment() {
  // const response = await fetch("http://localhost:4242/min-payment", {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" }
  // });
  // const { payment } = await response.json();

  // console.log('Prize =>', payment)
  // document.querySelector('#min-payment').textContent = `${payment}` ?? '0';
}
