import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
// In Redux, Thunk Middleware is a middleware that allows you to write action creators that return a function instead of an action object. These functions can perform side effects such as asynchronous operations (e.g., API calls) before dispatching a real action object.

// Without middleware like redux-thunk, Redux only supports plain action objects that are synchronous in nature. so If we have an idea of preparing our payload inside of the prepare function by writing an async function that has side effects or fetches data, and we want to create our payload object by using that data, That is going to be wrong since redux don't allow Async Operations to exist anywhere inside of a Slice. Thunks extend this functionality, making it possible to handle async operations cleanly.

/*A thunk in programming is a function that delays computation until it is needed. In this case, the fetchAddress function returns a function that performs asynchronous operations (e.g., geolocation retrieval and reverse geocoding). This deferred logic is why it's referred to as a thunk. */

// when you refer to fetchAddress, you're referring to the thunk And this thunk or fetchAddress is basically an Action Creator that returns an Async function. What makes this Action Creator different from other Action Creators is that it returns a function, not an object. and when we call this fetchAddress Action creator inside of a dispatch function, since it returns a function, react will execute that function and the result of calling that function is going to be an action object with the type set to the value that we passed in as the first argument to the createAsyncThunk method and the payload as the value returned by the async function and that async function is what is returned by Our Action Creator (Thunk).

// So thunk is basically An action creator that returns an Async function instead of an object.

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
// Defines the default structure of the state managed by this slice
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};
// responsible for managing one portion of the global Redux state. That portion of the state is named "user"
const userSlice = createSlice({
  name: "user", // Specifies the stateDomain of the Action Types of the Actions generated from this slice
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
export const getUsername = (store) => store.user.username;
export const getUser = (store) => store.user;
export default userSlice.reducer;

/*
How fetchAddress Thunk Works in the Code

1. Dispatching the Thunk: dispatch(fetchAddress());
When you dispatch fetchAddress in your component, the middleware detects that fetchAddress is a thunk meaning that it returns an Async function, and then right away it will execute that async function.
2. Async Flow:
- As soon as the Async function starts its execution, An action with the type "user/fetchAddress/pending" and no payload is going to be returned and the dispatch function dispatches that action to the reducer defined next to the Auto-generated Lifecycle Action which is "fetchAddress.pending" by passing in the current state and the action to the reducer. Then the state will be updated as it is defined inside the reducer
- Then, If the Async function finished executing successfully and returns what is expected to return "{ position, address }" (If the promise returned from the async function is fulfilled or resolved by "{ position, address }"), An action with the type "user/fetchAddress/fulfilled" and with a payload of payload:{ position, address } is going to be returned by the thunk and the dispatch function then dispatches that action to the reducer defined next to the Auto-generated Lifecycle Action which is "fetchAddress.fulfilled" by passing in the current state and the action to the reducer. Then the state will be updated as it is defined inside the reducer
- If the thunk fails to finish executing, then An action with the type "user/fetchAddress/rejected" and with a payload of payload:{error:{message}} is going to be returned by the thunk and the dispatch function then dispatches that action to the reducer defined next to the Auto-generated Lifecycle Action which is "fetchAddress.rejected" by passing in the current state and the action to the reducer. Then the state will be updated as it is defined inside the reducer

*/
