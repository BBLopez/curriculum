const languageSelector = document.getElementById('language-selector');
const availableLanguages = ['ca', 'es'];
const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);

window.onload = () => {
  languageSelector.addEventListener('change', (e) => {
    getTranslations(e.target.value);
  });

  selectLanguageFromParam();
};

function translate(translations) {
  const elementsToTranslate = document.querySelectorAll('[data-i18n]');

  elementsToTranslate.forEach((element) => {
    const translationKey = element.getAttribute('data-i18n');
    element.textContent = translations[translationKey];
  });
}

function selectLanguageFromParam() {
  const lang = urlParams.get('lang');
  if (lang) {
    languageSelector.value = lang;
    getTranslations(lang);
  }
}

function setParamsToUrl(selectedLanguage) {
  const currentUrl = new URL(window.location.href);
  const params = new URLSearchParams(currentUrl.search);

  params.set('lang', selectedLanguage);

  currentUrl.search = params.toString();

  history.pushState(null, 'Bárbara López CV', currentUrl);
}

function getTranslations(language) {
  setParamsToUrl(language);

  fetch(`translations/translations.${language}.json`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
    .then((response) => response.json())
    .then((translations) => {
      translate(translations);
    })
    .catch((err) => {
      console.log(err);
    });
}
