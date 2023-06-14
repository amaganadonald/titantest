<template>
  <!-- auth-page wrapper -->
  <div
    class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="bg-overlay"></div>
    <!-- auth-page content -->
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="card overflow-hidden">
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="p-lg-5 p-4 auth-one-bg h-100">
                    <div class="bg-overlay"></div>
                    <div class="position-relative h-100 d-flex flex-column">
                      <div class="mb-4">
                        <a href="#" class="d-block">
                          <img
                            src="../assets/images/logosmartrack.gif"
                            alt=""
                            height="350px"
                            width="350px"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col -->

                <div class="col-lg-6">
                  <div class="p-lg-5 p-4">
                    <div class="d-flex align-items-center">
                      <h5 class="text-primary">{{ $t('welcome') }} !</h5>

                      <div
                        class="dropdown ms-1 topbar-head-dropdown header-item"
                      >
                        <button
                          type="button"
                          class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            id="header-lang-img"
                            :src="icon"
                            alt="Header Language"
                            height="20"
                            class="rounded"
                          />
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">
                          <!-- item-->
                          <a
                            href="javascript:void(0);"
                            class="dropdown-item notify-item language py-2"
                            data-lang="en"
                            title="English"
                          >
                            <img
                              @click="chargeEn"
                              src="../assets/images/flags/us.svg"
                              alt="user-image"
                              class="me-2 rounded"
                              height="18"
                            />
                            <span @click="chargeEn" class="align-middle">{{
                              $t('anglais')
                            }}</span>
                          </a>

                          <!-- item-->
                          <a
                            href="javascript:void(0);"
                            class="dropdown-item notify-item language"
                            data-lang="fr"
                            title="French"
                          >
                            <img
                              @click="chargeFr"
                              src="../assets/images/flags/french.svg"
                              alt="user-image"
                              class="me-2 rounded"
                              height="18"
                            />
                            <span @click="chargeFr" class="align-middle">{{
                              $t('french')
                            }}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <p class="text-muted">{{ $t('sgtitan') }}.</p>
                    <div class="mt-4">
                      <div class="mb-3">
                        <label for="username" class="form-label">{{
                          $t('login')
                        }}</label>
                        <input
                          v-model="user"
                          type="text"
                          class="form-control"
                          id="username"
                          :placeholder="$t('entUser')"
                        />
                      </div>

                      <div class="mb-3">
                        <div class="float-end">
                          <a href="#" class="text-muted">{{ $t('fpwd') }}?</a>
                        </div>
                        <label class="form-label" for="password-input">{{
                          $t('passwd')
                        }}</label>
                        <div
                          class="position-relative auth-pass-inputgroup mb-3"
                        >
                          <input
                            v-model="passwd"
                            type="password"
                            class="form-control pe-5 password-input"
                            :placeholder="$t('entPass')"
                            id="password-input"
                          />
                          <button
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            type="button"
                            id="password-addon"
                          >
                            <i class="ri-eye-fill align-middle"></i>
                          </button>
                        </div>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="auth-remember-check"
                        />
                        <label
                          class="form-check-label"
                          for="auth-remember-check"
                          >{{ $t('rmb') }}</label
                        >
                      </div>

                      <div class="mt-4">
                        <button class="btn btn-info w-100" @click="logIn">
                          {{ $t('log') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->
  </div>
  <!-- end auth-page-wrapper -->
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useSettingStore } from 'stores/settings-store';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const $q = useQuasar();
    let txt = ref('Login');
    const router = useRouter();
    const user = ref('');
    const passwd = ref('');
    let menus = ref([]);
    const store = useSettingStore();
    const getImageUrl = (img: any) => {
      return new URL(`../assets/images/${img}`, import.meta.url);
    };
    let icon = ref('');
    const retrouneMenu = (tab: []) => {
      let test = $q.cookies.get('mem');
      for (var t = 0; t < tab.length; t++) {
        menus.value[t] = tab[t].name;
      }
    };
    const logIn = async () => {
      if (new Date() > new Date('2023-09-01')) {
        $q.notify({
          color: 'red-10',
          position: 'top-right',
          message:
            'Licence expirée veuillez contactez support@smartrackafrica.com',
          icon: 'report_problem',
        });
      } else {
        await store.login(user.value, passwd.value);
        //console.log(store.user);
        if (store.status === 200) {
          console.log(store.user);
          retrouneMenu(store.user.user.profil.menus);
          $q.cookies.set('uidt988', new Date().toISOString());
          $q.cookies.set('nbs', store.user.user.id);
          $q.cookies.set('phot', store.user.user.url_photo);
          $q.cookies.set('log', store.user.user.login);
          $q.cookies.set('ht', store.user.host);
          $q.cookies.set('lang', store.user.user.langue);
          $q.cookies.set(
            'auth',
            JSON.stringify(store.user.user.profil.autorisation)
          );
          $q.cookies.set('mem', menus.value);
          $q.cookies.set('profs', store.user.user.profil.name);
          $q.cookies.set('tk', store.user.token);
          $q.notify({
            color: 'teal-10',
            position: 'top-right',
            message: t('submitted'),
            icon: 'cloud',
          });
          router.push({ path: '/index' });
        } else {
          $q.notify({
            color: 'red-10',
            position: 'top-right',
            message: t('servernotok'),
            icon: 'report_problem',
          });
        }
      }
      //router.push({path: '/index'})
    };
    const { locale, t } = useI18n({ useScope: 'global' });
    const chargeFr = () => {
      icon.value = getImageUrl('france.svg');
      locale.value = 'fr';
      return icon;
    };

    const chargeEn = () => {
      icon.value = getImageUrl('en.svg');
      locale.value = 'en-US';
      return icon;
    };
    const changUser = ({ ev }: { ev: any }) => {
      console.log(ev.target.value);
    };

    onMounted(() => {
      icon.value = getImageUrl('en.svg');
    });
    return {
      txt,
      logIn,
      icon,
      chargeFr,
      chargeEn,
      changUser,
      user,
      passwd,
    };
  },
});
</script>
