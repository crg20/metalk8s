import styled from 'styled-components';
import {
  padding,
  fontSize,
  fontWeight,
} from '@scality/core-ui/dist/style/theme';

export const PageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100%;
  flex-wrap: wrap;
  padding: ${padding.small};
`;

export const LeftSideInstanceList = styled.div`
  flex-direction: column;
  min-height: 696px;
  width: 45%;
`;

export const RightSidePanel = styled.div`
  flex-direction: column;
  width: 55%;
  /* Make it scrollable for the small laptop screen */
  overflow-y: scroll;
  margin: ${padding.small} ${padding.small} ${padding.small} 0;
`;

export const NoInstanceSelectedContainer = styled.div`
  margin: ${padding.small} ${padding.small} ${padding.small} 0;
  width: 55%;
  min-height: 700px;
  background-color: ${(props) => props.theme.brand.primaryDark1};
`;

export const NoInstanceSelected = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.brand.textPrimary};
  text-align: center;
`;

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.brand.primary};
  overflow: hidden;
`;

// Common styles for the tabs in NodePageRSP
export const TabContainer = styled.div`
  background-color: ${(props) => props.theme.brand.primaryDark1};
  color: ${(props) => props.theme.brand.textPrimary};
  padding-top: 25px;
`;

export const TabTitle = styled.div`
  color: ${(props) => props.theme.brand.textPrimary};
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.bold};
  padding: 35px 0 ${padding.small} ${padding.large};
`;

export const TextBadge = styled.span`
  background-color: ${(props) => props.theme.brand.base};
  color: ${(props) => props.theme.brand.textPrimary};
  padding: 2px ${padding.small};
  border-radius: 4px;
  font-size: ${fontSize.small}
  font-weight: ${fontWeight.bold}
`;
