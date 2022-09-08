import { Breadcrumbs as MuiBreadcrumbs, Link } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useBreadcrumbsStyles } from "./breadcrumbs.styles";

export interface Breadcrumb {
  path: string;
  name: string;
}
export interface GetBreadcrumbList {
  (): Breadcrumb[];
}

const Breadcrumbs: FunctionComponent = () => {
  const classes = useBreadcrumbsStyles();
  const { pathname } = useLocation();

  const getBreadcrumbList: GetBreadcrumbList = () => {
    let basePath = "";

    /* Returns an array of the breadcrumb list containing
    @param name
    @param path */

    const pathnames: Breadcrumb[] = pathname
      .split("/")
      .filter((item) => item !== "")
      .map((item) => {
        basePath = basePath ? `${basePath}/${item}` : item;
        return { name: item, path: basePath };
      });

    return pathnames;
  };
  const breadcrumbList = getBreadcrumbList();

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      className={classes.crumbContainer}
      maxItems={2}
    >
      <Link color="inherit" component={RouterLink} to="/">
        Home
      </Link>

      {/* generate breadcrumb list */}
      {breadcrumbList.map((crumb: Breadcrumb) => (
        <Link component={RouterLink} key={crumb.name} to={crumb.path}>
          {crumb.name}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
