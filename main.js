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
   fields.forEach(field => field.value = "")
}


const saveClient = () => {
  if(isValidFields()){
      const client = {
         tipoCliente: document.getElementById('tipo-cliente').value,
         nome: document.getElementById('nome').value,
         cpf: document.getElementById('cpf').value,
         email: document.getElementById('email').value,
         telefone: document.getElementById('telefone').value,
         tipoTelefone: document.getElementById('tipo-telefone').value,
         endereco: document.getElementById('endereco').value,
         tipoEndereco: document.getElementById('tipo-endereco').value,
      }
      createClient(client) 
      closeModal()
  }
}

//-----Eventos-----
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient)

document.getElementById('cancelar').addEventListener('click', clearFields)
