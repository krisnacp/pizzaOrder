import { Link } from 'react-router-dom'

function EmptyCart() {
    return (
        <h2 className="mt-7 text-xl font-semibold">
            Your cart is empty 🍕🚫, go to{' '}
            <Link
                to="/menu"
                className="text-blue-500 hover:text-blue-600 hover:underline"
            >
                menu
            </Link>{' '}
            to start ordering some pizza!
        </h2>
    )
}

export default EmptyCart
