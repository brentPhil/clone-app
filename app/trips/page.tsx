import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservation"
import EmptyState from "../components/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
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

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations"
        subTitle="Please make a reservation to view your reservations"
      />
    )
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}

export default TripsPage
