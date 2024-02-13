import { useLoaderData } from 'react-router'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

export async function loader() {
    const data = await getMenu()
    return data
}

function Menu() {
    const menus = useLoaderData()
    // console.log(menus);
    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menus?.map((menu) => (
                <MenuItem pizza={menu} key={menu.id} />
            ))}
        </ul>
    )
}

export default Menu
