import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Filters() {
  return (
    <div>
      <div className="flex flex-row md:flex-col gap-4 items-start">
        <Input placeholder="Search" className="w-full" type="search" />
        {/* Selected Filters */}
        <div className="flex gap-2 items-center">
          <Input
            type={"checkbox"}
            name="lowest-price"
            id="lowest-price"
            className="w-4 h-4"
          />
          <Label id={"lowest-price"}>Lowest Price</Label>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            type={"checkbox"}
            name="highest-price"
            id="highest-price"
            className="w-4 h-4"
          />
          <Label id={"highest-price"}>Highest Price</Label>
        </div>
      </div>
    </div>
  );
}
