import Literal from './literal';
import TokenType from './token-type';

export default class Token {
    readonly error?: string;
  
    constructor(readonly type: TokenType, readonly lexeme: string, readonly literal: Literal | null, readonly line: number) {
      this.type = type;
      this.lexeme = lexeme;
      this.literal = literal;
      this.line = line;
    }
  
    public toString(): string {
      return `${this.type} ${this.lexeme} ${this.literal ? this.literal.toString() : ''}`;
    }
  }
