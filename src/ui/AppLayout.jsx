import { Outlet, useNavigation } from 'react-router'
import Header from './Header'
import Loader from './Loader'
import CartOverview from '../features/cart/CartOverview'

function AppLayout() {
    // memanfaatkan useNavigation() hook untuk melihat laoding status saat fetching data menggunakan loader() function
    const loading = useNavigation()
    const loadingState = loading.state === 'loading'

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {loadingState && <Loader />}
            <Header />
            <div className="overflow-scroll">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>
            <CartOverview />
        </div>
    )
}

export default AppLayout
