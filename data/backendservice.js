//global variable with all dbProducts
const allProducts = await getAllProducts();

export async function getAllProducts(){ 
    const response = await fetch ("/data/products.json");
    const jsonText = await response.text();

    const productslist = JSON.parse(jsonText);
    return productslist;
}

export async function getAllLimitedEditionProducts(){ 
    const leProducts = allProducts.filter(e => e.isLimitedEdition === true);
    return leProducts;
}

export async function getAllNewArrivalsProducts(){
    return allProducts.filter(e => e.isNewArrival === true);
}

export async function getAllBestsellersProducts(){
    return allProducts.filter(e => e.isBestSeller === true);
}



