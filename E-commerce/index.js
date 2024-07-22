let products = {
    data: [
    
    {image:"https://thumbs.dreamstime.com/z/royal-sofa-pillows-beige-luxurious-interior-ornament-frame-wall-royal-sofa-pillows-beige-luxurious-interior-98774953.jpg",productName:"Royal Cushion",price:"$1000",category:"furniture"},
    {image:"https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/K/A/196562_1657222919.jpg",productName:"Chandalier",price:"$900",category:"lightning"},
    {image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLqhsRkE4Aoby3pq4cqo26k858HGYk5sxbg&usqp=CAU",productName:"Ceramic Ball",price:"$1500",category:"lightning"},
    {image:"https://img.archiexpo.com/images_ae/photo-g/63930-9223990.jpg",productName:"Classic chair",price:"$500",category:"furniture"},
    {image:"https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/9856962/1.jpg?0195",productName:"Lounge Rug",price:"$300",category:"decoration"},
    {image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZug_mYdFJlTfZe_q-3OHEhLpSoVZyO5YyUw&usqp=CAU",productName:"Lantern Bulb",price:"$600",category:"lightning"},
    {image:"https://www.thespruce.com/thmb/LYpLe8F6UaR7aHDFjOP80S8fnyw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/unnamed-858b6bda477147fdb73a0e4e627469a9.jpg",productName:"sitting room shelf",price:"$800",category:"furniture"},
    {image:"https://m.media-amazon.com/images/I/71oQ88Ml9aS._AC_SL1200_.jpg",productName:"Luxury curtain",price:"$300",category:"curtains"},
    {image:"https://leatherworldng.com/wp-content/uploads/2022/03/how-to-choose-the-right-dining-room-furniture-in-lagos-abuja-nigeria.jpeg",productName:"Dinning Table",price:"$800",category:"furniture"},
    {image:"https://m.media-amazon.com/images/I/51LMse-rYWL._AC_UF894,1000_QL80_.jpg",productName:"Sunglass",price:"$400",category:"decoration"},
    {image:"https://photoshop-kopona.com/uploads/posts/2018-12/1543737324_clock_10.jpg",productName:"Fancy Clock",price:"$800",category:"decoration"},
    {image:"https://assets.ajio.com/medias/sys_master/root/20230628/rTSW/649b8bf6eebac147fc18484e/-473Wx593H-465668503-grey-MODEL.jpg",productName:"Floral curtain",price:"$200",category:"curtains"},
    {image:"https://www.oppeinhome.com/upload/images/ueditor/20230912/top-kitchen-design-ideas-that-inspire-you-1.webp",productName:" Kitchen Cabinet",price:"$500",category:"furniture"},
    {image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJ4M6auiX-_exOMm5H4MbUSL0lyYQlCf33Q&usqp=CAU",productName:"Tealight Holder",price:"$1000",category:"decoration"},
    {image:"https://www.home-designing.com/wp-content/uploads/2010/07/Egg-chair-582x582.jpg",productName:"Upholstry Chair",price:"$500",category:"furniture"},
    {image:"https://s2.dmcdn.net/v/SzMzn1WdKZk_N0hzq/x1080",productName:"Canvas",price:"$100",category:"decoration"},
    {image:"https://images.squarespace-cdn.com/content/v1/58fd82dbbf629ab224f81b68/1641448784787-LE65XKHVLJRYVOB8TN3H/05-Hanging-Wooden-Lantern.jpg",productName:"Chandilier",price:"$1500",category:"interior"},
    {image:"https://images.squarespace-cdn.com/content/v1/595bc70ff5e23172afe415d4/1648626739468-6PVFIFQRKZWZI86D4A97/Maniera+10.png?format=1000w",productName:"Lamp Holder",price:"$900",category:"interior"},
    {image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcdxc3dPt-wta9OgLKwrVchLkT-ShzH_EnPA&usqp=CAU",productName:"Wall Clock",price:"$200",category:"decoration"},
    {image:"https://m.media-amazon.com/images/I/61XqnbEAhXL._AC_SL1354_.jpg",productName:"Lamp Holder",price:"$500",category:"interior"}


    ]
}
let cartCount = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayAllProducts() {
    let productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    for (let i of products.data) {
        // Creating a container to hold the images
        let card = document.createElement("div");
        card.classList.add("card", i.category);

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        let image = document.createElement('img');
        image.setAttribute("src", i.image);
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);

        // Creating a container to hold the contents in the container
        let container = document.createElement("div");
        container.classList.add("container");

        // Creating the product name
        let name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = i.productName.toUpperCase();
        container.appendChild(name);

        // Creating the price
        let price = document.createElement("h6");
        price.innerText = i.price;
        container.appendChild(price);

        // Creating Add to Cart button
        let addToCartButton = document.createElement("button");
        addToCartButton.innerText = "Add to Cart";
        addToCartButton.classList.add("add-to-cart-button");

        addToCartButton.onclick = () => {
            addToCart(i);
        };

        container.appendChild(addToCartButton);
        card.appendChild(container);
        productsContainer.appendChild(card);
    }
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.productName === product.productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart(product, quantity) {
    let cartItem = cart.find(item => item.productName === product.productName);
    if (cartItem) {
        if (quantity === 0) {
            cart = cart.filter(item => item.productName !== product.productName);
        } else {
            cartItem.quantity = quantity;
        }
    } else {
        cart.push({...product, quantity: quantity});
    }
    saveCart();
    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const itemCountElement = document.getElementById('item-count');

    cartItemsContainer.innerHTML = '';
    let totalItems = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <div class="img-item">
                <img src="${item.image}" alt="">
                <h5>${item.productName}</h5>
            </div>
            <div class="quantity">
                <i class="fa fa-plus" data-id="${item.productName}"></i>
                <h4>${item.quantity}</h4>
                <i class="fa fa-minus" data-id="${item.productName}"></i>
            </div>
            <div class="items-details">
                <div class="item-price">$${item.price * item.quantity}</div>
                <i class="fa fa-trash" data-id="${item.productName}"></i>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalItems += item.quantity;
    });

    itemCountElement.textContent = totalItems;
    document.getElementById("cart-count").innerText = totalItems;

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-plus')) {
            const productName = e.target.dataset.id;
            updateQuantity(productName, 1);
        } else if (e.target.classList.contains('fa-minus')) {
            const productName = e.target.dataset.id;
            updateQuantity(productName, -1);
        } else if (e.target.classList.contains('fa-trash')) {
            const productName = e.target.dataset.id;
            updateQuantity(productName, 0);
        }
    });
}

function updateQuantity(productName, change) {
    const item = cart.find(item => item.productName === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            item.quantity = 1;
        } else if (change === 0) {
            cart = cart.filter(item => item.productName !== productName);
        }
        saveCart();
        renderCart();
    }
}

// Search functionality
document.getElementById('search-item').addEventListener('input', function() {
    let searchQuery = this.value.toLowerCase();
    let elements = document.querySelectorAll(".card");
    let found = false;

    elements.forEach((element) => {
        let text = element.textContent || element.innerText;
        if (text.toLowerCase().includes(searchQuery)) {
            element.classList.remove("hide");
            found = true;
        } else {
            element.classList.add("hide");
        }
    });

    let notFoundMessage = document.getElementById('not-found');
    if (found) {
        notFoundMessage.style.display = 'none';
    } else {
        notFoundMessage.style.display = 'block';
    }
    this.value = "";
});

// Button filtering
function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach(button => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        if (value == "all") {
            element.classList.remove("hide");
        } else {
            if (element.classList.contains(value)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        }
    });
}

// Display all the products on page load
window.onload = () => {
    displayAllProducts();
    updateCartCount();
}

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('open');
    });
});
//iteration of so many things.its safe to use for

// let cartCount = 0;
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function displayAllProducts() {
//     let productsContainer = document.getElementById("products");
//     productsContainer.innerHTML = "";

//     for (let i of products.data) {
//         // Creating a container to hold the images
//         let card = document.createElement("div");
//         card.classList.add("card", i.category);

//         let imgContainer = document.createElement("div");
//         imgContainer.classList.add("image-container");

//         let image = document.createElement('img');
//         image.setAttribute("src", i.image);
//         imgContainer.appendChild(image);
//         card.appendChild(imgContainer);

//         // Creating a container to hold the contents in the container
//         let container = document.createElement("div");
//         container.classList.add("container");

//         // Creating the product name
//         let name = document.createElement("h5");
//         name.classList.add("product-name");
//         name.innerText = i.productName.toUpperCase();
//         container.appendChild(name);

//         // Creating the price
//         let price = document.createElement("h6");
//         price.innerText = i.price;
//         container.appendChild(price);

//         // Creating Add to Cart button
//         let addToCartButton = document.createElement("button");
//         addToCartButton.innerText = "Add to Cart";
//         addToCartButton.classList.add("add-to-cart-button");

//         addToCartButton.onclick = () => {
//             cart.push(i);
//             cartCount++;
//             document.getElementById("cart-count").innerText = cartCount;
//             localStorage.setItem('cart', JSON.stringify(cart));
//         };

//         container.appendChild(addToCartButton);
//         card.appendChild(container);
//         productsContainer.appendChild(card);
//     }
// }



// function updateCart(product, quantity) {
//     let cartItem = cart.find(item => item.productName === product.productName);
//     if (cartItem) {
//         if (quantity === 0) {
//             cart = cart.filter(item => item.productName !== product.productName);
//         } else {
//             cartItem.quantity = quantity;
//         }
//     } else {
//         cart.push({...product, quantity: quantity});
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// // search button

// // Add search functionality
// document.getElementById('search-item').addEventListener('input', function() {
//     let searchQuery = this.value.toLowerCase();
//     let elements = document.querySelectorAll(".card");
//     let found = false;

//     elements.forEach((element) => {
//         let text = element.textContent || element.innerText;
//         if (text.toLowerCase().includes(searchQuery)) {
//             element.classList.remove("hide");
//             found = true;
//         } else {
//             element.classList.add("hide");
//         }
//     });

//     let notFoundMessage = document.getElementById('not-found');
//     if (found) {
//         notFoundMessage.style.display = 'none';
//     } else {
//         notFoundMessage.style.display = 'block';
//     }
//     // clear search
//     this.value = ""
// });



// // button filtering
     
// function filterProduct(value){
//     let buttons = document.querySelectorAll(".button-value");
//     buttons.forEach(button=>{
//         if(value.toUpperCase()== button.innerText.toUpperCase()){
//             button.classList.add("active")
//         }
//         else{
//             button.classList.remove("active")
//         }
//     });
//     let elements = document.querySelectorAll(".card");
//     elements.forEach((element)=>{
//         if(value =="all"){
//             element.classList.remove("hide")
//         }
//         else{

//             if(element.classList.contains(value)){

//                 element.classList.remove("hide")
//             }
//             else{
//                 element.classList.add("hide")
//             }
//         }
//     })
// }
// //to display all the products

// window.onload = () =>{
//     displayAllProducts()
//     // filterProduct("all")
// }

// // faq 

// document.querySelectorAll('.faq-question').forEach(button => {
//     button.addEventListener('click', () => {
//         const faqItem = button.parentElement;

//         // Toggle the open class
//         faqItem.classList.toggle('open');
//     });
// });

