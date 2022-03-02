
//Get SearchBar Input
let searchBarRecipe
let searchBarInput = document.querySelector('.form-control')
let ingredientInput = document.getElementById('ingredientInput')
let applianceInput = document.getElementById('applianceInput')
let ustensilInput = document.getElementById('ustensilInput')
searchBarInput.value = ''
ingredientInput.value =  ''
applianceInput.value = ''
ustensilInput.value = ''

searchBarInput.addEventListener('input', characterCheck)
ingredientInput.addEventListener('input', tagBarFilter)
applianceInput.addEventListener('input', tagBarFilter)
ustensilInput.addEventListener('input', tagBarFilter)
const noRecipeFoundMsg = document.querySelector('.noRecipeFound')

//If at least 3 character in serachBar call filter function, else do nothing
function characterCheck()
{
    if(searchBarInput.value.length >= 3) {
        searchBarFilter()
    }
}

//Filter for search Bar : title, decription and ingredients
function searchBarFilter()
{
    //Get search bar input value
    const userSearch = searchBarInput.value.toLowerCase()
    //Clear Cards Section
    
    tagsSelected = document.querySelectorAll('.tag-selected')

    if(tagsSelected.length > 0) {
        filterByTag()
    } else {
        newResults = recipes.filter(
            el => el.name.toLocaleLowerCase().includes(userSearch)
            || el.description.toLocaleLowerCase().includes(userSearch)
            || ingredientsList(el, searchBarInput.value)
        )

        newResults.sort((a, b) => (a.name > b.name) ? 1 : -1) 
    
        results = newResults
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