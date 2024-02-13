import { useSelector } from 'react-redux'
function Username() {
    const userState = useSelector((state) => state.user)
    if (!userState.username) return null

    return (
        <div className="hidden text-sm font-semibold md:block">
            {userState.username}
        </div>
    )
}

export default Username
