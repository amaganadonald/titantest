import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/LoginPage.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/parcMateriels',
        component: () => import('pages/ParcMateriels.vue'),
      },
      { path: '/famVeh', component: () => import('pages/FamilleVehicule.vue') },
      { path: '/typeVeh', component: () => import('pages/TypeVehicule.vue') },
      {
        path: '/parcMateriels',
        children: [
          { path: '', component: () => import('pages/ParcMateriels.vue') },
          {
            path: ':code',
            component: () => import('pages/VehiculeDetails.vue'),
          },
        ],
      },
      {
        path: '/activiteVeh',
        component: () => import('pages/ActiviteVeh.vue'),
      },
      {
        path: '/affectationVeh',
        component: () => import('pages/AffectationVeh.vue'),
      },
      { path: '/siteVeh', component: () => import('pages/SiteVeh.vue') },
      { path: '/groupVeh', component: () => import('pages/GroupVeh.vue') },
      { path: '/carburant', component: () => import('pages/CarburantVeh.vue') },
      { path: '/typeInt', component: () => import('pages/TypeInt.vue') },
      { path: '/marques', component: () => import('pages/MarqueVeh.vue') },
      {
        path: '/fournisseur',
        component: () => import('pages/FournisseurVeh.vue'),
      },
      { path: '/fonction', component: () => import('pages/FonctionPerso.vue') },
      {
        path: '/departement',
        component: () => import('pages/DepartementParc.vue'),
      },
      { path: '/atelier', component: () => import('pages/AtelierParc.vue') },
      {
        path: '/personnel',
        children: [
          { path: '', component: () => import('pages/PersonnelVeh.vue') },
          { path: ':id', component: () => import('pages/PersonnelProfil.vue') },
        ],
      },
      {
        path: '/utilisateur',
        children: [
          { path: '', component: () => import('pages/UtilisateurParc.vue') },
          {
            path: ':id',
            component: () => import('pages/UtilisateurDetail.vue'),
          },
        ],
      },
      { path: '/pannes', component: () => import('pages/PannesParc.vue') },
      {
        path: '/intervention',
        component: () => import('pages/InterventionParc.vue'),
      },
      {
        path: '/importDataTransport',
        component: () => import('pages/ImportDataTransport.vue'),
      },
      {
        path: '/autorisation',
        component: () => import('pages/AutorisationParc.vue'),
      },
      { path: '/menu', component: () => import('pages/MenuParc.vue') },
      { path: '/profil', component: () => import('pages/ProfilParc.vue') },
      {
        path: '/TransportCannes',
        component: () => import('pages/TransportCannes.vue'),
      },
      {
        path: '/activiteHoraire',
        component: () => import('pages/ActiviteHoraire.vue'),
      },
      { path: '/horaire', component: () => import('pages/HoraireParc.vue') },
      {
        path: '/kilometrage',
        component: () => import('pages/KilometrageParc.vue'),
      },
      { path: '/fichepanne', component: () => import('pages/FichePanne.vue') },
      {
        path: '/typeDocuments',
        component: () => import('pages/TypeDocuments.vue'),
      },
      {
        path: '/consommation',
        component: () => import('pages/ConsoVeh.vue'),
      },
      {
        path: '/rapcons',
        component: () => import('pages/RapConso.vue'),
      },
      {
        path: '/grapheconso',
        component: () => import('pages/GraphConso.vue'),
      },
      {
        path: '/impact',
        component: () => import('pages/ImportActivite.vue'),
      },
      {
        path: '/rapinterv',
        component: () => import('pages/RapIntervention.vue'),
      },
      {
        path: '/raphoraire',
        component: () => import('pages/RapHoraire.vue'),
      },
      {
        path: '/impKilo',
        component: () => import('pages/ImportEvenement.vue'),
      },
      {
        path: '/rapeff',
        component: () => import('pages/RapEfficience.vue'),
      },
      {
        path: '/tonnage',
        component: () => import('pages/TonnageEngin.vue'),
      },
      {
        path: '/pneumatique',
        component: () => import('pages/PneumatiqueParc.vue'),
      },
      {
        path: '/lubrifiants',
        component: () => import('pages/LubrifiantParc.vue'),
      },
      {
        path: '/bonNonLivre',
        component: () => import('pages/BonNonLivre.vue'),
      },
      {
        path: '/histoIntervention',
        component: () => import('pages/InterventionParc.vue'),
      },
      {
        path: '/entretien',
        component: () => import('pages/EntretienParc.vue'),
      },
      {
        path: '/grapheactivite',
        component: () => import('pages/GrapheHoraire.vue'),
      },
      {
        path: '/graphefrequence',
        component: () => import('pages/GrapheIntervention.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
