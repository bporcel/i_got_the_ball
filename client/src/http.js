window.addEventListener('DOMContentLoaded', () => {
  getBallOwner();
  getPrize();
});

async function getBallOwner() {
  const response = await fetch("http://localhost:4242/ball-owner", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const { owner } = await response.json();

  console.log('frontend owner =>', owner)
  document.querySelector('#ball-owner').textContent = owner ?? 'No one';
}

async function getPrize() {
  const response = await fetch("http://localhost:4242/prize", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const { payment } = await response.json();

  console.log('highest payment =>', payment)
  document.querySelector('#claim').textContent = `${payment}€` ?? '0€';
}
