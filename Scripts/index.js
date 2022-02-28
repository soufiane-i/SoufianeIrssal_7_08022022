
let results
let searchBarRecipe

let tagsContainer = document.querySelector('#tags')
let tags = document.querySelectorAll('.tagBtn')
let selectedTags = document.querySelectorAll('.tag-selected')

//Display Recipes with datas
function displayRecipes(recipeArray) {
    //cards location
	const cardsSection = document.querySelector('#cardsSection')
    //Clear Cards Section
    cardsSection.innerHTML = ''
    //cards creation loop
    recipeArray.forEach((recipe) => { cardCreation(recipe) })
}

displayRecipes(recipes)

//DisplayTags
for (let i = 0; i < tags.length; i++) tags[i].addEventListener('click', displayTagSelected)
for (let i = 0; i < selectedTags.length; i++) selectedTags[i].addEventListener('click', eraseTagSelected)

//Get SearchBar Input
let searchBarInput = document.querySelector('.form-control')
searchBarInput.value = ''

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
function searchBarFilter()
{
    //Get search bar input value
    const userSearch = searchBarInput.value.toLowerCase()
    //Clear Cards Section
    cardsSection.innerHTML = ''
    let tagsSelected = document.querySelectorAll('.tag-selected')
    console.log(tagsSelected);
    results = [];
    let resultsSearchNTags = []

    results = recipes.filter(
        el => el.name.toLocaleLowerCase().includes(userSearch)
    || el.description.toLocaleLowerCase().includes(userSearch)
    || ingredientsList(el, searchBarInput.value)
    )

    console.log(results);
    
    if (tagsSelected.length == 0) {
    } else 
    {
        
        for (let i = 0; i < tagsSelected.length; i++) {
            if (tagsSelected[i].classList.contains('ingredientTagSelected')) resultsSearchNTags = resultsSearchNTags.concat(results.filter(recipe => ingredientsList(recipe, tagsSelected[i].firstChild.textContent)))
            if (tagsSelected[i].classList.contains('applianceTagSelected')) resultsSearchNTags = resultsSearchNTags.concat(results.filter(recipe => recipe.appliance.includes(tagsSelected[i].firstChild.textContent)))
            if (tagsSelected[i].classList.contains('ustensileTagSelected')) resultsSearchNTags = resultsSearchNTags.concat(results.filter(recipe => recipe.ustensils.includes(tagsSelected[i].firstChild.textContent)))
        }
            results = resultsSearchNTags
    }

    console.log(results);

    if (results.length == 0) {
        noRecipeFoundMsg.classList.remove('close')
    } else {
        noRecipeFoundMsg.classList.add('close')
        displayRecipes(results)
    }
    

    tagsAvailable(results)
 
}



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

tagsAvailable(recipes)

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

    filtredAppliances = recipes.map(recipe => recipe.appliance)
    appliancesWitoutDuplicates = [...new Set(filtredAppliances)]

    filtredUstensils = recipes.map(recipe => recipe.ustensils)
    for (let i = 0; i < filtredUstensils.length; i++) ustensilsArray.push(...filtredUstensils[i])
    ustensilsWitoutDuplicates = [...new Set(ustensilsArray)]

    DisplayTagsAvailable(ingredientsWitoutDuplicates, appliancesWitoutDuplicates, ustensilsWitoutDuplicates)
} 

function DisplayTagsAvailable(ingredientsTags, appliancesTags, ustensilesTags) {

    let tagSelected = document.querySelectorAll('.tag-selected')

    const tagsChoiceContainer = document.querySelectorAll('.tagChoiceContainer')
    for (let i = 0; i < tagsChoiceContainer.length; i++) {
        tagsChoiceContainer[i].innerHTML = ''
    }

    ingredientsTags.forEach(el => {
        let ingredientTag = document.createElement('div')
        let ingredientTagTitle = document.createElement('span')
        let tagContainer = document.querySelector('.ingredientsTags')
        ingredientTag.classList.add('tag', 'col-4', 'mb-1')
        ingredientTagTitle.classList.add('ingredientTag')
        ingredientTagTitle.innerHTML = el 
        ingredientTag.appendChild(ingredientTagTitle)
        tagContainer.appendChild(ingredientTag)
    })

    appliancesTags.forEach(el => {
        let appliancesTag = document.createElement('div')
        let tagContainer = document.querySelector('.appliancesTags')
        let applianceTagTitle = document.createElement('span')
        appliancesTag.classList.add('tag', 'col-4', 'mb-1')
        applianceTagTitle.classList.add('applianceTag')
        applianceTagTitle.innerHTML = el 
        appliancesTag.appendChild(applianceTagTitle)
        tagContainer.appendChild(appliancesTag)
    })

    ustensilesTags.forEach(el => {
        let ustensilesTag = document.createElement('div')
        let ustensileTagTitle = document.createElement('span')
        let tagContainer = document.querySelector('.ustensilesTags')
        ustensilesTag.classList.add('tag', 'col-4', 'mb-1')
        ustensileTagTitle.classList.add('ustensileTag')
        ustensileTagTitle.innerHTML = el 
        ustensilesTag.appendChild(ustensileTagTitle)
        tagContainer.appendChild(ustensilesTag)
    })   

    tagsSelection()




}

function filterByTag(e) {
    console.log(results);
    if (results == undefined) {
        results = recipes
    }

    characterCheck()


    let newResults = []
    let tagType = e.target
    if (tagType.classList.contains('ingredientTag')) newResults = newResults.concat(results.filter(recipe => ingredientsList(recipe, tagType.textContent)))
    if (tagType.classList.contains('applianceTag')) newResults = newResults.concat(results.filter(recipe => recipe.appliance.includes(tagType.textContent)))
    if (tagType.classList.contains('ustensileTag')) newResults = newResults.concat(results.filter(recipe => recipe.ustensils.includes(tagType.textContent)))

    cardsSection.innerHTML = ''

    results = [];

    results = newResults
    displayTagSelected(e)
    displayRecipes(results)
    tagsAvailable(results)
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


//Filter ingredients in a recipeArray to define in parameter
function ingredientsList(recipe, tag)
{
    if (recipe.ingredients.find(object => object.ingredient.includes(tag))) return true
    return false
}


function eraseTagSelected(e) {
    console.log(e.target);
    e.target.parentNode.remove()
    console.log(results);
    searchBarFilter(results)
    tagsAvailable(results)
}

function tagsSelection() {
    ingredientsTagsSelection = document.querySelectorAll('.ingredientTag')
    appliancesTagsSelection = document.querySelectorAll('.applianceTag')
    ustensilsTagsSelection = document.querySelectorAll('.ustensileTag')

    let tagSelected = document.querySelectorAll('.tag-selected')

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

tagsSelection()