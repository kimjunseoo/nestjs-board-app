import { Repository } from "typeorm";
import { Board } from "./board.entitiy";
import { CustomRepository } from "./typeorm-ex.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

}