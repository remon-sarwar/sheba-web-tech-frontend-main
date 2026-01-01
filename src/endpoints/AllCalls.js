'use server';

// let hosturl = 'http://localhost:8080';
let hosturl = 'https://api.shebausait.com';

function getheader(token) {
  let head = {
    'Content-Type': 'application/json'
  };
  if (token) {
    head['Authorization'] = `Bearer ${token}`;
  }
  return head;
}

export async function sendget(path, token = '', isText = false) {
  let head = getheader(token);
  let response = await fetch(hosturl + path, {
    method: 'GET',
    headers: head
  });

  let da = null;

  if (isText) {
    da = await response.text();
    console.log(da);
  } else {
    da = await response.json();
  }

  return da;
}

export async function sendPost(path, body, token = '', isText = false) {
  let head = getheader(token);

  let response = await fetch(hosturl + path, {
    method: 'POST',
    headers: head,
    body: JSON.stringify(body)
  });

  let da = null;

  if (isText) {
    da = await response.text();
    console.log(da);
  } else {
    da = await response.json();
  }

  return da;
}
