import React from "react"
import EmptyState from "../components/EmptyState"
import getFavoriteListings from "../actions/getFavoriteListings"
import getCurrentUser from "../actions/getCurrentUser"
import FavoritesClient from "./FavoritesClient"

const ListingPage = async () => {
  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites yet"
        subTitle="looks like you have no favorites yet"
      />
    )
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default ListingPage
