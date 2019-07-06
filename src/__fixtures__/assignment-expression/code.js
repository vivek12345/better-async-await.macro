import betterAsyncAwait from "../../macro";

async function test() {
  let err,results;
  [err, results] = await betterAsyncAwait(getData());
}