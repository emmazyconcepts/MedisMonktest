// handles the preloader
function vanish() {
  document.getElementById("loader").classList.add("disppear");
  document.getElementById("loader").classList.add("img");
}

document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(vanish, 500);
});
