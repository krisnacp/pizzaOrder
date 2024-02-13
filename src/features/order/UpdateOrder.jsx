import PropTypes from 'prop-types';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

UpdateOrder.propTypes = {
    order: PropTypes.object,
};

// !dalam penggunaan hook useFetcher, pada react-router element <fetcher.Form> bisa dihubungkan dengan action method untuk menulis data, baik itu POST, PUT, dan method yang lain.
export async function action({ params }) {
    const id = params.orderId;
    // console.log(modifiedData);
    // dalam langkah revalidate data menggunakan useFetch pada react-router, kita tidak perlu mengambil data lagi dari form menggunakan input dengan bantuan request arguement. cukup menuliskan value apa yang akan diganti dengan value baru seperti berikut
    const data = { priority: true }; // !tapi kita juga bisa memanfaatkan request argument untuk me-revalidate data jika ada data yang harus diubah melalui form
    await updateOrder(id, data);
    return null;
}

function UpdateOrder({ order }) {
    const fetcher = useFetcher();
    const { priority } = order;
    return (
        <fetcher.Form method="PATCH">
            {!priority && <Button type="primary">Make priority</Button>}
        </fetcher.Form>
    );
}

export default UpdateOrder;
