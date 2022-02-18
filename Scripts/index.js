//Display Recipes with datas
function displayRecipes(recipeArray) {
    //cards location
	const cardsSection = document.querySelector('#cardsSection')
    //Clear Cards Section
    cardsSection.innerHTML = ''
    //cards creation loop
    recipeArray.forEach((recipe) => {
        cardCreation(recipe)
    })
}

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

    cardContainer1.classList.add('col-4', 'my-4', 'px-4')
    cardContainer2.classList.add('card', 'w-100')
    cardImg.setAttribute('src', './Assets/img-placeholder.png')
    cardBody.classList.add('card-body')
    cardBodyHead.classList.add('row', 'cardHead')
    cardBodyContent.classList.add('row', 'cardContent')
    cardTitleContainer.classList.add('col-8')
    cardTimeContainer.classList.add('col-3', 'd-flex', 'align-items-center', 'justify-content-end', 'pe-0',  'time-section')
    cardBodyContent.classList.add('row')
    cardIngredients.classList.add('col-6')
    cardDescription.classList.add('col-6', 'cardDescription')
    cardListGroup.classList.add('list-group')

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

displayRecipes(recipes)

//Get SearchBar Input
let searchBarInput = document.querySelector('.form-control')
searchBarInput.addEventListener('input', characterCheck)

//If at least 3 character in serachBar call filter function, else do nothing
function characterCheck()
{
    if(searchBarInput.value.length >= 3) {
        searchBarFilter()
    } else displayRecipes(recipes)
}

//Filter for search Bar : title, decription and ingredients
function searchBarFilter()
{
    //Get search bar input value
    const userSearch = searchBarInput.value.toLowerCase()
    //Clear Cards Section
    cardsSection.innerHTML = ''

    let results = [];

    //Filter in names, decriptions and ingredients
    results = results.concat(recipes.filter(el => el.name.toLocaleLowerCase().includes(userSearch)))
    results = results.concat(recipes.filter(el => el.description.toLocaleLowerCase().includes(userSearch)))
    results = results.concat(recipes.filter(el => ingredientsList(el)))

    displayRecipes(results)
}

//Filter ingredients in a recipeArray to define in parameter
function ingredientsList(recipeArray)
{
    if (recipeArray.ingredients.find(el => el.ingredient.includes(searchBarInput.value.toLowerCase()))) return true
    return false
}