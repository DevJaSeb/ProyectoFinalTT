export function filterProducts(products, searchTerm, minPrice, maxPrice, sortOrder) {
    let filteredProducts = products;

    // Filtro de búsqueda
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Filtro de precio
    if (minPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price >= parseFloat(minPrice)
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price <= parseFloat(maxPrice)
        );
    }

    // Ordenamiento
    if (sortOrder === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
}