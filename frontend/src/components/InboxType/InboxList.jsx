import Posts from "./Posts";
export default function Question({
    type,
    title,
    author,
    description,
    content,
  }) {
    if (type === "post") {//post,like,follow
      return (
        <Posts
          title={title}
          author={author}
          description={description}
          content={content}
        />
      );
    // } else if (type === "like") {
    //   return (

    //   );
    // } else if (type === "follow") {
    //   return (

    //   );
    }
  }
  