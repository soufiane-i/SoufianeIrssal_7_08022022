//HTML and CSS Card Creation
function cardCreation(recipe) {
    let cardContainer1 = document.createElement('div')
    let cardContainer2 = document.createElement('div')
    let cardImg = document.createElement('img')
    let cardBody = document.createElement('div')
    let cardBodyHead = document.createElement('div')
    let cardBodyContent = document.createElement('div')
    let cardTitleContainer = document.createElement('div')
    let cardTitle = document.createElement('h2')
    let cardTimeContainer = document.createElement('div')
    let cardIngredients = document.createElement('div')
    let cardDescription = document.createElement('div')
    let cardListGroup = document.createElement('ul')

    cardContainer1.classList.add('col-4', 'my-4')
    cardContainer2.classList.add('card')
    cardImg.setAttribute('src', `./Assets/recipes/${recipe.name.toLowerCase()}.jpg`)
    cardBody.classList.add('card-body')
    cardBodyHead.classList.add('row', 'cardHead')
    cardBodyContent.classList.add('row', 'cardContent')
    cardTitleContainer.classList.add('col-8')
    cardTimeContainer.classList.add('col-4', 'd-flex', 'align-items-center', 'justify-content-center', 'pe-0',  'time-section')
    cardBodyContent.classList.add('row')
    cardIngredients.classList.add('col-6')
    cardDescription.classList.add('col-6', 'cardDescription')
    cardListGroup.classList.add('list-group')
    cardImg.classList.add('imgRecipe')

    cardTitle.innerHTML = recipe.name
    cardTimeContainer.innerHTML = `<i class="fa-regular fa-clock fa-lg me-2"></i>
    <p><span class="time">${recipe.time}</span> min</p>`
    cardDescription.innerHTML = recipe.description
    recipe.ingredients.forEach((ingredientArray) => {
        let ingredientGroup = document.createElement('li')
        let ingredientSpan = document.createElement('span')

        let ingredient = ingredientArray.ingredient
        let quantity = ingredientArray.quantity
        let unit = ingredientArray.unit
        ingredientGroup.classList.add('list-group-item', 'border-0', 'py-0', 'px-0')
        ingredientSpan.innerHTML = ingredient
        ingredientGroup.appendChild(ingredientSpan)
        if (!(quantity == undefined)) {
            let quantitySpan = document.createElement('span')
            quantitySpan.innerHTML = ': ' + quantity
            ingredientGroup.appendChild(quantitySpan)
        }

        if (!(unit == undefined)) {
            let unitSpan = document.createElement('span')
            unitSpan.innerHTML = ' ' + unit
            ingredientGroup.appendChild(unitSpan)
        } else {}
        cardListGroup.appendChild(ingredientGroup)
    })

    cardsSection.appendChild(cardContainer1)
    cardContainer1.appendChild(cardContainer2)
    cardContainer2.appendChild(cardImg)
    cardContainer2.appendChild(cardBody)
    cardBody.appendChild(cardBodyHead)
    cardBody.appendChild(cardBodyContent)
    cardBodyHead.appendChild(cardTitleContainer)
    cardBodyHead.appendChild(cardTimeContainer)
    cardTitleContainer.appendChild(cardTitle)
    cardBodyContent.appendChild(cardIngredients)
    cardBodyContent.appendChild(cardDescription)
    cardIngredients.appendChild(cardListGroup)
}