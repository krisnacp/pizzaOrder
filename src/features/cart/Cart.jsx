import { useDispatch, useSelector } from 'react-redux'
import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from '../cart/CartItem'
import { getCart, clearCart } from './cartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)
    const cart = useSelector(getCart)

    // TODO: clear all cart item
    function handleClearCart() {
        console.log('berhasil')
        dispatch(clearCart())
    }

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <>
                {cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <h2 className="mt-7 text-xl font-semibold">
                            Your cart, {userState.username}
                        </h2>
                        <ul className="mt-3 divide-y divide-stone-200 border-b">
                            {cart?.map((item) => (
                                <CartItem item={item} key={item.pizzaId} />
                            ))}
                        </ul>
                        <div className="mt-6 space-x-2">
                            <Button to="/order/new" type="primary">
                                Order pizzas
                            </Button>
                            <Button type="secondary" onClick={handleClearCart}>
                                Clear cart
                            </Button>
                        </div>
                    </>
                )}
            </>
        </div>
    )
}

export default Cart
