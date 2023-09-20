import {configureStore} from "@reduxjs/toolkit"
import getProductsSlice  from "./slices/ProductSlice.js"
import userSlice  from "./slices/userSlice.js"
import resetPasswordSlice  from "./slices/passwordResetSlice.js"
import  cartSlice  from "./slices/addToCartSlice.js"
import categoriesSlice from "./slices/categoriesSlice.js"
import orderSlice from "./slices/orderSlice.js"
import querySlice from "./slices/querySlice.js"
import  getScholarshipSlice  from "./slices/Scholarship.js"

const store = configureStore({
    reducer: {
        // custom : getProductsSlice,
        custom2: userSlice,
        // custom3: resetPasswordSlice,
        // custom4: cartSlice,
        // custom5: categoriesSlice,
        // order: orderSlice,
        // query:querySlice,
        // scholarship: getScholarshipSlice
    }
})

export default store