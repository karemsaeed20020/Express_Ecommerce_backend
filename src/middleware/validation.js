export const validate = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate({...req.body, ...req.params, ...req.query})
        let errors = [];
        if (error != undefined) {
            error.details.forEach((elm) => {
                errors.push({message: elm.message, field: elm.path[0]})
            })
            res.json(errors);
        } else {
            next();
        }
    }
}