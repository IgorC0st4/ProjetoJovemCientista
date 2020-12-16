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
  {
    path: 'creditos-modal',
    loadChildren: () => import('./creditos-modal/creditos-modal.module').then( m => m.CreditosModalPageModule)
  },
  {
    path: 'parabens-modal',
    loadChildren: () => import('./parabens-modal/parabens-modal.module').then( m => m.ParabensModalPageModule)
  },  {
    path: 'primeiros-passos',
    loadChildren: () => import('./primeiros-passos/primeiros-passos.module').then( m => m.PrimeirosPassosPageModule)
  },
  {
    path: 'atualizar-dados-modal',
    loadChildren: () => import('./atualizar-dados-modal/atualizar-dados-modal.module').then( m => m.AtualizarDadosModalPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
