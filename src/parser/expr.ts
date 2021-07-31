import Visitor from "./visitor";

// Since TypeScript does not support nested static class classes,
// each subtype gets its own file.

export default abstract class Expr {
  abstract accept<R>(visitor: Visitor<R>): R;
}