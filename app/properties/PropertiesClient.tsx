"use client"

import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeListing, SafeUser } from "../types"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface PropertiesClientProps {
  currentUser: SafeUser | null
  properties: SafeListing[]
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  properties,
}) => {
  const router = useRouter()

  const [deletingId, setDeletingId] = useState("")

  const onRemove = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property Removed")
          router.refresh()
        })
        .catch(() => {
          toast.error("error?.response?.data?.error")
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading
        title="Listed Properties"
        subtitle="Properties you've listed"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map((property) => (
          <ListingCard
            key={property.id}
            data={property}
            actionId={property.id}
            onAction={onRemove}
            disabled={deletingId === property.id}
            actionLabel="Remove from listing"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
