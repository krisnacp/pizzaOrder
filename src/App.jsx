import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import Home from './ui/Home';

import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
    action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import { action as orderAction } from './features/order/UpdateOrder';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />} errorElement={<Error />}>
            <Route path="/" element={<Home />} />
            <Route
                path="menu"
                element={<Menu />}
                loader={menuLoader}
                // penambahan properti error karena kemungkinan route error dalam proses fetching data
                errorElement={<Error />}
            />
            <Route path="cart" element={<Cart />} />
            <Route
                path="order/new"
                element={<CreateOrder />}
                action={createOrderAction}
            />
            <Route
                path="order/:orderId"
                element={<Order />}
                loader={orderLoader}
                errorElement={<Error />}
                action={orderAction}
            />
        </Route>,
    ),
);

function App() {
    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </>
    );
}

export default App;
