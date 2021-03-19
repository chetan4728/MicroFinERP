import { SurveyModule } from './pages/survey/survey.module';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './pages/auth/auth.component';
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
          path: 'centers',
          loadChildren: () => import('../app/pages/centers/centers.module').then(m => m.CentersModule),
          data: {
            title: 'Center Page'
          },
        },
        {
          path: 'groups',
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
