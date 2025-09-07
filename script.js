const categoryContainer = document.getElementById('plant-category-container');

const addCategories = async () => {
    const call = await fetch('https://openapi.programming-hero.com/api/categories');
    const res = await call.json();
    const data = res.categories;
    data.forEach(category => {
        if (category.category_name !== 'Bamboo') {
        categoryContainer.innerHTML += `<div class="hover:bg-green-500 hover:text-white py-2 pl-2.5 rounded-[4px] 
                                        cursor-pointer">
                                             <h6 class="font-[400]">${category.category_name + 's'}</h6>
                                        </div>`
                                    }

        else {
             categoryContainer.innerHTML += `<div class="hover:bg-green-500 hover:text-white py-2 pl-2.5 rounded-[4px] cursor-pointer">
                  <h6 class="font-[400]">${category.category_name}</h6>
             </div>` 
        }
    })
}

addCategories()

const cardContainer = document.getElementById('plant-card-container');

const addCards = async () => {
    const call = await fetch('https://openapi.programming-hero.com/api/plants');
    const res = await call.json();
    const data = res.plants;
    data.forEach(plant => {
        cardContainer.innerHTML += `<div class="bg-white rounded-lg p-4 grid content-between">
                                        <img class='max-h-[186.8px] w-full rounded-lg' src="${plant.image}" alt="">
                                        <h6 class="font-semibold text-[0.8rem] text-[#1F2937] mt-3 hover:cursor-pointer text-center md:text-left">${plant.name}</h6>
                                        <p class="text-[0.7rem] text-[#1F2937] my-2 text-center md:text-left">${plant.description}</p>
                                        <div class="flex justify-between items-center mb-3">
                                            <div class="bg-[#DCFCE7] py-1 px-3 rounded-full">
                                                <h6 class="text-[0.8rem] font-[400] text-[#15803D]">${plant.category}</h6>
                                            </div>
                                            <h6 class="text-[0.8rem] text-[#1F2937] font-semibold">${'৳' + plant.price}</h6>
                                        </div>
                                        <button id='${plant.id}' class="py-3 px-5 font-medium w-full rounded-full bg-[#15803D] text-white cursor-pointer">Add to Cart</button>
                                    </div>`

        addTree(plant.id)
    })
}

addCards()

const cartList = document.getElementById('cart-list');

const addTree = (id) => {
    const object = document.getElementById(id);
    object.addEventListener('click', () => {
        const div = document.createElement('div')
        div.innerHTML = `<div class='bg-[#F0FDF4] px-3 py-2 flex justify-between items-center rounded-lg'>
                            <div class="space-y-1">
                                <h6 class="text-[#1F2937] text-[0.8rem] font-semibold">${object.parentNode[2].innerText}</h6>
                                <h5 class="font-[400] text-[#8C8C8C]">${object.parentNode[4].childNode[2].innerText + ' x 1'}</h5>
                            </div>
                            <h5 class="text-lg text-[#8C8C8C] cursor-pointer">x</h5>
                         </div>`

        cartList.append(div);
    })
}



















