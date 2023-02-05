import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';

export const addTask = (evento) => {
  const list = document.querySelector('[data-list]');
  const task = createTask(evento);
  list.appendChild(task);
};

const createTask = (evento) => {
  evento.preventDefault();
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log(taskList);
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector('[data-form-date]');
  const value = input.value;
   // Capturar valor de fecha
  const date = calendar.value;
  //se descarga la libreria moment desde cdnjs.com
    // dar formato a la fecha con la libreria moment
  const dateFormat = moment(date).format('DD/MM/YYYY');
  console.log(dateFormat);
  const task = document.createElement('li');
  task.classList.add('card');
  input.value = '';
  //backticks
  const taskContent = document.createElement('div');

  const taskObj = {
    value,
    dateFormat,
  };

  taskList.push(taskObj);

    /* localStorage solo registra la ultima actividad y reescribe los datos, para evitar este problema se crea una constante tipo array y se agregan los objetos con array.push de esta forma siembre esta agregando el mismo array actualizado, también es importante saber que guarda los datos de una manera permanente solo hasta borrar la cache del navegador
    */
  localStorage.setItem('tasks', JSON.stringify(taskList));

      /*Este es el metodo que permite guardar en sessionStorage y recibe dos parametros, uno es la llave y otro es el objeto, todo debe ser string por eso se debe convertir antes de hacer el guardado */
    sessionStorage.setItem('task', JSON.stringify(taskList));

  const titleTask = document.createElement('span');
  titleTask.classList.add('task');
  titleTask.innerText = value;
  taskContent.appendChild(checkComplete());
  taskContent.appendChild(titleTask);
  // task.innerHTML = content;

     /* Crear el elemento span para agregarlo a la lista */
  const dateElement = document.createElement('span');
  dateElement.innerHTML = dateFormat;
    /* console.log(dateElement) */
  
    /* en la lista agregame los siguientes 
    elementos */
  task.appendChild(taskContent);
  task.appendChild(dateElement);
  task.appendChild(deleteIcon());
  return task;
};
