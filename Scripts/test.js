

let newResults = []
const userSearch = "chocolat"
let newResultsWithDuplicate = []


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

console.log(newResults);
