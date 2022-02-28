//Filter DOM
let closeFilters = document.querySelectorAll('.filter-close')
let openFilters = document.querySelectorAll('.filter-open') 
let filtersInputContainer = document.querySelectorAll('.tagInputContainer') 
let openFiltersChevronUp = document.querySelectorAll('.fa-chevron-up')

for (let i = 0; i < closeFilters.length; i++) closeFilters[i].addEventListener('click', filtersOpen)
for (let i = 0; i < filtersInputContainer.length; i++) openFiltersChevronUp[i].addEventListener('click', filtersClose)

function filtersOpen(e){
    let filterCloseTarget = e.target
    let openFilter = document.querySelector(`#${filterCloseTarget.name}-open`)
     for (let i = 0; i < openFilters.length; i++) {
        if(!openFilters[i].classList.contains('close')) {
            openFilters[i].classList.add('close')
            closeFilters[i].classList.remove('close')
        }
    }
    openFilter.classList.remove('close')
    filterCloseTarget.classList.add('close') 
}

function filtersClose(e){
    let filterCloseTarget = e.target.parentNode.parentNode
    filterCloseTarget.classList.add('close')
    let closeFilter = document.querySelector(`#${filterCloseTarget.getAttribute('name')}-close`)
    closeFilter.classList.remove('close')
}