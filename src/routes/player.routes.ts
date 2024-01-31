import expressRouter from 'express';

const playerRouter = expressRouter.Router();
import {PlayerController} from "../controller/player.constroller";

playerRouter.post("/", PlayerController.apiAddPlayer);
playerRouter.get("/", PlayerController.apiGetPlayers);

export {playerRouter }
