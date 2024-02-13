import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'
import { addItem, getCartById } from '../cart/cartSlice'
import Button from '../../ui/Button'
import DeleteCartItem from '../cart/DeleteCartItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

MenuItem.propTypes = {
    pizza: PropTypes.object,
}

function MenuItem({ pizza }) {
    const dispatch = useDispatch()
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
    const cartById = useSelector(getCartById(id))
    // console.log(cartById)

    function handleAddToCart() {
        const newCartItem = {
            pizzaId: id,
            name: name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        }
        console.log(newCartItem)
        dispatch(addItem(newCartItem))
    }

    return (
        <li className="flex  gap-4 py-2">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
            />
            <div className="flex grow flex-col pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm font-medium uppercase text-stone-500">
                            Sold out
                        </p>
                    )}

                    {cartById && !soldOut && (
                        <div className="flex items-center gap-3 sm:gap-8">
                            <UpdateItemQuantity pizzaId={id} />
                            <DeleteCartItem pizzaId={id} />
                        </div>
                    )}

                    {!soldOut && !cartById && (
                        <Button type="small" onClick={handleAddToCart}>
                            Add To Cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuItem
