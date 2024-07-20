import getSession from '@/lib/helpers/getSession'

const Profile = async () => {
  const session = await getSession()
  const user = session?.user

  return (
    <>
      <h1 className="text-2xl mb-4 font-semibold">Profile</h1>
      <ul className="space-y-2 text-lg">
        <li>
          <b>Name: </b>
          {user?.name ? (
            user.name
          ) : (
            <span>
              {user?.firstName} {user?.lastName}
            </span>
          )}
        </li>
        {user?.username && (
          <li>
            <b>Username: </b>
            {user.username}
          </li>
        )}
        {user?.gender && (
          <li>
            <b>Gender: </b>
            {user.gender}
          </li>
        )}
        <li>
          <b>Email: </b> {user?.email}
        </li>
      </ul>
    </>
  )
}

export default Profile
