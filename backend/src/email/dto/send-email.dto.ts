import { 
    IsNotEmpty,
    IsEmail ,
    ValidateNested,
    IsString,
    IsUrl
} from 'class-validator';

export class PersonDto{

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsString()
    readonly name: string; 
}
export class SendEmailDto{

    @IsNotEmpty()
    @ValidateNested()
    readonly recipients:PersonDto[];

    @IsNotEmpty()
    @ValidateNested()
    readonly sender: PersonDto;

    @IsNotEmpty()
    @IsString()
    header: string;

    @IsNotEmpty()
    @IsString()
    subHeader: string;

    @IsNotEmpty()
    @IsString()
    body: string; 
    
    @IsUrl()
    imageUrl: string;

    @IsNotEmpty()
    @IsString()
    button: string; 
    
    @IsUrl()
    buttonUrl: string; 

    @IsNotEmpty()
    @IsString()
    subject: string; 
}