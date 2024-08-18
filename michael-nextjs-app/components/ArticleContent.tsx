'use client';

import { Typography, Card, CardContent, CardMedia, Divider } from '@mui/material';
import styled from '@emotion/styled';

const ArticleWrapper = styled(Card)`
  max-width: 800px;
  margin: auto;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleTypography = styled(Typography)`
  font-family: 'Roboto Slab', serif;
  color: #333;
  margin-bottom: 1rem;
`;

const ContentTypography = styled(Typography)`
  font-family: 'Open Sans', sans-serif;
  color: #555;
  margin-top: 1rem;
`;

interface ArticleContentProps {
  data: {
    title: string;
    content: string;
    imageUrl?: string;
  };
}

const ArticleContent: React.FC<ArticleContentProps> = ({ data }) => {
  return (
    <ArticleWrapper>
      {data.imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={data.imageUrl}
          alt={data.title}
        />
      )}
      <CardContent>
        <TitleTypography variant="h4">
          {data.title}
        </TitleTypography>
        <Divider />
        <ContentTypography variant="body1" gutterBottom>
          {data.content}
        </ContentTypography>
      </CardContent>
    </ArticleWrapper>
  );
};

export default ArticleContent;
