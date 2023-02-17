document.addEventListener("DOMContentLoaded", function (event) {
  var newPosition = 0;
  var currentId = 0;
  var prevId;
  var arrowNext = document.getElementById("front_arrow");
  var arrowPrev = document.getElementById("back_arrow");
  var joindiv = document.getElementById("section-9");
  var navigation = document.getElementById("content_nav");
  var bgImage = document.getElementById("bg_img");
  var coordinatesArray = [0, 125, 225, 350, 495, 625, 780, 940, 940, 1060];
  const bgUnit = "vh";

  //   handles mobile view or desktop view

  /* Storing user's device details in a variable*/
  let details = navigator.userAgent;

  /* Creating a regular expression
  containing some mobile devices keywords
  to search it in details string*/
  let regexp = /android|iphone|kindle|ipad/i;

  /* Using test() method to search regexp in details
  it returns boolean value*/
  let isMobileDevice = regexp.test(details);

  if (isMobileDevice) {
    coordinatesArray = [0, 200, 300, 370, 525, 720, 860, 1060, 1060, 1110];
  } else {
    coordinatesArray = [0, 125, 225, 350, 495, 625, 780, 940, 940, 1060];
  }

  // handles the preloader
  function vanish() {
    document.getElementById("loader").classList.add("disppear");
    document.getElementById("loader").classList.add("img");
  }

  setTimeout(vanish, 500);

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

  // handles display of arrows depending on the page

  function checkArrowVisibility() {
    arrowNext.style.visibility = currentId == 9 ? "hidden" : "visible";
    arrowPrev.style.visibility = currentId == 0 ? "hidden" : "visible";
    joindiv.style.visibility = currentId == 9 ? "visible" : "hidden";
  }

  function renderPage(coordinates) {
    // set new bg to a new position using the coordinates
    newPosition = coordinates;
    bgImage.style["transform"] = "translate(" + newPosition + bgUnit + ", 0)";

    // hide previous section
    if (prevId != null) {
      var prevArticleId = "section-" + prevId,
        prevArticle = document.getElementById(prevArticleId),
        prevNavButton = document.getElementById(prevId);

      if (prevId != 9) {
        prevArticle.style.opacity = 0;
      }
      prevNavButton.className = "";
    }

    // shows current page or item clicked
    const newNavButton = document.getElementById(currentId);
    newNavButton.classList.add(`listitem--clicked`);

    // timer to display current page section
    setTimeout(() => {
      const articleId = `section-${currentId}`;
      const currentArticle = document.getElementById(articleId);
      currentArticle.style.opacity = 1;
    }, 500);

    checkArrowVisibility();
    prevId = currentId;
  }

  checkArrowVisibility();
  renderPage(0);
});
