import Literal from './literal';
import TokenType from './token-type';

export default class Token {
    private type: TokenType;
    private lexeme: string;
    private literal: Literal | null;
    private line: number; 
    private error?: string;
  
    constructor(type: TokenType, lexeme: string, literal: Literal | null, line: number) {
      this.type = type;
      this.lexeme = lexeme;
      this.literal = literal;
      this.line = line;
    }
  
    public toString(): string {
      return `${this.type} ${this.lexeme} ${this.literal ? this.literal.toString() : ''}`;
    }
  }
