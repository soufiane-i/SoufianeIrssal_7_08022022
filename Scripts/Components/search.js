
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
    let newResults = []
    if (tagsSelected.length == 0) {
        results = recipes.filter(
            el => el.name.toLocaleLowerCase().includes(userSearch)
        || el.description.toLocaleLowerCase().includes(userSearch)
        || ingredientsList(el, searchBarInput.value)
        )
    } else {
        if (results.length == 0) {
            results = recipes.filter(
                el => el.name.toLocaleLowerCase().includes(userSearch)
            || el.description.toLocaleLowerCase().includes(userSearch)
            || ingredientsList(el, searchBarInput.value)
            )
        } else {
        newResults = results.filter(
            el => el.name.toLocaleLowerCase().includes(userSearch)
        || el.description.toLocaleLowerCase().includes(userSearch)
        || ingredientsList(el, searchBarInput.value)
        )
        results = newResults
        }
    }


  
    if (tagsSelected.length == 0) {
    } else 
    {
        filterByTag()
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