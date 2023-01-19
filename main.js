fetch("http://localhost:5500/data.json")
  .then((r) => r.json())
  .then(console.log);
