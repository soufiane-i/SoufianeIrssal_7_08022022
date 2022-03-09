//Filter DOM
let closeFilters = document.querySelectorAll('.filter-close')
let openFilters = document.querySelectorAll('.filter-open') 
let filtersInputContainer = document.querySelectorAll('.tagInputContainer') 
let openFiltersChevronUp = document.querySelectorAll('.fa-chevron-up')

let tagsContainer = document.querySelector('#tags')
let tags = document.querySelectorAll('.tagBtn')

let ingredientInput = document.getElementById('ingredientInput')
let applianceInput = document.getElementById('applianceInput')
let ustensilInput = document.getElementById('ustensilInput')

ingredientInput.addEventListener('input', tagBarFilter)
applianceInput.addEventListener('input', tagBarFilter)
ustensilInput.addEventListener('input', tagBarFilter)

ingredientInput.value =  ''
applianceInput.value = ''
ustensilInput.value = ''

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
//for (let i = 0; i < openFiltersChevronUp.length; i++) openFiltersChevronUp[i].addEventListener('click', filtersClose)
window.addEventListener('click', filtersClose)

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
    let filterCloseTarget = e.target.parentNode.parentNode    
    let target = e.target
  
    
    if (target.classList.contains('inputTag') || target.classList.contains('tagChoiceContainer') || target.classList.contains('tag') || target.classList.contains('filter-close')) {
        
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
function DisplayTagsAvailable(ingredientsTags, appliancesTags, ustensilsTags) {

    const tagsChoiceContainer = document.querySelectorAll('.tagChoiceContainer')
    for (let i = 0; i < tagsChoiceContainer.length; i++) {
        tagsChoiceContainer[i].innerHTML = ''
    }

    TagsSelectionDOM(ingredientsTags, 'ingredients')
    TagsSelectionDOM(appliancesTags, 'appliances')
    TagsSelectionDOM(ustensilsTags, 'ustensils')  

    tagsSelection()
}

// refresh Tags selection make its clickable 
function tagsSelection() {
    ingredientsTagsSelection = document.querySelectorAll('.ingredientTag')
    appliancesTagsSelection = document.querySelectorAll('.applianceTag')
    ustensilsTagsSelection = document.querySelectorAll('.ustensilTag')

    TagSelectAfterClick(ingredientsTagsSelection)
    TagSelectAfterClick(appliancesTagsSelection)
    TagSelectAfterClick(ustensilsTagsSelection)
} 

function displayTagSelected(e) {
    let newTag = document.createElement('div')
    let tagType = e.target
    let tagContainer = e.target.parentNode
    newTag.classList.add('btn', 'tag-selected', 'me-2')
    newTag.innerHTML = `<span>${e.target.textContent}</span<i class="fa-regular fa-circle-xmark"></i>`
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
    for (let i = 0; i < selectedTags.length; i++) {
        selectedTags[i].addEventListener('click', eraseTagSelected)
    }
    tagContainer.remove()
}


function filterByTag(e) {
    console.log(e);
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


tagsSelection()

function initTags() {
    selectedTags = document.querySelectorAll('.tag-selected')
    for (let i = 0; i < selectedTags.length; i++) {
        selectedTags[i].addEventListener('click', eraseTagSelected)
    }
}


initTags()
tagsAvailable(recipes)

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

function tagBarFilter(e)
{
    let userSearch

    let ingredientsTags = []
    let ingredientsArray = []
    let appliancesTags = []
    let ustensilsTags = []
    let ustensilsArray = []
    let ustensilsTagsWDuplicates = []
    let ingredientsTagsWDuplicates = []
    let appliancesTagsWDuplicates = []

    refreshTags()

    if (results.length == 0) {
        ingredientsTags = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
        appliancesTags = recipes.map(recipe => recipe.appliance)
        ustensilsTags = recipes.map(recipe => recipe.ustensils)
    } else {
        ingredientsTags = results.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
        appliancesTags = results.map(recipe => recipe.appliance)
        ustensilsTags = results.map(recipe => recipe.ustensils)
    }

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
        ingredientsTagsWDuplicates = ingredientsTagsWDuplicates.filter(el => el.toLocaleLowerCase().includes(userSearch)) 

    } else if (e.target.id === applianceInput.id) {
        userSearch = applianceInput.value.toLowerCase()
        appliancesTagsWDuplicates = appliancesTagsWDuplicates.filter(el => el.toLocaleLowerCase().includes(userSearch)) 

    } else if (e.target.id === ustensilInput.id) {
        userSearch = ustensilInput.value.toLowerCase()
        ustensilsTagsWDuplicates = ustensilsTagsWDuplicates.filter(el => el.toLocaleLowerCase().includes(userSearch)) 
    } 
    
    DisplayTagsAvailable(ingredientsTagsWDuplicates, appliancesTagsWDuplicates, ustensilsTagsWDuplicates)

    tagsSelection()

 
}

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