import React, { useEffect, useState } from 'react';
import { Message } from '@shopping-list/api-interfaces';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Header = styled.header`
  display: flex;
  background-color: #5980b3;
  color: white;
`;

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => {
        const resp = r.json();
        console.log(resp);
        return resp;
      })
      .then(setMessage);
  }, []);

  return (
    <>
      <Header>
        <h3 style={{ margin: '20px', fontWeight: '500'}}>SHOPPING LIST</h3>
      </Header>
      <Outlet></Outlet>
      <div>{m.message}</div>
    </>
  );
};

export default App;
