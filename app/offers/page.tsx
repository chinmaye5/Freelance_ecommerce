"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tag, Percent, Flame, ArrowLeft } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    imageUrl: string;
    category: string;
    stock: number;
    unit: string;
    isOnOffer: boolean;
}

export default function OffersPage() {
    const router = useRouter();
    const [offers, setOffers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await fetch("/api/offers");
                const data = await res.json();
                setOffers(data);
            } catch (error) {
                console.error("Error fetching offers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const calculateDiscount = (price: number, discountedPrice?: number) => {
        if (!discountedPrice) return 0;
        return Math.round(((price - discountedPrice) / price) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 py-8 md:py-16 px-4 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-75"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <button
                        onClick={() => router.push("/")}
                        className="mb-4 md:mb-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold text-sm md:text-base">Back to Home</span>
                    </button>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 md:gap-3 bg-white/20 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6 border border-white/30">
                            <Flame className="text-yellow-300 animate-pulse" size={20} />
                            <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">Limited Time Deals</span>
                        </div>

                        <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-3 md:mb-4 drop-shadow-lg">
                            Special Offers
                        </h1>
                        <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto font-medium">
                            Grab amazing deals on your favorite products before they're gone!
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 font-semibold">Loading amazing offers...</p>
                    </div>
                ) : offers.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <Tag className="mx-auto text-gray-300 mb-4" size={64} />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Offers Available</h2>
                        <p className="text-gray-500 mb-6">Check back soon for exciting deals!</p>
                        <button
                            onClick={() => router.push("/")}
                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
                        >
                            Browse All Products
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                <Percent className="text-orange-600" size={24} />
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {offers.length} Hot {offers.length === 1 ? "Deal" : "Deals"}
                                </h2>
                            </div>
                            <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                            {offers.map((product) => {
                                const discount = calculateDiscount(product.price, product.discountedPrice);
                                const finalPrice = product.discountedPrice || product.price;
                                const isOutOfStock = product.stock === 0;

                                return (
                                    <div
                                        key={product._id}
                                        onClick={() => !isOutOfStock && router.push(`/product/${product._id}`)}
                                        className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-orange-400 ${!isOutOfStock ? "cursor-pointer" : "opacity-75"
                                            }`}
                                    >
                                        <div className="relative overflow-hidden aspect-square">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {/* Offer Badge */}
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 animate-pulse">
                                                <Flame size={14} />
                                                OFFER
                                            </div>

                                            {/* Discount Badge */}
                                            {discount > 0 && (
                                                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                                                    {discount}% OFF
                                                </div>
                                            )}

                                            {/* Out of Stock Overlay */}
                                            {isOutOfStock && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <span className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                                                        OUT OF STOCK
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-3 md:p-4">
                                            <div className="mb-2">
                                                <span className="text-[10px] md:text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                                    {product.category}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-gray-900 text-sm md:text-lg mb-1 md:mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                                                {product.name}
                                            </h3>



                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    {product.discountedPrice ? (
                                                        <>
                                                            <span className="text-xs md:text-sm text-gray-400 line-through">
                                                                ₹{product.price}
                                                            </span>
                                                            <span className="text-lg md:text-2xl font-bold text-orange-600">
                                                                ₹{finalPrice}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-lg md:text-2xl font-bold text-gray-900">
                                                            ₹{finalPrice}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] md:text-xs text-gray-500">per {product.unit}</span>
                                                </div>

                                                {!isOutOfStock && (
                                                    <div className="bg-green-50 text-green-700 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">
                                                        {product.stock}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
