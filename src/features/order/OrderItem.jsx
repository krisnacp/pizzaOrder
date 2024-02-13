import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';

OrderItem.propTypes = {
    item: PropTypes.object,
    isLoadingIngredients: PropTypes.bool,
    // ingredients: PropTypes.object,
    ingredients: PropTypes.array,
};

function OrderItem({ item, isLoadingIngredients, ingredients }) {
    const { quantity, name, totalPrice } = item;

    return (
        <li className="space-y-1 py-3">
            <div className="flex items-center justify-between gap-4 text-sm">
                <p>
                    <span className="font-bold">{quantity}&times;</span> {name}
                </p>
                <p className="font-bold">{formatCurrency(totalPrice)}</p>
            </div>
            <p className="to-stone-500 text-sm capitalize italic">
                {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
            </p>
        </li>
    );
}

export default OrderItem;
