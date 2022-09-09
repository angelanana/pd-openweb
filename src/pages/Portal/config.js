import { addSubPathOfRoutes } from 'src/util';

export const ROUTE_CONFIG_PORTAL = addSubPathOfRoutes(
  {
    // 工作表
    newRecord: {
      path: '/app/:appId/newrecord/:worksheetId/:viewId/',
      component: () => import('src/pages/NewRecord'),
    },
    // 工作表
    worksheetDetail: {
      path: '/app/:appId/:worksheetId/:viewId/row/:rowId',
      component: () => import('src/pages/worksheet/pages/WorksheetRowLand'),
    },
    // 工作表
    worksheetDetailNoView: {
      path: '/app/:appId/:worksheetId/row/:rowId',
      component: () => import('src/pages/worksheet/pages/WorksheetRowLand'),
    },
    printForm: {
      path: '/printForm/:appId/:printType/:type/:from/:key?',
      component: () => import('src/pages/Print'),
    },
    gunterExport: {
      path: '/app/:appId/:worksheetId/:viewId/gunterExport',
      component: () => import('src/pages/worksheet/views/GunterView/components/GunterExport'),
      title: _l('正在导出，请稍候...'),
    },
    app: {
      path: '/app/:appId',
      component: () => import('src/router/Application'),
      title: _l('应用'),
    },
    worksheet: {
      path: '/worksheet/:worksheetId',
      component: () => import('src/router/Application'),
      title: _l('应用'),
    },
    default: {
      path: '/*',
      component: () => import('src/pages/Portal/PortalErr'),
    }
  },
  window.subPath,
);

const withoutHeaderPathList = [
  'worksheet/worksheetshare',
  'worksheet/public/query',
  'workflowEdit',
  'workflow/checksheet',
  'worksheet/field/edit',
  'worksheet/form/edit',
  'worksheet/form/preview',
  'worksheet/formSet',
  'worksheet/uploadTemplateSheet',
  'gunterExport',
];
export const withoutHeaderUrl = `/(.*)(${withoutHeaderPathList.join('|')})`;
