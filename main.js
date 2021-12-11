const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
  clearFields()
  document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? []
const setLocalStorage = dbClient =>
  localStorage.setItem('dbClient', JSON.stringify(dbClient))

//----CRUD----

//CREATE
const createClient = client => {
  const dbClient = getLocalStorage()
  dbClient.push(client)
  setLocalStorage(dbClient)
}

//READ
const readClient = () => getLocalStorage()

//UPDATE
const updateClient = (index, client) => {
  const dbClient = readClient()
  dbClient[index] = client
  setLocalStorage(dbClient)
}

//DELETE
const deleteClient = index => {
  const dbClient = readClient()
  dbClient.splice(index, 1)
  setLocalStorage(dbClient)
}

const isValidFields = () => {
  return document.getElementById('form').reportValidity()
}

//Interação com o Layout

const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field')
  fields.forEach(field => (field.value = ''))
  document.getElementById('nome').dataset.index = 'new'
}

const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById('nome').value,
      cpf: document.getElementById('cpf').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      endereco: document.getElementById('endereco').value
    }
    const index = document.getElementById('nome').dataset.index
    if (index == 'new') {
      createClient(client)
      updateTable()
      closeModal()
    } else {
      updateClient(index, client)
      updateTable()
      closeModal()
    }
  }
}

const createRow = (client, index) => {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
      <td>${client.nome}</td>
      <td>${client.cpf}</td>
      <td>${client.email}</td>
      <td>${client.telefone}</td>
      <td>${client.endereco}</td>
      <td>
         <button type="button" class="button green" id="edit-${index}">Editar</button>
         <button type="button" class="button red" id="delete-${index}">Excluir</button>
      </td>
   `
  document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr')
  rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
  const dbClient = readClient()
  clearTable()
  dbClient.forEach(createRow)
}

const fillFields = client => {
  document.getElementById('nome').value = client.nome
  document.getElementById('cpf').value = client.cpf
  document.getElementById('email').value = client.email
  document.getElementById('telefone').value = client.telefone
  document.getElementById('endereco').value = client.endereco
  document.getElementById('nome').dataset.index = client.index
}

const editClient = index => {
  const client = readClient()[index]
  client.index = index
  fillFields(client)
  openModal()
}

const editDelete = event => {
  if (event.target.type == 'button') {
    const [action, index] = event.target.id.split('-')

    if (action == 'edit') {
      editClient(index)
    } else {
      const client = readClient()[index]
      const response = confirm(
        `Você tem certeza que deseja deletar o cliente ${client.nome}?`
      )
      if (response) {
        deleteClient(index)
        updateTable()
      }
    }
  }
}

updateTable()

//-----Eventos-----
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient)

document.getElementById('cancelar').addEventListener('click', clearFields)

document
  .querySelector('#tableClient>tbody')
  .addEventListener('click', editDelete)

// DARK MODE
const html = document.querySelector('html')
const button = document.querySelector('button[name=theme]')

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  bg: getStyle(html, '--bg-color'),
  colorText: getStyle(html, '--text-color'),
  secunColor: getStyle(html, ' --secundary-color')
}

const darkMode = {
  bg: '#131313',
  colorText: '#fff',
  secunColor: '#FFFFFF'
}

const changeColors = colors => {}

checkbox.addEventListener('change', ({ target }) => {
  target.checked ? changeColors() : changeColors()
})
