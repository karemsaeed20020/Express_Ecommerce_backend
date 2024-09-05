import { globalErrorHandling } from "./middleware/globalErrorMiddleware.js";
import categoryRouter from "./modules/category/category.routes.js";
import { AppError } from "./utils/AppError.js";
const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRouter);
    app.all('*', (req, res, next) => {
        next(new AppError("not found endpoint", 404));
    });
    app.use(globalErrorHandling);
}
export default bootstrap;