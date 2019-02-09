import ReactGA from "react-ga";

export function addGooEvent(category, action) {
  ReactGA.event({
    category,
    action,
  });
}

export function trackGooPage(page) {
  ReactGA.set({ page });
  ReactGA.pageview(page);
}
