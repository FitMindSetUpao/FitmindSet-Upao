import{a as se,b as le,c as de,d as pe,e as ge,f as z}from"./chunk-FKCU43UE.js";import{a as oe}from"./chunk-PLJFAOWE.js";import{Q as ce,R as S,S as y,V as F,W as B,Y as R,Z as k,_ as M,aa as h,d as b,f as s,g as x,h as O,i as re,j as ie,k as D,m as v,n as ae,o as me,p as I,q as T,s as N,t as G,u as w,v as E,va as q,wa as H,xa as ue,ya as fe}from"./chunk-SZT7QEYE.js";import{h as ne,j as _,k as U,o as P}from"./chunk-TX6KT6VV.js";import"./chunk-EJJBCPAK.js";import{Ab as e,Bb as p,Fc as A,Ib as f,Ub as n,Wa as m,Xa as te,ac as C,ca as l,ga as u,mb as d,qb as c,vb as g,zb as t}from"./chunk-QKAMGFO4.js";function Ce(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}function _e(r,o){r&1&&(t(0,"mat-error"),n(1,"Introduzca un correo electr\xF3nico v\xE1lido."),e())}function Me(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}var V=class r{loginForm;fb=l(G);router=l(_);snackBar=l(q);authService=l(P);CUSTOMER_ROLE="CUSTOMER";AUTHOR_ROLE="AUTHOR";CUSTOMER_ROUTE="/customer";AUTHOR_ROUTE="autor/recursos/list";DEFAULT_ROUTE="/home";constructor(){this.loginForm=this.fb.group({correo:["",[s.required,s.email]],contrasena:["",[s.required]]})}controlHasError(o,a){return this.loginForm.controls[o].hasError(a)}onSubmit(){if(this.loginForm.invalid)return;let o=this.loginForm.value;this.authService.login(o).subscribe({next:()=>{this.showSnackBar("Inicio de sesi\xF3n exitoso"),this.redirectUserBasedOnRole()},error:()=>{this.showSnackBar("Error en el inicio de sesi\xF3n. Por favor, intenta de nuevo.")}})}redirectUserBasedOnRole(){let o=this.authService.getUserRole();o===this.CUSTOMER_ROLE?this.router.navigate([this.CUSTOMER_ROUTE]):o===this.AUTHOR_ROLE?this.router.navigate([this.AUTHOR_ROUTE]):this.router.navigate([this.DEFAULT_ROUTE])}showSnackBar(o){this.snackBar.open(o,"Close",{duration:2e3,verticalPosition:"top"})}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=u({type:r,selectors:[["app-login"]],standalone:!0,features:[C],decls:35,vars:5,consts:[[1,"login-container"],[1,"login-card"],[1,"login-image"],[1,"image-overlay-text"],[1,"descripcion-login"],[1,"login-form"],[3,"ngSubmit","formGroup"],[1,"form-field"],["matInput","","formControlName","correo","type","email","placeholder","Ingrese su correo"],["matInput","","formControlName","contrasena","type","password","placeholder","Ingrese su contrase\xF1a"],["mat-raised-button","","color","primary","type","submit",1,"submit-button",3,"disabled"],["id","g_id_onload","data-client_id","103907640675-a221os4sftc1gm54a4qfqm3hm0fui7ic.apps.googleusercontent.com","data-callback","handleCredentialResponse"],["data-type","standard",1,"g_id_signin"],["routerLink","/auth/register"],["routerLink","/auth/password-recovery"]],template:function(a,i){a&1&&(t(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h2"),n(5,"Bienvenido a FitMindSet"),e(),t(6,"p",4),n(7,"Inicia sesi\xF3n para continuar"),e()()(),t(8,"div",5)(9,"h2"),n(10,"Iniciar Sesi\xF3n"),e(),t(11,"form",6),f("ngSubmit",function(){return i.onSubmit()}),t(12,"mat-form-field",7)(13,"mat-label"),n(14,"Correo"),e(),p(15,"input",8),d(16,Ce,2,0,"mat-error")(17,_e,2,0,"mat-error"),e(),t(18,"mat-form-field",7)(19,"mat-label"),n(20,"Contrase\xF1a"),e(),p(21,"input",9),d(22,Me,2,0,"mat-error"),e(),t(23,"button",10),n(24," Iniciar Sesi\xF3n "),e(),p(25,"div",11)(26,"div",12),e(),t(27,"p"),n(28,"\xBFNo tienes cuenta? "),t(29,"a",13),n(30,"Reg\xEDstrate aqu\xED"),e()(),t(31,"p"),n(32,"Olvidaste tu constrase\xF1a "),t(33,"a",14),n(34,"Recuperar Contrase\xF1a"),e()()()()()),a&2&&(m(11),c("formGroup",i.loginForm),m(5),g(i.controlHasError("correo","required")?16:-1),m(),g(i.controlHasError("correo","email")?17:-1),m(5),g(i.controlHasError("contrasena","required")?22:-1),m(),c("disabled",i.loginForm.invalid))},dependencies:[w,v,b,x,O,E,I,T,k,R,F,S,y,z,H,h,M,U],styles:['@charset "UTF-8";body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{height:100%;margin:0;font-family:Arial,sans-serif;background-color:#fff}.login-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;padding:20px;box-sizing:border-box}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]{width:85%;max-width:1000px;display:flex;flex-direction:row;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px #34bd3f1a}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-image[_ngcontent-%COMP%]{width:45%;background-color:#05ff0d;position:relative;display:flex;align-items:center;justify-content:center}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;height:auto}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-image[_ngcontent-%COMP%]   .image-overlay-text[_ngcontent-%COMP%]{position:absolute;color:#fff;text-align:center;z-index:1}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-image[_ngcontent-%COMP%]   .image-overlay-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.8rem;margin-bottom:5px}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-image[_ngcontent-%COMP%]   .image-overlay-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;margin:0}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-image[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;background:#00000080;z-index:0}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{width:55%;padding:40px 30px;background-color:#fff}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#4caf50;font-weight:700;text-align:center;margin-bottom:20px;font-size:2rem}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]{border:1px solid #525252;border-radius:20px;padding:10px;width:100%;box-sizing:border-box;margin-bottom:15px}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]:focus{outline:none;border-color:#4caf50;box-shadow:0 0 5px #1abc9c80}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]{background-color:#4caf50!important;color:#fff!important;border:none;border-radius:8px;padding:12px;width:100%;font-weight:700;font-size:1.2rem;box-shadow:0 4px 10px #0003;transition:background-color .3s ease,box-shadow .3s ease}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]:hover{background-color:#5ba873!important}.login-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#7f8c8d;text-align:center}.login-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#158467;text-decoration:none}.login-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.login-container[_ngcontent-%COMP%]   app-footer[_ngcontent-%COMP%]{background-color:#343a40;color:#fff;text-align:center;padding:10px;width:100%;position:fixed;bottom:0;left:0}@media (max-width: 992px){.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]{flex-direction:column;width:90%;max-width:600px}.login-container[_ngcontent-%COMP%]   .login-image[_ngcontent-%COMP%]{width:100%;height:200px}.login-container[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{width:100%;padding:20px}.login-container[_ngcontent-%COMP%]   .g_id_signin[_ngcontent-%COMP%]{width:100%}}.g_id_signin[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:center}.g_id_signin[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#4285f4;color:#fff;border:none;border-radius:8px;padding:12px 20px;font-size:1rem;font-weight:700;cursor:pointer;transition:background-color .3s ease}.g_id_signin[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#357ae8}.descripcion-login[_ngcontent-%COMP%]{color:#fff!important}']})};function he(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}function Pe(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}function be(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}function xe(r,o){r&1&&(t(0,"mat-error"),n(1,"Introduzca un correo electr\xF3nico v\xE1lido"),e())}function Oe(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}function ve(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}function we(r,o){r&1&&(t(0,"mat-error"),n(1,"Este campo es obligatorio"),e())}var $=class r{registerForm;fb=l(G);router=l(_);snackBar=l(q);authService=l(P);constructor(){this.registerForm=this.fb.group({nombre:["",s.required],apellidos:["",s.required],correo:["",[s.required,s.email]],contrasena:["",s.required],edad:["",s.required],genero:["",s.required]})}controlHasError(o,a){return this.registerForm.controls[o].hasError(a)}onSubmit(){if(this.registerForm.valid){let o=this.registerForm.value;this.authService.register(o).subscribe({next:()=>{this.showSnackBar("Usuario creado correctamente"),this.router.navigate(["/auth/login"])},error:a=>{this.showSnackBar(a.error.message||"Error al crear el usuario")}})}}showSnackBar(o){this.snackBar.open(o,"Cerrar",{duration:3e3})}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=u({type:r,selectors:[["app-register"]],standalone:!0,features:[C],decls:55,vars:9,consts:[[1,"register-container"],[1,"register-card"],[1,"register-image"],[1,"register-overlay"],[1,"register-text"],[1,"register-description"],[1,"register-form"],[3,"ngSubmit","formGroup"],[1,"form-field"],["matInput","","formControlName","nombre","placeholder","Ingrese su nombre","required",""],["matInput","","formControlName","apellidos","placeholder","Ingrese sus apellidos","required",""],["matInput","","formControlName","correo","type","email","placeholder","Ingrese su correo","required",""],["matInput","","formControlName","contrasena","type","password","placeholder","Ingrese su contrase\xF1a","required",""],["matInput","","formControlName","edad","type","number","placeholder","Ingrese su edad","required",""],["formControlName","genero","required",""],["value","Masculino"],["value","Femenino"],["value","Otro"],["mat-raised-button","","color","primary","type","submit",1,"submit-button",3,"disabled"],["routerLink","/auth/login"]],template:function(a,i){a&1&&(t(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h3",4),n(5,"Bienvenido a FitMindSet"),e(),t(6,"p",5),n(7,"En FitMindSet encontraras una oportunidad que te ayudara a sobrellevar el seguimiento ha tus habitos saludables."),e()()(),t(8,"div",6)(9,"h2"),n(10,"Crear Cuenta"),e(),t(11,"form",7),f("ngSubmit",function(){return i.onSubmit()}),t(12,"mat-form-field",8)(13,"mat-label"),n(14,"Nombre"),e(),p(15,"input",9),d(16,he,2,0,"mat-error"),e(),t(17,"mat-form-field",8)(18,"mat-label"),n(19,"Apellidos"),e(),p(20,"input",10),d(21,Pe,2,0,"mat-error"),e(),t(22,"mat-form-field",8)(23,"mat-label"),n(24,"Correo"),e(),p(25,"input",11),d(26,be,2,0,"mat-error")(27,xe,2,0,"mat-error"),e(),t(28,"mat-form-field",8)(29,"mat-label"),n(30,"Contrase\xF1a"),e(),p(31,"input",12),d(32,Oe,2,0,"mat-error"),e(),t(33,"mat-form-field",8)(34,"mat-label"),n(35,"Edad"),e(),p(36,"input",13),d(37,ve,2,0,"mat-error"),e(),t(38,"mat-form-field",8)(39,"mat-label"),n(40,"G\xE9nero"),e(),t(41,"mat-select",14)(42,"mat-option",15),n(43,"Masculino"),e(),t(44,"mat-option",16),n(45,"Femenino"),e(),t(46,"mat-option",17),n(47,"Otro"),e()(),d(48,we,2,0,"mat-error"),e(),t(49,"button",18),n(50," Registrarse "),e()(),t(51,"p"),n(52,"\xBFYa tienes cuenta? "),t(53,"a",19),n(54,"Inicia sesi\xF3n aqu\xED"),e()()()()()),a&2&&(m(11),c("formGroup",i.registerForm),m(5),g(i.controlHasError("nombre","required")?16:-1),m(5),g(i.controlHasError("apellidos","required")?21:-1),m(5),g(i.controlHasError("correo","required")?26:-1),m(),g(i.controlHasError("correo","email")?27:-1),m(5),g(i.controlHasError("contrasena","required")?32:-1),m(5),g(i.controlHasError("edad","required")?37:-1),m(11),g(i.controlHasError("genero","required")?48:-1),m(),c("disabled",i.registerForm.invalid))},dependencies:[h,M,k,R,F,S,y,z,U,w,v,b,ae,x,O,N,E,I,T,H,B,fe,ue,ce],styles:['@charset "UTF-8";body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{height:100%;margin:0;font-family:Arial,sans-serif;background-color:#f4f4f4;overflow:hidden}.register-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;color:#000}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]{width:85%;max-width:1000px;display:flex;flex-direction:row;border-radius:12px;overflow:hidden;margin-bottom:20px}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-image[_ngcontent-%COMP%]{width:45%;background-color:#4caf50;position:relative;display:flex;align-items:center;justify-content:center;color:#000}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-image[_ngcontent-%COMP%]   .register-overlay[_ngcontent-%COMP%]{position:absolute;color:#000;text-align:center;padding:20px;border-radius:8px}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-image[_ngcontent-%COMP%]   .register-overlay[_ngcontent-%COMP%]   .register-text[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:700;margin-bottom:10px}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-image[_ngcontent-%COMP%]   .register-overlay[_ngcontent-%COMP%]   .register-description[_ngcontent-%COMP%]{font-size:1rem;font-weight:300;color:#000}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]{width:55%;padding:40px 30px;background-color:#fff}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#1abc9c;font-weight:700;text-align:center;margin-bottom:20px;font-size:2rem}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]{border:1px solid #ddd;border-radius:8px;padding:10px;width:100%;box-sizing:border-box;margin-bottom:15px}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%]:focus{outline:none;border-color:#1abc9c;box-shadow:0 0 5px #1abc9c80}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]{background-color:#1abc9c!important;color:#fff!important;border:none;border-radius:8px;padding:12px;width:100%;font-weight:700;font-size:1.2rem;box-shadow:0 4px 10px #0003;transition:background-color .3s ease,box-shadow .3s ease}.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]:hover{background-color:#158467!important;box-shadow:0 6px 12px #0000004d}.register-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#7f8c8d;text-align:center}.register-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#1abc9c;text-decoration:none}.register-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.register-container[_ngcontent-%COMP%]   app-footer[_ngcontent-%COMP%]{background-color:#343a40;color:#fff;text-align:center;padding:10px;width:100%;position:fixed;bottom:0;left:0}@media (max-width: 992px){.register-container[_ngcontent-%COMP%]   .register-card[_ngcontent-%COMP%]{flex-direction:column;width:90%;max-width:600px}.register-container[_ngcontent-%COMP%]   .register-image[_ngcontent-%COMP%]{width:100%;height:250px}.register-container[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%]{width:100%;padding:20px}}']})};function Ee(r,o){r&1&&(t(0,"mat-error"),n(1,"El correo es obligatorio"),e())}function Se(r,o){r&1&&(t(0,"mat-error"),n(1,"Correo no v\xE1lido"),e())}var J=class r{authService=l(P);router=l(_);snackBar=l(q);emailControl=new D("",[s.required,s.email]);sendEmail(){this.emailControl.valid&&this.authService.sendRecoveryEmail(this.emailControl.value).subscribe({next:o=>{this.showSnackBar("Correo de recuperaci\xF3n enviado"),this.router.navigate(["/password-confirmation"])},error:o=>{console.error("Error al enviar el correo:",o),this.snackBar.open("Error al enviar el correo. Int\xE9ntalo nuevamente.","Cerrar",{duration:3e3})}})}showSnackBar(o){this.snackBar.open(o,"Cerrar",{duration:3e3})}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=u({type:r,selectors:[["app-password-recovery-request"]],standalone:!0,features:[C],decls:14,vars:4,consts:[[1,"container"],[3,"ngSubmit"],["appearance","fill"],["matInput","","type","email","required","",3,"formControl"],[4,"ngIf"],["mat-raised-button","","color","primary","type","submit",1,"submit-button",3,"disabled"]],template:function(a,i){a&1&&(t(0,"div",0)(1,"h2"),n(2,"Volviendo a tu cuenta de FitMindSet"),e(),t(3,"p"),n(4,"Danos m\xE1s detalles sobre tu cuenta..."),e(),t(5,"form",1),f("ngSubmit",function(){return i.sendEmail()}),t(6,"mat-form-field",2)(7,"mat-label"),n(8,"Correo Electr\xF3nico"),e(),p(9,"input",3),d(10,Ee,2,0,"mat-error",4)(11,Se,2,0,"mat-error",4),e(),t(12,"button",5),n(13," Continuar "),e()()()),a&2&&(m(9),c("formControl",i.emailControl),m(),c("ngIf",i.emailControl.hasError("required")),m(),c("ngIf",i.emailControl.hasError("email")),m(),c("disabled",i.emailControl.invalid))},dependencies:[E,v,b,x,O,N,me,B,F,S,y,k,R,h,M,A,w,ie],styles:[".container[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:40px;text-align:left;border-radius:0;box-shadow:none}h2[_ngcontent-%COMP%]{font-size:1.8rem;color:#3ac535;margin-bottom:15px;font-weight:700}form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}mat-form-field[_ngcontent-%COMP%]{width:100%}mat-form-field[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:#a3a3a3!important}mat-form-field[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{color:#333}mat-form-field[_ngcontent-%COMP%]   .mat-error[_ngcontent-%COMP%]{color:#ec4646}button[_ngcontent-%COMP%]{margin-top:20px;width:100%;background-color:#62d35e;color:#fff;font-weight:700}button[_ngcontent-%COMP%]:hover{background-color:#32da3b}button[_ngcontent-%COMP%]:disabled{background-color:#91dd91;color:#f8f5f5}@media (max-width: 480px){.container[_ngcontent-%COMP%]{padding:20px;margin:10px}h2[_ngcontent-%COMP%]{font-size:1.2rem}button[_ngcontent-%COMP%]{font-size:.9rem}}app-footer[_ngcontent-%COMP%]{position:fixed;bottom:0;width:100%;height:70px;background-color:#0000;color:#fff;text-align:center;line-height:70px;z-index:1050;box-shadow:0 -2px 5px #0000001a}"]})};var K=class r{constructor(o){this.router=o}goToLogin(){this.router.navigate(["/auth/login"])}static \u0275fac=function(a){return new(a||r)(te(_))};static \u0275cmp=u({type:r,selectors:[["app-password-recovery-confirmation"]],standalone:!0,features:[C],decls:10,vars:0,consts:[[1,"confirmation-card"],["mat-raised-button","","color","primary",3,"click"]],template:function(a,i){a&1&&(t(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),n(3,"\xA1Correo Enviado!"),e()(),t(4,"mat-card-content")(5,"p"),n(6," Hemos enviado un correo de recuperaci\xF3n de contrase\xF1a a la direcci\xF3n proporcionada. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contrase\xF1a. "),e()(),t(7,"mat-card-actions")(8,"button",1),f("click",function(){return i.goToLogin()}),n(9,"Ir a la p\xE1gina de inicio de sesi\xF3n"),e()()())},dependencies:[h,M,pe,de,se,ge,z,le],styles:['@charset "UTF-8";.confirmation-card[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:20px;text-align:center;background-color:#fff;border-radius:8px;box-shadow:0 4px 12px #0003}.confirmation-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.8rem;color:#40ca3b;font-weight:700;margin-bottom:20px}.confirmation-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;color:#4f4f4f;margin-bottom:20px}.confirmation-card[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.confirmation-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#38cd33;color:#fff;font-weight:700;padding:10px 20px;transition:background-color .3s ease}.confirmation-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#29b831}@media (max-width: 768px){.confirmation-card[_ngcontent-%COMP%]{padding:15px}.confirmation-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.5rem;margin-bottom:15px}.confirmation-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.9rem}.confirmation-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:8px 16px;font-size:.9rem}}@media (max-width: 480px){.confirmation-card[_ngcontent-%COMP%]{padding:10px}.confirmation-card[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:1.3rem;margin-bottom:10px}.confirmation-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.8rem}.confirmation-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:6px 12px;font-size:.8rem}}']})};function ye(r,o){r&1&&(t(0,"mat-error"),n(1,"La contrase\xF1a es obligatoria"),e())}function Fe(r,o){r&1&&(t(0,"mat-error"),n(1,"M\xEDnimo 8 caracteres"),e())}function Re(r,o){r&1&&(t(0,"mat-error"),n(1,"Debe contener letras y n\xFAmeros"),e())}function ke(r,o){r&1&&(t(0,"mat-error"),n(1,"Confirma tu contrase\xF1a"),e())}function qe(r,o){r&1&&(t(0,"mat-error"),n(1,"Las contrase\xF1as no coinciden"),e())}var Q=class r{authService=l(P);router=l(_);snackBar=l(q);route=l(ne);resetForm=new re({newPassword:new D("",[s.required,s.minLength(8),s.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]),confirmPassword:new D("",s.required)});get newPassword(){return this.resetForm.get("newPassword")}get confirmPassword(){return this.resetForm.get("confirmPassword")}onSubmit(){if(this.resetForm.valid&&this.passwordsMatch()){let o=this.route.snapshot.queryParams.token,a=this.newPassword?.value;o?this.authService.resetPassword(o,a).subscribe({next:()=>{this.showSnackBar("Contrase\xF1a cambiada con \xE9xito"),this.router.navigate(["/auth/login"])},error:i=>{console.error("Error al cambiar la contrase\xF1a:",i),this.snackBar.open("Error al cambiar la contrase\xF1a. Int\xE9ntalo nuevamente.","Cerrar",{duration:3e3})}}):this.snackBar.open("El token es inv\xE1lido o ha expirado.","Cerrar",{duration:3e3})}else this.snackBar.open("Por favor, verifica los campos del formulario.","Cerrar",{duration:3e3})}passwordsMatch(){return this.newPassword?.value===this.confirmPassword?.value}showSnackBar(o){this.snackBar.open(o,"Cerrar",{duration:3e3})}static \u0275fac=function(a){return new(a||r)};static \u0275cmp=u({type:r,selectors:[["app-password-reset"]],standalone:!0,features:[C],decls:21,vars:9,consts:[[1,"reset-container"],[3,"ngSubmit","formGroup"],["appearance","fill"],["matInput","","formControlName","newPassword","required","","aria-label","Nueva Contrase\xF1a",3,"type"],[4,"ngIf"],["matInput","","formControlName","confirmPassword","required","","aria-label","Confirmar Contrase\xF1a",3,"type"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(a,i){a&1&&(t(0,"div",0)(1,"h2"),n(2,"Restablecer Contrase\xF1a"),e(),t(3,"p"),n(4," Establece una nueva contrase\xF1a para tus cuentas. Si estableces tu contrase\xF1a, las sesiones actuales se cerrar\xE1n de manera autom\xE1tica. "),e(),t(5,"form",1),f("ngSubmit",function(){return i.onSubmit()}),t(6,"mat-form-field",2)(7,"mat-label"),n(8,"Nueva Contrase\xF1a"),e(),p(9,"input",3),d(10,ye,2,0,"mat-error",4)(11,Fe,2,0,"mat-error",4)(12,Re,2,0,"mat-error",4),e(),t(13,"mat-form-field",2)(14,"mat-label"),n(15,"Confirmar Contrase\xF1a"),e(),p(16,"input",5),d(17,ke,2,0,"mat-error",4)(18,qe,2,0,"mat-error",4),e(),t(19,"button",6),n(20," Cambiar Contrase\xF1a "),e()()()),a&2&&(m(5),c("formGroup",i.resetForm),m(4),c("type","password"),m(),c("ngIf",i.newPassword==null?null:i.newPassword.hasError("required")),m(),c("ngIf",i.newPassword==null?null:i.newPassword.hasError("minlength")),m(),c("ngIf",i.newPassword==null?null:i.newPassword.hasError("pattern")),m(4),c("type","password"),m(),c("ngIf",i.confirmPassword==null?null:i.confirmPassword.hasError("required")),m(),c("ngIf",!i.passwordsMatch()),m(),c("disabled",!i.resetForm.valid||!i.passwordsMatch()))},dependencies:[B,F,S,y,k,R,h,M,E,v,b,x,O,N,I,T,w,A],styles:[".reset-container[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:40px;text-align:left;background-color:#fff;border-radius:8px;box-shadow:0 4px 12px #0003}@media (max-width: 768px){.reset-container[_ngcontent-%COMP%]{padding:30px}}@media (max-width: 576px){.reset-container[_ngcontent-%COMP%]{padding:20px;max-width:90%}}h2[_ngcontent-%COMP%]{font-size:1.8rem;color:#40ca3b;margin-bottom:15px;font-weight:700}@media (max-width: 576px){h2[_ngcontent-%COMP%]{font-size:1.5rem}}mat-form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}button[_ngcontent-%COMP%]{width:100%;background-color:#62d35e;color:#fff;font-weight:700;padding:10px;font-size:1rem}button[_ngcontent-%COMP%]:hover{background-color:#32da3b}@media (max-width: 768px){button[_ngcontent-%COMP%]{font-size:.9rem;padding:8px}}@media (max-width: 576px){button[_ngcontent-%COMP%]{font-size:.8rem;padding:6px}}app-footer[_ngcontent-%COMP%]{position:fixed;bottom:0;width:100%;height:70px;background-color:#0000;color:#fff;text-align:center;line-height:70px;z-index:1050;box-shadow:0 -2px 5px #0000001a}"]})};var At=[{path:"",component:oe,children:[{path:"login",component:V},{path:"register",component:$},{path:"password-recovery",component:J},{path:"password-confirmation",component:K},{path:"reset-password",component:Q}]}];export{At as authRoutes};
