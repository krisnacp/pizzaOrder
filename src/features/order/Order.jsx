// Test ID: IIDSAT
import { useLoaderData } from 'react-router';
import { getOrder } from '../../services/apiRestaurant';
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from '../../utils/helpers';
import OrderItem from '../order/OrderItem';
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

export async function loader({ params }) {
    const id = params.orderId;
    const data = await getOrder(id);
    return data;
}

function Order() {
    // penggunaan useFethcer() untuk fetching data dari loader di route yang berbeda
    const fetcher = useFetcher();
    const orderLoader = useLoaderData();
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = orderLoader;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    useEffect(() => {
        // !fetcher harus melewati proses loading/pengambilan data dari loder route yangbersangkutan untuk bisa digunakan datanya
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.load('/menu');
        }
    }, [fetcher]);

    return (
        <div className="space-y-8 px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Order #{id} status</h2>

                <div className="space-x-2">
                    {priority && (
                        <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                            Priority
                        </span>
                    )}
                    <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
                        {status} order
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5 ">
                <p className="font-medium">
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(
                              estimatedDelivery,
                          )} minutes left 😃`
                        : 'Order should have arrived'}
                </p>
                <p className="to-stone-500 text-xs">
                    (Estimated delivery: {formatDate(estimatedDelivery)})
                </p>
            </div>

            <ul className="divide-y divide-stone-200 border-b border-t">
                {cart.map((item) => (
                    <OrderItem
                        item={item}
                        key={item.pizzaId}
                        ingredients={
                            fetcher.data?.find((d) => d.id === item.pizzaId)
                                .ingredients
                        }
                        isLoadingIngredients={fetcher.state === 'loading'}
                    />
                ))}
            </ul>

            <div className="space-y-2 bg-stone-200 px-6 py-5">
                <p className="to-stone-600 text-sm font-medium">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p>Price priority: {formatCurrency(priorityPrice)}</p>
                )}
                <p className="font-bold">
                    To pay on delivery:{' '}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
                <UpdateOrder order={orderLoader} />
            </div>
        </div>
    );
}

export default Order;
