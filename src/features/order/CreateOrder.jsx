import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../app/store';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );

export async function action({ request }) {
    // penggunaan argument/paramter request merupakan perpanjangan dari Request() object javascript. pemanfaatannya digunakan untuk mengambil pasangan key-value dari HTML input element yang berada nested didalam form, dalam case ini menggunakan Form dari react-router-dom
    const formData = await request.formData();
    // salah satu cara untuk mengubah/meng-convert data yang didapat dari fromData() yang awalnya berbentuk pasangan key-value menjadi bentuk object javascript dengan object method seperti dibawah
    const data = Object.fromEntries(formData);
    console.log(data);
    // kita juga memerlukan value dari priority key yang didapat dari input element, karena bentuk saat ini dari value priority key adalah string, kita perlu memodifikasinya sedikit agar berubah menjadi boolean
    const modifiedFormData = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'on',
    };
    // TODO: handling error pada form
    const errors = {};
    // check apakah ada error pada value dari input phone number menggunakan regex yang usdah dibuat
    if (!isValidPhone(modifiedFormData.phone))
        // jika phone number tidak valid, maka tambahkan pesan error pada key phone di object error seperti dibawah
        errors.phone =
            'Fill the phone number field with correct value. Because we might need that number to contact you';
    if (Object.keys(errors).length > 0) return errors;

    // function yang digunakan untuk post compiled data adalah createOrder
    const newOrder = await createOrder(modifiedFormData);
    // karena diluar komponen JSX method redux-toolkit tidak bisa digunakan, maka digunakanlah store untuk mengatasi masalah tersebut, hal in boleh digunakan saat keaadaan tertantu saja
    store.dispatch(clearCart());
    if (newOrder) throw redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
    const dispatch = useDispatch();
    const {
        username,
        position,
        status: addressStatus,
        address,
        error: errorAddress,
    } = useSelector((state) => state.user);
    const loading = addressStatus === 'loading';
    const error = addressStatus === 'failed';
    // mengontrol form state mengggunakan useNavigation untuk melihat sedang ditahap mana state berada
    const submit = useNavigation();
    const submitState = submit.state === 'submitting';
    // TODO: setelah error handling sudah dibuat di action function, kita bisa memanfaatkan nilai yang di-return-kan nantinya menggunakan action hook
    const errorActionObject = useActionData();
    const [withPriority, setWithPriority] = useState(false);
    const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = totalCartPrice + Math.floor(priorityPrice); //*
    if (cart.length === 0) return <EmptyCart />;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let&apos;s go!
            </h2>

            <Form method="POST" action="">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        type="text"
                        name="customer"
                        required
                        className="input grow"
                        defaultValue={username}
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input w-full"
                        />
                        {errorActionObject?.phone && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {errorActionObject.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            required
                            className="input w-full"
                            disabled={loading}
                            defaultValue={address}
                        />
                        {error && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>
                    {!position.latittude && !position.longitude && (
                        <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
                            <Button
                                disabled={loading}
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(fetchAddress());
                                }}
                            >
                                Use Your Position
                            </Button>
                        </span>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        className="h-6 w-6 accent-yellow-400  focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        // value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    {/* dalam case send data menggunakan method POST ini, kita juga memerlukan cart object untuk digunakan datanya, berikut adalah cara untuk meng-inculde-kan card object untuk di-send datanya, namun tidak perlu menampilkan element input pada UI client*/}
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.latitude && position.longitude
                                ? `${position.latitude},${position.longitude}`
                                : ''
                        }
                    />
                    <Button disabled={submitState || loading} type="primary">
                        {submitState
                            ? 'Placing order...'
                            : `Order now ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateOrder;
