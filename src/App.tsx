// Importaciones agrupadas
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Authenticated, Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsProvider } from "@refinedev/devtools";
import routerBindings, { CatchAllNavigate } from "@refinedev/react-router";

// Importaciones locales
import { supabaseClient } from "./utility";
import authProvider from "./providers/authProvider";
import { Layout } from "./layout";
import { resources } from "./config/resources";
import { AppRoutes, AuthRoutes } from "./routes";
import { ROUTES } from "./routes/constants";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "W5tKEH-NbMiVn-aLohjh",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<CatchAllNavigate to={ROUTES.LOGIN} />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                {AppRoutes()}
              </Route>

              {AuthRoutes()}
            </Routes>
          </Refine>
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
