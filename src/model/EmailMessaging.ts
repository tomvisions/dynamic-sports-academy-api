const os = require('node:os');

export class EmailMessaging
{
    static EMAIL_TYPE_CONTACT_US = 'contact_us';
    static EMAIL_TYPE_TOURNAMENT_REGISTRATION = 'tournament_registration';
    static EMAIL_TYPE_MEMBERSHIP = 'membership';
    static EMAIL_TYPE_ACADEMY = 'academy';


    static CONTACTUS_SUBJECT = 'Email From Contact Us';
    static CONTACTUS_CONTENT_TEXT = `You have received a message from the Contact Us Form:\\n`;
    static CONTACTUS_CONTENT_HTML = '<p>You have received a message from the Contact Us Form:</p>';



    static MEMBERSHIP_SUBJECT = 'Email From Membership';
    static MEMBERSHIP_CONTENT_TEXT = `You have received a message from the Membership Form:\\n`;
    static MEMBERSHIP_CONTENT_HTML = '<p>You have received a message from the Membership Form:</p>';
    static PARAMS_CONTENT = '<p>%s: %s</p>';

    static ACADEMY_SUBJECT = 'Email From Join Academy';
    static ACADEMY_CONTENT_TEXT = `You have received a message from the Join Academy Form:\\n`;
    static ACADEMY_CONTENT_HTML = '<p>You have received a message from the Join Academy Form:</p>';


}
