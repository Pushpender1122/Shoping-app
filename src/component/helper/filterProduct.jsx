import React from 'react';

const ProductFilter = ({ filters, onFiltersChange }) => {
    const handleFiltersChange = (updatedFilters) => {
        // Pass the updated filters to the parent component (ProductSearch)
        onFiltersChange(updatedFilters);
    };

    return (
        <div className="bg-white shadow-md rounded overflow-hidden w-64 h-screen  top-0 left-0 flex flex-col  pr-6">
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
                <h2 className="text-lg font-medium">Filters</h2>
            </div>
            <div className="px-4 py-6 flex flex-col gap-4">
                <div className="mb-2">
                    <label htmlFor="rating" className="block text-sm font-medium mb-1">
                        Rating:
                    </label>
                    <select
                        name="rating"
                        id="rating"
                        value={filters.rating}
                        onChange={(event) => {
                            handleFiltersChange({ ...filters, rating: event.target.value });
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars and Above</option>
                        <option value="3">3 Stars and Above</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Category:
                    </label>
                    <select
                        name="category"
                        id="category"
                        value={filters.category}
                        onChange={(event) => {
                            handleFiltersChange({ ...filters, category: event.target.value });
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        {/* Replace with your actual category options */}
                        <option value="clothing">Clothing</option>
                        <option value="electronics">Electronics</option>
                        <option value="books">Books</option>
                    </select>
                </div>
                {/* Price range input */}
                <div className="mb-2">
                    <label htmlFor="priceRange" className="block text-sm font-medium mb-1">
                        Price Range: {filters.priceRange}
                    </label>
                    <input
                        type="range"
                        id="priceRange"
                        name="priceRange"
                        min="0"
                        max="100000"
                        step="50"
                        value={filters.priceRange}
                        onChange={(event) => {
                            handleFiltersChange({ ...filters, priceRange: event.target.value });
                        }}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
