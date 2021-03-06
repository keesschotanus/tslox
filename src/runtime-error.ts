import Token from "./tokenizer/token";

export default class RuntimeError extends Error {
    constructor(readonly token: Token, message: string) {
        super(message);
    }
}