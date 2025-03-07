import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideLocale } from './app/services/locale.provider.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'acerca-de', loadComponent: () => import('./app/pages/acerca-de/acerca-de.component').then(c => c.AcercaDeComponent) },
  { path: 'editoriales', loadComponent: () => import('./app/pages/editoriales/editoriales.component').then(c => c.EditorialesComponent) },
  { path: 'autores', loadComponent: () => import('./app/pages/autores/autores.component').then(c => c.AutoresComponent) },
  { path: 'ofertas', loadComponent: () => import('./app/pages/ofertas/ofertas.component').then(c => c.OfertasComponent) },
  { path: 'ayuda', loadComponent: () => import('./app/pages/ayuda/ayuda.component').then(c => c.AyudaComponent) },
  {
    path: 'libro-seleccionado/:id',
    loadComponent: () => import('./app/pages/libro-seleccionado/libro-seleccionado.component').then(c => c.LibroSeleccionadoComponent),
    canActivate: [() => import('./app/services/auth.guard').then(m => m.AuthGuard)]
  },
  { path: 'carrito-compras', loadComponent: () => import('./app/pages/carrito-compras/carrito-compras.component').then(c => c.CarritoComprasComponent) },
  {
    path: 'finalizar-compra',
    loadComponent: () => import('./app/pages/finalizar-compra/finalizar-compra.component').then(c => c.FinalizarCompraComponent),
    canActivate: [() => import('./app/services/auth.guard').then(m => m.AuthGuard)]
  },
  { path: 'identificarse', loadComponent: () => import('./app/pages/identificarse/identificarse.component').then(c => c.IdentificarseComponent) },
  {
    path: 'autor-seleccionado/:id',
    loadComponent: () => import('./app/pages/autor-seleccionado/autor-seleccionado.component').then(c => c.AutorSeleccionadoComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./app/pages/perfil-usuario/perfil-usuario.component').then(c => c.PerfilUsuarioComponent),
    canActivate: [() => import('./app/services/admin.guard').then(m => m.AdminGuard)]
  },
  { path: 'crear-cuenta', loadComponent: () => import('./app/pages/crear-cuenta/crear-cuenta.component').then(c => c.CrearCuentaComponent) },
  { path: 'busqueda/:term', loadComponent: () => import('./app/pages/busqueda/busqueda.component').then(c => c.BusquedaComponent) },
  {
    path: 'panel-admin',
    loadComponent: () => import('./app/admin/panel-admin/panel-admin.component').then(c => c.PanelAdminComponent),
    canActivate: [() => import('./app/services/admin.guard').then(m => m.AdminGuard)],
    children: [
      { path: 'usuarios', loadComponent: () => import('./app/admin/crud-usuarios/crud-usuarios.component').then(c => c.CrudUsuariosComponent) },
      { path: 'autores', loadComponent: () => import('./app/admin/crud-autores/crud-autores.component').then(c => c.CrudAutoresComponent) },
      { path: 'editoriales', loadComponent: () => import('./app/admin/crud-editoriales/crud-editoriales.component').then(c => c.CrudEditorialesComponent) },
      { path: 'libros', loadComponent: () => import('./app/admin/crud-libros/crud-libros.component').then(c => c.CrudLibrosComponent) },
      { path: 'ofertas', loadComponent: () => import('./app/admin/crud-ofertas/crud-ofertas.component').then(c => c.CrudOfertasComponent) },
      { path: 'provincias', loadComponent: () => import('./app/admin/crud-provincias/crud-provincias.component').then(c => c.CrudProvinciasComponent) },
      { path: 'categorias', loadComponent: () => import('./app/admin/crud-categorias/crud-categorias.component').then(c => c.CrudCategoriasComponent) },
      { path: 'pedidos', loadComponent: () => import('./app/admin/crud-pedidos/crud-pedidos.component').then(c => c.CrudPedidosComponent) },
    ]
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    provideLocale('es'),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
}).catch(err => console.error(err));

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));