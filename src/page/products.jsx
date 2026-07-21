import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProductsList() {
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
  const handleDelete = async (id) => {
    if (!confirm("Are You Sure U want To Delete Product?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product is deleted!");
        setProducts(products.filter((item) => item.id !== id));
      } else {
        alert("there is some error when deleting product!");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
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
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  if (loading) return <p className="p-8 text-center font-bold">Products Load Ho Rahe Hain...</p>;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Category Dropdown Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-1">All Products</h1>
            <p className="text-gray-500">Filter and manage your store inventory.</p>
          </div>

          {/* 🎯 DYNAMIC CATEGORY DROPDOWN */}
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

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border">
            <p className="text-gray-500 font-medium">There are no products.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-lg">
                      <span>{product.name}</span>
                      <span className="text-green-600 font-bold">${product.price}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold bg-slate-200 px-2.5 py-1 rounded-full text-slate-700">
                        {product.category}
                      </span>
                      {product.brand && (
                        <span className="text-xs text-gray-400">
                          Brand: {product.brand}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="p-4 flex gap-2 border-t bg-slate-50">
                  <Button
                    onClick={() => setEditingProduct(product)}
                    className="w-1/2 bg-blue-600 hover:bg-blue-700"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="destructive"
                    className="w-1/2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Modal (Form) */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg bg-white max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Edit Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Product Name</label>
                    <Input
                      value={editingProduct.name || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* 📸 IMAGE URL TEXT INPUT */}
                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={editingProduct.image || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, image: e.target.value })
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
                            e.target.src = "https://via.placeholder.com/150?text=Invalid+URL";
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
                        setEditingProduct({ ...editingProduct, category: e.target.value })
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
                        setEditingProduct({ ...editingProduct, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={editingProduct.description || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
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