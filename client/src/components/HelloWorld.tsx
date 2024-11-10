import axios from "axios";

function callApi() {
    axios.get("http://localhost:8080/").then((response) => {
        console.log(response.data);
});
}

function HelloWorld() {
  return (<div>
    Hello World!!
    <button onClick={callApi}>Fetch Data</button>
    </div>)
}

export default HelloWorld;
