import { useEffect, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  const [count, setCount] = useState(0);

  useEffect(()=>{
    getdata()
  },[count])

  function getdata(){
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log(data));}
  const handleIncrement = () => {
  setCount((prev) => prev + 1);
  };


  const handleDecrement = () => {
    setCount((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-80 rounded-2xl shadow-xl">
        <CardContent className="flex flex-col items-center gap-6 py-8">
          <h1 className="text-2xl font-bold">Counter</h1>

          <div className="text-6xl font-bold text-primary">
            {count}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={count === 0}
            >
              <Minus className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              onClick={handleIncrement}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="destructive"
            onClick={handleReset}
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}