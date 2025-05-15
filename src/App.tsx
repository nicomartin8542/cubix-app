import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Authenticated, Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility";
import authProvider from "./providers/authProvider";
import routerBindings, { CatchAllNavigate } from "@refinedev/react-router";
import { RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsProvider } from "@refinedev/devtools";
import { Layout } from "./layout";
import { resources } from "./config/resources";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css";
import { AuthRoutes } from "./routes/AuthRoutes";

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
                    fallback={<CatchAllNavigate to="/login" />}
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
