import joi from 'joi';

let idValidation = joi.string().hex().length(24).required()
const addCategoryValidation = joi.object({
    name: joi.string().min(3).required()
})
const updateCategoryValidation = joi.object({
    name: joi.string().min(3),
    id: idValidation,
})
const deleteCategoryValidation = joi.object({
    id: idValidation
})
export {
    addCategoryValidation,
    updateCategoryValidation,
    deleteCategoryValidation
}