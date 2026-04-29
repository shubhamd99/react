// third-party
import * as yup from 'yup'

export const productSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  sku: yup
    .string()
    .required('SKU is required')
    .matches(/^[A-Z0-9-]+$/, 'SKU must be uppercase letters, numbers, and hyphens'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive'),
  category: yup
    .string()
    .oneOf(['electronics', 'clothing', 'food', 'books', 'other'] as const)
    .required('Category is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .required('Stock is required')
    .min(0, 'Stock cannot be negative')
    .integer('Stock must be a whole number'),
  description: yup
    .string()
    .max(500, 'Description must be at most 500 characters')
    .default(''),
  status: yup
    .string()
    .oneOf(['draft', 'published'] as const)
    .required('Status is required'),
})
