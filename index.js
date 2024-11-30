$(function () {
  // Инициализация slick-слайдера
  function initSlickSlider() {
    $("#product-slider").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
    });
  }
  initSlickSlider();

  const contentDiv = document.querySelector("#content");
  const linkElementS = document.querySelectorAll("a");
  const loadingOverlay = document.querySelector("#loading-overlay");

  // Показ/Скрытие загрузки страницы
  const showLoadingOverlay = () => {
    loadingOverlay.style.opacity = "1";
  };

  const hideLoadingOverlay = () => {
    loadingOverlay.style.opacity = "0";
  };

  const loadScripts = (url) => {
    if (url.includes("product")) {
      initSlickSlider();
    }
  };

  const loadPage = (url) => {
    showLoadingOverlay();

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newContent = doc.querySelector("#content").innerHTML;

        contentDiv.classList.add("fade-out");

        contentDiv.innerHTML = newContent;
        document.title = doc.title;

        setTimeout(() => {
          contentDiv.classList.remove("fade-out");
          history.pushState({}, "", url);
          hideLoadingOverlay();
          bindCategoryToggle();
          basketToggle();
        }, 500);
      })
      .then(() => {
        loadScripts(url);
      });
  };

  linkElementS.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const url = e.currentTarget.getAttribute("href");
      loadPage(url);
    });
  });

  loadPage(window.location.pathname);

  window.addEventListener("popstate", () => {
    loadPage(window.location.pathname);
  });

  // Открытие/закрытие категории
  function bindCategoryToggle() {
    $("#btnOpenCategory")
      .off("click")
      .on("click", function () {
        const $categoryBlock = $("#categoryBlock");
        const $btnSpans = $("#btnOpenCategory > span");

        $categoryBlock.toggleClass("category-active");
        $(this).toggleClass("btn-shift");
        $btnSpans.eq(0).toggleClass("close-span-top");
        $btnSpans.eq(1).toggleClass("close-span-mid");
        $btnSpans.eq(2).toggleClass("close-span-bottom");
      });
  }

  bindCategoryToggle();

  // Добавление товара в корзину
  function basketToggle() {
    const $addingNotification = $(".adding-notification");

    $("#basketBtn")
      .off("click")
      .on("click", function (e) {
        $addingNotification.fadeIn(400).css({ display: "flex" });
        console.log("btn work2");

        setTimeout(() => {
          console.log("btn work3");
          $addingNotification.fadeOut(400, function () {
            $(this).css("display", "none");
          });
        }, 1500);
      });
  }

  basketToggle();
});
