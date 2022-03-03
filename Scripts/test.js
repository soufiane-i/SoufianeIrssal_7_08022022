

let newResults;
const userSearch = "coco";

/* newResults = recipes.filter(
    el => el.name.toLocaleLowerCase().includes(userSearch)
    || el.description.toLocaleLowerCase().includes(userSearch)
    || ingredientsList(el, userSearch)
)  */

let newResultsWithDuplicate = []
newResults = []
for (let i = 0; i < recipes.length; i++) {
    for (let j1 = 0; j1 < recipes[i].name.length; j1++) {
        if (recipes[i].name.substring(j1,j1 + userSearch.length).toLocaleLowerCase() === userSearch) {
            newResultsWithDuplicate.push(recipes[i])
        }
        
    }
    for (let j2 = 0; j2 < recipes[i].description.length; j2++) {
        if (recipes[i].description.substring(j2,j2 + userSearch.length).toLocaleLowerCase() === userSearch) {
            newResultsWithDuplicate.push(recipes[i])
        }
        
    } 
    for (let j3 = 0; j3 < recipes[i].ingredients.length; j3++) {
        for (let k = 0; k < recipes[i].ingredients[j3].ingredient.length; k++) {
            if (recipes[i].ingredients[j3].ingredient.substring(k,k + userSearch.length).toLocaleLowerCase() === userSearch) {
                newResultsWithDuplicate.push(recipes[i])
            } 
        }
    }  

}
newResults = [...new Set(newResultsWithDuplicate)]

console.log(newResults);