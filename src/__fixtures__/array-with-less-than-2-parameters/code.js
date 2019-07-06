import betterAsyncAwait from "../../macro";

async function test() {
  const [err] = await betterAsyncAwait(getData());
}