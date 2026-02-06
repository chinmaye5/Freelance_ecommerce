"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    unit: string;
    discountedPrice?: number;
}

const ProductCard = ({ product }: { product: Product }) => {
    const addToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = cart.find((item: any) => item.productId === product._id);

        if (existingItem) {
            if (existingItem.quantity + 1 > product.stock) {
                toast.error(`Only ${product.stock} items available in stock!`);
                return;
            }
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId: product._id,
                name: product.name,
                price: product.discountedPrice || product.price,
                quantity: 1,
                imageUrl: product.imageUrl,
                unit: product.unit
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full group overflow-hidden">
            <Link href={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-50">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                    </div>
                )}
                {product.discountedPrice && product.discountedPrice < product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                    </div>
                )}
            </Link>

            <div className="p-4 flex flex-col flex-1">
                <div className="mb-3">
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">{product.category}</p>
                    <Link href={`/product/${product._id}`} className="block">
                        <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        {product.discountedPrice && product.discountedPrice < product.price ? (
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                                <span className="text-xl font-bold text-green-700 leading-none">₹{product.discountedPrice}</span>
                            </div>
                        ) : (
                            <p className="text-xl font-bold text-gray-900 leading-none mb-1">₹{product.price}</p>
                        )}
                        <p className="text-[10px] text-gray-500 font-medium">per {product.unit}</p>
                    </div>
                    <button
                        onClick={addToCart}
                        disabled={product.stock <= 0}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:bg-gray-200"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
