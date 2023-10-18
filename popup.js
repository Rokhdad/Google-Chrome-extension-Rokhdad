document.addEventListener('DOMContentLoaded', function() {
  const statusElement = document.getElementById('status');

  // اجرای کد بررسی دامنه و ارسال درخواست به API
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    const currentURL = currentTab.url;

    if (currentURL && currentURL.includes("eseminar.tv")) {
      const apiURL = `https://api.rokhdad.media/eseminar/checkoff.php?title=${currentURL}`;
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          if (data.result === 1) {
            statusElement.textContent = "Ok";
          } else {
            statusElement.textContent = "not Ok";
          }
        })
        .catch(error => {
          statusElement.textContent = "Error API";
          console.error(error);
        });
    } else {
      statusElement.textContent = "No Eseminar";
    }
  });
});
