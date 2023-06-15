import { memoize } from '@bigcommerce/memoize';
import { object, ObjectSchema, string, StringSchema } from 'yup';

import getCustomFormFieldsValidationSchema, {
    FormFieldsValidationSchemaOptions,
} from './getCustomFormFieldsValidationSchema';

export const WHITELIST_REGEXP = /^[^<>]*$/;

export interface FormFieldValues {
    [key: string]: string | { [id: string]: any };
}

export default memoize(function getFormFieldsValidationSchema({
    formFields,
    translate = () => undefined,
}: FormFieldsValidationSchemaOptions): ObjectSchema<FormFieldValues> {
    return object({
        ...formFields
            .filter(({ custom }) => !custom)
            .reduce((schema, { name, required, label, min, max }) => {
                schema[name] = string();

                const requiredMinimumValues = [
                    'address1',
                ]

                if (requiredMinimumValues.includes(name) || min) {
                    schema[name] = schema[name].trim().min(min as number ?? 6, translate('min', { label, name, min: min as number ?? 6 }));
                }

                if (max) {
                    schema[name] = schema[name].trim().max(max as number, translate('max', { label, name }));
                }

                if (required) {
                    schema[name] = schema[name]
                        .trim()
                        .required(translate('required', { label, name }));
                }

                schema[name] = schema[name].matches(
                    WHITELIST_REGEXP,
                    translate('invalid', { name, label }),
                );

                return schema;
            }, {} as { [key: string]: StringSchema }),
    }).concat(
        getCustomFormFieldsValidationSchema({ formFields, translate }),
    ) as ObjectSchema<FormFieldValues>;
});
