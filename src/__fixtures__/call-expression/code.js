import betterAsyncAwait from "../../macro";

async function test() {
  const [err, results] = await betterAsyncAwait(getData());
}