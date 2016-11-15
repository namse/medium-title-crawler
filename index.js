const fetch = require('node-fetch');

const name = process.argv[2];
console.log(`https://medium.com/@${name}/latest`);
fetch(`https://medium.com/@${name}/latest`, {
  headers: {
    Accept: 'application/json',
  },
})
.then(response => {
  return response.text();
})
.then(text => {
  const prepend_removed_text = text.substring('])}while(1);</x>'.length);
  const json = JSON.parse(prepend_removed_text);
  if(!json.success) {
    console.log("Fail to get posts");
    return;
  }
  const posts = json.payload.references.Post;
  for (const post_key in posts)  {
    const post = posts[post_key];
    const {
      title,
      uniqueSlug,
    } = post;
    console.log(`title: ${title}`);
    console.log(`url: https://medium.com/@${name}/${uniqueSlug}`);
  }
})
.catch(err => console.log(err));
