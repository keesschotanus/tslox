import Lox from './lox';
import Binary from './parser/binary';
import Expr from './parser/expr';
import Grouping from './parser/grouping';
import Literal from './parser/literal';
import Unary from './parser/unary';
import Visitor from './parser/visitor';
import RuntimeError from './runtime-error';
import Token from './tokenizer/token';
import TokenType from './tokenizer/token-type';

export default class Interpreter implements Visitor<any> {

  interpret(expression: Expr) { 
    try {
      const value = this.evaluate(expression);
      console.log(this.stringify(value));
    } catch (error) {
      Lox.runtimeError(error);
    }
  }

  visitBinaryExpr(expr: Binary) {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right); 

    switch (expr.operator.type) {
      case TokenType.BANG_EQUAL: return !this.isEqual(left, right);
      case TokenType.EQUAL_EQUAL: return this.isEqual(left, right);
      case TokenType.GREATER:
        this.checkNumberOperands(expr.operator, left, right);
        return left > right;
      case TokenType.GREATER_EQUAL:
        this.checkNumberOperands(expr.operator, left, right);
        return left >= right;
      case TokenType.LESS:
        this.checkNumberOperands(expr.operator, left, right);
        return left < right;
      case TokenType.LESS_EQUAL:
        this.checkNumberOperands(expr.operator, left, right);
        return left <= right;
      case TokenType.MINUS:
        this.checkNumberOperands(expr.operator, left, right);
        return left - right;
      case TokenType.PLUS:
        if (typeof left === 'number' && typeof right === 'number') {
          return left + right;
        } 
    
        if (left instanceof String && right instanceof String) {
          return left.toString() + right.toString();
        }
    
        throw new RuntimeError(expr.operator, 'Operands must be two numbers or two strings.');
      case TokenType.SLASH:
        return left / right;
      case TokenType.STAR:
        return left * right;
    }

    // Unreachable.
    return null;
  }
  
  visitGroupingExpr(expr: Grouping) {
    return this.evaluate(expr.expression);
  }
  
  visitLiteralExpr(expr: Literal) {
    return expr.value;
  }
  
  visitUnaryExpr(expr: Unary) {
    let right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.MINUS:
        this.checkNumberOperand(expr.operator, right);
        return - (right as number);
      case TokenType.BANG:
        return !this.isTruthy(right);
    }

    // Unreachable.
    return null; 
  }

  private checkNumberOperand(operator: Token, operand: any): void {
    if (typeof operand === 'number') return;
    throw new RuntimeError(operator, 'Operand must be a number.');
  }

  private checkNumberOperands(operator: Token, left: any, right: any) {
    if (typeof left === 'number' && typeof right === 'number') return;

    throw new RuntimeError(operator, 'Operands must be numbers.');
  }   
  
  private isTruthy(object: any): boolean {
    if (object === null) return false;
    if (object instanceof Boolean) return object as boolean;
    return true;
  }

  private isEqual(a: any, b: any) {
    if (a === null && b === null) return true;
    if (a === null) return false;

    return a == b;
  }

  private stringify(object: any): string {
    if (object == null) return "nil";

    if (object instanceof Number) {
      let text = object.toString();
      if (text.endsWith('.0')) {
        text = text.substring(0, text.length - 2);
      }
      return text;
    }

    return object instanceof String ? object : object.toString();
  }

  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }
}
