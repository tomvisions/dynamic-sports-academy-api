import {Schema} from "mongoose";
import {mongoose} from "../db/Mongoose";

export interface EventOptions {
    name: String,
    content: String,
    slug: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    image: String,
    intro: String,
}

//'{"personStatus":"Pending","firstName":"Alex","familyName":"Tuafo","dateOfBirth":"20071994","yearOfBirth":"1994","regionOfBirth":"Greater Accra","cityOfBirth":"Accra","gender":"Male","status":"Pending","dateRegistrationAdded":"26012024 0315 PM","natureOfRegistration":"New Registration","photoPresent?":"No","role":"Club Official","level":"Not Available","ageLevel":"Adult","subRole":"Welfare Officer"}',
//'http://127.0.0.1:3000/api/player'

class Player {


    public static playerSchema = new Schema({
    
        firstName: {
            type:  Schema.Types.String,
        },
        familyName: {
            type:  Schema.Types.String,
        },

        dateOfBirth: {
            type:  Schema.Types.String,
        },
        yearOfBirth: {
            type:  Schema.Types.String,
        },
        gender: {
            type:  Schema.Types.String,
        },
        profileImage: {
            type:  Schema.Types.String,
        },
        status: {
            type: Schema.Types.String,
        },
        dateRegistrationAdded: {
            type: Schema.Types.String,
        },
        natureOfRegistration: {
            type: Schema.Types.String,
        },
        photoPresent: {
            type: Schema.Types.String,
        },
        role: {
            type: Schema.Types.String,
        },
        level: {
            type: Schema.Types.String,
        },
        ageLevel: {
            type: Schema.Types.String,
        },
        subRole: {
            type: Schema.Types.String,
        },
        createdAt: {
            type: Schema.Types.Date,
        },
        updatedAt: {
            type: Schema.Types.Date,
        },
    })
}

export const player = mongoose.model('Player', Player.playerSchema);
//export const eLive = mongooseLive.model('Player', Player.playerSchema);


//Game.TeamModel = Game.belongsTo(TeamModel,  {foreignKey: 'team', onUpdate: 'cascade'});
