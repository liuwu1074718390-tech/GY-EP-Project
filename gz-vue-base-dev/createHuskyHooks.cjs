const fs = require('fs');
const path = require('path');

// 定义 husky 目录路径
const huskyDir = path.join(process.cwd(), '.husky/_');

// 创建 husky 目录，如果不存在的话
if (!fs.existsSync(huskyDir)) {
	fs.mkdirSync(huskyDir);
}

// 定义 commit-msg 脚本内容
const commitMsgScriptContent = `#!/usr/bin/env sh
npx commitlint --color --edit "$1"`;

// 定义 pre-commit 脚本内容
const preCommitScriptContent = `#!/usr/bin/env sh
npm run lint:lint-staged`;

// 创建并写入 commit-msg 脚本文件
const commitMsgFilePath = path.join(huskyDir, 'commit-msg');
fs.writeFileSync(commitMsgFilePath, commitMsgScriptContent, 'utf8');
// console.log(`Created commit-msg script at ${commitMsgFilePath}`);

// 创建并写入 pre-commit 脚本文件
const preCommitFilePath = path.join(huskyDir, 'pre-commit');
fs.writeFileSync(preCommitFilePath, preCommitScriptContent, 'utf8');
// console.log(`Created pre-commit script at ${preCommitFilePath}`);
