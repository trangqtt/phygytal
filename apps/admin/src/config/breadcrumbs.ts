export type AppBreadcrumbsParentType = {
  title: string;
  route: string;
};

export type AppBreadcrumbsType = {
  parents: AppBreadcrumbsParentType[];
  title: string;
};

export const CREATE_EVENT_BREADCRUMBS: AppBreadcrumbsType = {
  parents: [
    {
      title: 'events',
      route: '/admin/events',
    },
  ],
  title: 'create events',
};

export const EDIT_EVENT_BREADCRUMBS: AppBreadcrumbsType = {
  parents: [
    {
      title: 'events',
      route: '/admin/events',
    },
  ],
  title: 'edit events',
};

export const DETAIL_EVENT_BREADCRUMBS: AppBreadcrumbsType = {
  parents: [
    {
      title: 'events',
      route: '/admin/events',
    },
  ],
  title: 'event name',
};

export const DETAIL_REPORT_TOOL_BREADCRUMBS: AppBreadcrumbsType = {
  parents: [
    {
      title: 'Reports',
      route: '/admin/reporting-tool',
    },
  ],
  title: 'event name',
};
