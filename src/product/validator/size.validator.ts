import{ Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions  } from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'MaxFileSize', async: false})
    export class MaxFileSizeValidator implements ValidatorConstraintInterface {

        validate(file: Express.Multer.File, args: ValidationArguments) {

            const [maxSize] = args.constraints;
            return file.size <= maxSize;
        }


    defaultMessage(args: ValidationArguments) {

        const [maxSize] = args.constraints;
        return `File size must not exceed ${maxSize / 1024 / 1024} MB`;
        }
    }

    export function MaxFileSize(maxSize: number, validationOptions?: ValidationOptions) {
        return function (object: object, propertyName:string) {
            registerDecorator({
                name: 'maxFileSize',
                target: object.constructor,
                propertyName: propertyName,
                options: validationOptions,
                constraints: [maxSize],
                validator: MaxFileSizeValidator,
            });
        };
    }