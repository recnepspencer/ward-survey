// src/components/_Shared/UniformCard.tsx
import React from 'react';
import { Card, CardContent, Box } from '@mui/material';

interface UniformCardProps {
  children: React.ReactNode;
}

const UniformCard: React.FC<UniformCardProps> = ({ children }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        padding: 3,
        '&:last-child': { paddingBottom: 3 }
      }}>
        {children}
      </CardContent>
    </Card>
  );
};

interface CardSectionProps {
  children: React.ReactNode;
}

const CardHeader = ({ children }: CardSectionProps) => (
  <Box sx={{ flexShrink: 0 }}>
    {children}
  </Box>
);

const CardBody = ({ children }: CardSectionProps) => (
  <Box sx={{ flexGrow: 1, mt: 2 }}>
    {children}
  </Box>
);

const CardFooter = ({ children }: CardSectionProps) => (
  <Box sx={{ flexShrink: 0, mt: 'auto', pt: 2 }}>
    {children}
  </Box>
);

export { UniformCard, CardHeader, CardBody, CardFooter };
