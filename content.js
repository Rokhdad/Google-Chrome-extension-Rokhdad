function sendRequest(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data.result))
    .catch(error => console.error(error));
}

function isEseminarDomain() {
  const currentDomain = window.location.hostname;
  return currentDomain === "eseminar.tv" || currentDomain.endsWith(".eseminar.tv");
}

async function main() {
  if (isEseminarDomain()) {
    createRokhdad();
    checkDiscount();
    const currentURL = window.location.href;
    const discountCode = "rokhdadmedia";
    const apiURL = `https://api.rokhdad.media/eseminar/checkoff.php?title=${currentURL}`;

    try {
      const result = await fetch(apiURL);
      const data = await result.json();

      if (data.video === 1) {
        createStickyBox("discount_code=rokhdadmedia");
      } else if (data.result === 1) {
        createStickyBox("discount_code=rokhdad");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function createStickyBox(discountCode) {
  const stickyBox = document.createElement('div');
  stickyBox.id = 'stickyBox';
  stickyBox.style.position = 'fixed';
  stickyBox.style.left = '15px';
  stickyBox.style.bottom = '70px';
  stickyBox.style.zIndex = '9999';
  stickyBox.style.padding = '30px';

  const discountImage = document.createElement('img');
  discountImage.src = chrome.runtime.getURL('assets/images/rokhdad/discount.png');

  const discountLink = document.createElement('a');
  const newURL = window.location.href.split("?")[0] + `?${discountCode}`;
  discountLink.href = newURL;

  stickyBox.appendChild(discountImage);
  discountLink.appendChild(stickyBox);
  document.body.appendChild(discountLink);
}

function createRokhdad() {
  const stickyBox = document.createElement('div');
  stickyBox.id = 'stickyBox';
  stickyBox.style.position = 'fixed';
  stickyBox.style.left = '15px';
  stickyBox.style.bottom = '185px';
  stickyBox.style.zIndex = '9999';
  stickyBox.style.padding = '30px';

  const rokhdadActivated = document.createElement('img');
  rokhdadActivated.src = chrome.runtime.getURL('assets/images/rokhdad/rokhdad-activated.png');

  const linkRokhdad = document.createElement('a');
  linkRokhdad.href = 'https://rokhdad.media/extention';

  stickyBox.appendChild(rokhdadActivated);
  linkRokhdad.appendChild(stickyBox);
  document.body.appendChild(linkRokhdad);
}

function checkDiscount() {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("discount_code") && urlParams.get("discount_code")) {
    const stickyBox = document.createElement('div');
    stickyBox.id = 'stickyBox';
    stickyBox.style.position = 'fixed';
    stickyBox.style.left = '15px';
    stickyBox.style.bottom = '70px';
    stickyBox.style.zIndex = '9999';
    stickyBox.style.padding = '30px';

    const discountImage = document.createElement('img');
    discountImage.src = chrome.runtime.getURL('assets/images/rokhdad/discountRokhdad.png');

    stickyBox.appendChild(discountImage);
    document.body.appendChild(stickyBox);
  }
}

main();
