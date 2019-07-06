async function test() {
  const [err, results] = await api.getData().then(resp => {
    return [null, resp];
  }).catch(err => {
    return [err];
  });
}
