"use strict";

import {SESClient, SendTemplatedEmailCommand} from '@aws-sdk/client-ses';
import {emailParams} from '../data/email-params';
import {emailHeader} from '../data/email.header';
import {emailFooter} from '../data/email.footer';
import {format} from 'util';
import {EmailMessaging} from '../model/EmailMessaging';

export interface Params {
//    Destination
}

export class MailMapper {
    private _sesClient;
    private _REGION: string = 'us-east-1'
    private _body: string;
    private _subject: string;
    private _emailType: string;
    private _phone: string;
    private _name;
    private _email;
    private _teamName
    private _params;
    private _SUBJECT_CONTENT;
    private _HTML_CONTENT;
    private _TEXT_CONTENT;
    private _PARAMS_EMAIL: string = 'email';
    private _PARAMS_EMAIL_TYPE: string = 'email_type';
    private _PARAMS_BODY: string = 'body';
    private _PARAMS_SUBJECT: string = 'subject';
    private _PARAMS_PHONE: string = 'phone';
    private _PARAMS_NAME: string = 'name';
    private _PARAMS_DATE_OF_BIRTH: string = 'dateOfBirth';
    private _PARAMS_CITY: string = 'city';
    private _PARAMS_COUNTRY: string = 'country';
    private _PARAMS_TEAM_NAME: string = 'team_name';
    private _PARAMS_SCHOOL: string = 'school';
    private _PARAMS_FORMER_CLUB: string = 'formerClub';
    private _PARAMS_SCHOOL_CONTACT: string = 'schoolContact';
    private _PARAMS_CLASS_OR_FORM: string = 'classOrForm'
    private _PARAMS_NAME_OF_PARENTS_OR_GUARDIAN_PHONE: string = 'nameOfParentsOrGuardianPhone';
    private _PARAMS_NAME_OF_PARENTS_OR_GUARDIAN: string = 'nameOfParentsOrGuardian';
    private _PARAMS_RESIDENTAL_ADDRESS: string = 'residentalAddress';
    private _PARAMS_NHIS: string = 'nhis';
    private _PARAMS_PLACE_OF_BIRTH: string = 'placeOfBirth';
    private _PARAMS_BIRTHDAY: string = 'birthday';
    private _PARAMS_CONTENT: string = '';


    constructor() {
        this._sesClient = new SESClient({'region': this._REGION});
    }


    /**
     * Function that helps prepare the email
     * @param body
     */
    async prepareEmail(body) {
        this._params = emailParams;
       
        await this.formatBody(body);
        this._params.Destination.ToAddresses.push('tcruicksh@gmail.com');
        this._params.Source = 'info@dynamic-sports-academy.com';
        this._params.ReplyToAddresses = [];
        this._params.Template = 'DefaultEmailTemplate';

        
        switch (this._emailType) {
            case EmailMessaging.EMAIL_TYPE_CONTACT_US:
                this._SUBJECT_CONTENT = EmailMessaging.CONTACTUS_SUBJECT;
                this._HTML_CONTENT = EmailMessaging.CONTACTUS_CONTENT_HTML;
                this._TEXT_CONTENT = EmailMessaging.CONTACTUS_CONTENT_TEXT;
                this._params.TemplateData = `{\"NAME\":\"Kwasi\",\"SUBJECT_CONTENT\":\"${this._SUBJECT_CONTENT}\",\"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"PARAMS_CONTENT\":\"${this._PARAMS_CONTENT}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

            case EmailMessaging.EMAIL_TYPE_MEMBERSHIP:
                this._SUBJECT_CONTENT = EmailMessaging.MEMBERSHIP_SUBJECT;
                this._HTML_CONTENT = EmailMessaging.MEMBERSHIP_CONTENT_HTML;
                this._TEXT_CONTENT = EmailMessaging.MEMBERSHIP_CONTENT_TEXT;
                this._params.TemplateData = `{\"NAME\":\"Kwasi\",\"SUBJECT_CONTENT\":\"${this._SUBJECT_CONTENT}\",\"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"PARAMS_CONTENT\":\"${this._PARAMS_CONTENT}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

            case EmailMessaging.EMAIL_TYPE_ACADEMY:
                this._SUBJECT_CONTENT = EmailMessaging.ACADEMY_SUBJECT;
                this._HTML_CONTENT = EmailMessaging.ACADEMY_CONTENT_HTML;
                this._TEXT_CONTENT = EmailMessaging.ACADEMY_CONTENT_TEXT;
                this._params.TemplateData = `{\"NAME\":\"Kwasi\",\"SUBJECT_CONTENT\":\"${this._SUBJECT_CONTENT}\",\"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"PARAMS_CONTENT\":\"${this._PARAMS_CONTENT}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

        }
    }


  //  mailMapper.PARAMS_NAME, mailMapper.PARAMS_EMAIL_TYPE, mailMapper.PARAMS_BIRTHDAY, mailMapper.PARAMS_NHIS, mailMapper.PARAMS_RESIDENTAL_ADDRESS, mailMapper.PARAMS_NAME_OF_PARENTS_OR_GUARDIAN, mailMapper.PARAMS_NAME_OF_PARENTS_OR_GUARDIAN_PHONE, mailMapper.PARAMS_SCHOOL, mailMapper.PARAMS_CLASS_OR_FORM, mailMapper.PARAMS_SCHOOL_CONTACT, mailMapper.PARAMS_FORMER_CLUB



    async formatBody(body) {
      //  console.log('the body');
      //  console.log(body);
        Object.keys(body).map((key) => {
            this._PARAMS_CONTENT = this._PARAMS_CONTENT.concat(format(EmailMessaging.PARAMS_CONTENT, key, body[key]));
        
        });


//        body.map((item) => {
    //        console.log('the item');
  //          console.log(item);
            //    format(EmailMessaging.MEMBERSHIP_CONTENT_HTML, this._body);
     //   });
    // console.log(this._PARAMS_CONTENT);

    }


    async apiSendMail() {
        return await this._sesClient.send(new SendTemplatedEmailCommand(this._params));
    }

    get PARAMS_PHONE(): string {
        return this._PARAMS_PHONE;
    }

    get PARAMS_SUBJECT(): string {
        return this._PARAMS_SUBJECT;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

    get PARAMS_EMAIL(): string {
        return this._PARAMS_EMAIL;
    }

    get PARAMS_EMAIL_TYPE(): string {
        return this._PARAMS_EMAIL_TYPE;
    }

    get PARAMS_BODY(): string {
        return this._PARAMS_BODY;
    }

    get PARAMS_TEAM_NAME(): string {
        return this._PARAMS_TEAM_NAME;
    }

    get PARAMS_SCHOOL(): string {
        return this._PARAMS_SCHOOL;
    }

    get PARAMS_CLASS_OR_FORM(): string {
        return this._PARAMS_CLASS_OR_FORM;
    }

    get PARAMS_NAME_OF_PARENTS_OR_GUARDIAN(): string {
        return this._PARAMS_NAME_OF_PARENTS_OR_GUARDIAN;
    }

    get PARAMS_BIRTHDAY(): string {
        return this._PARAMS_BIRTHDAY;
    }

    get PARAMS_NAME_OF_PARENTS_OR_GUARDIAN_PHONE(): string {
        return this._PARAMS_NAME_OF_PARENTS_OR_GUARDIAN_PHONE;
    }

    get PARAMS_NHIS(): string {
        return this._PARAMS_NHIS;
    }

    get PARAMS_PLACE_OF_BIRTH(): string {
        return this._PARAMS_PLACE_OF_BIRTH;
    }

    get PARAMS_FORMER_CLUB(): string {
        return this._PARAMS_FORMER_CLUB;
    }

    get PARAMS_RESIDENTAL_ADDRESS(): string {
        return this._PARAMS_RESIDENTAL_ADDRESS;
    }

    get PARAMS_SCHOOL_CONTACT(): string {
        return this._PARAMS_SCHOOL_CONTACT;
    }
}

export const mailMapper = new MailMapper();
