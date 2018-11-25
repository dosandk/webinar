import {getAdapter} from './services';

import './styles/main.scss';

const $input = document.getElementById('input');
const $clearBtn = document.getElementById('clear-cookie');
const $tasksList = document.getElementById('tasks-list');

const adapter = getAdapter('indexedDB');

$clearBtn.addEventListener('click', () => {
  adapter.removeAll();
  $tasksList.innerHTML = '';
});

$input.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const {value} = event.target;

    adapter.save(value);
    renderTask(createTask(value));
    event.target.value = '';
  }
});

$tasksList.addEventListener('click', event => {
  if (event.target.classList.contains('remove')) {
    const $li = event.target.parentNode;
    const [$valueElement] = $li.getElementsByClassName('value');
    const value = $valueElement.textContent;
    const index = getIndex($li);
    $tasksList.removeChild(event.target.parentNode);
    adapter.remove(value, index);
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

const getIndex = node => {
  const childs = $tasksList.childNodes;
  let i = 0;
  for (i; i < childs.length; i++) {
    if (node === childs[i]) break;
  }
  return i;
};

const renderTask = data => {
  $tasksList.appendChild(data);
};

const initialize = arr => {
  arr.forEach(item => renderTask(createTask(item)));
};

adapter.read()
  .then(data => {
    initialize(data);
  });

