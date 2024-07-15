import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments  } from 'class-validator';

@ValidatorConstraint({ name: 'MaxFileSize', async: false})
    export class MaxFileSizeValidator implements ValidatorConstraintInterface {

        validate(value: any, args: ValidationArguments) {

            const maxSize = args.constraints[0];
            if (!value || !value.buffer) {
                return true;
            }
            return value.buffer.length <= maxSize;
        }


    defaultMessage(args: ValidationArguments) {

        const maxSize = args.constraints[0 ];
        return `File size must not exceed ${maxSize / 1024 / 1024} MB`;
        }
    }