async function test() {
  let err, results;
  [err, results] = await getData().then(resp => {
    return [null, resp];
  }).catch(err => {
    return [err];
  });
}
  