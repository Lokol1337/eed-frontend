<template>
  <div>
    <!-- <form @submit.prevent="submitLogin">
      <input type="text" placeholder="login" v-model="email">
      <input type="text" placeholder="password" v-model="password">
      <button type="submit"></button>
    </form> -->
    <div class="auth-wrapper">
      <div class="auth-content">
        <div class="auth-bg"> 
          <span class="r"></span> 
          <span class="r s"></span> 
          <span class="r s"></span> 
          <span class="r"></span> 
        </div>
        <div class="card">
          <div class="card-body text-center">
            <h3 style="margin-bottom: 2rem!important;">Авторизация</h3> 

            <form method="post" action="#/main" id="loginForm"> 
              <div class="input-group mb-3"> 
                <input class="form-control" id="username" placeholder="Username or eMail" type="text" name="username" value="test" v-model="username"> 
              </div>
              <div class="input-group mb-4"> 
                <input class="form-control" id="password" placeholder="Password" type="password" name="password" value="pass" v-model="password"> 
              </div > 
              <div class="my-4"><span class="my-2" id="loginError" style="color: red;"></span></div>
              <button type="button" @click="submitLogin" name="login" class="btn btn-primary shadow-2">Войти</button>

            </form>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/auth.js';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    // async submitLogin() {
    //   try {
    //     if(!this.email) 
    //       this.errors.push("EMAIL required.")
    //     if(!this.password) 
    //       this.errors.push("PASSWORD required.")
    //     const data = await login(this.email, this.password);
    //     this.email = null;
    //     this.password = null;
    //     console.log(data);
    //   } 
    //   catch (error) {
    //     console.log(error);
    //   }
    // }
    async submitLogin(){
      const data = await login(this.username, this.password);
      if(!data){
        document.getElementById('loginError').innerHTML = "Не верный логин или пароль.";
      }
      else{
        window.location.href = '#/main';
      }
    }
  }
}
</script>

<style>
.custom-select,
.form-control {
  background: #f4f7fa !important;
  padding: 10px 20px !important;
  font-size: 14px !important;
}
.custom-select:focus,
.form-control:focus {
  background: #f4f7fa;
}
.custom-select::-moz-placeholder,
.form-control::-moz-placeholder {
  color: #aaaeb3;
  opacity: 1;
}
.custom-select:-ms-input-placeholder,
.form-control:-ms-input-placeholder {
  color: #aaaeb3;
}
.custom-select::-webkit-input-placeholder,
.form-control::-webkit-input-placeholder {
  color: #aaaeb3;
}

/* input group start */
.input-group {
  background: #f4f7fa;
}
.input-group .input-group-text {
  padding-left: 15px;
  padding-right: 15px;
  background: transparent;
}
.input-group .input-group-text i {
  font-size: 20px;
}
.input-group .custom-file-label {
  margin-bottom: 0;
}
.input-group .btn {
  margin-bottom: 0;
  margin-right: 0;
}

.cust-file-button .custom-file-label {
  height: calc(2.25rem + 8px);
  line-height: 2.5;
}
.cust-file-button .custom-file-label::after {
  padding: 0.775rem 0.75rem;
  height: 2.65rem;
}

.custom-select {
  height: calc(2.25rem + 9px);
}
.auth-wrapper {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  overflow: hidden;
  min-width: 100%;
  min-height: 100vh;
}
.auth-wrapper a,
.auth-wrapper p > a {
  color: #111;
  font-weight: 600;
}
.auth-wrapper .btn-auth-gen .btn-icon {
  width: 140px;
  height: 140px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  font-size: 45px;
}
.auth-wrapper .btn-auth-gen .btn-icon small {
  font-size: 15px;
}
.auth-wrapper .input-group {
  background: transparent;
}
.auth-wrapper .card {
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  margin-bottom: 0;
  border:0;
  padding: 2rem 2rem 4rem 2rem;
}
.auth-wrapper > div {
  z-index: 5;
}
.auth-wrapper .auth-content {
  border: 0;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  border-radius: 0.25rem;
  position: relative;
  width: 390px;
  padding: 15px;
  z-index: 5;
}
.auth-wrapper .auth-content.multyform, .auth-wrapper .auth-content.subscribe {
  width: 750px;
}
@media only screen and (max-width: 768px) {
  .auth-wrapper {
    max-width: 360px;
  }
}
@media only screen and (max-width: 575px) {
  .auth-wrapper .card .card-body {
    padding: 30px 15px;
  }
}
.auth-wrapper .auth-icon {
  font-size: 30px;
}
.auth-wrapper .auth-icon:before {
  background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.auth-wrapper.offline {
  background-image: none;
}
.auth-wrapper.offline:before {
  display: none;
}
.auth-wrapper .auth-bg .r {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
.auth-wrapper .auth-bg .r:first-child {
  top: -100px;
  right: -100px;
  background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
}
.auth-wrapper .auth-bg .r:last-child {
  left: -100px;
  bottom: -100px;
  background: linear-gradient(-135deg, #899FD4 0%, #A389D4 100%);
}
.auth-wrapper .auth-bg .r.s {
  width: 20px;
  height: 20px;
}
.auth-wrapper .auth-bg .r.s:nth-child(2) {
  top: 150px;
  right: -150px;
  background: #04a9f5;
}
.auth-wrapper .auth-bg .r.s:nth-child(3) {
  left: -150px;
  bottom: 150px;
  background: #1de9b6;
}
.auth-wrapper .auth-bg .r:nth-child(odd) {
  -webkit-animation: floating 7s infinite;
          animation: floating 7s infinite;
}
.auth-wrapper .auth-bg .r:nth-child(even) {
  -webkit-animation: floating 9s infinite;
          animation: floating 9s infinite;
}

/* image varient start */
.aut-bg-img {
  /* background-image: url("../images/bg-images/bg4.jpg"); */
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.aut-bg-img-side p {
  line-height: 2;
}

.aut-bg-img .custom-select, .aut-bg-img .form-control,
.aut-bg-img-side .custom-select,
.aut-bg-img-side .form-control {
  background: transparent;
}

.auth-tabs .tab-content {
  overflow: hidden;
  position: relative;
}
.auth-tabs .tab-content .auth-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 150px;
  -webkit-transform: rotate(-30deg);
          transform: rotate(-30deg);
}

/* image varient start */
@-webkit-keyframes floating {
  from {
    -webkit-transform: rotate(0deg) translate(-10px) rotate(0deg);
            transform: rotate(0deg) translate(-10px) rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg) translate(-10px) rotate(-360deg);
            transform: rotate(360deg) translate(-10px) rotate(-360deg);
  }
}
@keyframes floating {
  from {
    -webkit-transform: rotate(0deg) translate(-10px) rotate(0deg);
            transform: rotate(0deg) translate(-10px) rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg) translate(-10px) rotate(-360deg);
            transform: rotate(360deg) translate(-10px) rotate(-360deg);
  }
}
/**====== Authentication css end ======**/
/* Button variants
 Easily pump out default styles, as well as :hover, :focus, :active,
 and disabled options for all buttons */
/**  =====================
      Button css start
==========================  **/
.btn-theme,
a.btn-theme {
  background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
  color: #fff;
  -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  border-color: #1de1c2;
  border-radius: 0.25rem;
  padding: 11px 25px;
}
.btn-theme:active, .btn-theme:focus, .btn-theme:not(:disabled):not(.disabled):active,
a.btn-theme:active,
a.btn-theme:focus,
a.btn-theme:not(:disabled):not(.disabled):active {
  background-image: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
  color: #fff;
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn-theme.active,
a.btn-theme.active {
  background-image: #fff !important;
  color: #d6d6d6;
  border: 1px solid #eaeaea;
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-outline-theme {
  background-image: #fff !important;
  color: #d6d6d6;
  border: 1px solid #eaeaea;
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn-outline-theme:active, .btn-outline-theme:focus, .btn-outline-theme:not(:disabled):not(.disabled):active {
  background-image: #fff;
  color: #d6d6d6;
  border: 1px solid #eaeaea;
}
.btn-outline-theme.active {
  background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%) !important;
  color: #fff;
  -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
}

.btn-theme2 {
  background: linear-gradient(-135deg, #899FD4 0%, #A389D4 100%);
  color: #fff;
  -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 14px 25px;
}
.btn-theme2:active, .btn-theme2:focus, .btn-theme2:not(:disabled):not(.disabled):active {
  background-image: linear-gradient(-135deg, #899FD4 0%, #A389D4 100%);
  color: #fff;
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn-theme2.active {
  background-image: #fff !important;
  color: #d6d6d6;
  border: 1px solid #eaeaea;
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-outline-theme2 {
  background-image: #fff !important;
  color: #d6d6d6;
  border: 1px solid #eaeaea;
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn-outline-theme2:active, .btn-outline-theme2:focus, .btn-outline-theme2:not(:disabled):not(.disabled):active {
  background-image: #fff;
  color: #d6d6d6;
  border: 1px solid #eaeaea;
}
.btn-outline-theme2.active {
  background: linear-gradient(-135deg, #899FD4 0%, #A389D4 100%) !important;
  color: #fff;
  -webkit-box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
}

.btn {
  padding: 10px 20px;
  border-radius: 0.25rem;
  font-size: 14px;
  margin-bottom: 5px;
  margin-right: 10px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.btn > i {
  margin-right: 12px;
}
.btn.btn-icon, .btn.drp-icon {
  width: 45px;
  height: 45px;
  padding: 10px 12px;
}
.btn.btn-icon > i, .btn.drp-icon > i {
  margin-right: 0;
}
.btn.drp-icon.dropdown-toggle:after {
  display: none;
}
.btn.drp-icon + .dropdown-menu {
  margin-left: -10px;
}
.btn:active, .btn:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn-square {
  border-radius: 0;
}
.btn.disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
.btn-rounded {
  border-radius: 30px;
}

.btn-group .btn {
  margin-bottom: 0;
  margin-right: 0;
}

.shadow-1 {
  -webkit-box-shadow: 0 7px 12px 0 rgba(62, 57, 107, 0.16);
          box-shadow: 0 7px 12px 0 rgba(62, 57, 107, 0.16);
}

.shadow-2 {
  -webkit-box-shadow: 0 10px 18px 0 rgba(62, 57, 107, 0.2);
          box-shadow: 0 10px 18px 0 rgba(62, 57, 107, 0.2);
}

.shadow-3 {
  -webkit-box-shadow: 0 14px 24px 0 rgba(62, 57, 107, 0.26);
          box-shadow: 0 14px 24px 0 rgba(62, 57, 107, 0.26);
}

.shadow-4 {
  -webkit-box-shadow: 0 16px 28px 0 rgba(62, 57, 107, 0.3);
          box-shadow: 0 16px 28px 0 rgba(62, 57, 107, 0.3);
}

.shadow-5 {
  -webkit-box-shadow: 0 20px 24px 0 rgba(62, 57, 107, 0.36);
          box-shadow: 0 20px 24px 0 rgba(62, 57, 107, 0.36);
}


/* Alternate buttons */
.btn-primary {
  color: #fff;
  background-color: #04a9f5 !important;
  border-color: #04a9f5 !important;
  padding: 0.5rem 1.2rem 0.5rem 1.2rem !important;
}
.btn-primary:hover {
  color: #fff;
  background-color: #038fcf;
  border-color: #0386c3;
}
.btn-primary.disabled, .btn-primary:disabled {
  color: #fff;
  background-color: #04a9f5;
  border-color: #04a9f5;
}
.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #0386c3;
  border-color: #037eb6;
}

.btn-secondary {
  color: #fff;
  background-color: #748892;
  border-color: #748892;
}
.btn-secondary:hover {
  color: #fff;
  background-color: #62747d;
  border-color: #5d6e76;
}
.btn-secondary.disabled, .btn-secondary:disabled {
  color: #fff;
  background-color: #748892;
  border-color: #748892;
}
.btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show > .btn-secondary.dropdown-toggle {
  color: #fff;
  background-color: #5d6e76;
  border-color: #57676f;
}

.btn-success {
  color: #fff;
  background-color: #1de9b6;
  border-color: #1de9b6;
}
.btn-success:hover {
  color: #fff;
  background-color: #14cc9e;
  border-color: #13c095;
}
.btn-success.disabled, .btn-success:disabled {
  color: #fff;
  background-color: #1de9b6;
  border-color: #1de9b6;
}
.btn-success:not(:disabled):not(.disabled).active, .btn-success:not(:disabled):not(.disabled):active, .show > .btn-success.dropdown-toggle {
  color: #fff;
  background-color: #13c095;
  border-color: #12b58c;
}

.btn-info {
  color: #fff;
  background-color: #3ebfea;
  border-color: #3ebfea;
}
.btn-info:hover {
  color: #fff;
  background-color: #1cb4e6;
  border-color: #18acdd;
}
.btn-info.disabled, .btn-info:disabled {
  color: #fff;
  background-color: #3ebfea;
  border-color: #3ebfea;
}
.btn-info:not(:disabled):not(.disabled).active, .btn-info:not(:disabled):not(.disabled):active, .show > .btn-info.dropdown-toggle {
  color: #fff;
  background-color: #18acdd;
  border-color: #17a3d1;
}

.btn-warning {
  color: #fff;
  background-color: #f4c22b;
  border-color: #f4c22b;
}
.btn-warning:hover {
  color: #fff;
  background-color: #ecb50c;
  border-color: #e0ab0c;
}
.btn-warning.disabled, .btn-warning:disabled {
  color: #fff;
  background-color: #f4c22b;
  border-color: #f4c22b;
}
.btn-warning:not(:disabled):not(.disabled).active, .btn-warning:not(:disabled):not(.disabled):active, .show > .btn-warning.dropdown-toggle {
  color: #fff;
  background-color: #e0ab0c;
  border-color: #d4a20b;
}

.btn-danger {
  color: #fff;
  background-color: #f44236;
  border-color: #f44236;
}
.btn-danger:hover {
  color: #fff;
  background-color: #f22012;
  border-color: #ea1b0d;
}
.btn-danger.disabled, .btn-danger:disabled {
  color: #fff;
  background-color: #f44236;
  border-color: #f44236;
}
.btn-danger:not(:disabled):not(.disabled).active, .btn-danger:not(:disabled):not(.disabled):active, .show > .btn-danger.dropdown-toggle {
  color: #fff;
  background-color: #ea1b0d;
  border-color: #de190c;
}

.btn-light {
  color: #37474f;
  background-color: #f2f2f2;
  border-color: #f2f2f2;
}
.btn-light:hover {
  color: #37474f;
  background-color: #dfdfdf;
  border-color: #d9d9d9;
}
.btn-light.disabled, .btn-light:disabled {
  color: #37474f;
  background-color: #f2f2f2;
  border-color: #f2f2f2;
}
.btn-light:not(:disabled):not(.disabled).active, .btn-light:not(:disabled):not(.disabled):active, .show > .btn-light.dropdown-toggle {
  color: #37474f;
  background-color: #d9d9d9;
  border-color: #d2d2d2;
}

.btn-dark {
  color: #fff;
  background-color: #37474f;
  border-color: #37474f;
}
.btn-dark:hover {
  color: #fff;
  background-color: #273338;
  border-color: #222c31;
}
.btn-dark.disabled, .btn-dark:disabled {
  color: #fff;
  background-color: #37474f;
  border-color: #37474f;
}
.btn-dark:not(:disabled):not(.disabled).active, .btn-dark:not(:disabled):not(.disabled):active, .show > .btn-dark.dropdown-toggle {
  color: #fff;
  background-color: #222c31;
  border-color: #1d2529;
}

/* outline buttons */
.btn-outline-primary {
  color: #04a9f5;
  background-color: transparent;
  background-image: none;
  border-color: #04a9f5;
}
.btn-outline-primary:hover {
  color: #fff;
  background-color: #04a9f5;
  border-color: #04a9f5;
}
.btn-outline-primary.disabled, .btn-outline-primary:disabled {
  color: #04a9f5;
  background-color: transparent;
}
.btn-outline-primary:not(:disabled):not(.disabled).active, .btn-outline-primary:not(:disabled):not(.disabled):active, .show > .btn-outline-primary.dropdown-toggle {
  color: #fff;
  background-color: #04a9f5;
  border-color: #04a9f5;
}

.btn-outline-secondary {
  color: #748892;
  background-color: transparent;
  background-image: none;
  border-color: #748892;
}
.btn-outline-secondary:hover {
  color: #fff;
  background-color: #748892;
  border-color: #748892;
}
.btn-outline-secondary.disabled, .btn-outline-secondary:disabled {
  color: #748892;
  background-color: transparent;
}
.btn-outline-secondary:not(:disabled):not(.disabled).active, .btn-outline-secondary:not(:disabled):not(.disabled):active, .show > .btn-outline-secondary.dropdown-toggle {
  color: #fff;
  background-color: #748892;
  border-color: #748892;
}

.btn-outline-success {
  color: #1de9b6;
  background-color: transparent;
  background-image: none;
  border-color: #1de9b6;
}
.btn-outline-success:hover {
  color: #fff;
  background-color: #1de9b6;
  border-color: #1de9b6;
}
.btn-outline-success.disabled, .btn-outline-success:disabled {
  color: #1de9b6;
  background-color: transparent;
}
.btn-outline-success:not(:disabled):not(.disabled).active, .btn-outline-success:not(:disabled):not(.disabled):active, .show > .btn-outline-success.dropdown-toggle {
  color: #fff;
  background-color: #1de9b6;
  border-color: #1de9b6;
}

.btn-outline-info {
  color: #3ebfea;
  background-color: transparent;
  background-image: none;
  border-color: #3ebfea;
}
.btn-outline-info:hover {
  color: #fff;
  background-color: #3ebfea;
  border-color: #3ebfea;
}
.btn-outline-info.disabled, .btn-outline-info:disabled {
  color: #3ebfea;
  background-color: transparent;
}
.btn-outline-info:not(:disabled):not(.disabled).active, .btn-outline-info:not(:disabled):not(.disabled):active, .show > .btn-outline-info.dropdown-toggle {
  color: #fff;
  background-color: #3ebfea;
  border-color: #3ebfea;
}

.btn-outline-warning {
  color: #f4c22b;
  background-color: transparent;
  background-image: none;
  border-color: #f4c22b;
}
.btn-outline-warning:hover {
  color: #fff;
  background-color: #f4c22b;
  border-color: #f4c22b;
}
.btn-outline-warning.disabled, .btn-outline-warning:disabled {
  color: #f4c22b;
  background-color: transparent;
}
.btn-outline-warning:not(:disabled):not(.disabled).active, .btn-outline-warning:not(:disabled):not(.disabled):active, .show > .btn-outline-warning.dropdown-toggle {
  color: #fff;
  background-color: #f4c22b;
  border-color: #f4c22b;
}

.btn-outline-danger {
  color: #f44236;
  background-color: transparent;
  background-image: none;
  border-color: #f44236;
}
.btn-outline-danger:hover {
  color: #fff;
  background-color: #f44236;
  border-color: #f44236;
}
.btn-outline-danger.disabled, .btn-outline-danger:disabled {
  color: #f44236;
  background-color: transparent;
}
.btn-outline-danger:not(:disabled):not(.disabled).active, .btn-outline-danger:not(:disabled):not(.disabled):active, .show > .btn-outline-danger.dropdown-toggle {
  color: #fff;
  background-color: #f44236;
  border-color: #f44236;
}

.btn-outline-light {
  color: #f2f2f2;
  background-color: transparent;
  background-image: none;
  border-color: #f2f2f2;
}
.btn-outline-light:hover {
  color: #37474f;
  background-color: #f2f2f2;
  border-color: #f2f2f2;
}
.btn-outline-light.disabled, .btn-outline-light:disabled {
  color: #f2f2f2;
  background-color: transparent;
}
.btn-outline-light:not(:disabled):not(.disabled).active, .btn-outline-light:not(:disabled):not(.disabled):active, .show > .btn-outline-light.dropdown-toggle {
  color: #37474f;
  background-color: #f2f2f2;
  border-color: #f2f2f2;
}

.btn-outline-dark {
  color: #37474f;
  background-color: transparent;
  background-image: none;
  border-color: #37474f;
}
.btn-outline-dark:hover {
  color: #fff;
  background-color: #37474f;
  border-color: #37474f;
}
.btn-outline-dark.disabled, .btn-outline-dark:disabled {
  color: #37474f;
  background-color: transparent;
}
.btn-outline-dark:not(:disabled):not(.disabled).active, .btn-outline-dark:not(:disabled):not(.disabled):active, .show > .btn-outline-dark.dropdown-toggle {
  color: #fff;
  background-color: #37474f;
  border-color: #37474f;
}

/* glow buttons */
.btn-glow-primary {
  -webkit-box-shadow: 0 1px 6px 2px rgba(4, 169, 245, 0.56), 0 6px 11px 2px rgba(4, 169, 245, 0.2);
          box-shadow: 0 1px 6px 2px rgba(4, 169, 245, 0.56), 0 6px 11px 2px rgba(4, 169, 245, 0.2);
}
.btn-glow-primary:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(4, 169, 245, 0.56), 0 4px 9px 2px rgba(4, 169, 245, 0.1);
          box-shadow: 0 1px 4px 2px rgba(4, 169, 245, 0.56), 0 4px 9px 2px rgba(4, 169, 245, 0.1);
}
.btn-glow-primary:not(:disabled):not(.disabled).active, .btn-glow-primary:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-primary.dropdown-toggle, .btn-glow-primary.active, .btn-glow-primary:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-glow-secondary {
  -webkit-box-shadow: 0 1px 6px 2px rgba(116, 136, 146, 0.56), 0 6px 11px 2px rgba(116, 136, 146, 0.2);
          box-shadow: 0 1px 6px 2px rgba(116, 136, 146, 0.56), 0 6px 11px 2px rgba(116, 136, 146, 0.2);
}
.btn-glow-secondary:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(116, 136, 146, 0.56), 0 4px 9px 2px rgba(116, 136, 146, 0.1);
          box-shadow: 0 1px 4px 2px rgba(116, 136, 146, 0.56), 0 4px 9px 2px rgba(116, 136, 146, 0.1);
}
.btn-glow-secondary:not(:disabled):not(.disabled).active, .btn-glow-secondary:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-secondary.dropdown-toggle, .btn-glow-secondary.active, .btn-glow-secondary:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-glow-success {
  -webkit-box-shadow: 0 1px 6px 2px rgba(29, 233, 182, 0.56), 0 6px 11px 2px rgba(29, 233, 182, 0.2);
          box-shadow: 0 1px 6px 2px rgba(29, 233, 182, 0.56), 0 6px 11px 2px rgba(29, 233, 182, 0.2);
}
.btn-glow-success:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(29, 233, 182, 0.56), 0 4px 9px 2px rgba(29, 233, 182, 0.1);
          box-shadow: 0 1px 4px 2px rgba(29, 233, 182, 0.56), 0 4px 9px 2px rgba(29, 233, 182, 0.1);
}
.btn-glow-success:not(:disabled):not(.disabled).active, .btn-glow-success:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-success.dropdown-toggle, .btn-glow-success.active, .btn-glow-success:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-glow-info {
  -webkit-box-shadow: 0 1px 6px 2px rgba(62, 191, 234, 0.56), 0 6px 11px 2px rgba(62, 191, 234, 0.2);
          box-shadow: 0 1px 6px 2px rgba(62, 191, 234, 0.56), 0 6px 11px 2px rgba(62, 191, 234, 0.2);
}
.btn-glow-info:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(62, 191, 234, 0.56), 0 4px 9px 2px rgba(62, 191, 234, 0.1);
          box-shadow: 0 1px 4px 2px rgba(62, 191, 234, 0.56), 0 4px 9px 2px rgba(62, 191, 234, 0.1);
}
.btn-glow-info:not(:disabled):not(.disabled).active, .btn-glow-info:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-info.dropdown-toggle, .btn-glow-info.active, .btn-glow-info:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-glow-warning {
  -webkit-box-shadow: 0 1px 6px 2px rgba(244, 194, 43, 0.56), 0 6px 11px 2px rgba(244, 194, 43, 0.2);
          box-shadow: 0 1px 6px 2px rgba(244, 194, 43, 0.56), 0 6px 11px 2px rgba(244, 194, 43, 0.2);
}
.btn-glow-warning:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(244, 194, 43, 0.56), 0 4px 9px 2px rgba(244, 194, 43, 0.1);
          box-shadow: 0 1px 4px 2px rgba(244, 194, 43, 0.56), 0 4px 9px 2px rgba(244, 194, 43, 0.1);
}
.btn-glow-warning:not(:disabled):not(.disabled).active, .btn-glow-warning:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-warning.dropdown-toggle, .btn-glow-warning.active, .btn-glow-warning:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-glow-danger {
  -webkit-box-shadow: 0 1px 6px 2px rgba(244, 66, 54, 0.56), 0 6px 11px 2px rgba(244, 66, 54, 0.2);
          box-shadow: 0 1px 6px 2px rgba(244, 66, 54, 0.56), 0 6px 11px 2px rgba(244, 66, 54, 0.2);
}
.btn-glow-danger:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(244, 66, 54, 0.56), 0 4px 9px 2px rgba(244, 66, 54, 0.1);
          box-shadow: 0 1px 4px 2px rgba(244, 66, 54, 0.56), 0 4px 9px 2px rgba(244, 66, 54, 0.1);
}
.btn-glow-danger:not(:disabled):not(.disabled).active, .btn-glow-danger:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-danger.dropdown-toggle, .btn-glow-danger.active, .btn-glow-danger:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-glow-light {
  -webkit-box-shadow: 0 1px 6px 2px rgba(242, 242, 242, 0.56), 0 6px 11px 2px rgba(242, 242, 242, 0.2);
          box-shadow: 0 1px 6px 2px rgba(242, 242, 242, 0.56), 0 6px 11px 2px rgba(242, 242, 242, 0.2);
}
.btn-glow-light:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(242, 242, 242, 0.56), 0 4px 9px 2px rgba(242, 242, 242, 0.1);
          box-shadow: 0 1px 4px 2px rgba(242, 242, 242, 0.56), 0 4px 9px 2px rgba(242, 242, 242, 0.1);
}
.btn-glow-light:not(:disabled):not(.disabled).active, .btn-glow-light:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-light.dropdown-toggle, .btn-glow-light.active, .btn-glow-light:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

.btn-glow-dark {
  -webkit-box-shadow: 0 1px 6px 2px rgba(55, 71, 79, 0.56), 0 6px 11px 2px rgba(55, 71, 79, 0.2);
          box-shadow: 0 1px 6px 2px rgba(55, 71, 79, 0.56), 0 6px 11px 2px rgba(55, 71, 79, 0.2);
}
.btn-glow-dark:hover {
  -webkit-box-shadow: 0 1px 4px 2px rgba(55, 71, 79, 0.56), 0 4px 9px 2px rgba(55, 71, 79, 0.1);
          box-shadow: 0 1px 4px 2px rgba(55, 71, 79, 0.56), 0 4px 9px 2px rgba(55, 71, 79, 0.1);
}
.btn-glow-dark:not(:disabled):not(.disabled).active, .btn-glow-dark:not(:disabled):not(.disabled):active:focus, .show > .btn-glow-dark.dropdown-toggle, .btn-glow-dark.active, .btn-glow-dark:focus {
  -webkit-box-shadow: none;
          box-shadow: none;
}

/**====== Button css end ======**/
.swal-footer {
  text-align: center;
}
</style>