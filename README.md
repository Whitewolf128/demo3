1. git init
2. git clone https://github.com/Whitewolf128/comp-3018-assignment1.git
3. git remote add origin https://github.com/Whitewolf128/comp-3018-assignment1.git
4. git add .
5. git commit -m "Initial commit"
6.git push -u origin main

if it does not work.
1.git pull origin main

install node.js and npm
1.npm init -y
2.npm install typescript@6 --save-dev
npm install typescript ts-node @types/node --save-dev
3.npm install express
4.npm install @types/express --save-dev
5.npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
6. npm audit fix **fixes vulnerabilities for packages.
7. npm install morgan @types/morgan
*note: use --force if the packages have problems installing.
**note: or if you want to fix the packages use npm audit fix

add to tsconfig.json
"rootDir": "src",
"types": ["node"],

Source for switch case expression: https://www.xjavascript.com/blog/typescript-switch-expression/

