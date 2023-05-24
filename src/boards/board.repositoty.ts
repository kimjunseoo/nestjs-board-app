import { CreateBoardDto } from './create-board.dto';
import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entitiy";
import { CustomRepository } from "./typeorm-ex.decorator";
import { Injectable } from "@nestjs/common";
import { BoardStatus } from './board-status.enum';


@Injectable()
export class BoardRepository extends Repository<Board> {

    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{

        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board);

        return board;
    }
}