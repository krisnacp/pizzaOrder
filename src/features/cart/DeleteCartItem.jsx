import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice'
import Button from '../../ui/Button'

DeleteCartItem.propTypes = {
    pizzaId: PropTypes.number,
}

function DeleteCartItem({ pizzaId }) {
    const dispatch = useDispatch()
    function handleDeleteCartItem() {
        dispatch(deleteItem(pizzaId))
    }

    return (
        <Button type="small" onClick={handleDeleteCartItem}>
            Delete
        </Button>
    )
}

export default DeleteCartItem
