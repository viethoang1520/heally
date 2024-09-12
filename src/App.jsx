import classNames from 'classnames';
import { Fragment, memo, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './Context/AppContext';
import DefaultLayout from './Layout/DefaultLayout';
import { PrivateRouteComponent, privateRoutes, publicRoutes } from './Routes';
import { LoadingVocado } from './Components';

function App() {

  const { isLoading, theme } = useContext(AppContext);

  // console.log("%cBACK END PROBLEMS 😊", "font-size: 30px; color: red; background-color: black; font-weight: bold; padding: 5px;");

  return (
    <BrowserRouter>
      <div className={classNames('App', theme)}>
        {isLoading && <LoadingVocado />}
        <Routes>
          {/* Public route */}
          {publicRoutes.map((route, index) => {
            let Page = route.component
            let Layout = DefaultLayout
            if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout> <Page /> </Layout>
                }
              />
            )
          })}

          {/* Private route */}
          {privateRoutes.map((route, index) => {
            let Page = route.component
            let Layout = DefaultLayout
            if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRouteComponent>
                    <Layout> <Page /> </Layout>
                  </PrivateRouteComponent>
                }
              />
            )
          })}
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default memo(App);
