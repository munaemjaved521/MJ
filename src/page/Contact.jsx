import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, RotateCcw } from "lucide-react";

// Yahan path ko 'redux' folder ke mutabiq theek kar diya hai:
import { decrement, increment, reset } from "../redux/slices/counterSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getData();
  }, [count]);

  function getData() {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      });
  }

  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold">Counter</h1>

        <div className="mb-8 text-center">
          <span className="text-6xl font-bold">{counter}</span>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => dispatch(decrement())}
          >
            <Minus className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            onClick={() => dispatch(increment())}
          >
            <Plus className="h-5 w-5" />
          </Button>

          <Button
            variant="destructive"
            size="icon"
            onClick={() => dispatch(reset())}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}