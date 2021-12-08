const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () =>
  document.getElementById('modal').classList.remove('active')

const tempClient = {
  nome: 'Mateus',
  email: 'mateusdfl18@gmail.com',
  cpf: '4820768813',
  telefone: '1996489694',
  endereco: 'Avenida Dr Paulo, 231 SP'
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))
//----CRUD----

//CREATE
const createClient = (client) => {
  const dbClient = getLocalStorage()
  dbClient.push (client)
  setLocalStorage(dbClient)
}
//READ
const readClient = () => getLocalStorage()



//-----Eventos-----
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)
