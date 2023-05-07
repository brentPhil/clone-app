"use client"

import Container from "../Container"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import CategoryBox from "../CategoryBox"
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { useSearchParams, usePathname } from "next/navigation"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Beautiful sandy shorelines and warm ocean waters.",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "Classic tall structures that harness the power of the wind.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description:
      "Sleek and contemporary design with clean lines and minimalism.",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Tranquil rural landscapes with fields, hills, and forests.",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Refreshing bodies of water for swimming and relaxation.",
  },
  {
    label: "Island",
    icon: GiIsland,
    description:
      "A landmass surrounded by water, perfect for tropical getaways.",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description:
      "A large body of freshwater surrounded by scenic views and nature.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description:
      "Sliding down snowy slopes on skis, a thrilling winter activity.",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description:
      "A grand fortified structure, often with a rich history and architecture.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description:
      "An outdoor recreational activity, sleeping in tents surrounded by nature.",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description:
      "Cold and icy polar regions with unique wildlife and landscapes.",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description:
      "A natural underground hollow space with unique rock formations.",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description:
      "A dry, barren region with little precipitation and unique desert plants.",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description:
      "Farm buildings used for storage, shelter, and livestock management.",
  },
  {
    label: "lux",
    icon: IoDiamond,
    description: "High-end and luxurious accommodations or experiences.",
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()
    const isMainPage = pathname === "/"

   if (!isMainPage) {
     return null
   }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between p-2 overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
            description={item.description}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
