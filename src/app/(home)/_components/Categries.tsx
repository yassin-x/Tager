import Link from "@/components/Link";
import { MagicCard } from "@/components/ui/magic-card";
import {
  AppWindowIcon,
  Gamepad2Icon,
  LucideProps,
  MailIcon,
  RocketIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";

export default function Categries() {
  const categroies: {
    name: string;
    slug: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }[] = [
    {
      name: "Trending",
      slug: "trending",
      icon: TrendingUpIcon,
    },
    {
      name: "Accounts",
      slug: "accounts",
      icon: MailIcon,
    },
    {
      name: "Boosting",
      slug: "boosting",
      icon: RocketIcon,
    },
    {
      name: "Games",
      slug: "games",
      icon: Gamepad2Icon,
    },
    {
      name: "Software Apps",
      slug: "software",
      icon: AppWindowIcon,
    },
  ];
  return (
    <section className="container section-gap space-y-4">
      <h2 className="text-2xl font-bold text-center">Select Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categroies.map((category, index) => (
          <Link key={index} href={`/categories/${category.slug}`}>
            <MagicCard className="p-4 rounded-md">
              <div className="flex flex-col items-center">
                <category.icon className="w-12 h-12" />
                <span>{category.name}</span>
              </div>
            </MagicCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
