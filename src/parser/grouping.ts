import Expr from './expr';
import Visitor from './visitor';

export default class Grouping extends Expr {

  constructor(readonly expression: Expr) {
    super()
  }
  
  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitGroupingExpr(this);
  }
}

