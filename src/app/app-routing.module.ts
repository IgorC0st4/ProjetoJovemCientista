import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'fase',
    loadChildren: () => import('./fase/fase.module').then( m => m.FasePageModule)
  },
  {
    path: 'resultado-modal',
    loadChildren: () => import('./resultado-modal/resultado-modal.module').then( m => m.ResultadoModalPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'instrucoes-modal',
    loadChildren: () => import('./instrucoes-modal/instrucoes-modal.module').then( m => m.InstrucoesModalPageModule)
  },
  {
    path: 'sobre-modal',
    loadChildren: () => import('./sobre-modal/sobre-modal.module').then( m => m.SobreModalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
