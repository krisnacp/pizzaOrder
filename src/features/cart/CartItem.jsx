import PropTypes from 'prop-types'
import { formatCurrency } from '../../utils/helpers'
import DeleteCartItem from './DeleteCartItem'
import UpdateItemQuantity from './UpdateItemQuantity'
// import Button from '../../ui/Button'

CartItem.propTypes = {
    item: PropTypes.object,
}

function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item

    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex items-center justify-between sm:gap-6">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateItemQuantity pizzaId={pizzaId} />
                {/* delete cart item button dipindahkan dalam satu fileterpisah karena menjadi reused component */}
                <DeleteCartItem pizzaId={pizzaId} />
            </div>
        </li>
    )
}

export default CartItem
