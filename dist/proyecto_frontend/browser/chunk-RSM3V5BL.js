import{a as Ce}from"./chunk-GTUFBUBN.js";import{a as Ie,b as Le,c as ke,d as He,e as Ae,f as Ne,g as ze,h as Ve,i as $e,j as Be,k as Ue,l as qe,m as je,n as Ge,o as We}from"./chunk-DTT73EMU.js";import{$ as J,Q as Pe,R as ye,T as Te,U as j,V as De,Y as G,Z as W,aa as K,b as _e,d as U,f as g,g as q,h as ge,l as be,m as he,n as ve,p as xe,q as Re,t as Se,u as Me,v as Ee,va as Q,wa as Fe,xa as we,ya as Oe}from"./chunk-ILVJNVVA.js";import{a as ce,b as $,h as pe,i as ue,j as B,k as de,m as E,o as fe}from"./chunk-PLYEUU64.js";import"./chunk-EJJBCPAK.js";import{Ab as r,Bb as p,Cb as x,Db as R,Dc as se,Fb as T,Ib as C,Jc as me,Kb as u,Kc as V,Sa as H,Ub as n,Vb as z,Wa as s,Wb as v,Y as k,Yb as ie,Zb as re,_b as ne,a as I,ac as M,b as L,bc as ae,ca as c,cc as le,dc as D,ec as F,ga as S,ja as te,mb as m,pa as b,qa as h,qb as f,sb as ee,vb as _,wb as oe,xb as A,yb as N,zb as i}from"./chunk-QTE2EE2N.js";var Qe=(e,t)=>({"icon-white":e,"icon-black":t}),X=class e{isSidebarActive=!1;toggleSidebar(){this.isSidebarActive=!this.isSidebarActive}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=S({type:e,selectors:[["app-layout"]],standalone:!0,features:[M],decls:21,vars:8,consts:[[1,"layout-dashboard"],[1,"sidebar-toggle-btn",3,"click"],[1,"navbar-toggler-icon",3,"ngClass"],[1,"layout-sidebar"],["routerLink","mi-dashboard","routerLinkActive","active"],[1,"fas","fa-book"],["routerLink","mi-perfil","routerLinkActive","active"],["routerLink","recursos/list","routerLinkActive","active"],[1,"layout-content"]],template:function(o,a){o&1&&(i(0,"div",0)(1,"button",1),C("click",function(){return a.toggleSidebar()}),p(2,"span",2),r(),i(3,"div",3)(4,"nav")(5,"ul")(6,"li")(7,"a",4),p(8,"i",5),n(9," Dashboard "),r()(),i(10,"li")(11,"a",6),p(12,"i",5),n(13," Mi Perfil "),r()(),i(14,"li")(15,"a",7),p(16,"i",5),n(17," recursos "),r()()()()(),i(18,"div",8),p(19,"router-outlet"),r()(),p(20,"app-footer")),o&2&&(s(),ee("active",a.isSidebarActive),s(),f("ngClass",le(5,Qe,!a.isSidebarActive,a.isSidebarActive)),s(),ee("collapsed",a.isSidebarActive))},dependencies:[V,se,_e,de,ue],styles:['@charset "UTF-8";.layout-dashboard[_ngcontent-%COMP%]{display:flex;height:100vh}app-navbar[_ngcontent-%COMP%]{position:fixed;top:0;width:100%;z-index:1050}.layout-sidebar[_ngcontent-%COMP%]{position:fixed;top:70px;left:0;bottom:70px;width:250px;background-color:#2e7d32;color:#fff;overflow-y:auto;transition:width .3s ease-in-out;z-index:1040}.layout-sidebar.collapsed[_ngcontent-%COMP%]{width:0;overflow:hidden}.layout-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.layout-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:10px 0;padding:10px 20px}.layout-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;display:flex;align-items:center;padding:10px;border-radius:4px;transition:background-color .3s}.layout-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:10px}.layout-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .layout-sidebar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{background-color:#388e3c}.layout-content[_ngcontent-%COMP%]{flex-grow:1;padding:90px 20px 70px;margin-left:250px;transition:margin-left .3s ease-in-out}.layout-sidebar.collapsed[_ngcontent-%COMP%] + .layout-content[_ngcontent-%COMP%]{margin-left:0}.sidebar-toggle-btn[_ngcontent-%COMP%]{position:fixed;top:70px;left:10px;background-color:transparent;border:none;font-size:24px;cursor:pointer;z-index:1060;color:#fff}.icon-white[_ngcontent-%COMP%]{color:#fff}.icon-black[_ngcontent-%COMP%]{color:#000}app-footer[_ngcontent-%COMP%]{position:fixed;bottom:0;width:100%;height:70px;background-color:#343a40;color:#fff;text-align:center;z-index:1050}']})};var P=class e{transform(t){return`${E.baseURL}/media/${t}`}static \u0275fac=function(o){return new(o||e)};static \u0275pipe=te({name:"apiImg",type:e,pure:!0,standalone:!0})};var y=class e{baseUrl=`${E.baseURL}/recursos`;http=c($);getRecursoDetails(){return this.http.get(`${this.baseUrl}`)}paginateRecursos(t,o){let a=new ce().set("page",t.toString()).set("size",o.toString());return this.http.get(`${this.baseUrl}/page`,{params:a})}createRecursos(t){return this.http.post(`${this.baseUrl}/registrar`,t)}updateRecurso(t,o){return this.http.put(`${this.baseUrl}/actualizar/${t}`,o)}getRecursoDetailsById(t){return this.http.get(`${this.baseUrl}/${t}`)}static \u0275fac=function(o){return new(o||e)};static \u0275prov=k({token:e,factory:e.\u0275fac,providedIn:"root"})};var et=()=>[5,10,20];function tt(e,t){e&1&&(i(0,"mat-header-cell"),n(1," Portada "),r())}function ot(e,t){if(e&1&&(i(0,"mat-cell"),p(1,"img",17),D(2,"apiImg"),r()),e&2){let o=t.$implicit;s(),f("src",F(2,1,o.coverPath),H)}}function it(e,t){e&1&&(i(0,"mat-header-cell"),n(1," Nombre"),r())}function rt(e,t){if(e&1&&(i(0,"mat-cell"),n(1),r()),e&2){let o=t.$implicit;s(),v(" ",o.nombreRecurso," ")}}function nt(e,t){e&1&&(i(0,"mat-header-cell"),n(1," Autor "),r())}function at(e,t){if(e&1&&(i(0,"mat-cell"),n(1),r()),e&2){let o=t.$implicit;s(),v(" ",o.nombreAutor," ")}}function lt(e,t){e&1&&(i(0,"mat-header-cell"),n(1," Tipo de Habito "),r())}function st(e,t){if(e&1&&(i(0,"mat-cell"),n(1),r()),e&2){let o=t.$implicit;s(),v(" ",o.tipoDeHabito," ")}}function mt(e,t){e&1&&(i(0,"mat-header-cell"),n(1," Tipo de Recurso"),r())}function ct(e,t){if(e&1&&(i(0,"mat-cell"),n(1),r()),e&2){let o=t.$implicit;s(),v(" ",o.tipoDeRecurso," ")}}function pt(e,t){e&1&&(i(0,"mat-header-cell"),n(1," Precio "),r())}function ut(e,t){if(e&1&&(i(0,"mat-cell"),n(1),D(2,"currency"),r()),e&2){let o=t.$implicit;s(),v(" ",F(2,1,o.precio)," ")}}function dt(e,t){e&1&&(i(0,"mat-header-cell"),n(1," Acciones "),r())}function ft(e,t){if(e&1){let o=T();i(0,"mat-cell")(1,"div",18)(2,"button",19),C("click",function(){let l=b(o).$implicit,d=u(2);return h(d.actualizarRecurso(l.id))}),n(3," Actualizar "),r()()()}}function _t(e,t){e&1&&p(0,"mat-header-row")}function Ct(e,t){e&1&&p(0,"mat-row")}function gt(e,t){if(e&1){let o=T();i(0,"h2"),n(1,"Lista de Recursos"),r(),i(2,"div",0)(3,"button",1),C("click",function(){b(o);let l=u();return h(l.createNewRecurso())}),n(4," Nuevo Recurso "),r(),i(5,"mat-form-field",2)(6,"mat-label"),n(7,"Buscar por nombre"),r(),i(8,"input",3),ne("ngModelChange",function(l){b(o);let d=u();return re(d.filterText,l)||(d.filterText=l),h(l)}),C("input",function(l){b(o);let d=u();return h(d.applyFilter(l))}),r()()(),i(9,"mat-table",4),x(10,5),m(11,tt,2,0,"mat-header-cell",6)(12,ot,3,3,"mat-cell",7),R(),x(13,8),m(14,it,2,0,"mat-header-cell",6)(15,rt,2,1,"mat-cell",7),R(),x(16,9),m(17,nt,2,0,"mat-header-cell",6)(18,at,2,1,"mat-cell",7),R(),x(19,10),m(20,lt,2,0,"mat-header-cell",6)(21,st,2,1,"mat-cell",7),R(),x(22,11),m(23,mt,2,0,"mat-header-cell",6)(24,ct,2,1,"mat-cell",7),R(),x(25,12),m(26,pt,2,0,"mat-header-cell",6)(27,ut,3,3,"mat-cell",7),R(),x(28,13),m(29,dt,2,0,"mat-header-cell",6)(30,ft,4,0,"mat-cell",7),R(),m(31,_t,1,0,"mat-header-row",14)(32,Ct,1,0,"mat-row",15),r(),i(33,"mat-paginator",16),C("page",function(l){b(o);let d=u();return h(d.onPageChange(l))}),r()}if(e&2){let o=u();s(8),ie("ngModel",o.filterText),s(),f("dataSource",o.filteredRecursos),s(22),f("matHeaderRowDef",o.displayedColumns),s(),f("matRowDefColumns",o.displayedColumns),s(),f("length",o.totalElements)("pageSize",o.pageSize)("pageIndex",o.pageIndex)("pageSizeOptions",ae(8,et))}}function bt(e,t){e&1&&(i(0,"p"),n(1,"No hay recursos registrados"),r())}var Y=class e{recursos=[];filteredRecursos=[];filterText="";displayedColumns=["cover","nombreRecurso","nombreAutor","tipoDeHabito","tipoDeRecurso","precio","actions"];totalElements=0;pageSize=5;pageIndex=0;recursoService=c(y);snackBar=c(Q);router=c(B);ngOnInit(){this.loadRecursos()}loadRecursos(t=0,o=5){this.recursoService.paginateRecursos(t,o).subscribe({next:a=>{this.recursos=a.content,this.filteredRecursos=a.content,this.totalElements=a.totalElements,this.pageSize=a.size,this.pageIndex=a.number,console.log(this.recursos)},error:()=>this.showSnackBar("Error al cargar la lista de recursos")})}applyFilter(t){let o=t.target.value.trim().toLowerCase();this.filteredRecursos=this.recursos.filter(a=>a.nombreRecurso.toLowerCase().includes(o))}onPageChange(t){this.pageIndex=t.pageIndex,this.pageSize=t.pageSize,this.loadRecursos(this.pageIndex,this.pageSize)}createNewRecurso(){this.router.navigate(["/autor/recursos/new"])}actualizarRecurso(t){this.router.navigate(["/autor/recursos/edit",t])}showSnackBar(t){this.snackBar.open(t,"Cerrar",{duration:3e3})}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=S({type:e,selectors:[["app-recurso-list"]],standalone:!0,features:[M],decls:2,vars:1,consts:[[1,"table-controls"],["mat-raised-button","","color","primary",3,"click"],["appearance","outline",1,"filter-input"],["matInput","",3,"ngModelChange","input","ngModel"],[1,"mat-table",3,"dataSource"],["matColumnDef","cover"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","nombreRecurso"],["matColumnDef","nombreAutor"],["matColumnDef","tipoDeHabito"],["matColumnDef","tipoDeRecurso"],["matColumnDef","precio"],["matColumnDef","actions"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],[3,"page","length","pageSize","pageIndex","pageSizeOptions"],["alt","Cover",1,"book-cover-img",3,"src"],[1,"button-group"],["mat-raised-button","","color","accent",3,"click"]],template:function(o,a){o&1&&m(0,gt,34,9)(1,bt,2,0,"p"),o&2&&_(a.recursos?0:1)},dependencies:[V,me,qe,Le,He,Ve,Ae,ke,$e,Ne,ze,Be,Ue,Ge,je,Fe,W,G,j,K,J,Me,U,q,be,P],styles:[".body[_ngcontent-%COMP%]{background-color:azure}"]})};var Z=class e{baseUrl=`${E.baseURL}/media`;http=c($);constructor(){}upload(t){return this.http.post(`${this.baseUrl}/upload`,t)}getMedia(t){let o=`${this.baseUrl}/${t}`;return this.http.get(o,{responseType:"blob"})}static \u0275fac=function(o){return new(o||e)};static \u0275prov=k({token:e,factory:e.\u0275fac,providedIn:"root"})};function ht(e,t){return this.tiporecursos}var vt=(e,t)=>t.id;function xt(e,t){e&1&&n(0," Actualizar ")}function Rt(e,t){e&1&&n(0," Nuevo ")}function St(e,t){if(e&1&&(i(0,"li"),n(1),r()),e&2){let o=t.$implicit;s(),z(o)}}function Mt(e,t){if(e&1&&(i(0,"div",1)(1,"ul"),A(2,St,2,1,"li",null,oe),r()()),e&2){let o=u();s(2),N(o.errors)}}function Et(e,t){e&1&&n(0," Este nombre es obligatorio ")}function Pt(e,t){e&1&&n(0," El nombre debe tener al menos 6 caracteres")}function yt(e,t){e&1&&n(0," El nombre debe tener 250 caracteres como m\xE1ximo ")}function Tt(e,t){e&1&&n(0," La descripci\xF3n es obligatoria ")}function Dt(e,t){e&1&&n(0," El precio es obligatorio ")}function Ft(e,t){e&1&&n(0," El precio debe ser mayor o igual a 0 ")}function wt(e,t){if(e&1&&(i(0,"mat-option",10),n(1),r()),e&2){let o=t.$implicit,a=u(2);f("value",a.tiporecursos),s(),z(o.nombre)}}function Ot(e,t){e&1&&n(0," El tipo de Recurso es obligatorio ")}function It(e,t){if(e&1&&(i(0,"mat-option",10),n(1),r()),e&2){let o=t.$implicit;f("value",o.id),s(),z(o.nombre)}}function Lt(e,t){e&1&&n(0," El tipo de Habito es obligatorio ")}function kt(e,t){e&1&&n(0," Actualizar ")}function Ht(e,t){e&1&&n(0," Crear ")}function At(e,t){if(e&1&&(i(0,"h3"),n(1,"Portada"),r(),p(2,"img",20),D(3,"apiImg")),e&2){let o,a=u(2);s(2),f("src",F(3,1,(o=a.form.get("coverPath"))==null?null:o.value),H)}}function Nt(e,t){e&1&&(i(0,"p"),n(1,"Sin portada"),r())}function zt(e,t){if(e&1){let o=T();i(0,"div",2)(1,"div",3)(2,"form",4),C("ngSubmit",function(){b(o);let l=u();return h(l.save())}),i(3,"mat-form-field",5)(4,"mat-label"),n(5,"Nombre"),r(),p(6,"input",6),i(7,"mat-error"),m(8,Et,1,0)(9,Pt,1,0)(10,yt,1,0),r()(),i(11,"mat-form-field",5)(12,"mat-label"),n(13,"Descripci\xF3n"),r(),p(14,"textarea",7),i(15,"mat-error"),m(16,Tt,1,0),r()(),i(17,"mat-form-field",5)(18,"mat-label"),n(19,"Precio"),r(),p(20,"input",8),i(21,"mat-error"),m(22,Dt,1,0)(23,Ft,1,0),r()(),i(24,"mat-form-field",5)(25,"mat-label"),n(26,"Tipo de Recurso"),r(),i(27,"mat-select",9),A(28,wt,2,2,"mat-option",10,ht,!0),r(),i(30,"mat-error"),m(31,Ot,1,0),r()(),i(32,"mat-form-field",5)(33,"mat-label"),n(34,"Tipo de Habito"),r(),i(35,"mat-select",11),A(36,It,2,2,"mat-option",10,vt),r(),i(38,"mat-error"),m(39,Lt,1,0),r()(),i(40,"div",12)(41,"label"),n(42,"Portada"),r(),i(43,"input",13),C("change",function(l){b(o);let d=u();return h(d.uploadFile(l,"coverPath"))}),r(),i(44,"div",14),n(45),r()(),i(46,"div",12)(47,"label"),n(48,"Archivo PDF"),r(),i(49,"input",15),C("change",function(l){b(o);let d=u();return h(d.uploadFile(l,"filePath"))}),r(),i(50,"div",14),n(51),r()(),i(52,"div",16)(53,"button",17),n(54," Cancelar "),r(),i(55,"button",18),m(56,kt,1,0)(57,Ht,1,0),n(58," recurso "),r()()()(),i(59,"div",19),m(60,At,4,3)(61,Nt,2,0,"p"),r()()}if(e&2){let o,a,l=u();s(2),f("formGroup",l.form),s(6),_(l.form.get("nombre").hasError("required")?8:(o=l.form.get("nombre"))!=null&&o.hasError("minlength")?9:(o=l.form.get("nombre"))!=null&&o.hasError("maxlength")?10:-1),s(8),_(l.form.get("descripcion").hasError("required")?16:-1),s(6),_(l.form.get("price").hasError("required")?22:l.form.get("price").hasError("min")?23:-1),s(6),N(l.tiporecursos),s(3),_(l.form.get("tipoDeRecursoId").hasError("required")?31:-1),s(5),N(l.tipoDeHabitos),s(3),_(l.form.get("tipoDeRecursoId").hasError("required")?39:-1),s(6),v(" Ruta actual: ",l.form.get("coverPath").value," "),s(6),v(" Ruta actual: ",l.form.get("filePath").value," "),s(5),_(l.recursoid?56:57),s(4),_((a=l.form.get("coverPath"))!=null&&a.value?60:61)}}var O=class e{recursoService=c(y);mediaService=c(Z);tipoDeHabitoService=c(Ie);authService=c(fe);fb=c(Se);router=c(B);route=c(pe);snackBar=c(Q);tiporecursos=[];tipoDeHabitos=[];recursoid;errors=[];form=this.fb.group({nombre:["",[g.required,g.minLength(6),g.maxLength(250)]],descripcion:["",[g.required]],precio:["",[g.required,g.min(0)]],coverPath:["",g.required],filePath:["",g.required],tiporecurso:["",g.required],tipoDeHabitosId:["",g.required]});ngOnInit(){this.recursoid=Number(this.route.snapshot.paramMap.get("id")),this.loadtipoDeHabito()}loadtipoDeHabito(){this.tipoDeHabitoService.getAllTiposDeHabitos().subscribe({next:t=>{this.tipoDeHabitos=t.map(o=>L(I({},o),{id:o.id})),this.recursoid&&this.loadRecursosForActualizar()},error:()=>this.errors.push("Error al cargar los tipos de h\xE1bitos.")})}loadRecursosForActualizar(){this.recursoService.getRecursoDetailsById(this.recursoid).subscribe({next:t=>{this.tipoDeHabitos.find(a=>a.nombre===t.tipoRecurso)&&this.form.patchValue(L(I({},t),{tiporecursos:t.recursoid,tipoDeHabitos:t.tipoDeHabito}))},error:()=>this.errors.push("Error al cargar los detalles del Recurso.")})}uploadFile(t,o){let a=t.target.files?.[0];if(a){let l=new FormData;l.append("file",a),this.mediaService.upload(l).subscribe({next:d=>this.form.controls[o].setValue(d.path),error:()=>this.errors.push("Error al cargar el archivo.")})}}save(){if(this.form.invalid){this.form.markAllAsTouched();return}let t=L(I({},this.form.value),{authorId:this.authService.getUser()?.autorId});(this.recursoid?this.recursoService.updateRecurso(this.recursoid,t):this.recursoService.createRecursos(t)).subscribe({next:()=>{this.snackBar.open("Recurso guardado exitosamente","Cerrar",{duration:3e3}),this.router.navigate(["/autor/recursos/list"])},error:a=>{this.errors=a.error.errors||["Error al guardar el Recurso"],this.snackBar.open("Error al guardar el recurso","Cerrar",{duration:3e3})}})}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=S({type:e,selectors:[["app-recurso-form"]],standalone:!0,features:[M],decls:7,vars:3,consts:[[1,"book-form-container"],[1,"alert","alert-danger","mt-5"],[1,"row"],[1,"col-md-8"],["autocomplete","off",1,"mt-5",3,"ngSubmit","formGroup"],["appearance","outline",1,"form-field","w-100"],["matInput","","type","text","placeholder","Nombre","formControlName","nombre"],["matInput","","placeholder","Descripci\xF3n","formControlName","descripcion"],["matInput","","type","number","step","0.01","placeholder","Precio","formControlName","precio"],["formControlName","tipoDeRecursoId"],[3,"value"],["formControlName","tipoDeHabitoId"],[1,"file-upload","w-100"],["type","file","accept",".png,.jpg,.jpeg",1,"form-control",3,"change"],[1,"small","text-muted"],["type","file","accept","application/pdf",1,"form-control",3,"change"],[1,"action-buttons","text-end"],["mat-button","","type","button","routerLink","/author/books/list"],["mat-raised-button","","color","primary",1,"ms-2"],[1,"col-md-4","text-center","preview"],["alt","Portada",1,"img-thumbnail",3,"src"]],template:function(o,a){o&1&&(i(0,"div",0)(1,"h1"),m(2,xt,1,0)(3,Rt,1,0),n(4," recurso"),r(),m(5,Mt,4,0,"div",1)(6,zt,62,10,"div",2),r()),o&2&&(s(2),_(a.recursoid?2:3),s(3),_(a.errors.length?5:-1),s(),_(a.form?6:-1))},dependencies:[Ee,he,U,ve,q,ge,xe,Re,W,G,j,De,K,J,Te,ye,Oe,we,Pe,P]})};var Jo=[{path:"",component:X,children:[{path:"recursos/crear",component:O},{path:"recursos/edit/:recursoid",component:O},{path:"recursos/list",component:Y},{path:"mi-perfil",component:We},{path:"mi-dashboard",component:Ce}]}];export{Jo as autorRoutes};
