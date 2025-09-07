const categoryContainer = document.getElementById('category-container');

const addCategories = async () => {
    const call = await fetch('https://openapi.programming-hero.com/api/categories');
    const res = await call.json();
    const data = res.categories;
    data.forEach(category => {
        if (category.category_name !== 'Bamboo') {
        categoryContainer.innerHTML += `<div onclick='highlightCategoryName(${category.id})' id='${category.id}' class="hover:bg-green-500 py-[8px] pl-[10px] rounded-[4px] cursor-pointer">
                                           <h6 class="font-[400] text-[#1F2937]">${category.category_name + 's'}</h6>
                                       </div>`
                                    }

        else {
            categoryContainer.innerHTML += `<div onclick='highlightCategoryName(${category.id})' id='${category.id}' class="hover:bg-green-500 py-[8px] pl-[10px] rounded-[4px] cursor-pointer">
                                   <h6 class="font-[400] text-[#1F2937]">${category.category_name}</h6>
                               </div>`
        }
    })
}

addCategories()

const highlightCategoryName = (categoryId) => {
    document.getElementById(categoryId).classList.remove('bg-[#15803D]')
   document.getElementById(categoryId).classList.add('bg-[#15803D]')

}

const cardContainer = document.getElementById('card-container');

const addCards = async () => {
    const call = await fetch('https://openapi.programming-hero.com/api/plants');
    const res = await call.json();
    const data = res.plants;
    data.forEach(plant => {
        cardContainer.innerHTML += `<div class="bg-white rounded-8 p-4 ">
                                        <img class='max-h-[186px] w-full rounded-[8px]' src="${plant.image}" alt="">
                                        <h6 class="font-semibold text-[0.8rem] text-[#1F2937] mt-3">${plant.name}</h6>
                                        <p class="text-[0.7rem] text-[#1F2937] my-2">${plant.description}</p>
                                        <div class="flex justify-between items-center">
                                            <div class="bg-[#DCFCE7] py-[4px] px-[12px] rounded-full">
                                                <h6 class="text-[0.8rem] font-[400] text-[#15803D]">${plant.category}</h6>
                                            </div>
                                            <h6 class="text-[0.8rem] font-semibold">${'$' + plant.price}</h6>
                                        </div>
                                        <button class="py-[12px] px-[20px] font-medium w-full rounded-full bg-[#15803D] text-white mt-3 cursor-pointer">Add to Cart</button>
                                    </div>`
    })
}

addCards()









