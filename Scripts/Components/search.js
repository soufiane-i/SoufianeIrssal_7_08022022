//Get SearchBar Input
let searchBarRecipe
let searchBarInput = document.querySelector('.form-control')
searchBarInput.value = ''

searchBarInput.addEventListener('input', characterCheck)
const noRecipeFoundMsg = document.querySelector('.noRecipeFound')

//If at least 3 character in serachBar call filter function, else do nothing
function characterCheck()
{
    if(searchBarInput.value.length >= 3) {
        searchBarFilter()
    } else {
        displayRecipes(recipes)
        tagsSelection()
        tagsAvailable(recipes)
    } 
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
    if (recipe.ingredients.find(object => object.ingredient.includes(tag))) return true
    return false
}