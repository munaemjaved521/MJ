import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";



export default function Addproducts() {
  const sizes = [38, 39, 40, 41, 42, 43];

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Blue", value: "#2563eb" },
    { name: "Red", value: "#dc2626" },
    { name: "Green", value: "#16a34a" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Add Product
        </h1>

        <p className="text-gray-500 mb-8">
          Create a new product for your store.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Side */}

          <Card className="lg:col-span-2">

            <CardHeader>
              <CardTitle>
                Product Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              <div>

                <Label>Product Name</Label>

                <Input
                  placeholder="Nike Air Max 270"
                />

              </div>

              <div>

                <Label>Description</Label>

                <Textarea
                  rows={5}
                  placeholder="Write product description..."
                />

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <Label>Category</Label>

                  <select className="w-full h-10 rounded-md border px-3">

                    <option>Shoes</option>

                    <option>T-Shirts</option>

                    <option>Hoodies</option>

                    <option>Accessories</option>

                  </select>

                </div>

                <div>

                  <Label>Brand</Label>

                  <Input
                    placeholder="Nike"
                  />

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <Label>Price</Label>

                  <Input
                    type="number"
                    placeholder="$199"
                  />

                </div>

                <div>

                  <Label>Discount Price</Label>

                  <Input
                    type="number"
                    placeholder="$149"
                  />

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <Label>Stock</Label>

                  <Input
                    type="number"
                    placeholder="100"
                  />

                </div>

                <div>

                  <Label>SKU</Label>

                  <Input
                    placeholder="NK-001"
                  />

                </div>

              </div>

              {/* Sizes */}

              <div>

                <Label className="mb-3 block">
                  Available Sizes
                </Label>

                <div className="flex flex-wrap gap-3">

                  {sizes.map((size) => (

                    <button
                      key={size}
                      className="h-10 w-14 rounded-lg border hover:bg-black hover:text-white transition"
                    >
                      {size}
                    </button>

                  ))}

                </div>

              </div>

              {/* Colors */}

              <div>

                <Label className="mb-3 block">
                  Available Colors
                </Label>

                <div className="flex gap-4">

                  {colors.map((color) => (

                    <button
                      key={color.name}
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                      style={{
                        backgroundColor: color.value,
                      }}
                    />

                  ))}

                </div>

              </div>

            </CardContent>

          </Card>

          {/* Right Side */}

          <Card>

            <CardHeader>

              <CardTitle>
                Product Images
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              <div>

                <Label>Main Image</Label>

                <Input
                  type="file"
                />

              </div>

              <div>

                <Label>Gallery Images</Label>

                <Input
                  type="file"
                  multiple
                />

              </div>

              <div>

                <Label>Status</Label>

                <div className="space-y-3 mt-3">

                  <label className="flex items-center gap-2">

                    <input type="checkbox" />

                    Featured Product

                  </label>

                  <label className="flex items-center gap-2">

                    <input type="checkbox" />

                    Best Seller

                  </label>

                  <label className="flex items-center gap-2">

                    <input type="checkbox" />

                    New Arrival

                  </label>

                </div>

              </div>

              <div>

                <Label>Preview</Label>

                <div className="mt-3 h-56 rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400">

                  Image Preview

                </div>

              </div>

              <Button className="w-full h-12 text-lg">

                Save Product

              </Button>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  );
}
