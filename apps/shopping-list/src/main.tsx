import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/app';
import { EmptyListCard } from './app/empty-list-card';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="shopping-list" element={<EmptyListCard />}></Route>
        <Route
          path="*"
          element={
            <main style={{textAlign: 'center'}}>
              <h1>404</h1>
              <p>There's nothing here!</p>
            </main>
          }
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
