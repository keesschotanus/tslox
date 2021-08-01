import Binary from "./parser/binary";
import Expr from "./parser/expr";
import Grouping from "./parser/grouping";
import Literal from "./parser/literal";
import Token from "./tokenizer/token";
import TokenType from "./tokenizer/token-type";
import Unary from "./parser/unary";
import Visitor from "./parser/visitor";
import RuntimeError from "./runtime-error";
import Lox from "./lox";

export default class Interpreter implements Visitor<any> {

  interpret(expression: Expr): void { 
    try {
      const value = this.evaluate(expression);
      console.log(this.stringify(value));
    } catch (error) {
      Lox.runtimeError(error);
    }
  }

  visitBinaryExpr(expr: Binary): any {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right); 
    
    switch (expr.operator.type) {
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
      case TokenType.BANG_EQUAL: return !this.isEqual(left, right);
      case TokenType.EQUAL_EQUAL: return this.isEqual(left, right);
      case TokenType.MINUS:
        this.checkNumberOperands(expr.operator, left, right);
        return left - right;
      case TokenType.PLUS:
        if (typeof left === 'number' && typeof right === 'number') {
          return Number(left) + Number(right);
        } 
    
        if (typeof left === 'string' && typeof right === 'string') {
          return left.toString() + right.toString();
        }

        throw new RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
      case TokenType.SLASH:
        this.checkNumberOperands(expr.operator, left, right);
        return left / right;
      case TokenType.STAR:
        this.checkNumberOperands(expr.operator, left, right);
        return left * right;
     }
    
     return null;
  }

  visitGroupingExpr(expr: Grouping): any {
    return this.evaluate(expr.expression);
  }

  visitUnaryExpr(expr: Unary): any {
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.BANG:
        return !this.isTruthy(right);
       case TokenType.MINUS:
        return -right.value;
    }

    return null;
  }
  
  private checkNumberOperands(operator: Token, left: any, right: any): void {
    if (typeof left === 'number' && typeof right === 'number') return;
    throw new RuntimeError(operator, "Operands must be numbers.");
  }

  visitLiteralExpr(expr: Literal): any {
    return expr.value;
  }

  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }

  private isTruthy(object: any): boolean {
    if (object == null) return false;
    if (typeof object === 'boolean') return object;
    return true;
  }

  private isEqual(a: any, b: any): boolean {
    if (a == null && b == null) return true;
    if (a == null) return false;

    // Not sure if the next line properly replaces: return a.equals(b)
    return a == b;
  }

  private stringify(object: any): string {
    if (object == null) return 'nil';

    return object.toString();
  }
}