import { useState } from "react";
import { Star, Minus, Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Blue", value: "#2563eb" },
    { name: "Red", value: "#dc2626" },
  ];

  const sizes = [38, 39, 40, 41, 42, 43];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(41);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-10">
      <Card className="max-w-6xl w-full shadow-xl rounded-2xl">
        <CardContent className="grid md:grid-cols-2 gap-10 p-8">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
              alt="Shoe"
              className="rounded-xl object-cover w-full max-w-md"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">

            <div>
              <h1 className="text-3xl font-bold">
                Nike Air Max 270
              </h1>

              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <Star fill="currentColor" size={18}/>
                <Star fill="currentColor" size={18}/>
                <Star fill="currentColor" size={18}/>
                <Star fill="currentColor" size={18}/>
                <Star fill="currentColor" size={18}/>
                <span className="text-gray-600 ml-2">(4.9)</span>
              </div>

              <p className="text-3xl font-bold mt-4 text-primary">
                $199
              </p>
            </div>

            <p className="text-gray-600">
              Experience all-day comfort with the Nike Air Max 270.
              Lightweight cushioning, breathable mesh upper, and
              premium quality for everyday wear.
            </p>

            {/* Colors */}

            <div>
              <h3 className="font-semibold mb-3">
                Select Color
              </h3>

              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-4 ${
                      selectedColor.name === color.name
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}

            <div>
              <h3 className="font-semibold mb-3">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={
                      selectedSize === size
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}

            <div>
              <h3 className="font-semibold mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-4">

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                >
                  <Minus />
                </Button>

                <span className="text-2xl font-bold">
                  {quantity}
                </span>

                <Button
                  size="icon"
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                >
                  <Plus />
                </Button>

              </div>
            </div>

            {/* Buttons */}

            <div className="flex gap-4 pt-4">
              <Button className="flex-1">
                Add to Cart
              </Button>

              <Button
                variant="secondary"
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>

          </div>

        </CardContent>
      </Card>
    </div>
  );
}