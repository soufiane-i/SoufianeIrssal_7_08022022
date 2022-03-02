//Filter DOM
let closeFilters = document.querySelectorAll('.filter-close')
let openFilters = document.querySelectorAll('.filter-open') 
let filtersInputContainer = document.querySelectorAll('.tagInputContainer') 
let openFiltersChevronUp = document.querySelectorAll('.fa-chevron-up')

let tagsContainer = document.querySelector('#tags')
let tags = document.querySelectorAll('.tagBtn')

//Tags Available actualisation

let ingredientsTagsSelection
let appliancesTagsSelection
let ustensilsTagsSelection
let filtredUstensils = []
let ustensilsArray = []
let ustensilsWitoutDuplicates = []
let filtredAppliances = []
let appliancesWitoutDuplicates = []
let filtredIngredients = []
let ingredientsArray = []
let ingredientsWitoutDuplicates = []

for (let i = 0; i < closeFilters.length; i++) closeFilters[i].addEventListener('click', filtersOpen)
for (let i = 0; i < filtersInputContainer.length; i++) openFiltersChevronUp[i].addEventListener('click', filtersClose)

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
    filterCloseTarget.classList.add('close')
    let closeFilter = document.querySelector(`#${filterCloseTarget.getAttribute('name')}-close`)
    closeFilter.classList.remove('close')
}

function eraseTagSelected(e) {
    e.target.parentNode.remove()
    filterByTag()
    tagsSelection()
    tagsAvailable(results)
}




//Refresh tags available data
function tagsAvailable(recipes) {
    filtredUstensils = []
    ustensilsArray = []
    ustensilsWitoutDuplicates = []
    filtredAppliances = []
    appliancesWitoutDuplicates = []
    filtredIngredients = []
    ingredientsArray = []
    ingredientsWitoutDuplicates = []

    filtredIngredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
    for (let i = 0; i < filtredIngredients.length; i++) ingredientsArray.push(...filtredIngredients[i])
    ingredientsWitoutDuplicates = [...new Set(ingredientsArray)]
    ingredientsWitoutDuplicates.sort()

    filtredAppliances = recipes.map(recipe => recipe.appliance)
    appliancesWitoutDuplicates = [...new Set(filtredAppliances)]
    appliancesWitoutDuplicates.sort()

    filtredUstensils = recipes.map(recipe => recipe.ustensils)
    for (let i = 0; i < filtredUstensils.length; i++) ustensilsArray.push(...filtredUstensils[i])
    ustensilsWitoutDuplicates = [...new Set(ustensilsArray)]
    ustensilsWitoutDuplicates.sort()

    DisplayTagsAvailable(ingredientsWitoutDuplicates, appliancesWitoutDuplicates, ustensilsWitoutDuplicates)
} 

// Display tags availabe
function DisplayTagsAvailable(ingredientsTags, appliancesTags, ustensilesTags) {

    const tagsChoiceContainer = document.querySelectorAll('.tagChoiceContainer')
    for (let i = 0; i < tagsChoiceContainer.length; i++) {
        tagsChoiceContainer[i].innerHTML = ''
    }

    TagsSelectionDOM(ingredientsTags, 'ingredients')
    TagsSelectionDOM(appliancesTags, 'appliances')
    TagsSelectionDOM(ustensilesTags, 'ustensils') 

    tagsSelection()
}

// refresh Tags selection make its clickable 
function tagsSelection() {
    ingredientsTagsSelection = document.querySelectorAll('.ingredientTag')
    appliancesTagsSelection = document.querySelectorAll('.applianceTag')
    ustensilsTagsSelection = document.querySelectorAll('.ustensileTag')

    tagSelected = document.querySelectorAll('.tag-selected')

    for (let i = 0; i < ingredientsTagsSelection.length; i++) {
        ingredientsTagsSelection[i].addEventListener('click', filterByTag)

        if(tagSelected.length == 0) {

        } else if (tagSelected.length > 0){
            for (let j = 0; j < tagSelected.length; j++) {
                if(ingredientsTagsSelection[i].textContent == tagSelected[j].firstChild.textContent) {
                    ingredientsTagsSelection[i].parentNode.remove()
                }
                
            }
        }
    }

    for (let i = 0; i < appliancesTagsSelection.length; i++) {
        appliancesTagsSelection[i].addEventListener('click', filterByTag)
    }

    for (let i = 0; i < ustensilsTagsSelection.length; i++) {
        ustensilsTagsSelection[i].addEventListener('click', filterByTag)
    }
}

function displayTagSelected(e) {
    let newTag = document.createElement('div')
    let tagType = e.target
    let tagContainer = e.target.parentNode
    newTag.classList.add('btn', 'tag-selected', 'me-2')
    newTag.innerHTML = `<span>${e.target.textContent}</span<i class="fa-regular fa-circle-xmark"></i>`
    if (tagType.classList.contains('ustensileTag')) {
        newTag.style.backgroundColor = "#ED6454"
        newTag.classList.add('ustensileTagSelected')
    } else if (tagType.classList.contains('ingredientTag')) {
        newTag.classList.add('ingredientTagSelected')
        newTag.style.backgroundColor = "#3282F7"
    } else if (tagType.classList.contains('applianceTag')) {
        newTag.classList.add('applianceTagSelected')
        newTag.style.backgroundColor = "#68D9A4"
    }
    tagsContainer.appendChild(newTag)
    selectedTags = document.querySelectorAll('.tag-selected')
    for (let i = 0; i < selectedTags.length; i++) {
        selectedTags[i].addEventListener('click', eraseTagSelected)
    }
    tagContainer.remove()
}


function filterByTag(e) {
    const userSearch = searchBarInput.value.toLowerCase()


    newResults = []
    
    
    if (results.length == 0) {
        results = recipes
    }
    newResults = recipes.filter(
        el => el.name.toLocaleLowerCase().includes(userSearch)
        || el.description.toLocaleLowerCase().includes(userSearch)
        || ingredientsList(el, searchBarInput.value)
    )
    if (e == undefined) {
        tagsSelected = document.querySelectorAll('.tag-selected')
        for (let i = 0; i < tagsSelected.length; i++) { filterByTagType(newResults, tagsSelected[i], 'ingredientTagSelected', 'applianceTagSelected', 'ustensileTagSelected', tagsSelected[i].firstChild.textContent)}
    } else {
        let tagType = e.target
        filterByTagType(results, tagType, 'ingredientTag', 'applianceTag', 'ustensileTag', tagType.textContent)
    }

    results = [...new Set(newResults)]
    results.sort((a, b) => (a.name > b.name) ? 1 : -1) 

    if(e == undefined) {

    } else     displayTagSelected(e) 

    displayRecipes(results)
    tagsAvailable(results)
}


tagsSelection()

function initTags() {
    selectedTags = document.querySelectorAll('.tag-selected')
    for (let i = 0; i < selectedTags.length; i++) {
        selectedTags[i].addEventListener('click', eraseTagSelected)
    }
}

tagsAvailable(recipes)
initTags()

//Tags Creation in DOM
function TagsSelectionDOM(tagCategorie, type) {
    tagCategorie.forEach(el => {
        let tagDiv = document.createElement('div')
        let tagTitle = document.createElement('span')
        let tagContainer
      
        tagDiv.classList.add('tag', 'col-4', 'mb-1')
        if (type === 'ingredients') {
            tagContainer = document.querySelector(`.ingredientsTags`)
            tagTitle.classList.add(`ingredientTag`) 
        } else if (type === 'appliances') {
            tagContainer = document.querySelector(`.appliancesTags`)
            tagTitle.classList.add(`applianceTag`) 
        } else if (type === 'ustensils') {
            tagContainer = document.querySelector(`.ustensilesTags`)
            tagTitle.classList.add(`ustensileTag`) 
        }
        tagTitle.innerHTML = el 
        tagDiv.appendChild(tagTitle)
        tagContainer.appendChild(tagDiv)
    })
}

function filterByTagType(recipesArray, tagType, ingredientsClassTag, appliancesClassTag, ustensilesClassTag, filterTag) {
if (tagType.classList.contains(`${ingredientsClassTag}`)) newResults = recipesArray.filter(recipe => ingredientsList(recipe, filterTag))
if (tagType.classList.contains(`${appliancesClassTag}`)) newResults = recipesArray.filter(recipe => recipe.appliance.includes(filterTag))
if (tagType.classList.contains(`${ustensilesClassTag}`)) newResults = recipesArray.filter(recipe => recipe.ustensils.includes(filterTag))
}
