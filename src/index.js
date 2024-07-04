const addListBtn = document.querySelector('.add-list-btn');
const wrapperForm = document.querySelector('.wrapper-form');

let LIST = [];
let draggetList = null;

function createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element
}

function addNewList(newList) {
    LIST.push(newList)
}

function deleteListForId(id) {
    const index = LIST.findIndex((list) => list.id === id);
    LIST.splice(index, 1)
}

// function listForId(id) {
//     const findBtnList = LIST.find((list) => list.id === id);
//     console.log(findBtnList);
// }

function getListId(event) {
    const parentNode = event.target.closest('.list-form');
    if (!parentNode?.id) return;
    const id = Number(parentNode.id);
    return id;
}

function getInputText(event) {
    event.preventDefault();
    const textCard = document.querySelector('.text-card')

    const cardText = textCard.value;
    console.log(cardText)
    return cardText;
}

function showListForm() {
    const newList = {
        id: Math.floor(Math.random() * 200) + 1,
        text: '',
    }
    console.log(newList)
    addNewList(newList);
    renderList();
}

function renderList() {
    wrapperForm.innerHTML = '';

    LIST.find((list) => {
        const changeClassCard = list.isChange ? "btn-list add-card" : "btn-list";
        const item = createElement('div', 'list-form');
        item.setAttribute('id', list.id);

        const createList = `
                           <input value='${list.text}' data-action="input" class="input-list" type="text" placeholder="Add new list">
                           <div class="cards">
                           <span data-action="name-card-one" class="name-card-one">${list.text}</span>
                           </div>
                           <textarea class="text-card text-card-none" placeholder="Enter your text for this card"></textarea>
                           <div class="wrapper-buttons">
                           <button type="submit" data-action="btn-list" class="btn-list">Add list</button>
                           <button  type="submit" data-action="add-card" class="add-card add-card-none">Add a card</button>
                           <button type="submit" data-action="add-new-card" class="add-new-card add-new-card-none">Add a card</button>
                           <button data-action="delete-btn" class="btn-delete">X</button>
                           <button data-action="btn-delete-card" class="btn-delete-card btn-delete-card-none">X</button>
                           </div>
                        `;

        item.innerHTML = createList;
        wrapperForm.appendChild(item);
    });
    console.log(LIST)
}

function addCardAndChangeClass(id) {
    const toggleButtonCard = LIST.find((card) => card.id === id);
    toggleButtonCard.isChange = !toggleButtonCard.isChange;
    console.log(toggleButtonCard)
}


function changeBtnListOnCard() {
    addList = document.querySelector('.btn-list');
    addList.hidden = true;
}

function changeBtnCard() {
    const addCard = document.querySelector('.add-card');
    addCard.classList.toggle('add-card-none');
}

function hiddenBtnDelete() {
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.style.display = 'none';
}

function addNewBtnCard() {
    const addNewCard = document.querySelector('.add-new-card');
    addNewCard.classList.toggle('add-new-card-none');
}

function newDeleteButtonCard() {
    const btnDeleteCard = document.querySelector('.btn-delete-card');
    btnDeleteCard.classList.toggle('btn-delete-card-none');
}

function showTextarea() {
    const textCard = document.querySelector('.text-card');
    textCard.classList.toggle('text-card-none');
    textCard.focus();
}

function actionsList(e) {
    const id = getListId(e);
    const action = e.target.dataset.action;

    if (action === "btn-list") {
        // listForId(id);
        changeBtnListOnCard()
        changeBtnCard()
        hiddenBtnDelete()
    }


    if (action === "add-card") {
        changeBtnCard();
        addNewBtnCard();
        newDeleteButtonCard();
        showTextarea();
    }

    if (action === "add-new-card") {
        const text = getInputText(e);

        const cards = document.querySelectorAll('.cards');
        const textCard = document.querySelector('.text-card');

        const newCard = createElement('span', 'name-card');
        newCard.textContent = text;
        newCard.draggable = true;
        cards[0].appendChild(newCard)

        textCard.value = '';
        textCard.focus();
    }

    if (action === "delete-btn") {
        deleteListForId(id);
        renderList();
    }

    if (action === "btn-delete-card") {
        newDeleteButtonCard();
        changeBtnCard();
        addNewBtnCard();
        showTextarea();
    }

    if (action === "name-card-one") {
        console.log('DRAG')
        dragAndDrop();
        renderList();
    }
}


function dragAndDrop() {
    const cards = document.querySelectorAll('.cards');
    const dragCard = document.querySelectorAll('.name-card-one');

    for (let i = 0; i < dragCard.length; i++) {
        const card = dragCard[i];
        console.log(card)
        card.addEventListener('dragstart', () => {
            draggetList = card;
            setTimeout(() => {
                card.style.display = 'none';
            }, 0)
        })

        card.addEventListener('dragend', () => {
            draggetList = card;
            setTimeout(() => {
                card.style.display = 'block';
                draggetList = null;
            }, 0)
        })

        for (let j = 0; j < cards.length; j++) {
            const card = cards[j];
            card.addEventListener('dragover', e => e.preventDefault());
            card.addEventListener('drop', function (e) {
                e.preventDefault();
                this.append(draggetList)
            });
        }
    }
}


function inputController(e) {
    const id = getListId(e);
    const text = e.target.value;
    const elem = LIST.findIndex((task) => task.id === id);
    LIST[elem].text = text;
}

function init() {
    addListBtn.addEventListener('click', showListForm);
    wrapperForm.addEventListener('click', actionsList);
    wrapperForm.addEventListener('input', inputController);
}

init();