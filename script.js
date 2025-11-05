function updateHistory(keyword) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    // Supprimer les doublons et limiter à 5
    history = history.filter(item => item.toLowerCase() !== keyword.toLowerCase());
    history.unshift(keyword);
    if (history.length > 5) history = history.slice(0, 5);
  
    localStorage.setItem('searchHistory', JSON.stringify(history));
    renderHistory();
  }
  
  function renderHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
  
    history.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      li.onclick = () => {
        searchInput.value = item;
        searchTerm();
      };
      historyList.appendChild(li);
    });
  }
  
  // Appelle updateHistory() après chaque recherche
  function searchTerm() {
    const input = searchInput.value.toLowerCase();
    const entry = data[input];
    suggestionsList.innerHTML = '';
  
    if (entry) {
      resultBox.innerHTML = `
        <div class="result-box fade-in">
          <h2>${entry.title} <span class="category">${entry.category}</span></h2>
          <p>${entry.description}</p>
          <p class="example"><em>Exemple :</em> <code>${entry.example}</code></p>
          <img src="${entry.image}" alt="Logo ${entry.title}">
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="result-box fade-in">
          <p>Aucun résultat trouvé pour "<strong>${input}</strong>".</p>
        </div>
      `;
    }
    updateHistory(input);  // Ajouter l'entrée à l'historique
  }
  
  // Charger l'historique au démarrage
  document.addEventListener('DOMContentLoaded', renderHistory);
  
