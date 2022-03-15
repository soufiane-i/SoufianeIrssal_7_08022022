//recipes = all the recipe array
let newResults = []
//Display Recipes with datas
function displayRecipes(recipeArray) {
    //cards location
	const cardsSection = document.querySelector('#cardsSection')
    //Clear Cards Section
    cardsSection.innerHTML = ''
    //cards creation loop
    recipeArray.forEach((recipe) => { cardCreation(recipe) })
}

function indexInit() {
    //recipes in alphabetic order
    recipes.sort((a, b) => (a.name > b.name) ? 1 : -1) 
    displayRecipes(recipes)
}


indexInit()

//Filter ingredients in a recipeArray to define in parameter
function ingredientsList(recipe, tag)
{
    if (recipe.ingredients.find(object => object.ingredient.includes(tag) && object.ingredient.length == tag.length)) return true
    return false
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

