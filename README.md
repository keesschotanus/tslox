# tslox

This is my TypeScript version of the Lox language,
which is created by Robert Nystrom and described 
in his briljant book at https://craftinginterpreters.com/

All credits for this project go to Robert Nystorm.
I simply copy/pasted his Java code and turned it into TypeScript.

## Project setup
- Created the tslox repository on GitHub, without adding any files.
- Checked out the repository locally
- Made tslox the current directory
- Created a .gitignore file
- Executed the following commands
```bash
npm init -y
npm install -D typescript @types/node
npx tsc --init
```

Made the following changes gto the tsconfig.json file:
```json
    "target": "ES2020"
    "outDir": "./dist",
    "rootDir": "./src"
 ```

