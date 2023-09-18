import CMSProvider from "../../infra/cms/cmsPriveder";

export function pageHOC(Component) {
  return function wrapper(props) {
    return (
      <CMSProvider cmsContent={props.cmsContent}>
        <Component {...props} />
      </CMSProvider>
    );
  };
}
