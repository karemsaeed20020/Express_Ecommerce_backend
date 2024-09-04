import categoryRouter from "./modules/category/category.routes.js";
const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRouter);
}
export default bootstrap;