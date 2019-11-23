export function jsonHandler(){
    var url="http://localhost:5000/json"
    var data = {'myrequest': 'data'};
return fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {
        return response;
      }).catch(error => console.error('Error: form Json Handler', error));
}