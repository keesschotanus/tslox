import fs from 'fs';
import readline from 'readline';
import AstPrinter from './ast-printer';
import Expr from './parser/expr';
import Parser from './parser';
import Scanner from './tokenizer/scanner';
import Token from './tokenizer/token';
import TokenType from './tokenizer/token-type';

export default class Lox {
  private static hadError = false;

  /**
   * argv[0] = node
   * argv[1] = lox.js
   * argv[2] = Optional file name
   * When absent, code is read from terminal.
   */
  public static main(): void {
    if (process.argv.length > 3) {
      console.log('Usage: lox [script]');
      process.exit(64);
    } else if (process.argv.length === 3) {
      Lox.runFile(process.argv[2]);
    } else {
      Lox.runPrompt();
    }
  }

  private static runFile(path: string): void {
    Lox.run(fs.readFileSync(path).toString());

    if (Lox.hadError) {
      process.exit(65);
    }
  }

  private static runPrompt(): void {
    process.stdout.write('> ');
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    io.on('line', (input) => {
      Lox.run(input);
      Lox.hadError = false;
      process.stdout.write('> ');
    });
  }

  private static run(source: string): void {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();

    const parser = new Parser(tokens);
    const expression = parser.parse();

    // Stop if there was a syntax error.
    if (this.hadError) return;

    console.log(new AstPrinter().print(expression as Expr));
  }

  static error(line: number, message: string): void {
    Lox.report(line, '', message);
  }

  private static report(line: number, where: string, message: string): void {
    console.error(`[line: ${line}] Error:${message}`);
    Lox.hadError = true;
  }

  /**
   * Reports a parse error.
   * @param token Offending token.
   * @param message Error message.
   */
  static parseError(token: Token, message: string): void {
    if (token.type == TokenType.EOF) {
      Lox.report(token.line, ' at end', message);
    } else {
      Lox.report(token.line, ' at "' + token.lexeme + '"', message);
    }
  }
}

Lox.main();