// Importaciones agrupadas
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsProvider } from "@refinedev/devtools";
import routerBindings from "@refinedev/react-router";

// Importaciones locales
import { supabaseClient } from "./utility";
import authProvider from "./providers/authProvider";
import { Layout } from "./layout";
import { resources } from "./routes/config/resources";
import { AppRoutes, AuthRoutes } from "./routes";
import { AuthenticatedLayout } from "./routes/components/AuthenticacedLayout";
import "./App.css";
import { UserProvider } from "./context/UserContext";

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
            <UserProvider>
              <Routes>
                <Route
                  element={
                    <AuthenticatedLayout>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </AuthenticatedLayout>
                  }
                >
                  {AppRoutes()}
                </Route>

                {/* Rutas publicas */}
                {AuthRoutes()}
              </Routes>
            </UserProvider>
          </Refine>
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
