"use client"

import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [colorFilter, setColorFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        fetch("/data/products.json")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const applyFilters = useMemo(() => {
        return () => {
            let filtered = products.filter((product) => {
                return (
                    product.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                    (sizeFilter === "" || product.sizes.includes(sizeFilter)) &&
                    (colorFilter === "" || product.colors.some(color => color.name === colorFilter)) &&
                    (minPrice === "" || parseFloat(product.price) >= parseFloat(minPrice)) &&
                    (maxPrice === "" || parseFloat(product.price) <= parseFloat(maxPrice))
                );
            });
            setFilteredProducts(filtered);
        };
    }, [products, nameFilter, sizeFilter, colorFilter, minPrice, maxPrice]);

    const removeFilters = () => {
        setNameFilter('');
        setSizeFilter('');
        setColorFilter('');
        setMinPrice('');
        setMaxPrice('');
        setFilteredProducts(products);
    }

    const uniqueSizes = useMemo(() => {
        const sizesSet = new Set();
        products.forEach(product => product.sizes.forEach(size => sizesSet.add(size)));
        return Array.from(sizesSet);
    }, [products]);

    const uniqueColors = useMemo(() => {
        const colorsSet = new Set();
        products.forEach(product => product.colors.forEach(color => colorsSet.add(color.name)));
        return Array.from(colorsSet);
    }, [products]);

    return (
        <div>
            <div className="top-0 bg-black z-10 bg-black-500 md:sticky">
                <div className="flex flex-col justify-center md:flex-row md:items-start gap-4 p-4">
                    <input type="text" placeholder="Nome do produto" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-900" />
                    <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-900">
                        <option value="">Selecione um tamanho</option>
                        {uniqueSizes.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>
                    <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-900">
                        <option value="">Selecione uma cor</option>
                        {uniqueColors.map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                    </select>
                    <input type="number" placeholder="Preço mínimo" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-900" />
                    <input type="number" placeholder="Preço máximo" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-900" />
                    <button onClick={applyFilters} className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-700">Filtrar</button>
                    <button onClick={removeFilters} className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-700">Limpar Filtros</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10">
                {filteredProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;

