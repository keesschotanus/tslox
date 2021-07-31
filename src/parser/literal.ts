import Expr from './expr';
import Visitor from './visitor';

export default class Literal extends Expr {

  constructor(readonly value: any) {
    super()
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitLiteralExpr(this);
  }

}
