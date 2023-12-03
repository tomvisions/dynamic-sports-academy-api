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


    constructor() {
        this._sesClient = new SESClient({'region': this._REGION});
    }


    /**
     * Function that helps prepare the email
     * @param body
     */
    async prepareEmail(body) {
        this._params = emailParams;
        await this.parseBody(body);

        switch (this._emailType) {
            case EmailMessaging.EMAIL_TYPE_MEMBERSHIP:
                this._params.Destination.ToAddresses.push('tcruicksh@gmail.com');
                this._params.Source = 'tomc@tomvisions.com';
                this._params.ReplyToAddresses = [];
                this._params.Template = 'ContactUs';
                await this.getMembershipEmail(body);
                this._params.TemplateData = `{\"PHONE_CONTENT\":\"${this._phone}\",\"SUBJECT_CONTENT\":\"${this._SUBJECT_CONTENT}\",\"NAME_CONTENT\":\"${this._name}\", \"NAME\":\"Info\",\"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"EMAIL_CONTENT\":\"${this._email}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

            case EmailMessaging.EMAIL_TYPE_TOURNAMENT_REGISTRATION:
                this._params.Destination.ToAddresses.push('tcruicksh@gmail.com');
                this._params.Destination.ToAddresses.push('mamboleofc@gmail.com');
                this._params.Source = 'admin@mamboleofc.ca';
                this._params.ReplyToAddresses = [];
                this._params.Template = 'TournamentRegistration';
                await this.getRegistrationEmail();
                this._params.TemplateData = `{\"NAME_CONTENT\":\"${this._name}\", \"NAME\":\"Info\",\"TEAM_NAME_CONTENT\":\"${this._teamName}\", \"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"EMAIL_CONTENT\":\"${this._email}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

        }
    }


  //  mailMapper.PARAMS_NAME, mailMapper.PARAMS_EMAIL_TYPE, mailMapper.PARAMS_BIRTHDAY, mailMapper.PARAMS_NHIS, mailMapper.PARAMS_RESIDENTAL_ADDRESS, mailMapper.PARAMS_NAME_OF_PARENTS_OR_GUARDIAN, mailMapper.PARAMS_NAME_OF_PARENTS_OR_GUARDIAN_PHONE, mailMapper.PARAMS_SCHOOL, mailMapper.PARAMS_CLASS_OR_FORM, mailMapper.PARAMS_SCHOOL_CONTACT, mailMapper.PARAMS_FORMER_CLUB


    async parseBody(body) {
        this._body = body[this._PARAMS_BODY] || null;
        this._subject = body[this._PARAMS_SUBJECT] || null;
        this._emailType = body[this._PARAMS_EMAIL_TYPE] || null;
        this._phone = body[this._PARAMS_PHONE] || null;
        this._name = body[this._PARAMS_NAME] || null
        this._email = body[this._PARAMS_EMAIL] || null;
        this._teamName = body[this._PARAMS_TEAM_NAME] || null;

    }

    async getMembershipEmail(body) {
        this._PARAMS_NHIS = body[this._PARAMS_NHIS] || null;
        this._PARAMS_BIRTHDAY = body[this._PARAMS_BIRTHDAY] || null;
        this._PARAMS_RESIDENTAL_ADDRESS = body[this._PARAMS_RESIDENTAL_ADDRESS] || null;
        this._PARAMS_NAME_OF_PARENTS_OR_GUARDIAN = body[this._PARAMS_NAME_OF_PARENTS_OR_GUARDIAN] || null;
        this._PARAMS_NAME_OF_PARENTS_OR_GUARDIAN_PHONE = body[this._PARAMS_NAME_OF_PARENTS_OR_GUARDIAN_PHONE] || null;
        this._PARAMS_SCHOOL_CONTACT = body[this._PARAMS_SCHOOL_CONTACT] || null;
        this._PARAMS_FORMER_CLUB = body[this._PARAMS_FORMER_CLUB] || null;


        this._SUBJECT_CONTENT = format(EmailMessaging.MEMBERSHIP_SUBJECT, this._subject)
        this._HTML_CONTENT = format(EmailMessaging.MEMBERSHIP_CONTENT_HTML, this._body);
        this._TEXT_CONTENT = format(EmailMessaging.MEMBERSHIP_CONTENT_TEXT, this._body);
    }

    async getRegistrationEmail() {
        this._HTML_CONTENT = format(EmailMessaging.REGISTRATION_CONTENT_HTML);
        this._TEXT_CONTENT = format(EmailMessaging.REGISTRATION_CONTENT_TEXT);
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
