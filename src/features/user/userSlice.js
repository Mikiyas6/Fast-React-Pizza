import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
// In Redux, Thunk Middleware is a middleware that allows you to write action creators that return a function instead of an action object. These functions can perform side effects such as asynchronous operations (e.g., API calls) before dispatching a real action object.

// Without middleware like redux-thunk, Redux only supports plain action objects that are synchronous in nature. Thunks extend this functionality, making it possible to handle async operations cleanly.

/*A thunk in programming is a function that delays computation until it is needed. In this case, the fetchAddress function returns a function that performs asynchronous operations (e.g., geolocation retrieval and reverse geocoding). This deferred logic is why it's referred to as a thunk. */

// So basically the nameless function wrapped by the createAsyncThunk is the thunk, after wrapping, the thunk is effectively stored in the fetchAddress variable, and when you refer to fetchAddress, you're referring to the thunk.

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in

    return { position, address }; // Payload of the Fulfilled State
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field";
      }),
});
export const { updateName } = userSlice.actions;
export default userSlice.reducer;

/*
How fetchAddress Thunk Works in the Code

1. Dispatching the Thunk: dispatch(fetchAddress());
When you dispatch fetchAddress in your component, the middleware detects that fetchAddress returns a thunk(The async function) and it will execute that thunk.
2. Async Flow:
- As soon as the thunk starts its execution, An action with the type "user/fetchAddress/pending" and no payload is going to be returned by the thunk and the dispatch function dispatches that action to the reducer defined next to the Auto-generated Lifecycle Action which is "fetchAddress.pending" by passing in the current state and the action to the reducer. Then the state will be updated as it is defined inside the reducer
- Then, If the thunk finish executing successfully and returns what is is expected to return "{ position, address }" (If the promise returned from the async function(thunk) is fulfilled or resolved by "{ position, address }"), An action with the type "user/fetchAddress/fulfilled" and with a payload of payload:{ position, address } is going to be returned by the thunk and the dispatch function then dispatches that action to the reducer defined next to the Auto-generated Lifecycle Action which is "fetchAddress.fulfilled" by passing in the current state and the action to the reducer. Then the state will be updated as it is defined inside the reducer
- If the thunk fails to finish executing, then An action with the type "user/fetchAddress/rejected" and with a payload of payload:{error:{message}} is going to be returned by the thunk and the dispatch function then dispatches that action to the reducer defined next to the Auto-generated Lifecycle Action which is "fetchAddress.rejected" by passing in the current state and the action to the reducer. Then the state will be updated as it is defined inside the reducer

*/
