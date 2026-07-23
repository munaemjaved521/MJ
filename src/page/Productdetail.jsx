import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 🎯 1. Router Hooks
import { Star, Minus, Plus, Heart, ArrowLeft } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { id } = useParams(); // 🎯 URL se Dynamic ID mili (/product/:id)
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Static options (agar API mein nahi hain)
  const colors = [
    {
      name: "Black",
      value: "#000000",
      image:
        "https://images.unsplash.com/photo-1710472171218-da46dce3faf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBuaWtlfGVufDB8fDB8fHww",
    },
    {
      name: "White",
      value: "#ffffff",
      image:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGUlMjBuaWtlfGVufDB8fDB8fHww",
    },
    {
      name: "Blue",
      value: "#2563eb",
      image:
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZSUyMG5pa2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Red",
      value: "#dc2626",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTVDJTIwbmlrZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const sizes = [38, 39, 40, 41, 42, 43];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(41);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  // 🎯 2. API se Single Product Fetch Karna
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(
          `https://6a5f186c98d9f02aed7a128d.mockapi.io/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching single product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSingleProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-lg">
        Loading Product Details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-500">Product Not Found!</p>
        <Button onClick={() => navigate("/")}>Go Back To Products</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-6 md:p-10">
      
      {/* 🎯 Back Button */}
      <div className="max-w-6xl w-full mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-slate-200"
        >
          <ArrowLeft size={18} /> Back to Products
        </Button>
      </div>

      <Card className="max-w-6xl w-full shadow-xl rounded-2xl">
        <CardContent className="grid md:grid-cols-2 gap-10 p-8">

          {/* Dynamic Image (Sath Color Selection Fallback) */}
          <div className="flex justify-center items-center">
            <img
              src={
                product.image ||
                selectedColor.image ||
                "https://via.placeholder.com/400"
              }
              alt={product.name}
              className="rounded-xl object-cover w-full max-w-md h-96 border"
            />
          </div>

          {/* Dynamic Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-slate-200 px-2 py-1 rounded text-slate-700">
                  ID: #{product.id}
                </span>
                {product.category && (
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {product.category}
                  </span>
                )}
              </div>

              {/* 💥 Dynamic Name */}
              <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <span className="text-gray-600 ml-2">(4.9)</span>
              </div>

              {/* 💥 Dynamic Price */}
              <p className="text-3xl font-bold mt-4 text-primary">
                ${product.price}
              </p>
            </div>

            {/* 💥 Dynamic Description */}
            <p className="text-gray-600">
              {product.description ||
                "Experience premium quality and high-grade materials designed for maximum comfort and style."}
            </p>

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-3">Select Color</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      selectedColor.name === color.name
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setQuantity((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <Minus />
                </Button>

                <span className="text-2xl font-bold">{quantity}</span>

                <Button
                  size="icon"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1">Add to Cart</Button>
              <Button variant="secondary" className="flex-1">
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setWishlist(!wishlist)}
              >
                <Heart
                  className={`${
                    wishlist
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500"
                  }`}
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}