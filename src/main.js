import {getAdapter} from './services';
import serviceTypes from './services/serviceTypes';

import './styles/main.scss';

// eslint-disable-next-line no-console
const onError = e => console.log(e);

const $input = document.getElementById('input');
const $clearBtn = document.getElementById('clear-cookie');
const $tasksList = document.getElementById('tasks-list');

const adapter = getAdapter(serviceTypes.indexDb);

$clearBtn.addEventListener('click', () => {
  adapter.removeAll()
    .then(() => $tasksList.innerHTML = '')
    .catch(onError);
});

$input.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const { value } = event.target;

    adapter.save(value)
      .then((data = value) => {
        renderTask(createTask(data));
        event.target.value = '';
      })
      .catch(onError);
  }
});

$tasksList.addEventListener('click', event => {
  if (event.target.classList.contains('remove')) {
    const [$valueElement] = event.target.parentNode.getElementsByClassName('value');   
    const value = $valueElement.textContent;
    const id = $valueElement.id;
    
    adapter.remove(value, id)
      .then(() => $tasksList.removeChild(event.target.parentNode))
      .catch(onError);
  }
});

const createTask = data => {
  const $li = document.createElement('li');
  let valueSpan = null;

  // TODO: need implement in all services use ids (currently only indexDb does)
  // Because services remove all data equal to passed value
  typeof data === 'string' 
    ? valueSpan = `<span class="value">${data}</span>`
    : valueSpan = `<span class="value" id="${data.id}">${data.value}</span>`;

  $li.innerHTML = `
    ${valueSpan}
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

adapter.read()
  .then(initialize)
  .catch(onError);

