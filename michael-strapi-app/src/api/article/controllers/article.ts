import { Context } from 'koa';

const articleController = {
  async findAll(ctx: Context) {
    try {
      const articleService = strapi.entityService;
      if (!articleService) {
        console.error('Article service is undefined');
        return ctx.internalServerError('Failed to fetch articles');
      }

      const entities = await articleService.findMany('api::article.article', {});
      if (!entities || entities.length === 0) {
        return ctx.notFound();
      }
      const sanitizedEntities = Array.isArray(entities)
        ? entities.map(entity => articleController.transformResponse(entity))
        : articleController.transformResponse(entities);
      return ctx.send(sanitizedEntities);
    } catch (error) {
      console.error('Error fetching articles:', error);
      return ctx.internalServerError('Failed to fetch articles');
    }
  },

  async findOne(ctx: Context) {
    const { slug } = ctx.params;
    try {
      const articleService = strapi.entityService;

      if (!articleService) {
        console.error('Article service is undefined');
        return ctx.internalServerError('Failed to fetch article');
      }

      const entity = await articleService.findOne('api::article.article', slug);

      if (!entity) {
        return ctx.notFound();
      }

      const sanitizedEntity = articleController.transformResponse(entity);

      return ctx.send(sanitizedEntity);
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      return ctx.internalServerError('Failed to fetch article');
    }
  },

  transformResponse(entity: any) {
    if (!entity) {
      console.error('Invalid entity structure:', entity);
      return {};
    }
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content[0].children[0].text,
      slug: entity.slug,
    };
  },
};

export = articleController;