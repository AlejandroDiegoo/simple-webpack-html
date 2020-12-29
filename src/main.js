import '@fortawesome/fontawesome-free/js/all';
import './styles.scss';

const fillTable = (items) => {
  let tableContent = '';
  items.forEach((repository) => {
    tableContent += `
        <tr>
          <td>${repository.name}</td>
          <td><a href="${repository.html_url}" target="_blank">${repository.html_url}</a></td>
        </tr>
      `;
  });
  document.querySelector('#table-results tbody').innerHTML = tableContent;
};

const showLoading = () => {
  document.querySelector('#table-results tbody').innerHTML = `
    <tr class="loading">
      <td colspan="2">
        <span></span>
      </td>
    </tr>
  `;
  document.querySelector('#table-results').removeAttribute('data-hidden');
};

const showError = () => {
  document.querySelector('#table-results tbody').innerHTML = `
    <tr class="error">
      <td colspan="2">
        Ha ocurrido un error al recuperar los datos
      </td>
    </tr>
  `;
};

function searchRepositories() {
  const searchTerm = document.querySelector('#search-form input').value;
  showLoading();
  fetch(
    `https://api.github.com/search/repositories?q=${searchTerm}&page=1&per_page=10&sort=stars&order=desc`
  )
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      fillTable(response.items);
    })
    .catch(() => showError());
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('search-button')
    .addEventListener('click', searchRepositories);
});
