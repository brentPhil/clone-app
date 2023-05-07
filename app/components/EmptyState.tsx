"use client"
import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"
import { BiArrowBack } from "react-icons/bi"

interface EmptyState {
  title?: string
  subTitle?: string
  showReset?: boolean
  homeButton?: boolean
}
const EmptyState: React.FC<EmptyState> = ({
  title = "No exact match",
  subTitle = "Try changing your search",
  showReset,
  homeButton,
}) => {
  const router = useRouter()
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
      <Heading title={title} center subtitle={subTitle} />

      {showReset && (
        <div className="w-48 mt-4">
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        </div>
      )}
      {homeButton && (
        <div className="w-[280px] mt-4">
          <Button
            icon={BiArrowBack}
            outline
            label="Back to home page"
            onClick={() => router.push("/")}
          />
        </div>
      )}
    </div>
  )
}

export default EmptyState
