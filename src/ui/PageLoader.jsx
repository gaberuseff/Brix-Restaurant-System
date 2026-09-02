import {useEffect} from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress settings
NProgress.configure({
  showSpinner: false,
  speed: 400,
  minimum: 0.1,
});

function PageLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <style>{`
      #nprogress .bar {
        background: var(--accent, #3b82f6) !important;
        height: 3px !important;
        z-index: 99999 !important;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px var(--accent, #3b82f6), 0 0 5px var(--accent, #3b82f6) !important;
      }
    `}</style>
  );
}

export default PageLoader;
