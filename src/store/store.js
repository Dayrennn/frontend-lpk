import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/hooks/api/authSliceAPI';
import { userAPI } from '@/hooks/api/userSliceAPI';
import { kandidatAPI } from '@/hooks/api/kandidatSliceAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [kandidatAPI.reducerPath]: kandidatAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware).concat(kandidatAPI.middleware),
});
