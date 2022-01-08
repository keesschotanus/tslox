import Expr from './expr';
import Token from '../tokenizer/token';
import Visitor from './visitor';

export default class Binary extends Expr {

  constructor(readonly left: Expr, readonly operator: Token, readonly right: Expr) {
    super();
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitBinaryExpr(this);
  }
}
