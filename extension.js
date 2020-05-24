const vscode = require('vscode');

const htmlContent = `<!DOCTYPE html>
<html lang="auto">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link rel="stylesheet" href="style/style.css" />
</head>
<body>
    <script src="script.script.js"></script>
</body>
</html>`;

const cssContent = `
*,
*::before,
*::after {
  box-sizing: border-box;
}


ul[class],
ol[class] {
  padding: 0;
}


body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}


body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}


ul[class],
ol[class] {
  list-style: none;
}


a:not([class]) {
  text-decoration-skip-ink: auto;
}


img {
  max-width: 100%;
  display: block;
}


article > * + * {
  margin-top: 1em;
}


input,
button,
textarea,
select {
  font: inherit;
}
`;
const jsContent = `"use strict"`;


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	console.log('Congratulations, your extension "web-fast-start" is now active!');


	let disposable = vscode.commands.registerCommand('web-fast-start.webFastStart', function () {
		const fs = require("fs");
		const path = require("path");
		const folderPath = vscode.workspace.workspaceFolders[0].uri
			.toString()
			.split(":")[1];

		fs.writeFile(path.join(folderPath, "index.html"), htmlContent, err => {
			if (err) {
				return vscode.window.showErrorMessage(
					"Failed to create structure!"
				);
			}
			vscode.window.showInformationMessage('The structure created!')

		});


       // create css structure

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; 
		const filePath = vscode.Uri.file(wsPath + '/style/style.css');
		wsedit.createFile(filePath, { ignoreIfExists: true });
		vscode.workspace.applyEdit(wsedit);
		

		fs.writeFile(filePath.fsPath, cssContent, err => {
			if (err) {
				// return vscode.window.showErrorMessage("Failed to create structure!");
				return console.log("Failed to create structure!")
			}
			vscode.window.showInformationMessage('The structure created!')
		});

		












		// create js structure	

		const filePathJs = vscode.Uri.file(wsPath + '/script/script.js');
		wsedit.createFile(filePathJs, {
			ignoreIfExists: true
		});
		vscode.workspace.applyEdit(wsedit);

		fs.writeFile(filePathJs.fsPath, jsContent, err => {
			if (err) {
				return console.log("Failed to create structure!")
			}
			vscode.window.showInformationMessage('The structure created!')
		});

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;


function deactivate() {}

module.exports = {
	activate,
	deactivate
}