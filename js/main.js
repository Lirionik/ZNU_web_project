const getFlowerInDiv = (flower) => {
  const div = document.createElement("div");
  div.className = "cart";

  const img = document.createElement('img');
  img.setAttribute("src", flower.image);

  const description = document.createElement("h4");
  description.innerHTML = `<center>${flower.name}: ${flower.flovers} <span>${flower.price} &#8372;</span></center>`;

  div.appendChild(img);
  div.appendChild(description);

  return div;
}

const flowers = async () => {
  const response = await fetch("https://run.mocky.io/v3/275cc213-7485-4396-b1ba-c1969194d67f")
  const listFLower = await response.json();

  const mainDiv = document.getElementById("flowers");
  const catalog = document.createElement("h1");
  catalog.innerHTML = "Каталог";

  mainDiv.appendChild(catalog);

  const cardCatalog = document.createElement("div");
  cardCatalog.className = "catalog-card";

  for (const flower of listFLower) {
      cardCatalog.appendChild(getFlowerInDiv(flower));
  }

  mainDiv.appendChild(cardCatalog);
}


// 2part
const getComments = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return await response.json();
  console(response);
}

const createParagraph = (text, className, formatSelector = null) => {
  const pName = document.createElement("p");
  pName.className = className;
  pName.innerHTML = formatSelector ? `<${formatSelector}>${text}</${formatSelector}>` : text;

  return pName;
}

const createComment = () => {
  return fetch("https://jsonplaceholder.typicode.com/comments", {
      method: 'POST',
      body: JSON.stringify({
          postId: Math.floor(Math.random() * 100),
          email: document.getElementById("author").value,
          body: document.getElementById("text_comment").value,
      }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => response.json())
      .then((createdComment) => {

          const div = document.getElementById("comments");
          const addComment = document.getElementById("addComment");

          div.insertBefore(getCommentInDiv(createdComment), addComment);
          div.insertBefore(document.createElement("br"), addComment);
      });
}

const getCommentInDiv = (comment) => {
  const div = document.createElement("div");
  div.className = "comment";

  const author = createParagraph(comment.email, "name", "span");
  const text = createParagraph(comment.body, "name_text");

  div.appendChild(author);
  div.appendChild(text);

  return div;
}

const divComments = async () => {
  const comments = await getComments();
  const mainDiv = document.getElementById("comments");
  const topComment = document.createElement("h1");

  topComment.innerHTML = "Відгуки";

  const elements = [topComment];
  for (const comment of comments.slice(-2)) {
      elements.push(
          getCommentInDiv(comment),
          document.createElement("br")
      );
  }

  const downComment = document.createElement("p");
  downComment.setAttribute("id", "addComment");
  downComment.innerHTML = "Додати відгук:";

  elements.push(downComment);

  for (let i = elements.length - 1; i >= 0; i--) {
      mainDiv.prepend(elements[i]);
  }
}

const sendComment = () => {
  const button = document.getElementById("send_comment");
  button.onclick = createComment;
}

window.onload = function () {
  divComments();
  flowers();
  sendComment();
}
