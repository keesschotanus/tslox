import TokenType from "./token-type";

export default class Token {

  constructor(readonly type: TokenType, readonly lexeme: string, readonly literal: number | string | null, readonly line: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }
  
  public toString(): string {
    return `line ${this.line} type:${this.type}[${TokenType[this.type]}] lexeme:${this.lexeme}`;
  }
}