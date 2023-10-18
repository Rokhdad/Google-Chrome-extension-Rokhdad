function sendRequest(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      callback(data.result);
    })
    .catch(error => console.error(error));
}

function isEseminarDomain() {
  const currentDomain = window.location.hostname;
  return currentDomain === "eseminar.tv" || currentDomain.endsWith(".eseminar.tv");
}

(async function () {
  if (isEseminarDomain()) {
	createRokhdad();
	checkDiscount();
    const currentURL = window.location.href;
    const apiURL = `https://api.rokhdad.media/eseminar/checkoff.php?title=${currentURL}`;
    
    try {
      const result = await fetch(apiURL);
      const data = await result.json();
      
      if (data.result === 1) {
        createStickyBox();
      }
    } catch (error) {
      console.error(error);
    }
  }
})();

function createStickyBox() {
  const stickyBox = document.createElement('div');
  stickyBox.id = 'stickyBox';
  stickyBox.style.position = 'fixed';
  stickyBox.style.left = '15px';
  stickyBox.style.bottom = '70px';
  stickyBox.style.zIndex = '9999';
  stickyBox.style.padding = '30px';
  //stickyBox.style.backgroundColor = 'white';
  //stickyBox.style.border = '1px solid #ccc';

// URL فعلی را از مرورگر خوانده و در متغیر originalURL ذخیره می‌کنیم
const originalURL = window.location.href;

// URL را با '/' به بخش‌های مختلف تقسیم می‌کنیم
const parts = originalURL.split("/");

// آخرین بخش را با '?' تقسیم کنید
const lastPart = parts[parts.length - 1].split("?");

// بخش اول (بدون علامت سوال) را برای ایجاد URL جدید استفاده کنید
const newURL = parts.slice(0, parts.length - 1).join("/") + "/" + lastPart[0]+"?discount_code=rokhdad";


  const discountImage = document.createElement('img');
  discountImage.src = chrome.runtime.getURL('discount.png');
   
  const discountLink = document.createElement('a');
  discountLink.href = newURL; // اینجا لینک تخفیف خود را قرار دهید
  
  //discountImage.style.width = '100px';

  const audio = new Audio(chrome.runtime.getURL('sound.mp3'));
  audio.volume = 0.5;

  stickyBox.appendChild(discountImage);
  discountLink.appendChild(stickyBox);
  document.body.appendChild(discountLink);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      audio.play();
    }
  });
}

function createRokhdad(){
	const stickyBoxx = document.createElement('div');
	stickyBoxx.id = 'stickyBoxx';
	stickyBoxx.style.position = 'fixed';
	stickyBoxx.style.left = '15px';
	stickyBoxx.style.bottom = '185px';
	stickyBoxx.style.zIndex = '9999';
	stickyBoxx.style.padding = '30px';
	
	
	const rokhdadactivated = document.createElement('img');
	rokhdadactivated.src = chrome.runtime.getURL('rokhdad-activated.png');
	
	const linkRokhdad = document.createElement('a');
	linkRokhdad.href = 'https://rokhdad.media/extention'; // اینجا لینک تخفیف خود را قرار دهید
  
	stickyBoxx.appendChild(rokhdadactivated);
	linkRokhdad.appendChild(stickyBoxx);
	document.body.appendChild(linkRokhdad);
}


function checkDiscount(){
	const urlParams = new URLSearchParams(window.location.search);

	// چک کردن وجود پارامتر discount_code با مقدار rokhdad
	if (urlParams.has("discount_code") && urlParams.get("discount_code") === "rokhdad") {
		
		const stickyBoxRokhdad = document.createElement('div');
		stickyBoxRokhdad.id = 'stickyBox';
		stickyBoxRokhdad.style.position = 'fixed';
		stickyBoxRokhdad.style.left = '15px';
		stickyBoxRokhdad.style.bottom = '70px';
		stickyBoxRokhdad.style.zIndex = '9999';
		stickyBoxRokhdad.style.padding = '30px';
	  
		const discountRokhdad = document.createElement('img');
		discountRokhdad.src = chrome.runtime.getURL('discountRokhdad.png');
	  
		stickyBoxRokhdad.appendChild(discountRokhdad);
		document.body.appendChild(stickyBoxRokhdad);
  
  
	}
}