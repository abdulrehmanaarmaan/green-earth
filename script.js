const categoryContainer = document.getElementById('plant-category-container');

const cardContainer = document.getElementById('plant-card-container');

const cartList = document.getElementById('cart-list');

const spinner = document.getElementById('spinner');

const displaySpinner = (boolean) => {
    if (boolean === true) {
        spinner.classList.remove('hidden')
        cardContainer.classList.add('hidden')
    }

    else if (boolean === false) {
        spinner.classList.add('hidden')
        cardContainer.classList.remove('hidden') 
    }
}

displaySpinner(true)
const addCards = async () => {
    cardContainer.innerHTML = ``;
    const call = await fetch('https://openapi.programming-hero.com/api/plants');
    const res = await call.json();
    const data = res.plants;
    data.forEach(plant => {
        cardContainer.innerHTML += `<div class="bg-white rounded-lg p-4 grid content-between">
                                        <img class='max-h-[186.8px] w-full rounded-lg' src="${plant.image}" alt="">
                                        <h6 id="${plant.id}" class="hover:text-green-500 plant-name font-semibold text-[0.8rem] text-[#1F2937] mt-3 hover:cursor-pointer text-center md:text-left">${plant.name}</h6>
                                        <p class="text-[0.7rem] text-[#1F2937] my-2 text-center 
                                          md:text-left">${plant.description}</p>
                                        <div class="flex justify-between items-center mb-3">
                                            <div class="bg-[#DCFCE7] py-1 px-3 rounded-full">
                                                <h6 class="text-center text-[0.8rem] font-[400] text-
                                               [#15803D]">${plant.category}</h6>
                                            </div>
                                            <div class='flex'>
                                                <h6 class="text-[0.8rem] text-[#1F2937] 
                                                    font-semibold">৳</h6>
                                                <h6 class="text-[0.8rem] text-[#1F2937] 
                                             font-semibold">${plant.price}</h6>
                                            </div>
                                        </div>
                                        <button class="hover:bg-green-500 add-btn py-3 px-5 font-medium 
                                            w-full rounded-full bg-[#15803D] text-white 
                                             cursor-pointer">Add to Cart</button>
                                    </div>` 
        displaySpinner(false)
        }
    )
}
    
addCards()


const addCategories = async () => {
    const call = await fetch('https://openapi.programming-hero.com/api/categories');
    const res = await call.json();
    const data = res.categories;
    data.forEach(category => {
        if (category.category_name !== 'Bamboo') {
        categoryContainer.innerHTML += `<div id="${category.id}" class="category-name-container hover:bg-green-500 hover:text-white py-2 pl-2.5 rounded-[4px] cursor-pointer">
             <h6 class="category-name font-[400]">${category.category_name + 's'}</h6>
        </div>`
        }

        else {
             categoryContainer.innerHTML += `<div id="${category.id}" class="category-name-container hover:bg-green-500 hover:text-white py-2 pl-2.5 rounded-[4px] cursor-pointer">
                  <h6 class="category-name font-[400]">${category.category_name}</h6>
             </div>` 
            }
        }
    )
}   
                                                                                                
addCategories()

cartList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-cart')) {
        const cartItem = e.target.closest('.cart-item');
        console.log(cartItem.dataset.price)
        const itemPrice = Number(cartItem.dataset.price);

        const amountPrice = document.getElementById('amount-price');
        amountPrice.innerText = Number(amountPrice.innerText) - itemPrice;
        cartItem.remove();

        if (cartList.children.length === 1) {
            const totalPrice = document.getElementById('total-price');
            totalPrice.classList.remove('border-t-[1px]', 'border-[#8C8C8C]')
            cartList.classList.remove('border-b-[1px]', 'border-[#8C8C8C]')
        }
    }
})

categoryContainer.addEventListener('click', (e) => {
    const categoryElement = e.target.closest('.category-name-container');
    if (!categoryElement) return;
    displaySpinner(true)
    const allContainers = document.querySelectorAll('.category-name-container');
    allContainers.forEach(container => {
        container.classList.remove('bg-[#15803d]');
    });

    categoryElement.classList.add('bg-[#15803d]')
    const allNames = document.querySelectorAll('.category-name');
    allNames.forEach(name => {
        name.classList.remove('text-white');
    })
    
    categoryElement.children[0].classList.add('text-white');
    const id = categoryElement.id; 
    cardContainer.innerHTML = ``;
    
    const addCardsByCategory = async (id) => {
    const call = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const res = await call.json();
    const data = res.plants;
    data.forEach(plant => {
    cardContainer.innerHTML += `<div class="max-h-[425px] bg-white rounded-lg p-4 grid content-between">
                            <img class='w-full max-h-[186.8px] rounded-lg' src="${plant.image} alt="">
                            <h6 id="${plant.id}" class="hover:text-green-500 plant-name font-semibold text-[0.8rem] text-[#1F2937] hover:cursor-pointer text-center md:text-left mt-3">${plant.name}</h6>
                            <p class="text-[0.7rem] text-[#1F2937] text-center 
                              md:text-left my-2">${plant.description}</p>
                            <div class="flex justify-between items-center mb-3">
                                <div class="bg-[#DCFCE7] py-1 px-3 rounded-full">
                                    <h6 class="text-center text-[0.8rem] font-[400] text-
                                   [#15803D]">${plant.category}</h6>
                                </div>
                                <div class='flex'>
                                    <h6 class="text-[0.8rem] text-[#1F2937] 
                                        font-semibold">৳</h6>
                                    <h6 class="text-[0.8rem] text-[#1F2937] 
                                 font-semibold">${plant.price}</h6>
                                </div>
                            </div>
                            <button id='${plant.id}' class="hover:bg-green-500 add-btn py-3 px-5 font-medium 
                                w-full rounded-full bg-[#15803D] text-white 
                                 cursor-pointer">Add to Cart</button>
                        </div>` 

    displaySpinner(false)             
                }
            )
        }
    addCardsByCategory(id);
   }
)

cardContainer.addEventListener('click', (e) => {
    if (e.target.className.includes('plant-name')) {
        const elementId = e.target.id;
        const modalContainer = document.getElementById('my_modal_5');
        const modal = document.getElementById('modal-container');
        const displayModal = async (plantId) => {
            const call = await fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`);
            const res = await call.json();
            const data = res.plants;
            modal.innerHTML = `<h3 class="text-[1.5rem] font-extrabold mb-3">${data.name}</h3>
                            <img class="rounded-lg max-h-[300px] w-full" src="${data.image}" alt="">
                            <h5 class="mt-4"><span class="font-extrabold">Category: </span>${data.   category}</h5>
                            <h5 class="my-3"><span class="font-extrabold">Price: </span>${'৳' + data.   price}</h5>
                            <p ><span class="font-extrabold">Description: </span>${data.description}</p>
                            <div class="modal-action">
                             <form method="dialog">
                               <!-- if there is a button in form, it will close the modal -->
                               <button class="btn">Close</button>
                             </form>
                           </div>`
        modalContainer.showModal()
        }
        displayModal(elementId)
        }
    
    if (e.target.className.includes('add-btn')) {
        const totalPrice =  document.getElementById('total-price')
        totalPrice.classList.remove('hidden')
        totalPrice.classList.add('flex', 'border-t-[1px]', 'border-[#8C8C8C]')
        const plantName = e.target.parentElement.children[1].innerText;
        const plantPrice = e.target.parentElement.children[3].children[1].children[1].innerText;
        const div = document.createElement('div');
        div.classList.add('cart-item', 'bg-[#F0FDF4]', 'px-3', 'py-2', 'flex', 'justify-between', 
        'items-center', 'rounded-lg');
        cartList.classList.add('border-b-[1px]', 'border-[#8C8C8C]')
        div.dataset.price = plantPrice;
        div.innerHTML = `
          <div class="space-y-1">
              <h6 class="text-[#1F2937] text-[0.8rem] font-semibold">${plantName}</h6>
              <h5 class="item-price font-[400] text-[#8C8C8C]">৳${plantPrice} x 1</h5>
          </div>
          <h5 class="hover:text-red-500 remove-cart text-lg text-[#8C8C8C] cursor-pointer">x</h5>
        `;
        cartList.append(div);
        const amountPrice = document.getElementById('amount-price');
        amountPrice.innerText = Number(amountPrice.innerText) + Number(plantPrice);
        }
    }
)