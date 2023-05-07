import React from "react"

interface HeadingProps {
  title?: string
  subtitle?: string
  center?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-lg font-bold sm:text-2xl">{title}</div>
      <div className="mt-2 font-light text-neutral-500">
        {subtitle}
      </div>
    </div>
  )
}

export default Heading
