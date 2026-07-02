function subscribePopup(e) {
  e.preventDefault();
  const email = document.getElementById("popupEmail").value;
  if (email && email.includes("@")) {
    document.getElementById("popup").classList.remove("active");
    localStorage.setItem("popupClosed", "true");
    alert("Welcome! Your 10% OFF code is WELCOME10");
  } else {
    alert("Please enter a valid email.");
  }
}

function subscribeFooter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (email && email.includes("@")) {
    alert("Subscribed successfully!");
    e.target.reset();
  }
}

function closePopup() {
  document.getElementById("popup").classList.remove("active");
  localStorage.setItem("popupClosed", "true");
}

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("popupClosed")) {
    setTimeout(() => {
      document.getElementById("popup").classList.add("active");
    }, 2000);
  }
});