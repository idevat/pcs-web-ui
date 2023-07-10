import {PageSection} from "@patternfly/react-core";

import {Router, useLocation, useRoute, useRouter} from "app/view/share";

import {GroupDetailViewContextProvider} from "./GroupDetailViewContext";

// string[] & { 0: string; 1: string } means list of string with at least two
// items
type DetailTypeList = (string[] & {0: string; 1: string}) | undefined;
type RouteMatch = ReturnType<typeof useRoute>;

const detailTypeMatch = (
  detailTypeList: DetailTypeList,
  detailType: string | undefined,
) =>
  (detailTypeList === undefined && detailType === undefined)
  || (detailTypeList !== undefined
    && detailType !== undefined
    && detailTypeList.includes(detailType));

const detailMatch = (
  detail: RouteMatch,
  detailTypeList: DetailTypeList,
): detail is Exclude<RouteMatch, null> =>
  detail !== null && detailTypeMatch(detailTypeList, detail.params.detailType);

export const GroupDetailView = (props: {
  groupCard: React.ReactNode;
  detailCard: React.ReactNode;
  detailTypeList?: DetailTypeList;
  "data-test"?: string;
}) => {
  const detail = useRoute(
    props.detailTypeList
      ? "/:detailType/:detailUrlName/*"
      : "/:detailUrlName/*",
  );
  const {base} = useRouter();
  const {navigate} = useLocation();
  const closeDetailUrl = () => navigate(`~${base}`);

  if (detailMatch(detail, props.detailTypeList)) {
    return (
      <PageSection
        className="ha-m-full-height pf-m-fill"
        data-test={props["data-test"]}
      >
        <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
          <GroupDetailViewContextProvider
            value={{
              compact: true,
              selectedItemUrlType: detail.params.detailType ?? null,
              selectedItemUrlName: detail.params.detailUrlName,
              closeDetailUrl,
            }}
          >
            <div className="ha-c-panel__tree-view" data-test="group-card">
              {props.groupCard}
            </div>
            <div
              className="pf-c-card pf-m-flex-1 ha-c-panel__details-view"
              data-test="detail-card"
            >
              <Router base={detail.matched}>{props.detailCard}</Router>
            </div>
          </GroupDetailViewContextProvider>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection data-test={props["data-test"]}>
      <GroupDetailViewContextProvider
        value={{
          compact: false,
          selectedItemUrlType: null,
          selectedItemUrlName: "",
          closeDetailUrl,
        }}
      >
        {props.groupCard}
      </GroupDetailViewContextProvider>
    </PageSection>
  );
};
