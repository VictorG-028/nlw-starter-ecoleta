  function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li") // Pega todos os li's
for (const item of itemsToCollect) { // Coloca um escutador para cada item da lista de itens
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")// Adicionar ou remover uma classe

    const itemId = itemLi.dataset.id

    // verificar se existem items selecionados, se sim
    // pegar os itens selecionadosa
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = (item == itemId)
        return itemFound
    })
    
    if ( alreadySelected >= 0 ) { // Se já estiver selecionado,
        // Tirar  da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        selectedItems.push(itemId)// Adicionar à selecao
    }

    collectedItems.value = selectedItems // Atualizar o campo escondido com os itens selecionados
}
