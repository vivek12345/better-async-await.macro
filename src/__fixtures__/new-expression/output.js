async function test() {
  const [err, results] = await new ApiLibrary().getData().then(resp => {
    return [null, resp];
  }).catch(err => {
    return [err];
  });
}
