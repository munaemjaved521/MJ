import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProductsList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category Filter State
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState(null);

  const API_URL = "https://6a5f186c98d9f02aed7a128d.mockapi.io/products";

  // GET Products
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 💥 DYNAMIC CATEGORIES
  const dynamicCategories = [
    "All",
    ...new Set(
      products
        .map((p) => p.category)
        .filter((cat) => cat && cat.trim() !== "")
    ),
  ];

  // DELETE Product
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are You Sure U want To Delete Product?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product is deleted!");
        setProducts(products.filter((item) => item.id !== id));
      } else {
        alert("There is some error when deleting product!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // EDIT Button Handler
  const handleEditClick = (product, e) => {
    e.stopPropagation();
    setEditingProduct(product);
  };

  // UPDATE Product
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        alert("Product Updated!");
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert("Product Not Updated!");
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  // Filter Products based on Selected Category Dropdown
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading)
    return (
      <p className="p-8 text-center font-bold">
        Products Are Loading Please Wait
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Category Dropdown Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-1">All Products</h1>
            <p className="text-gray-500">
              Filter and manage your store inventory.
            </p>
          </div>

          {/* DYNAMIC CATEGORY DROPDOWN */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 rounded-md border border-gray-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
            >
              {dynamicCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LINE-WISE / TABLE PRODUCT LIST */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border">
            <p className="text-gray-500 font-medium">There are no products.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-semibold">
                    {/* 🎯 1. Header mein ID Column Add Hua */}
                    <th className="p-4">ID</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="hover:bg-slate-100/80 transition-colors cursor-pointer"
                    >
                      {/* 🎯 2. Product ID Display Karne Ke Liye */}
                      <td className="p-4 whitespace-nowrap text-xs font-mono font-bold text-slate-500">
                        #{product.id}
                      </td>

                      {/* Image & Name & Description */}
                      <td className="p-4 min-w-[280px]">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              product.image || "https://via.placeholder.com/150"
                            }
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md border flex-shrink-0"
                          />
                          <div>
                            <h3 className="font-semibold text-slate-900 line-clamp-1 hover:underline">
                              {product.name}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                              {product.description || "No description available"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="text-xs font-medium bg-slate-100 px-2.5 py-1 rounded-full text-slate-700 border">
                          {product.category}
                        </span>
                      </td>

                      {/* Brand */}
                      <td className="p-4 whitespace-nowrap text-sm text-slate-600">
                        {product.brand || "-"}
                      </td>

                      {/* Price */}
                      <td className="p-4 whitespace-nowrap font-bold text-green-600 text-base">
                        ${product.price}
                      </td>

                      {/* Action Buttons */}
                      <td className="p-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            onClick={(e) => handleEditClick(product, e)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={(e) => handleDelete(product.id, e)}
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal (Form) */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg bg-white max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Edit Product #{editingProduct.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Product Name</label>
                    <Input
                      value={editingProduct.name || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* IMAGE URL TEXT INPUT */}
                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={editingProduct.image || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          image: e.target.value,
                        })
                      }
                    />
                    {editingProduct.image && (
                      <div className="mt-2 h-24 w-full rounded border overflow-hidden bg-slate-50 flex items-center justify-center">
                        <img
                          src={editingProduct.image}
                          alt="Preview"
                          className="h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/150?text=Invalid+URL";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <input
                      type="text"
                      value={editingProduct.category || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                        })
                      }
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Price ($)</label>
                    <Input
                      type="number"
                      value={editingProduct.price || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={editingProduct.description || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingProduct(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}