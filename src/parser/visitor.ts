import Binary from './binary';
import Grouping from './grouping';
import Literal from './literal';
import Unary  from './unary';

export default interface Visitor<R> {
  visitBinaryExpr(expr: Binary): R;
  visitGroupingExpr(expr: Grouping): R;
  visitLiteralExpr(expr: Literal): R;
  visitUnaryExpr(expr: Unary): R;
}