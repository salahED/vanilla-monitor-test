import "./styles.css";
export const fetchCall = async () => {
  const res = await fetch("http://localhost:8080/datas.json");
  const jsonRes = await res.json();
  const filter = jsonRes.filter((data) => data.age > 31);
  console.log("datas", filter);
  let [a, , b] = filter;
  console.log("first and last ", a, b);
};