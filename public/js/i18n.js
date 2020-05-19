const languageSelector = document.getElementById('language-selector');

languageSelector.addEventListener('change', (e) => {
  const language = e.target.value;

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
});

function translate(translations) {
  const elementsToTranslate = document.querySelectorAll('[data-i18n]');

  elementsToTranslate.forEach((element) => {
    const translationKey = element.getAttribute('data-i18n');
    element.textContent = translations[translationKey];
  });
}
