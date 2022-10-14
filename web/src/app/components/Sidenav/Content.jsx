import { styled } from '@mui/material';

const DivContent = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  position: 'relative',
}));

const Content = ({ children }) => {
  return <DivContent>{children}</DivContent>;
};

export default Content;
