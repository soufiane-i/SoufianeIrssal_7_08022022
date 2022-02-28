let results
let tagsSelected
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



