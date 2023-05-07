import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservation"
import EmptyState from "../components/EmptyState"
import ReservationsClient from "./ReservationsClient"

const ReservationPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="You are not authorized to access this page"
        homeButton
      />
    )
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <EmptyState title="No reservations" subTitle="You have no reservations" />
    )
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default ReservationPage
