'use client';

import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Typography, List, ListItem, CircularProgress, Alert, Card, CardActionArea, CardContent } from '@mui/material';
import styled from '@emotion/styled';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const ArticlesWrapper = styled.div`
  max-width: 800px;
  margin: auto;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ArticlesPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, error } = useSWR('http://localhost:1337/api/articles', fetcher);

  const router = useRouter();

  const handleNavigation = (slug: string) => {
    if (isClient) {
      router.push(`/articles/${slug}`);
    }
  };

  if (!data && !error) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading articles</Alert>;

  return (
    <ArticlesWrapper>
      <Typography variant="h4" component="h1" gutterBottom>
        Articles
      </Typography>
      <List>
        {data && Array.isArray(data) && data.map((article: any) => (
          <ListItem key={article.id} component="div" onClick={() => handleNavigation(article.slug)}>
            <CardActionArea>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.summary}
                  </Typography>
                </CardContent>
              </StyledCard>
            </CardActionArea>
          </ListItem>
        ))}
      </List>
    </ArticlesWrapper>
  );
};

export default ArticlesPage;
