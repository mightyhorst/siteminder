import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

    /**
     * transform 
     *
     * @param {*} value - input value 
     * @param {ArgumentMetadata} { metatype } - meta type 
     * @returns tranformed value 
     * @memberof ValidationPipe
     */
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            // throw new BadRequestException('Validation failed');
            console.log('💀 💩 errors ----> ', errors.map(e => ({property:e.property, constraints:e.constraints})));
            const simpleErrors = errors.map(e => ({
                    property:e.property, 
                    constraints:e.constraints
                })
            );
            
            throw new BadRequestException(simpleErrors);
        }
        return value;
    }

    /**
     * validation 
     *
     * @private
     * @param {Function} metatype
     * @returns {boolean}
     * @memberof ValidationPipe
     */
    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}