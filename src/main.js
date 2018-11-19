import {adapters} from './services';
import * as service from './services/utils';
import './styles/main.scss';

const $input = document.getElementById('input');
const $clearBtn = document.getElementById('clear-cookie');
const $tasksList = document.getElementById('tasks-list');

$clearBtn.addEventListener('click', () => {
  service.removeAll(adapters);
  $tasksList.innerHTML = '';
});

$input.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const {value} = event.target;

    service.save(adapters, value);
    renderTask(createTask(value));
    event.target.value = '';
  }
});

$tasksList.addEventListener('click', event => {
  if (event.target.classList.contains('remove')) {
    const [$valueElement] = event.target.parentNode.getElementsByClassName('value');
    const value = $valueElement.textContent;

    $tasksList.removeChild(event.target.parentNode);
    service.remove(adapters, value);
  }
});

const createTask = value => {
  const $li = document.createElement('li');

  $li.innerHTML = `
    <span class="value">${value}</span>
    <span class="remove">&#x274C;</span>  
  `;

  return $li;
};

const renderTask = data => {
  $tasksList.appendChild(data);
};

const initialize = arr => {
  arr.forEach(item => renderTask(createTask(item)));
};


adapters.indexedDb.read();
adapters.mLab.read()
  .then(data => {
    initialize(data);
  });

