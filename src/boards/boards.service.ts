import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {

    private boards = ["hello", "world"];

    getAllBoards() {
        return this.boards;
    }
}
