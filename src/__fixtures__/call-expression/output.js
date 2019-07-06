async function test() {
  const [err, results] = await getData().then(resp => {
    return [null, resp];
  }).catch(err => {
    return [err];
  });
}
