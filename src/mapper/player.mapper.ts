"use strict";

import { player as PlayerMongoose, EventOptions } from "../model";
//import {event as EventMongoose} from '../models/mongoDB'
//import { or } from "../db";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import * as uuid from 'uuid';
//import {FileProperties, s3Mapper} from "./s3.mapper";
import crypto from "crypto"
//import {cloudFrontMapper} from "./cloudfront.mapper";

export interface paramsOptions {
    options?: {
        batchSize?: number;
    }
}


export class PlayerMapper {
    private _PARAMS_FIRST_NAME: string = 'firstName';
    private _PARAMS_FAMILY_NAME: string = 'familyName';
    private _PARAMS_PHONE_NUMBER: string = 'phoneNumber';
    private _PARAMS_EMAIL: string = 'email';
    private _PARAMS_DATE_OF_BIRTH: string = 'dateOfBirth';
    private _PARAMS_RESIDENTAL_ADDRESS: string = 'residentalAddress';
    private _PARAMS_CITY: string = 'city';
    private _PARAMS_COUNTRY: string = 'country';

    public async apiGetPlayer(queryWhere = {}) {

        try {

            //            console.log('get event');
            //          console.log(queryWhere);

            const params = {
                firstName: queryWhere['firstName'],
                LastName: queryWhere['lastName'],


            };

            return await PlayerMongoose.findOne(params).then(events => {
                return events;
            }).catch(data => {
                console.log('the catch');
                console.log(data);
                console.log(params);

                return false;
            });

        } catch (error) {
            console.log(`Could not fetch users ${error}`);
            return false;
        }

    }

    public async apiGetPlayers(params:paramsOptions = {}): Promise<string[] | string> {
        try {

//            const offset = ((params.index - 1) * params.size);
            
       


            return await PlayerMongoose.find(params).then(players => {
       //         console.log('the info');
    //            console.log(event);
    console.log(players);
                return players;
                //                return this.processArray(event)
            }).catch(error => {

                return error.toString();
            });

        } catch (error) {
            console.log(error);
            return error.toString()
        }
    }


    public async apiUpdateGame(id, game) {
        try {
            return true;
            /*            console.log('in mapper');
                        console.log(game);
                        console.log('dd');
                        //   console.log(JSON.parse(game));

                        const result = await Event.upsert(
                            game
                        ).then(data => {
                            console.log('good');
                            console.log(data);

                            console.log('dara');
                            return data;

                        }).catch(data => {
                            console.log('error in catch');
                            console.log(data);
                            return false;
                        });

                        return result;
            */
        } catch (error) {
            console.log(`Could not update games ${error}`);
            return false;
        }
    }


    public async apiAddPlayer(body) {
        try {


            /* const theData =  {
                 identifier: uuid.v4(), 
                 firstName: body[this._PARAMS_NAME], 
                 phoneNumber: body[this._PARAMS_PHONE_NUMBER], 
                 email: body[this._PARAMS_EMAIL], 
                 residentalAddress: body[this._PARAMS_RESIDENTAL_ADDRESS], 
                 city: body[this._PARAMS_CITY],
                 country: body[this._PARAMS_COUNTRY]
             }; */
            //       console.log('the data');
            //     console.log(theData);

            console.log('the body');
            //    console.log(JSON.parse(body));
            if (await this.apiGetPlayer(body)) {
                console.log(`Error: Player already exists`);
                return false;
            }

            body.profileImage = `${body.firstName.toLowerCase()}-${body.familyName.toLowerCase()}.jpg`;
            return await PlayerMongoose.create(body).then(async data => {
                //  await cloudFrontMapper.createInvalidation("/api/v1/event*")
                console.log('good stuff');
                console.log(data);
                return data;

            }).catch(data => {
                console.log('bad stuff');
                console.log(data);
                return false;
            });

        } catch (error) {
            console.log(`Could not create event ${error}`);
            return false;
        }
    }

    /**
     * @param identifier
     * @param event JSON
     */
    /*    public async apiUpdateEvent(identifier, event) {
            let fileProperties: FileProperties;
    
            try {
    
                event.slug = event.name.replace(/\s+/g, '-').toLowerCase();
                const random = crypto.randomBytes(20).toString('hex');
                if (event.bannerImage.includes('data:image')) {
                    event.bannerImage = await s3Mapper.upload(event.bannerImage, 'mamboleofc/events/', `banner-image-${identifier}-${random}`);
                }
    
                if (event.aboutImage.includes('data:image')) {
                    event.aboutImage = await s3Mapper.upload(event.aboutImage, 'mamboleofc/events/', `about-image-${identifier}-${random}`);
                }
    
                if (event.contentImage.includes('data:image')) {
                    event.contentImage = await s3Mapper.upload(event.contentImage, 'mamboleofc/events/', `content-image-${identifier}-${random}`);
                }
    
                //           await this.generatePrePath('/tmp/mamboleofc/avatars');
                //         fileProperties = await this.getImageReadyForUpload(`mamboleofc/events/banner-image-${identifier}`, event['bannerImage']);
    
                ///     event.bannerImage = `mamboleofc/events/banner-image-${identifier}.${fileProperties.extension}`
    
                const result = await PlayerMongoose.findOneAndUpdate({identifier: identifier}, event);
                await cloudFrontMapper.createInvalidation("/api/v1/event*")
                return result;
    
            } catch (error) {
                console.log(`Could not create event ${error}`);
                return false;
            }
        } */

    /**
     * Generates a JWT token using CryptoJS library.
     *
     * This generator is for mocking purposes only and it is NOT
     * safe to use it in production frontend applications!
     *
     * @private
     */
    static generateJWTToken(): string {
        // Define token header
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };

        // Calculate the issued at and expiration dates
        const date = new Date();
        const iat = Math.floor(date.getTime() / 1000);
        const exp = Math.floor((date.setDate(date.getDate() + 7)) / 1000);

        // Define token payload
        const payload = {
            iat: iat,
            iss: 'Fuse',
            exp: exp
        };

        // Stringify and encode the header
        const stringifiedHeader = Utf8.parse(JSON.stringify(header));
        const encodedHeader = this._base64url(stringifiedHeader);

        // Stringify and encode the payload
        const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
        const encodedPayload = this._base64url(stringifiedPayload);

        // Sign the encoded header and mock-api
        let signature: any = encodedHeader + '.' + encodedPayload;
        signature = HmacSHA256(signature, 'YOUR_VERY_CONFIDENTIAL_SECRET_FOR_SIGNING_JWT_TOKENS!!!');
        signature = this._base64url(signature);

        // Build and return the token
        return encodedHeader + '.' + encodedPayload + '.' + signature;
    }

    /**
     * Return base64 encoded version of the given string
     *
     * @param source
     * @private
     */
    static _base64url(source: any): string {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        // Return the base64 encoded string
        return encodedSource;
    }

    get PARAMS_FIRST_NAME(): string {
        return this._PARAMS_FIRST_NAME;
    }

    get PARAMS_FAMILY_NAME(): string {
        return this._PARAMS_FAMILY_NAME;
    }

    get PARAMS_COUNTRY(): string {
        return this._PARAMS_COUNTRY;
    }

    get PARAMS_CITY(): string {
        return this._PARAMS_CITY;
    }

    get PARAMS_RESIDENTAL_ADDRESS(): string {
        return this._PARAMS_RESIDENTAL_ADDRESS;
    }

    get PARAMS_DATE_OF_BIRTH(): string {
        return this._PARAMS_DATE_OF_BIRTH;
    }

    get PARAMS_EMAIL(): string {
        return this._PARAMS_EMAIL;
    }


    get PARAMS_PHONE_NUMBER(): string {
        return this._PARAMS_PHONE_NUMBER;
    }
}

export const playerMapper = new PlayerMapper();
