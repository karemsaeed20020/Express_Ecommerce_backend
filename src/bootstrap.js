import { globalErrorHandling } from "./middleware/globalErrorMiddleware.js";
import categoryRouter from "./modules/category/category.routes.js";
import { AppError } from "./utils/AppError.js";
import subCategoryRouter from './modules/subcategory/subcategory.routes.js';
import brandRouter from "./modules/brand/brand.routes.js";
import productRouter from "./modules/product/product.routes.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/subcategories', subCategoryRouter);
    app.use('/api/v1/brands', brandRouter);
    app.use('/api/v1/products', productRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);
    app.all('*', (req, res, next) => {
        next(new AppError("not found endpoint", 404));
    });
    app.use(globalErrorHandling);
}
export default bootstrap;