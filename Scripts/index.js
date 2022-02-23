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


//Filter DOM
let closeFilters = document.querySelectorAll('.filter-close')
let openFilters = document.querySelectorAll('.filter-open') 
let filtersInputContainer = document.querySelectorAll('.tagInputContainer') 
let openFiltersChevronUp = document.querySelectorAll('.fa-chevron-up')

for (let i = 0; i < closeFilters.length; i++) {
    closeFilters[i].addEventListener('click', filtersOpen)
}

for (let i = 0; i < filtersInputContainer.length; i++) {
    openFiltersChevronUp[i].addEventListener('click', filtersClose)
}

function filtersOpen(e){
    let filterCloseTarget = e.target
    let openFilter = document.querySelector(`#${filterCloseTarget.name}-open`)
     for (let i = 0; i < openFilters.length; i++) {
        if(!openFilters[i].classList.contains('close')) {
            openFilters[i].classList.add('close')
            closeFilters[i].classList.remove('close')
        }
    }
    openFilter.classList.remove('close')
    filterCloseTarget.classList.add('close') 
}

function filtersClose(e){
    let filterCloseTarget = e.target.parentNode.parentNode
    console.log(filterCloseTarget);
    filterCloseTarget.classList.add('close')
    let closeFilter = document.querySelector(`#${filterCloseTarget.getAttribute('name')}-close`)
    closeFilter.classList.remove('close')

}


//DisplayTags
const tagsContainer = document.querySelector('#tags')
let tags = document.querySelectorAll('.tagBtn')
let selectedTags = document.querySelectorAll('.tag-selected')

for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener('click', displayTagSelected)
}

function displayTagSelected(e) {
    let newTag = document.createElement('button')
    let tagType = e.target.parentNode.parentNode.parentNode
    newTag.classList.add('btn', 'tag-selected', 'me-2')
    newTag.innerHTML = `${e.target.textContent}<i class="fa-regular fa-circle-xmark"></i>`
    if (tagType.getAttribute('name') === 'btn-ustenciles') {
        newTag.style.backgroundColor = "#ED6454"
    } else if (tagType.getAttribute('name') === 'btn-ingredients') {
        newTag.style.backgroundColor = "#3282F7"
    } else if (tagType.getAttribute('name') === 'btn-appareils') {
        newTag.style.backgroundColor = "#68D9A4"
    }
    tagsContainer.appendChild(newTag)
    selectedTags = document.querySelectorAll('.tag-selected')
    for (let i = 0; i < selectedTags.length; i++) {
        selectedTags[i].addEventListener('click', eraseTagSelected)
    }
}

for (let i = 0; i < selectedTags.length; i++) {
    selectedTags[i].addEventListener('click', eraseTagSelected)
}

function eraseTagSelected(e) {
    console.log(e.target);
    e.target.remove()
}


//Get SearchBar Input
let searchBarInput = document.querySelector('.form-control')
searchBarInput.addEventListener('input', characterCheck)
const noRecipeFoundMsg = document.querySelector('.noRecipeFound')

//If at least 3 character in serachBar call filter function, else do nothing
function characterCheck()
{
    if(searchBarInput.value.length >= 3) {
        searchBarFilter()
    } else displayRecipes(recipes)
}

//Filter for search Bar : title, decription and ingredients
let searchBarRecipe
function searchBarFilter()
{
    //Get search bar input value
    const userSearch = searchBarInput.value.toLowerCase()
    //Clear Cards Section
    cardsSection.innerHTML = ''

    let searchBarResults = [];

    searchBarResults = recipes.filter(
        el => el.name.toLocaleLowerCase().includes(userSearch)
    || el.description.toLocaleLowerCase().includes(userSearch)
    || ingredientsList(el)
    )

    if (searchBarResults.length == 0) {
        noRecipeFoundMsg.classList.remove('close')
    } else {
        noRecipeFoundMsg.classList.add('close')
        displayRecipes(searchBarResults)
    }

    tagsAvailable(searchBarResults)
     
}

//Filter ingredients in a recipeArray to define in parameter
function ingredientsList(recipeArray)
{
    if (recipeArray.ingredients.find(el => el.ingredient.includes(searchBarInput.value.toLowerCase()))) return true
    return false
}

let filtredUstencils
let ustencilsArray
let ustencilsWitoutDuplicates
let filtredAppliances
let appliancesWitoutDuplicates
let filtredIngredients
let ingredientsArray
let ingredientsWitoutDuplicates

//Tags Available actualisation
 function tagsAvailable(recipes) {
    filtredUstencils = []
    ustencilsArray = []
    ustencilsWitoutDuplicates = []
    filtredAppliances = []
    appliancesWitoutDuplicates = []
    filtredIngredients = []
    ingredientsArray = []
    ingredientsWitoutDuplicates = []

    filtredIngredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
    for (let i = 0; i < filtredIngredients.length; i++) ingredientsArray.push(...filtredIngredients[i])
    ingredientsWitoutDuplicates = [...new Set(ingredientsArray)]

    filtredAppliances = recipes.map(recipe => recipe.appliance)
    appliancesWitoutDuplicates = [...new Set(filtredAppliances)]

    filtredUstencils = recipes.map(recipe => recipe.ustensils)
    for (let i = 0; i < filtredUstencils.length; i++) ustencilsArray.push(...filtredUstencils[i])
    ustencilsWitoutDuplicates = [...new Set(ustencilsArray)]

    DisplayTagsAvailable(ingredientsWitoutDuplicates, appliancesWitoutDuplicates, ustencilsWitoutDuplicates)
} 

function DisplayTagsAvailable(ingredientsTags, appliancesTags, ustencilesTags) {
    const tagsChoiceContainer = document.querySelectorAll('.tagChoiceContainer')
    for (let i = 0; i < tagsChoiceContainer.length; i++) {
        tagsChoiceContainer[i].innerHTML = ''
    }

    ingredientsTags.forEach(el => {
        let ingredientTag = document.createElement('div')
        let tagContainer = document.querySelector('.ingredientsTags')
        ingredientTag.classList.add('tag', 'col-4', 'mb-1')
        ingredientTag.innerHTML = el 
        tagContainer.appendChild(ingredientTag)
    });

    appliancesTags.forEach(el => {
        let appliancesTag = document.createElement('div')
        let tagContainer = document.querySelector('.appliancesTags')
        appliancesTag.classList.add('tag', 'col-4', 'mb-1')
        appliancesTag.innerHTML = el 
        tagContainer.appendChild(appliancesTag)
    });

    ustencilesTags.forEach(el => {
        let ustencilesTag = document.createElement('div')
        let tagContainer = document.querySelector('.ustencilesTags')
        ustencilesTag.classList.add('tag', 'col-4', 'mb-1')
        ustencilesTag.innerHTML = el 
        tagContainer.appendChild(ustencilesTag)
    });    
}
