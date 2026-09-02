import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/hooks/api/authSliceAPI";
import { userAPI } from "@/hooks/api/userSliceAPI";
import { kandidatAPI } from "@/hooks/api/kandidatSliceAPI";
import { dashboardAPI } from "@/hooks/api/dashboardSliceAPI";
import { asalAPI } from "@/hooks/api/asalSliceAPI";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [kandidatAPI.reducerPath]: kandidatAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
        [asalAPI.reducerPath]: asalAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware).concat(kandidatAPI.middleware).concat(dashboardAPI.middleware).concat(asalAPI.middleware),
});
