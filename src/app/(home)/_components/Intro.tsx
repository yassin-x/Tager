import Image from "next/image";
import React from "react";

export default function Intro() {
  return (
    <section className="section-gap container">
      <div className="bg-blue-500 rounded-md p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 mx-auto">
            <h1 className="text-3xl font-bold text-white">Welcome to Tager</h1>
            <p className="text-white">
              Your one-stop destination for buying and selling used goods.
            </p>
          </div>
          <div className="mx-auto max-w-md">
            <Image
              src={"/images/ui/intro.svg"}
              alt="intro"
              width={200}
              height={200}
              className=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
