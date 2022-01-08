import fs from 'fs';
import readline from 'readline';
import Scanner from './tokenizer/scanner';

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

    // For now, just print the tokens
    tokens.forEach(token => console.log(token.toString()));
  }

  static error(line: number, message: string): void {
    Lox.report(line, '', message);
  }

  private static report(line: number, where: string, message: string): void {
    console.error(`[line: ${line}] Error:${message}`);
    Lox.hadError = true;
  }

}

Lox.main();