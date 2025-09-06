import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";
import TableOfContents from "../../components/TableOfContents";
import BackToTopButton from "../../components/BackToTop";
import ReadingProgressBar from "../../components/ReadingProgressBar";

const App = () => {
  const pathMapping = getPathMapping();
  const currentPath =
    location.pathname
      .split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`)
      .pop() || "/";

  // Set Page Title
  const title =
    currentPath in pathMapping ? pathMapping[currentPath].title : "Not Found";

  useEffect(() => {
    document.title = `${title || ""} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  return (
    <>
      {/* Navigation */}
      <Navbar />
      {/* Header and PageContent */}
      <Routes>
        {Object.entries(pathMapping).map(
          ([path, { title, component: Component }]) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  <ReadingProgressBar />
                  <Header title={title || ""} />
                  <div
                    className={title === "Home" ? "" : "wiki-description"}
                    id="content"
                  >
                    <Component />
                  </div>
                  {title !== "Home" && (
                    <aside>
                      <TableOfContents
                        contentSelector="#content"
                        contentKey={path}
                      />
                    </aside>
                  )}
                  <BackToTopButton></BackToTopButton>
                </>
              }
            />
          )
        )}
        <Route
          path="*"
          element={
            <>
              <Header title="Not Found" />
              <NotFound />
            </>
          }
        />
      </Routes>

      {/* Footer */}
      {/* MUST mention license AND have a link to team wiki's repository on gitlab.igem.org */}
      <Footer />
    </>
  );
};

export default App;
