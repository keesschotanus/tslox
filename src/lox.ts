import fs from 'fs';
import readline from 'readline';
import AstPrinter from './ast-printer';
import Interpreter from './interpreter';
import Parser from './parser/parser';
import RuntimeError from './runtime-error';
import Scanner from './tokenizer/scanner';
import Token from './tokenizer/token';
import TokenType from './tokenizer/token-type';

export default class Lox {
  private static hadError = false;
  private static hadRuntimeError = false;

  private static readonly interpreter = new Interpreter();

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

    // Indicate an error in the exit code.
    if (Lox.hadError) process.exit(65);
    if (Lox.hadRuntimeError) process.exit(70);
  }
 
  private static runPrompt(): void {
    process.stdout.write('> ');
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    io.on('line', (input) => {
      Lox.run(input);
      process.stdout.write('> ');
      Lox.hadError = false;
    });
  }
   
  private static run(source: string): void {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();

    const parser = new Parser(tokens);
    const expression = parser.parse();

    // Stop if there was a syntax error.
    if (this.hadError) return;

    if (expression) {
      Lox.interpreter.interpret(expression);
    }
  }

  static error(line: number, message: string): void {
    Lox.report(line, '', message);
  }

  private static report(line: number, where: string, message: string): void {
    if (where === '') {
      console.error(`[line: ${line}] Error:${message}`);
    } else {
      console.error(`[line: ${line}] Error:${where} ${message}`);
    }
    Lox.hadError = true;
  }

  static parseError(token: Token, message: string): void {
    if (token.type == TokenType.EOF) {
      this.report(token.line, 'at end', message);
    } else {
      this.report(token.line, 'at \'' + token.lexeme + '\'', message);
    }
  }

  static runtimeError(error: RuntimeError): void {
    console.error(`${error.message}\n[line ${error.token.line}]`);
    this.hadRuntimeError = true;
  }

}

Lox.main();

