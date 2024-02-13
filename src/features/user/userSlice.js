import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
    const positionObj = await getPosition();
    const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const data = await addressObj.features.at(0).properties;
    console.log(data);
    const address = `${data?.village}, ${data?.city} ${data?.postcode}, ${data?.country}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
});

const initialArg = {
    username: '',
    status: 'idle',
    position: {},
    address: '',
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialArg,
    reducers: {
        createName: (state, action) => {
            state.username = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAddress.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.position = action.payload.position;
                state.address = action.payload.address;
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.error.message;
                state.error = `There was an error while getting your address. Make sure to fill this field 😠`;
            });
    },
});

export const { createName } = userSlice.actions;
export default userSlice.reducer;
