import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import {
    decreaseItemQuantity,
    increaseItemQuantity,
    getCartQuantityById,
} from './cartSlice'

UpdateItemQuantity.propTypes = {
    pizzaId: PropTypes.number,
    itemQuantity: PropTypes.number,
}

function UpdateItemQuantity({ pizzaId }) {
    const dispatch = useDispatch()
    const quantityById = useSelector(getCartQuantityById(pizzaId))
    function handleDecreaseItem() {
        dispatch(decreaseItemQuantity(pizzaId))
    }

    function handleIncreaseItem() {
        dispatch(increaseItemQuantity(pizzaId))
    }
    return (
        <div className="flex items-center gap-1 md:gap-3">
            <Button type="rounded" onClick={handleDecreaseItem}>
                -
            </Button>
            <span className="text-sm font-medium">{quantityById}</span>
            <Button type="rounded" onClick={handleIncreaseItem}>
                +
            </Button>
        </div>
    )
}

export default UpdateItemQuantity
