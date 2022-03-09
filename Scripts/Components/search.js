
//Get SearchBar Input
let searchBarRecipe
let searchBarInput = document.querySelector('.form-control')

searchBarInput.value = ''


searchBarInput.addEventListener('input', characterCheck)

const noRecipeFoundMsg = document.querySelector('.noRecipeFound')

//If at least 3 character in serachBar call filter function, else do nothing
function characterCheck()
{
    tagsSelected = document.querySelectorAll('.tag-selected')
    if(searchBarInput.value.length >= 3) {
        searchBarFilter()
    } else {
        if (tagsSelected.length > 0) filterByTag()
    }
}

//Filter for search Bar : title, decription and ingredients
function searchBarFilter()
{
    //Get search bar input value
    const userSearch = searchBarInput.value.toLowerCase()
    //Clear Cards Section
    cardsSection.innerHTML = ''
    tagsSelected = document.querySelectorAll('.tag-selected')

    if(tagsSelected.length > 0) {
        filterByTag()
    } else {
        filterBySearchBar(userSearch)
    
        results = newResults
        results.sort((a, b) => (a.name > b.name) ? 1 : -1) 
    }

    console.log(results.length);

    if (results.length == 0) {
        noRecipeFoundMsg.classList.remove('close')
    } else {
        noRecipeFoundMsg.classList.add('close')
        displayRecipes(results)
    }
    tagsAvailable(results)
}

//Filter ingredients in a recipeArray to define in parameter
function ingredientsList(recipe, tag)
{
    if (recipe.ingredients.find(object => object.ingredient.includes(tag) && object.ingredient.length == tag.length)) return true
    return false
}

function refreshTags() {
    if (results.length == 0) {
        ingredientsTags = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
        appliancesTags = recipes.map(recipe => recipe.appliance)
        ustensilsTags = recipes.map(recipe => recipe.ustensils)
    } else {
        ingredientsTags = results.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
        appliancesTags = results.map(recipe => recipe.appliance)
        ustensilsTags = results.map(recipe => recipe.ustensils)
    }
}

function filterBySearchBar(userSearch) {
   //Algo Native Loop
   let newResultsWithDuplicate = []
   newResults = []

   for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name.toLocaleLowerCase().includes(userSearch)) {
        newResultsWithDuplicate.push(recipes[i])
    }
    if (recipes[i].description.toLocaleLowerCase().includes(userSearch)) {
        newResultsWithDuplicate.push(recipes[i])
    }
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
        if (recipes[i].ingredients.find(object => object.ingredient.includes(userSearch))) {
            newResultsWithDuplicate.push(recipes[i])
        }
    }    
}

   newResults = [...new Set(newResultsWithDuplicate)]
   console.log(newResults)
}