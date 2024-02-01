import {paramsOptions, playerMapper} from "../mapper";

import {inspect} from "util";

const util = require('util');

export class PlayerController {
    static async apiAddPlayer(req: any, res: any, next: any) {
   //     console.log(Object.keys(req.body)[0])
        if (typeof Object.keys(req.body)[0] === 'string' || req.body instanceof String)
            req.body = JSON.parse(Object.keys(req.body)[0]);
        
        const params = [
                playerMapper.PARAMS_FIRST_NAME, playerMapper.PARAMS_FAMILY_NAME//, playerMapper.PARAMS_PHONE_NUMBER, playerMapper.PARAMS_DATE_OF_BIRTH, playerMapper.PARAMS_CITY,playerMapper.PARAMS_COUNTRY
            ];
        const missingParam = [];
        let valid = true;
        try {
           // console.log(req.body);
       /*     Object.values(params).map((param)   => {

                if (!req.body[param+'']) {
                    valid = false;
                    missingParam.push(param);
                }
            }); */

            if (valid) {

                const retval = await playerMapper.apiAddPlayer(req.body);
            //    console.log('the response')
          //      console.log(retval);
                return res.status(200).json({"hello":"success"});
            //    const retVal = await mailMapper.apiSendMail();
                
/*
                if (retVal['$metadata']['httpStatusCode'] === 200) {

                    return res.status(200).json({
                        result: "success",
                        message: `successfully got through with info ${inspect(retVal)}`
                    });
                } else {

                    return res.status(500).json({
                        result: "error",
                        message: `Email has not been sent ${inspect(retVal)}`
                    });
                } */
            } else {
                return res.status(500).json({
                    result: "error",
                    message: `Player has not beeen added. Missing parameters: ${inspect(missingParam)}`
                });
          } 
        } catch (error) {

            return res.status(500).json({result: "error", message: `Failed the try ${util.inspect(error)}`});
        }
    }

    public static async apiGetPlayers(req: any, res: any, next: any) {
        console.log('inside of add player to check')
        //   if (!eventMapper.checkAuthenication(req.headers.authorization)) {
          //     return res.status(500).json({error: 'Not Authorized to access the API'})
          // }
   
   //        console.log('hello');
           //const queryWhere: QueryWhere = {};
           if (req.body.params) {
                const params: paramsOptions = req.body.params;
           }
           
           const players = await playerMapper.apiGetPlayers(req.body.params);
           return res.status(200).json({result: "success", players: players});

/*           if (req.params[eventMapper.PARAMS_SLUG]) {
                   queryWhere.slug = req.params[eventMapper.PARAMS_SLUG];
                   const event = await eventMapper.apiGetEvent(queryWhere);
   
                   if (!event) {
                       return res.status(500).json({error: "Unable to retrieve event"})
                   }
   
                   return res.status(200).json({result: "success", event});
           } else {
               const events = await eventMapper.apiGetEvents();
            //   console.log(events);
               if (typeof events === 'string') {
                   return res.status(500).json({error: events})
               }
          //     console.log(req.query);
              const paginationResults = eventMapper.prepareListResults(events,req.query);
   
               return res.status(200).json(paginationResults)
           } */
       }
}
