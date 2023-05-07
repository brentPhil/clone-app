import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import EmptyState from "../components/EmptyState"
import PropertiesClient from "./PropertiesClient"

const Properties = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthenticated"
        subTitle="Please login to view your reservations"
        homeButton
      />
    )
  }

  const properties = await getListings({
    userId: currentUser.id,
  })

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties"
        subTitle="Please make a reservation to view your properties"
      />
    )
  }

  return <PropertiesClient properties={properties} currentUser={currentUser} />
}

export default Properties
