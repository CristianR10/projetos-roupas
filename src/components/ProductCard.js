import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-md">
            <Link href={`/products/${product.id}`}>
                <img src={product.colors[0].image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4 bg-slate-100">
                    <h2 className="text-lg font-semibold mb-2">{product.name} - {product.brand}</h2>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                            <span key={size} className="px-2 py-1 bg-gray-200 rounded-md text-sm">{size}</span>
                        ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                            <div key={color.hexa} className="w-6 h-6 rounded-full border border-slate-300" style={{ backgroundColor: color.hexa }} title={color.hexa}></div>
                        ))}
                    </div>
                    <p className="text-gray-600 mb-2">R$ {product.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
