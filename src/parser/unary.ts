import Expr from './expr';
import Token from '../tokenizer/token';
import Visitor from './visitor';

export default class Unary extends Expr {

  constructor(readonly operator: Token, readonly right: Expr) {
    super()
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitUnaryExpr(this);
  }
}
