import { Strapi } from '@strapi/strapi';

declare module '@strapi/strapi' {
  namespace Strapi {
    interface Entity {
      id: number;
      title: string;
      content: string;
      slug: string;
    }

    interface Filters {
      slug?: string;
    }
  }
}