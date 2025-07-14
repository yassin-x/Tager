import React from "react";
import Filters from "./Filters";
import { Separator } from "@/components/ui/separator";

export default function Products() {
  return (
    <section className="container section-gap">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/12 lg:w-1/4 p-4 md:p-0">
          <Filters />
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <Separator className="block md:hidden" />
        <div className="md:w-9/12 lg:w-3/4 p-4 md:p-0">
          <h2>Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-500/20 rounded-md p-4">Product 1</div>
            <div className="bg-gray-500/20 rounded-md p-4">Product 2</div>
            <div className="bg-gray-500/20 rounded-md p-4">Product 3</div>
            <div className="bg-gray-500/20 rounded-md p-4">Product 4</div>
            <div className="bg-gray-500/20 rounded-md p-4">Product 5</div>
            <div className="bg-gray-500/20 rounded-md p-4">Product 6</div>
            <div className="bg-gray-500/20 rounded-md p-4">Product 7</div>
            <div className="bg-gray-500/20 rounded-md p-4">Product 8</div>
          </div>
        </div>
      </div>
    </section>
  );
}
