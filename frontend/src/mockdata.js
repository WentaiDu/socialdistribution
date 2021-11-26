const mockData = {
    inbox_author_id: "ce4e5a65-5fe4-41b3-9d0b-1fef27dd57af",
    inbox_type: "inbox",
    items: [
        {type: "post", 
        title: "string", 
        source: "http://lastplaceigotthisfrom.com/posts/yyyyy/", 
        origin: "http://whereitcamefrom.com/posts/zzzzz/", 
        description: "Rain is the most stupid person in the world.", 
        contentType: "text/markdown", 
        content: "string", 
        author: {
            username: "string", 
            password: "string", 
            author_type: "string", 
            author_id: "e38e962a-24e9-4199-be01-86eb68114f14", 
            host: "string", 
            displayName: "string", 
            url: "http://127.0.0.1:5454/author/e38e962a-24e9-4199-be01-86eb68114f14/", 
            github: "string"
        }, 
        comments: "http://whereitcamefrom.com/posts/zzzzz/", 
        visibility: "PUBLIC", 
        unlisted: true
    }]
  }

export function getMockData() {
    return mockData;
}
  