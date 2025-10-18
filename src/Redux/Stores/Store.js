import { configureStore } from "@reduxjs/toolkit";
import { AuthService } from "../Features/AuthenticationServicesSlice";
import { UserInfoServices } from "../Features/UserInfoServicesSlice";
import { CategoryServices } from "../Features/CategoryServicesSlice";
import { ProductServices } from "../Features/ProductServicesSlice";
import { AttributeServices } from "../Features/AttributeServicesSlice";
import { BrandServices } from "../Features/BrandSerivicesSlice";
import { City_StateServices } from "../Features/City_StateServicesSlice";
import { orderServices } from "../Features/OrderServiceSlice";

export const Store = configureStore({
  reducer: {
    AuthOpration: AuthService.reducer,
    UserInfoOpration: UserInfoServices.reducer,
    CategoryOpration: CategoryServices.reducer,
    ProductOpration: ProductServices.reducer,
    AttributeOpration: AttributeServices.reducer,
    BrandOpration: BrandServices.reducer,
    City_StateOpration: City_StateServices.reducer,
    OrderOpration: orderServices.reducer,
  },
});
