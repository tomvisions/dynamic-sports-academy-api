const os = require('node:os');

export class EmailMessaging
{
    static EMAIL_TYPE_CONTACT_US = 'contact_us';
    static EMAIL_TYPE_TOURNAMENT_REGISTRATION = 'tournament_registration';
    static EMAIL_TYPE_MEMBERSHIP = 'membership';
    static EMAIL_TYPE_ACADEMY = 'academy';


    static CONTACTUS_SUBJECT = '%s';
    static CONTACTUS_CONTENT_TEXT = `You have received a message from the Contact Us Form:\\n%s`;
    static CONTACTUS_CONTENT_HTML = '<p>You have received a message from the Contact Us Form:</p><p>%s</p>';



    static MEMBERSHIP_SUBJECT = '%s';
    static MEMBERSHIP_CONTENT_TEXT = `You have received a message from the Membership Form:\\n%s`;
    static MEMBERSHIP_CONTENT_HTML = '<p>You have received a message from the Membership Form:</p><p>%s</p>';
    static PARAMS_CONTENT = '<p>%s: %s</p>';


    static ACADEMY_SUBJECT = 'Email From Join Academy';
    static ACADEMY_CONTENT_TEXT = `You have received a message from the Join Academy Form:\\n%s`;
    static ACADEMY_CONTENT_HTML = '<p>You have received a message from the Join Academy Form:</p><p>%s</p>';

    static REGISTRATION_CONTENT_TEXT = `You have received a new registration from the Registration Form.`;
    static REGISTRATION_CONTENT_HTML = '<p>You have received a new registration from the Registration Form.</p>';

}
