async function test() {
  const [err] = await getData().then(resp => {
    return [null, resp];
  }).catch(err => {
    return [err];
  });
}