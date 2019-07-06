const template = require("@babel/template").default;
const { createMacro } = require("babel-plugin-macros");

export default createMacro(betterAsyncAwaitMacros);

function betterAsyncAwaitMacros({ references, state, babel }) {
  references.default.forEach(referencePath => {
    if (referencePath.parentPath.type === "CallExpression") {
      awaitToPromise({ referencePath, state, babel });
    } else {
      throw new Error(
        `This is not supported: \`${referencePath
          .findParent(babel.types.isExpression)
          .getSource()}\`. Please see the betterAsyncAwait.macro documentation`
      );
    }
  });
}

const buildPromiseFromAwait = template(`
  CALLER.then(RESPONSE => {
    return [null, RESPONSE];
  })
  .catch(ERROR => {
    return [ERROR];
  });
`);

function awaitToPromise({ referencePath, state, babel }) {
  const t = babel.types;
  const caller = referencePath.parentPath.node.arguments[0];
  const awaitPath = referencePath.parentPath && referencePath.parentPath.parentPath;
  const awaitPathNode = awaitPath && awaitPath.node;
  // check if it's an await statement
  if (!awaitPathNode || !t.isAwaitExpression(awaitPathNode)) {
    throw new Error(
      `betterAsyncAwait.macro is build for async await statement. It should be used with a await statement.Error at: ${awaitPath.getSource()}. `
    );
  }
  // check if it's parent is a variable declaraion and left side is an array pattern
  const awaitParentPath = awaitPath && awaitPath.parentPath;
  const awaitParentPathNode = awaitParentPath && awaitParentPath.node;
  if(awaitParentPathNode) {
    if(t.isVariableDeclarator(awaitParentPathNode)) {
      const leftSideOfVariableDeclaration = awaitParentPathNode.id;
      if(!t.isArrayPattern(leftSideOfVariableDeclaration)) {
        throw new Error(
          `Left-hand side of assignment expression should be destructued array with [err, resp]. Error at: ${awaitParentPath.getSource()}.`
        );
      }
    }
    else if(t.isAssignmentExpression(awaitParentPathNode)) { // check for assigment expression
      // [err, resp] = await betterAsyncAwait(getData()); 
      const leftSideOfVariableDeclaration = awaitParentPathNode.left;
      if(!t.isArrayPattern(leftSideOfVariableDeclaration)) {
        throw new Error(
          `Left-hand side of assignment expression should be destructued array with [err, resp]. Error at: ${awaitParentPath.getSource()}.`
        );
      }
    }
  }
  const ast = buildPromiseFromAwait({
    CALLER: caller,
    RESPONSE: t.identifier("resp"),
    ERROR: t.identifier("err")
  });
  referencePath.parentPath.replaceWith(ast);
}
