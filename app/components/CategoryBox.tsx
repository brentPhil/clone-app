'use client'

import { useSearchParams, useRouter } from "next/navigation"
import queryString from "query-string"
import React, { useCallback } from "react"
import { IconType } from "react-icons"

interface CategoryBox {
  label: string
  icon: IconType
  selected: boolean
  description: string
}

const CategoryBox: React.FC<CategoryBox> = ({
  label,
  icon: Icon,
  selected,
  description,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    
    let currentQuery = {}

    if (params) {
      currentQuery = queryString.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get("category") === label) {
      delete updatedQuery.category
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 transition border-b-2 cursor-pointer hover:text-neutral-800 ${
        selected
          ? "border-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}>
      <Icon size={26} />
      <div className="text-sm font-medium truncate text-center">{label}</div>
    </div>
  )
}

export default CategoryBox
