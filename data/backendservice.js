//global variable with all dbProducts
const allProducts = await getAllProducts();

export async function getAllProducts(){ 
    const response = await fetch ("/data/products.json"); //am facut un request pentru a primi datele din JSON
    const jsonText = await response.text(); //aici a venit doar textul din Body

    const productslist = JSON.parse(jsonText); //am parsat pentru a transforma din text in array de obiecte
    return productslist;
}

export async function getAllLimitedEditionProducts(){ 
    const leProducts = allProducts.filter(e => e.isLimitedEdition === true);
    return leProducts;
}

//din toate produsele allProducts am filtrat dupa nevoie
export async function getAllNewArrivalsProducts(){
    return allProducts.filter(e => e.isNewArrival === true);
}

export async function getAllBestsellersProducts(){
    return allProducts.filter(e => e.isBestSeller === true);
}

export async function getAllFruitTeaProducts(){
    return allProducts.filter(e => e.subcategory === "fruitTea");
}

export async function getAllMilkTeaProducts(){
    return allProducts.filter(e => e.subcategory === "milkTea");
}

export async function getAllCheesecakeProducts(){
    return allProducts.filter(e => e.subcategory === "cheesecake");
}

export async function getAllCoffeeProducts(){
    return allProducts.filter(e => e.subcategory === "coffee");
}
export async function getAllSpecialCoffeeProducts(){
    return allProducts.filter(e => e.subcategory === "specialCoffee");
}
export async function getAllWaffleProducts(){
    return allProducts.filter(e => e.subcategory === "waffle");
}

export function getProductById(id){
    return allProducts.find(e => e.id === id);
}

