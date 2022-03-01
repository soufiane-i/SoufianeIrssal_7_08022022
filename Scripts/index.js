let results = []
let newResults = []
let newResults2 = []
let tagsSelected = []
let selectedTags

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



