import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repositoty';
import { Board } from './board.entitiy';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository, 
    ){}

    async getBoardById(id: number): Promise <Board>{
        
        const found = await this.boardRepository.findOneBy({id});

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found;
    }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
       
       return this.boardRepository.createBoard(createBoardDto);

    }

    async deleteBoard(id: number): Promise<void>{
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        console.log(result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;

        await this.boardRepository.save(board);

        return board;
    }

    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }
    /* 
    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board;
    }

    getBoardById(id : string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id)
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);

        board.status = status;

        return board;
    } */
}
