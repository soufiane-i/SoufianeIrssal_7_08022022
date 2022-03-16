//Variables----------------------------------------------------------------------------------------
let closeFilters = document.querySelectorAll('.filter-close')
let openFilters = document.querySelectorAll('.filter-open') 
let filtersInputContainer = document.querySelectorAll('.tagInputContainer') 
let openFiltersChevronUp = document.querySelectorAll('.fa-chevron-up')

let tagsContainer = document.querySelector('#tags')
let availableTags = document.querySelectorAll('.tagBtn')

let ingredientInput = document.getElementById('ingredientInput')
let applianceInput = document.getElementById('applianceInput')
let ustensilInput = document.getElementById('ustensilInput')

//Tags Available actualisation
let filtredUstensils = []
let filtredAppliances = []
let filtredIngredients = []

let tagsSelected = []
let selectedTags

let ingredientsTags = []
let ingredientsArray = []
let appliancesTags = []
let ustensilsTags = []
let ustensilsArray = []
let ustensilsTagsWDuplicates = []
let ingredientsTagsWDuplicates = []
let appliancesTagsWDuplicates = []

//--------------------------------------------------------------------------------------------------

function filterInit() {
    selectedTags = document.querySelectorAll('.tag-selected')
    for (let i = 0; i < availableTags.length; i++) availableTags[i].addEventListener('click', displayTagSelected)
    for (let i = 0; i < closeFilters.length; i++) closeFilters[i].addEventListener('click', filtersOpen)
    for (let i = 0; i < selectedTags.length; i++) selectedTags[i].addEventListener('click', eraseTagSelected)

    window.addEventListener('click', filtersClose)
    ingredientInput.addEventListener('input', tagBarFilter)
    applianceInput.addEventListener('input', tagBarFilter)
    ustensilInput.addEventListener('input', tagBarFilter)

    ingredientInput.value =  ''
    applianceInput.value = ''
    ustensilInput.value = ''

   

    refreshTags()
    tagsSelection()
    tagsAvailable(recipes)
}

filterInit()

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
    filterByTag()
}

function filtersClose(e){
    let target = e.target
  
    if (target.classList.contains('inputTag') 
    || target.classList.contains('tagChoiceContainer') 
    || target.classList.contains('tag') 
    || target.classList.contains('filter-close')
    || target.classList.contains('ingredientTag')
    || target.classList.contains('ustensilTag')
    || target.classList.contains('applianceTag')) {        
    } else { 
        for (let i = 0; i < openFilters.length; i++) {
        openFilters[i].classList.add('close')
        closeFilters[i].classList.remove('close') 
        }
        
        ingredientInput.value = ''
        applianceInput.value = ''
        ustensilInput.value = ''  
    }
}

function eraseTagSelected(e) {
    e.target.remove()
    filterByTag()
    tagsSelection()
    tagsAvailable(results)
}

//Refresh tags available data
function tagsAvailable(recipes) {
    filtredUstensils = []
    let ustensilsArray = []
    let ustensilsWitoutDuplicates = []
    filtredAppliances = []
    let appliancesWitoutDuplicates = []
    filtredIngredients = []
    let ingredientsArray = []
    let ingredientsWitoutDuplicates = []
    
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
function DisplayTagsAvailable(ingredientsTags, appliancesTags, ustensilsTags) {
    const tagsChoiceContainer = document.querySelectorAll('.tagChoiceContainer')
    for (let i = 0; i < tagsChoiceContainer.length; i++) tagsChoiceContainer[i].innerHTML = ''

    TagsSelectionDOM(ingredientsTags, 'ingredients')
    TagsSelectionDOM(appliancesTags, 'appliances')
    TagsSelectionDOM(ustensilsTags, 'ustensils')  

    tagsSelection()
}

// refresh Tags selection make its clickable 
function tagsSelection() {
    let ingredientsTagsSelection = document.querySelectorAll('.ingredientTag')
    let appliancesTagsSelection = document.querySelectorAll('.applianceTag')
    let ustensilsTagsSelection = document.querySelectorAll('.ustensilTag')

    TagSelectAfterClick(ingredientsTagsSelection)
    TagSelectAfterClick(appliancesTagsSelection)
    TagSelectAfterClick(ustensilsTagsSelection)
} 

//Display tag selected taking into account its type(ingredient, ustensil, appliance)
function displayTagSelected(e) {
    let tagType = e.target
    let tagContainer = e.target.parentNode
    let newTag = document.createElement('div')
    newTag.classList.add('btn', 'tag-selected', 'me-2')
    newTag.innerHTML = `<span>${e.target.textContent}</span><i class="fa-regular fa-circle-xmark"></i>`
    if (tagType.classList.contains('ustensilTag')) {
        newTag.style.backgroundColor = "#ED6454"
        newTag.classList.add('ustensilTagSelected')
    } else if (tagType.classList.contains('ingredientTag')) {
        newTag.classList.add('ingredientTagSelected')
        newTag.style.backgroundColor = "#3282F7"
    } else if (tagType.classList.contains('applianceTag')) {
        newTag.classList.add('applianceTagSelected')
        newTag.style.backgroundColor = "#68D9A4"
    }
    tagsContainer.appendChild(newTag)
    selectedTags = document.querySelectorAll('.tag-selected')
    for (let i = 0; i < selectedTags.length; i++) selectedTags[i].addEventListener('click', eraseTagSelected)
    tagContainer.remove()
}

// Filtation by tag. Use alone or with the search bar search. Two diffents way. Alone with e.target
function filterByTag(e) {
    const userSearch = searchBarInput.value.toLowerCase()
    tagsSelected = document.querySelectorAll('.tag-selected')
    newResults = []
    if (results.length == 0) results = recipes
    if(searchBarInput.value.length >= 3) filterBySearchBar(userSearch)
    else newResults = recipes

    if (e == undefined) for (let i = 0; i < tagsSelected.length; i++) filterByTagType(newResults, tagsSelected[i], 'ingredientTagSelected', 'applianceTagSelected', 'ustensilTagSelected', tagsSelected[i].firstChild.textContent)
    else {
        let tagType = e.target
        filterByTagType(results, tagType, 'ingredientTag', 'applianceTag', 'ustensilTag', tagType.textContent)
    }

    results = [...new Set(newResults)]
    results.sort((a, b) => (a.name > b.name) ? 1 : -1) 

    if(!(e == undefined)) displayTagSelected(e)

    displayRecipes(results)
    tagsAvailable(results)
    refreshTags()
}

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
            tagContainer = document.querySelector(`.ustensilsTags`)
            tagTitle.classList.add(`ustensilTag`) 
        }
        el = el.charAt(0).toUpperCase() + el.slice(1)
        tagTitle.innerHTML = el 
        tagDiv.appendChild(tagTitle)
        tagContainer.appendChild(tagDiv)
    })
}

function filterByTagType(recipesArray, tagType, ingredientsClassTag, appliancesClassTag, ustensilsClassTag, filterTag) {
    if (tagType.classList.contains(`${ingredientsClassTag}`)) newResults = recipesArray.filter(recipe => ingredientsList(recipe, filterTag))
    if (tagType.classList.contains(`${appliancesClassTag}`)) newResults = recipesArray.filter(recipe => recipe.appliance.includes(filterTag) && recipe.appliance.length == filterTag.length)
    if (tagType.classList.contains(`${ustensilsClassTag}`)) newResults = recipesArray.filter(recipe => recipe.ustensils.includes(filterTag.toLowerCase()))
    }

//searchbar for tags
function tagBarFilter(e)
{
    let userSearch
    ingredientsTags = []
    ingredientsArray = []
    appliancesTags = []
    ustensilsTags = []
    ustensilsArray = []
    ustensilsTagsWDuplicates = []
    ingredientsTagsWDuplicates = []
    appliancesTagsWDuplicates = []

    if (results.length == 0) newTagArray(recipes)
    else newTagArray(results)

    for (let i = 0; i < ingredientsTags.length; i++) ingredientsArray.push(...filtredIngredients[i])
    for (let i = 0; i < filtredUstensils.length; i++) ustensilsArray.push(...filtredUstensils[i])
    for (let i = 0; i < ustensilsTags.length; i++)ustensilsArray.push(...filtredUstensils[i])

    ingredientsTagsWDuplicates = [...new Set(ingredientsArray)]
    ingredientsTagsWDuplicates.sort()

    appliancesTags = recipes.map(recipe => recipe.appliance)
    appliancesTagsWDuplicates = [...new Set(appliancesTags)]
    appliancesTagsWDuplicates.sort()

    ustensilsTags = recipes.map(recipe => recipe.ustensils)
    
    ustensilsTagsWDuplicates = [...new Set(ustensilsArray)]
    ustensilsTagsWDuplicates.sort()

    if (e.target.id === ingredientInput.id) {
        userSearch = ingredientInput.value.toLowerCase()
        ingredientsTagsWDuplicates = ingredientsTagsWDuplicates.filter(el => el.toLowerCase().includes(userSearch)) 
        
    } else if (e.target.id === applianceInput.id) {
        userSearch = applianceInput.value.toLowerCase()
        appliancesTagsWDuplicates = appliancesTagsWDuplicates.filter(el => el.toLowerCase().includes(userSearch)) 

    } else if (e.target.id === ustensilInput.id) {
        userSearch = ustensilInput.value.toLowerCase()
        ustensilsTagsWDuplicates = ustensilsTagsWDuplicates.filter(el => el.toLowerCase().includes(userSearch)) 
    } 
    
    DisplayTagsAvailable(ingredientsTagsWDuplicates, appliancesTagsWDuplicates, ustensilsTagsWDuplicates)
    tagsSelection()
}

//refresh eventlistener after tag selection
function TagSelectAfterClick(tagTypeArray) {
    tagSelected = document.querySelectorAll('.tag-selected')

    for (let i = 0; i < tagTypeArray.length; i++) {
        tagTypeArray[i].addEventListener('click', filterByTag)
        if (tagSelected.length > 0){
            for (let j = 0; j < tagSelected.length; j++) {
                if(tagTypeArray[i].textContent == tagSelected[j].firstChild.textContent) {
                    tagTypeArray[i].parentNode.remove()
                }
            }
        }
    }
}

function refreshTags() {
    if (results.length == 0) {
        newTagArray(recipes)
    } else {
    newTagArray(results)
    }
}

function newTagArray(recipes) {
    ingredientsTags = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
    appliancesTags = recipes.map(recipe => recipe.appliance)
    ustensilsTags = recipes.map(recipe => recipe.ustensils)
}



