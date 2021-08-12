import styled from 'styled-components/macro';

export const Card = styled.div`
  padding: 1rem;
  box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #d1c7f3f5;
  backdrop-filter: blur(1px);

  @media (hover: hover) {
    .show-on-card-hover {
      opacity: 0;
    }

    &:hover .show-on-card-hover {
      opacity: 1;
    }
  }
`;
