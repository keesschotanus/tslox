import Binary from "./parser/binary";
import Expr from "./parser/expr";
import Grouping from "./parser/grouping";
import Literal from "./parser/literal";
import Unary from "./parser/unary";
import Visitor from "./parser/visitor";

/**
 * Prints an AST.
 */
export default class AstPrinter implements Visitor<string> {

  print(expr: Expr): string {
    return expr.accept(this);
  }

  visitBinaryExpr(expr: Binary): string {
    return this.parenthesize(expr.operator.lexeme,expr.left, expr.right);  }
  
  visitGroupingExpr(expr: Grouping): string {
    return this.parenthesize("group", expr.expression);
  }

  visitLiteralExpr(expr: Literal): string {
    return expr.value ? expr.value.toString() : "nil";
  }

  visitUnaryExpr(expr: Unary): string {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  private parenthesize(name: string, ...exprs: Expr[]): string {
    let result = `( ${name}`
    exprs.forEach(expr => {
      result += ' ' + expr.accept(this);
    });
    result += ')';

    return result;
  }
}
