import { Cgt1Component } from './pages/cgt1/cgt1.component';
import { SurveyModule } from './pages/survey/survey.module';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SuperauthComponent } from './pages/superadmin/superauth/superauth.component';
import { SuperlayoutComponent } from './pages/superadmin/layout/Superlayout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full'
  },
  {
    path: 'super',
    component: SuperauthComponent,
    pathMatch: 'full'
  },

 /*Super Admin Routing*/

 {
  path: '',
  component: SuperlayoutComponent,
  data: {
    title: 'Angular Admin Template'
  },
  children: [
    {
      path: 'superdashboard',
      loadChildren: () => import('./pages/superadmin/dashboard/superdashboard.module').then(m => m.SuperDashboardModule),
      data: {
        title: 'Super Dashboard | Home'
      },
    },

    {
      path: 'Activebanks',
      loadChildren: () => import('./pages/superadmin/managebanks/managebanks.module').then(m => m.ManagebanksModule),
      data: {
        title: 'Super Dashboard | Home'
      },
    },
  ]
},

  /*Bank Routing */
    {
      path: '',
      component: LayoutComponent,
      data: {
        title: 'Angular Admin Template'
      },
      children: [
        {
          path: 'dashboard',
          loadChildren: () => import('../app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
          data: {
            title: 'Dashboard Page'
          },
        },
        {
          path: 'bank-details',
          loadChildren: () => import('../app/pages/bank/bank.module').then(m => m.BankModule),
          data: {
            title: 'users Page'
          },
        },
        {
          path: 'customer',
          loadChildren: () => import('../app/pages/customer/customer.module').then(m => m.CustomerModule),
          data: {
            title: 'customer Page'
          },
        },
        {
          path: 'users',
          loadChildren: () => import('../app/pages/users/users.module').then(m => m.UsersModule),
          data: {
            title: 'users Page'
          },
        }
        ,
        {
          path: 'role',
          loadChildren: () => import('../app/pages/role/role.module').then(m => m.RoleModule),
          data: {
            title: 'role Page'
          },
        },
        {
          path: 'area',
          loadChildren: () => import('../app/pages/area-form/area-form.module').then(m => m.AreaFormModule),
          data: {
            title: 'Branch Page'
          },
        }
        ,
        {
          path: 'branch',
          loadChildren: () => import('../app/pages/branch/branch.module').then(m => m.BranchModule),
          data: {
            title: 'Branch Page'
          },
        },
        {
          path: 'survey',
          loadChildren: () => import('../app/pages/survey/survey.module').then(m => m.SurveyModule),
          data: {
            title: 'survey Page'
          },
        },
        {
          path: 'area-survey',
          loadChildren: () => import('../app/pages/areasurvey/areasurvey.module').then(m => m.AreaSurveyModule),
          data: {
            title: 'survey Page'
          },
        },
        {
          path: 'cgt',
          loadChildren: () => import('../app/pages/cgt/cgt.module').then(m => m.CgtModule),
          data: {
            title: 'CGT'
          },
        },
        {
          path: 'cgt1',
          loadChildren: () => import('../app/pages/cgt1/cgt1.module').then(m => m.Cgt1Module),
          data: {
            title: 'CGT1'
          },
        },

        
        {
          path: 'centers',
          loadChildren: () => import('../app/pages/centers/centers.module').then(m => m.CentersModule),
          data: {
            title: 'Center Page'
          },
        },
        {
          path: 'Groups',
          loadChildren: () => import('../app/pages/groups/groups/groups.module').then(m => m.GroupsModule),
          data: {
            title: 'Group Page'
          },
        }
        ,
        {
          path: 'loans',
          loadChildren: () => import('../app/pages/loan/loan.module').then(m => m.LoanModule),
          data: {
            title: 'Loans Page'
          },
        },
        {
          path: 'disbursement',
          loadChildren: () => import('../app/pages/loan/disbursement/disbursement.module').then(m => m.DisbursementModule),
          data: {
            title: 'Loans Page'
          },
        },
        {
          path: 'disbursed',
          loadChildren: () => import('../app/pages/disbursed/disbursed.module').then(m => m.DisbursedModule),
          data: {
            title: 'Loans Disbursed Page'
          },
        },
        {
          path: 'emi',
          loadChildren: () => import('../app/pages/loan/emi/emi.module').then(m => m.EmiModule),
          data: {
            title: 'Emi Page'
          },
        },
        {
          path: 'recovery',
          loadChildren: () => import('../app/pages/loan/recovery/recovery.module').then(m => m.RecoveryModule),
          data: {
            title: 'Recovery Page'
          },

          
        }

        ,
        {
          path: 'blc-approval',
          loadChildren: () => import('../app/pages/blc/blc.module').then(m => m.BlcModule),
          data: {
            title: 'Recovery Page'
          },

          
        }
        ,{
          path: 'application-pdf',
          loadChildren: () => import('../app/pages/documents/applicationpdf/applicationpdf.module').then(m => m.ApplicationpdfModule),
          data: {
            title: 'Recovery Page'
          },

          
        },
        {
          path: 'collection',
          loadChildren: () => import('../app/pages/collection/collection.module').then(m => m.CollectionModule),
          data: {
            title: 'Collection Page'
          },
        },
        {
          path: 'reports',
          loadChildren: () => import('../app/pages/reports/reports.module').then(m => m.ReportsModule),
          data: {
            title: 'Reports Page'
          },
        },
        {
          path: 'daily-balance-report',
          loadChildren: () => import('../app/pages/reports/daily-balance-report/daily-balance-report.module').then(m => m.DailyBalanceReportModule),
          data: {
            title: 'Daily Balance Report Page'
          },
        },
        {
          path: 'collection-balance-sheet',
          loadChildren: () => import('../app/pages/reports/collection-balance-sheet/collection-balance-sheet.module').then(m => m.CollectionBalanceSheetModule),
          data: {
            title: 'Collection Balance Sheet Page'
          },
        },
        {
          path: 'collection-report',
          loadChildren: () => import('../app/pages/reports/collection-report/collection-report.module').then(m => m.CollectionReportModule),
          data: {
            title: 'Collection Report Page'
          },
        },
        {
          path: 'demand-report',
          loadChildren: () => import('../app/pages/reports/month-demand-report/month-demand-report.module').then(m => m.MonthDemandReportModule),
          data: {
            title: 'Demand Report Page'
          },
        },
        {
          path: 'loan-collection-report',
          loadChildren: () => import('../app/pages/reports/loan-collection-report/loan-collection-report.module').then(m => m.LoanCollectionReportModule),
          data: {
            title: 'Loan Collection Report Page'
          },
        },
        {
          path: 'od-report',
          loadChildren: () => import('../app/pages/reports/od-report/od-report.module').then(m => m.OdReportModule),
          data: {
            title: 'OD Report Page'
          },
        },
        {
          path: 'preclose-report',
          loadChildren: () => import('../app/pages/loan/preclose-report/preclose-report.module').then(m => m.PrecloseReportModule),
          data: {
            title: 'Preclose Page'
          },
        }
        
      ]
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
