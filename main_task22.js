const categories = [
    { name: "Phones",
      categoryId: "Phones",
      data: [{name : "Iphone 12", productFullName: "Apple iPhone 12",price: "32 499 uah.", color: "gold"},
            {name : "Samsung S20", productFullName: "Samsung S20",price: "18 999 uah.", color: "grey"},
            {name : "Motorola G22", productFullName: "Motorola G22 4/128G",price: "5 999 uah.", color: "silver"},]
    },
    {
    name: "TV",
     categoryId: "TV",
      data: [{name: "LG", productFullName: "LG 43UQ80006LB",price: "17 999 uah.", color: "green"},
            {name: "Samsung Curved", productFullName: "Samsung QE55Q60BAUXUA",price: "32 999 uah.", color: "white"},
            {name: "Sony", productFullName: "Sony KD55X81KR",price: "36 999 uah.", color: "black"},]
    },
    {
    name: "Cars",
     categoryId: "Cars",
      data: [{name: "Tesla Model S", productFullName: "Tesla Model S 75D",price: "42 200 $", color: "white"},
            {name: "BMW X6", productFullName: "BMW X6 35i Steptronic",price: "38 800 $", color: "black"},
            {name: "Ford Focus", productFullName: "Ford Focus 1.6 TDCi",price: "6 550 $", color: "silver"},]
    },
    {
        name: "Laptops",
         categoryId: "Laptops",
          data: [{name: "Acer Nitro 5", productFullName: "Acer Nitro 5",price: "49 999 uah.", color: "shale black"},
                {name: "Asus ROG Strix", productFullName: "Asus ROG Strix G15",price: "39 999 uah.", color: "black"},
                {name: "Apple MacBook Air", productFullName: "Apple MacBook Air",price: "58 999 uah.", color: "silver"},
                {name: "Lenovo IdeaPad", productFullName: "Lenovo IdeaPad 13",price: "18 999 uah.", color: "silver"},]
        },
];

const renderCategoriesRepeater = categories.map((category) => {
    return `<li data-src=${category.categoryId}>${category.name}</li>`
}).join('');

const categoriesTemplate = `<div class="categories-container">
            <h3>Categories</h3>
            <ol>
                ${renderCategoriesRepeater}
            </ol>
        </div>`;


const getProductsByCategory = (categoryId) => categories.find(category => category.categoryId === categoryId).data;

const productsTemplate = (categoryId) => {
    const productItems = getProductsByCategory(categoryId).map(product => {
        return `<li data-src=${product.name}>${product.name}</li>`
    }).join('');

    return `<div class="products-container">
        <h3>${categoryId}</h3>
        <ol>
            ${productItems}
        </ol>
    </div>`
    
};

const cleanContainers = () => {
    productsContainer.innerHTML = '';
    productDescriptionContainer.innerHTML = '';
};

const handleClickBuy = ()=>{
    cleanContainers();
    alert('Success');
    orderForm.classList.remove("d-none");
};



const getDescriptionTemplate = (product) => `<div class="categories-container">
<h3>  ${product.name}</h3>
    <ol >
    <li> Product name: ${product.productFullName}</li>
    <li> Product price: ${product.price}</li>
    <li> Product color: ${product.color}</li>
    </ol>
    <button id="buy_now">Buy now</button>
</div>`;


let selectedCategory = '';
let selectedProduct = {};

const categoriesContainer = document.querySelector(".container .categories");

const productsContainer = document.querySelector(".container .products");
const productDescriptionContainer = document.querySelector(".container .description")
const orderForm = document.getElementById("product-form");
categoriesContainer.innerHTML = categoriesTemplate;

const renderProductsList = (event) => {
    selectedCategory = event.target.dataset.src;
    if (selectedCategory) {
        const productsList = productsTemplate(selectedCategory);
        cleanContainers();
        productsContainer.innerHTML = productsList;
    }
}


const renderProductDescription = (event) => {
    
    const selectedProductName = event.target.dataset.src;
    const products = getProductsByCategory(selectedCategory);
    selectedProduct = products.find(product => product.name.includes(selectedProductName))
    console.log(products);
    console.log(selectedProductName)
    console.log(selectedProduct);

    productDescriptionContainer.innerHTML = getDescriptionTemplate(selectedProduct);
    document.getElementById('buy_now').addEventListener('click',handleClickBuy);

}

const categoryClickHandler = categoriesContainer.addEventListener("click", renderProductsList);
const productsClickHandler = productsContainer.addEventListener("click", renderProductDescription);


const renderCheckoutInfoCardTemplate = (checkoutFormData) => { 
    const infoCardContainer = document.querySelector(".checkout-info-card");
    const infoCardTemplate =`<div>
    <h2>Інформація щодо покупки</h2>
        <ul>
        <li> Product name: ${checkoutFormData.productFullName}</li>
        <li> Product price: ${checkoutFormData.price}</li>
        <li> Product color: ${checkoutFormData.color}</li>
        <li> ПІБ : ${checkoutFormData.fullName}</li>
        <li> Місто: ${checkoutFormData.city}</li>
        <li> № Вітділення НП: ${checkoutFormData.warehouseNum}</li>
        <li> Тип оплати: ${checkoutFormData.paymentType}</li>
        <li> Кількість продукції: ${checkoutFormData.quantity}</li>
        <li> Додатковий коментар: ${checkoutFormData.comment}</li>
        </ul>
    </div>`
    orderForm.classList.add("d-none")
    infoCardContainer.innerHTML = infoCardTemplate;
}


function submitForm() {
    const nameInput = document.getElementById("name");
    const cityInput = document.getElementById("city");
    const warehouseNumInput = document.getElementById("warehouseNum");
    const paymentTypeRadioInputs = document.getElementsByName("paymentType");
    const quantityInput = document.getElementById("quantity");
    const commentInput = document.getElementById("comment");
    let selectedPaymentType = "";

    for(i =0;i<paymentTypeRadioInputs.length;i++){
        if(paymentTypeRadioInputs[i].type === "radio"){
            if(paymentTypeRadioInputs[i].checked){
                selectedPaymentType = paymentTypeRadioInputs[i].value
                break
            } 
        }
    }
        console.log(selectedPaymentType)
    const nameInputValue = nameInput.value
    const cityInputValue = cityInput.value
    const warehouseNumInputValue = warehouseNumInput.value
    const quantityInputValue = quantityInput.value
    const commentInputValue = commentInput.value






    if (nameInputValue.trim() === "") {
      alert("Введіть ПІБ");
      nameInput.focus();
      return false;
    }
  
    if (!cityInputValue) {
      alert("Виберіть місто!");
      cityInput.focus();
      return false;
    }

    if (!warehouseNumInputValue) {
        alert("Введіть номер складу Нової Пошти!");
        warehouseNumInput.focus();
        return false;
      }

      if (!selectedPaymentType) {
        alert("Виберіть спосіб оплати");
        selectedPaymentType.focus();
        return false;
      }
  
    if (quantityInputValue < 1) {
      alert("Введіть кількість продукції");
      quantityInput.focus();
      return false;
    };


const checkoutFormData = {
    ...selectedProduct,
    fullName: nameInputValue,
    city: cityInputValue,
    warehouseNum: warehouseNumInputValue,
    paymentType:selectedPaymentType,
    quantity:quantityInputValue,
    comment:commentInputValue,
}
    renderCheckoutInfoCardTemplate(checkoutFormData)

  };




