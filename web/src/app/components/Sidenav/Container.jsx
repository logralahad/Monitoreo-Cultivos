import { styled } from '@mui/material';

const DivContainer = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
}));

const Container = ({ children }) => {
  return <DivContainer>{children}</DivContainer>;
};

export default Container;
