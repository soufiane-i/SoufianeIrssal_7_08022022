//Variables--------------------------------------------------------------------------------
//Get SearchBar Input
let searchBarInput = document.querySelector('.form-control')
//arrays to use after filtrations
let results = []
const noRecipeFoundMsg = document.querySelector('.noRecipeFound')
//------------------------------------------------------------------------------------------

function searchInit() {
    searchBarInput.value = ''
    searchBarInput.addEventListener('input', characterCheck)
}
searchInit()

//If at least 3 character in serachBar call filter function, else only filter by tag if there is at least one
function characterCheck() {
    tagsSelected = document.querySelectorAll('.tag-selected')
    if(searchBarInput.value.length >= 3) {
        searchBarFilter()
    } else {
        if (tagsSelected.length > 0) filterByTag()
        else displayRecipes(recipes)
    }
}

//Filter for search Bar : title, decription and ingredients
function searchBarFilter()
{
    //Get search bar input value
    const userSearch = searchBarInput.value.toLowerCase()
    //Clear Cards Section
    cardsSection.innerHTML = ''
    //refresh tag selected
    tagsSelected = document.querySelectorAll('.tag-selected')

    //if there are tag selected use it to filter
    if(tagsSelected.length > 0) {
        filterByTag()
    } else {
        filterBySearchBar(userSearch)
        results.sort((a, b) => (a.name > b.name) ? 1 : -1) 
    }

    // if no recipe display 
    if (results.length == 0) {
        noRecipeFoundMsg.classList.remove('close')
    } else {
        noRecipeFoundMsg.classList.add('close')
        displayRecipes(results)
    }
    //refresh available tags
    tagsAvailable(results)
}

function filterBySearchBar(userSearch) {
    //Algo Native Loop
    let resultsWithDuplicate = []
    results = []

    //Loop to check all recipe
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].name.toLowerCase().includes(userSearch)) {
            resultsWithDuplicate.push(recipes[i])
        }
        if (recipes[i].description.toLowerCase().includes(userSearch)) {
            resultsWithDuplicate.push(recipes[i])
        } 
        if (recipes[i].ingredients.find(object => object.ingredient.toLowerCase().includes(userSearch))) {
            resultsWithDuplicate.push(recipes[i])
        }   
    }
    //Remove duplicate
    results = [...new Set(resultsWithDuplicate)]
}