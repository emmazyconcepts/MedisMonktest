document.addEventListener("DOMContentLoaded", function (event) {
  // handles the preloader
  function vanish() {
    document.getElementById("loader").classList.add("disppear");
    document.getElementById("loader").classList.add("img");
  }

  setTimeout(vanish, 5000);

  var arrowNext = document.getElementById("front_arrow");
  var arrowPrev = document.getElementById("back_arrow");
  var joindiv = document.getElementById("section-9");

  var bgImage = document.getElementById("bg_img");
  var navigation = document.getElementById("content_nav");
  var newPosition = 0;
  var currentId = 0;
  var prevId;

  const coordinatesArray = [0, 125, 225, 350, 495, 625, 780, 900, 940, 1060];
  const lengthUnit = "vh";

  function getCoordinates(coordinatesArray, pageId) {
    return `-${coordinatesArray[pageId]}`;
  }

  arrowNext.addEventListener("click", () => {
    currentId++;
    const nextPageCoordinates = getCoordinates(coordinatesArray, currentId);
    renderPage(nextPageCoordinates);
  });

  arrowPrev.addEventListener("click", () => {
    currentId--;
    const nextPageCoordinates = getCoordinates(coordinatesArray, currentId);
    renderPage(nextPageCoordinates);
  });

  navigation.addEventListener("click", (event) => {
    const coordinates = getCoordinates(coordinatesArray, event.target.id);
    currentId = event.target.id;
    renderPage(coordinates);
  });

  function checkArrowVisibility() {
    arrowNext.style.visibility = currentId === 9 ? "hidden" : "visible";
    joindiv.style.visibility = currentId === 9 ? "visible" : "hidden";
    arrowPrev.style.visibility = currentId === 0 ? "hidden" : "visible";
  }

  function renderPage(coordinates) {
    // set new bg position
    newPosition = coordinates;
    bgImage.style["transform"] =
      "translate(" + newPosition + lengthUnit + ", 0)";

    // hide previous content
    if (prevId != null) {
      var prevArticleId = "section-" + prevId,
        prevArticle = document.getElementById(prevArticleId),
        prevNavButton = document.getElementById(prevId);

      if (prevId != 9) {
        prevArticle.style.opacity = 0;
      }
      prevNavButton.className = "";
    }

    // display current page on navigation
    var newNavButton = document.getElementById(currentId);
    newNavButton.className = "listitem--clicked";

    // display current page contents
    setTimeout(function () {
      var articleId = "section-" + currentId,
        currentArticle = document.getElementById(articleId);

      currentArticle.style.opacity = 1;
    }, 500);

    checkArrowVisibility();
    // set previous page id to the current one
    prevId = currentId;
  }

  checkArrowVisibility();
  renderPage(0);
});
