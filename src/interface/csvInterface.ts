import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsEmpty, IsEnum } from 'class-validator'
import { Gender, PrefModeContact, Nationality } from '../enums/csvFieldsEnum'

export interface CsvHeader {
    title: string,
    id: string
}

export class CsvBody {
    @IsString()
    @IsEmpty()
    _id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    educationBackground: string

    @IsEmail()
    email: string

    @IsString()
    @IsEnum(Gender, {
        message: 'Gender must be either "Male", "Female" or "Others"',
    })
    gender: string

    @IsString()
    dob: string

    @IsString()
    @IsEnum(Nationality, {
        message: 'Nationality must either be a "Nepali" or "Others"',
    })
    nationality: string

    @IsPhoneNumber("NP")
    phone: string

    @IsString()
    @IsEnum(PrefModeContact, {
        message: 'Preference must either be an "Email", a "Phone" or "None"',
    })
    prefModeContact: string

    @IsString()
    address: string
}