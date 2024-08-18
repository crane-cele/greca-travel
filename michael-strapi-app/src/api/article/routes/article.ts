export default {
    routes: [
      {
        method: 'GET',
        path: '/articles/:slug',
        handler: 'article.findOne',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/articles',
        handler: 'article.findAll',
        config: {
          policies: [],
        },
      },
    ],
  };