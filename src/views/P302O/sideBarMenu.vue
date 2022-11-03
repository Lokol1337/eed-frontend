<template>
  <!-- <packManager :packs="allPacks.blocks" @selectPack="selectPackHandler" /> -->
<div
class="sidebar p-2"
id="sidebar"
@mouseover="isOpened = true , slowMenu = 'is-active'" 
@mouseleave="isOpened = false, slowMenu = ''"
:class="isOpened ? cssWidth : ''"
:style="cssVars"
>
<div class="row justify-content-center mb-3">
  <div class="col-auto">
  <img src="/eed-frontend/img/mirea2.5911f2c7.png" style="width: 40px;">
  </div>
  <label
    style="color:white; white-space: nowrap;"
    :class="'mt-1 hiddenblock ' + slowMenu"
    >&nbsp;ВУЦ РТУ МИРЭА
  </label>
  <div class="w-100">

  </div>
  <div 
    :class="'mt-1 col-auto hiddenblock ' + slowMenu"
  >
    
    </div>
</div>

<div style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1; max-height: calc(100% - 60px); ">
  <div
    id="my-scroll"
    style="margin: 6px 14px 0 14px;"
  >
  <div class="row justify-content-center">
      <div 
        id="menuForShow" 
        :class="'col-auto col-sm-auto col-md-auto col-xl-auto col-lg-auto hiddenblock' + ' ' + slowMenu" 
        style = "zoom:100%;"
        >
        
          <menuForShow 
            :rectColor="'green'" 
            :packName="packForShow" 
            :packs = "allPacks.blocks" 
            @selectPack="selectPackHandler"
          />
      </div>
  </div>
  </div>
  
</div>
</div>
</template>

<script>
import menuForShow from './menuForShow.vue';
import P3306JSON from "./P302O.json";
// import packManager from "./packManager.vue";
export default {
  created(){
      window.addEventListener('resize', this.updateWidth);
      
      this.allPacks = P3306JSON;
      this.actualPack = P3306JSON.blocks[0];
  },
name: 'SidebarMenuAkahon',
props: {
  //! Menu settings
  isMenuOpen: {
    type: Boolean,
    default: true,
  },
  menuTitle: {
    type: String,
    default: 'Akahon',
  },
  menuLogo: {
    type: String,
    default: '',
  },
  menuIcon: {
    type: String,
    default: 'bxl-c-plus-plus',
  },
  isPaddingLeft: {
    type: Boolean,
    default: true,
  },
   menuOpenedPaddingLeftBody: {
    type: String,
    default: '250px'
  },
  menuClosedPaddingLeftBody: {
    type: String,
    default: '78px'
  },


  //! Menu items
  menuItems: {
    type: Array,
    default: () => [
      {
        link: '#',
        name: 'Dashboard',
        tooltip: 'Dashboard',
        icon: 'bx-grid-alt',
      },
      {
        link: '#',
        name: 'User',
        tooltip: 'User',
        icon: 'bx-user',
      },
      {
        link: '#',
        name: 'Messages',
        tooltip: 'Messages',
        icon: 'bx-chat',
      },
      {
        link: '#',
        name: 'Analytics',
        tooltip: 'Analytics',
        icon: 'bx-pie-chart-alt-2',
      },
      {
        link: '#',
        name: 'File Manager',
        tooltip: 'Files',
        icon: 'bx-folder',
      },
      {
        link: '#',
        name: 'Order',
        tooltip: 'Order',
        icon: 'bx-cart-alt',
      },
      {
        link: '#',
        name: 'Saved',
        tooltip: 'Saved',
        icon: 'bx-heart',
      },
      {
        link: '#',
        name: 'Setting',
        tooltip: 'Setting',
        icon: 'bx-cog',
      },
    ],
  },

  //! Search
  isSearch: {
    type: Boolean,
    default: true,
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
  searchTooltip: {
    type: String,
    default: 'Search',
  },

  //! Profile detailes
  profileImg: {
    type: String,
   
  },
  profileName: {
    type: String,
    default: 'Fayzullo Saidakbarov',
  },
  profileRole: {
    type: String,
    default: 'Frontend vue developer',
  },
  isExitButton: {
    type: Boolean,
    default: true,
  },

  //! Styles
  bgColor: {
    type: String,
    default: '#292c63',
  },
  secondaryColor: {
    type: String,
    default: '#1d1b31',
  },
  homeSectionColor: {
    type: String,
    default: '#e4e9f7',
  },
  logoTitleColor: {
    type: String,
    default: '#fff',
  },
  iconsColor: {
    type: String,
    default: '#fff',
  },
  itemsTooltipColor: {
    type: String,
    default: '#e4e9f7',
  },
  searchInputTextColor: {
    type: String,
    default: '#fff',
  },
  menuItemsHoverColor: {
    type: String,
    default: '#fff',
  },
  menuItemsTextColor: {
    type: String,
    default: '#fff',
  },
  menuFooterTextColor: {
    type: String,
    default: '#fff',
  },
},
data() {
  return {
    isOpened: false,
    actualPack: null,
    allPacks: null,
    packForShow: null,
    imgWidth: 0,
    width: window.innerWidth,
    imgId: 1,
    zoom: 80,
    firstZoom:0,
    slowMenu: '',
    vucIcon: 'justify-content-center',
    cssWidth: 'open30',
    mapZoom: 100,
  }
},
mounted() {
  this.getFistZoom();
},
methods: {
  selectPackHandler(pack) {
      this.actualPack = pack;
      this.packForShow = pack.name;
      this.$emit('selectPackParent', pack);
  },
  getFistZoom(){
    if(this.width < 992){
      // document.getElementById('sidebar').classList.remove('open30');
      // document.getElementById('sidebar').classList.add('open40');
      this.cssWidth = 'open40';
      this.mapZoom = Math.ceil((this.width*0.4 - 190 - 50)/190 * 100) + 100;
      document.getElementById('menuForShow').style.zoom = this.mapZoom + '%';
      console.log('getFirstZoom');
    }
    else{
      this.mapZoom = Math.ceil((this.width*0.3 - 190 - 100)/190 * 100) + 100;
      document.getElementById('menuForShow').style.zoom = this.mapZoom + '%';
      console.log('getFirstZoom');
      this.cssWidth = 'open30';
    }
  },
  updateZoom(){
    if(this.width < 992){
      // document.getElementById('sidebar').classList.remove('open30');
      // document.getElementById('sidebar').classList.add('open40');
      console.log('updateZoom');
      this.cssWidth = 'open40';
      this.mapZoom = Math.ceil((this.width*0.4 - 190- 50  )/190 * 100) + 100;
      document.getElementById('menuForShow').style.zoom = this.mapZoom + '%';
      console.log(this.cssWidth);
    }
    else{
      this.mapZoom = Math.ceil((this.width*0.3 - 190 -100)/190 * 100) + 100;
      document.getElementById('menuForShow').style.zoom = this.mapZoom + '%';
      this.cssWidth = 'open30';
    }
  },
  updateWidth() {
    const $html = document.documentElement;
    const width = $html.clientWidth;
    this.width = width;
    console.log(this.width);
    this.updateZoom();
  },
},
components:
{
  menuForShow,
  // packManager,      
},

computed: {

  cssVars() {
    return {
      // '--padding-left-body': this.isOpened ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody,
      '--bg-color': this.bgColor,
      '--secondary-color': this.secondaryColor,
      '--home-section-color': this.homeSectionColor,
      '--logo-title-color': this.logoTitleColor,
      '--icons-color': this.iconsColor,
      '--items-tooltip-color': this.itemsTooltipColor,
      '--serach-input-text-color': this.searchInputTextColor,
      // '--menu-items-hover-color': this.menuItemsHoverColor,
      // '--menu-items-text-color': this.menuItemsTextColor,
      // '--menu-footer-text-color': this.menuFooterTextColor,
    }
  },
},
watch: {
  isOpened() {
    
    // window.document.body.style.paddingLeft = this.isOpened && this.isPaddingLeft ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody
  },
  cssWidth:function(){
      console.log(111);
    },
}
}
</script>

<style>
/* Google Font Link */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'Poppins', sans-serif;
}

.hiddenblock {
opacity: 0;
visibility: hidden;
pointer-events: none;
transition: all ease 0.5s;
transform: translate(-10%, 0);
}

.hiddenblock.is-active {
opacity: 1;
pointer-events: auto;
transition: all ease 1s;
transform: translate(0, 0);
visibility: visible;
}
body {
transition: all 0.5s ease;
}
.menu-logo {
width: 30px;
margin: 0 0 0 0;
}
.sidebar {
position: relative;
display: flex;
flex-direction: column;
position: fixed;
left: 0;
top: 0;
height: 100%;
min-height: min-content;
/* overflow-y: auto; */
width: 78px;
background: var(--bg-color);
/* padding: 6px 14px 0 14px; */
z-index: 99;
transition: all 0.5s ease;
}
.sidebar.open30 {
width: 30%;
}
.sidebar.open40 {
width: 40%;
}
.sidebar .logo-details {
height: 60px;
display: flex;
align-items: center;
position: relative;
}
.sidebar .logo-details .icon {
opacity: 0;
transition: all 0.5s ease;
}
.sidebar .logo-details .logo_name {
color: var(--logo-title-color);
font-size: 20px;
font-weight: 600;
opacity: 0;
transition: all 0.5s ease;
}
.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
opacity: 1;
}
.sidebar .logo-details #btn {
/* position: absolute;
top: 50%;
right: 0;
transform: translateY(-50%);
font-size: 22px;
transition: all 0.4s ease;
font-size: 23px;
text-align: center;
cursor: pointer;
transition: all 0.5s ease; */
}
.sidebar.open .logo-details #btn {
/* text-align: right; */
}
.sidebar i {
color: var(--icons-color);
height: 60px;
min-width: 50px;
font-size: 28px;
text-align: center;
line-height: 60px;
}
.sidebar .nav-list {
margin-top: 20px;
/* margin-bottom: 60px; */
/* height: 100%; */
/* min-height: min-content; */
}
.sidebar li {
position: relative;
margin: 0 0;
list-style: none;
}
.sidebar li .tooltip {
position: absolute;
top: -20px;
left: calc(100% + 15px);
z-index: 3;
background: var(--items-tooltip-color);
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
padding: 6px 12px;
border-radius: 4px;
font-size: 15px;
font-weight: 400;
opacity: 0;
white-space: nowrap;
pointer-events: none;
transition: 0s;
}
.sidebar li:hover .tooltip {
opacity: 1;
pointer-events: auto;
transition: all 0.4s ease;
top: 50%;
transform: translateY(-50%);
}
.sidebar.open li .tooltip {
display: none;
}
.sidebar input {
font-size: 15px;
color: var(--serach-input-text-color);
font-weight: 400;
outline: none;
height: 50px;
width: 100%;
width: 50px;
border: none;
border-radius: 12px;
transition: all 0.5s ease;
background: var(--secondary-color);
}
.sidebar.open input {
padding: 0 20px 0 50px;
width: 100%;
}
.sidebar .bx-search {
position: absolute;
top: 50%;
left: 0;
transform: translateY(-50%);
font-size: 22px;
background: var(--secondary-color);
color: var(--icons-color);
}
.sidebar.open .bx-search:hover {
background: var(--secondary-color);
color: var(--icons-color);
}
.sidebar .bx-search:hover {
background: var(--menu-items-hover-color);
color: var(--bg-color);
}
.sidebar li a {
display: flex;
height: 100%;
width: 100%;
border-radius: 12px;
align-items: center;
text-decoration: none;
transition: all 0.4s ease;
background: var(--bg-color);
}
.sidebar li a:hover {
background: var(--menu-items-hover-color);
}
.sidebar li a .links_name {
color: var(--menu-items-text-color);
font-size: 15px;
font-weight: 400;
white-space: nowrap;
opacity: 0;
pointer-events: none;
transition: 0.4s;
}
.sidebar.open li a .links_name {
opacity: 1;
pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i {
transition: all 0.5s ease;
color: var(--bg-color);
}
.sidebar li i {
height: 50px;
line-height: 50px;
font-size: 18px;
border-radius: 12px;
}
.sidebar div.profile {
position: relative;
height: 60px;
width: 78px;
/* left: 0;
bottom: 0; */
padding: 10px 14px;
background: var(--secondary-color);
transition: all 0.5s ease;
overflow: hidden;
}
.sidebar.open div.profile {
width: 250px;
}
.sidebar div .profile-details {
display: flex;
align-items: center;
flex-wrap: nowrap;
}

.sidebar div.profile .name,
.sidebar div.profile .job {
font-size: 15px;
font-weight: 400;
color: var(--menu-footer-text-color);
white-space: nowrap;
}
.sidebar div.profile .job {
font-size: 12px;
}
.sidebar .profile #log_out {
position: absolute;
top: 50%;
right: 0;
transform: translateY(-50%);
background: var(--secondary-color);
width: 100%;
height: 60px;
line-height: 60px;
border-radius: 0px;
transition: all 0.5s ease;
}
.sidebar.open .profile #log_out {
width: 50px;
background: var(--secondary-color);
opacity: 0;
}
.sidebar.open .profile:hover #log_out {
opacity: 1;
}
.sidebar.open .profile #log_out:hover {
opacity: 1;
color: red;
}
.sidebar .profile #log_out:hover {
color: red;
}
.home-section {
position: relative;
background: var(--home-section-color);
min-height: 100vh;
top: 0;
left: 78px;
width: calc(100% - 78px);
transition: all 0.5s ease;
z-index: 2;
}
.sidebar.open ~ .home-section {
left: 250px;
width: calc(100% - 250px);
}
.home-section .text {
display: inline-block;
color: var(--bg-color);
font-size: 25px;
font-weight: 500;
margin: 18px;
}
.my-scroll-active {
overflow-y: auto;
}
#my-scroll {
overflow-y: auto;
height: calc(100% - 60px);
}
#my-scroll::-webkit-scrollbar{
display:none;
/* background-color: rgba(255, 255, 255, 0.2); 
width: 10px;
border-radius:5px  */
}
/* #my-scroll::-webkit-scrollbar-thumb{
background-color: red;
border-radius:5px 
}
#my-scroll::-webkit-scrollbar-button:vertical:start:decrement{
display:none;
}
#my-scroll::-webkit-scrollbar-button:vertical:end:increment{
display:none;
} */
@media (max-width: 420px) {
.sidebar li .tooltip {
  display: none;
}
}


</style>
