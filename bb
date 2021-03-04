/*===============================================
 common css 
================================================*/
:root {
    --black: #000;
    --white: #fff;
    --red: #FF3B30;
    --orange: #FF9500;
    --yellow: #FFCC00;
    --green: #34C759;
    --teal: #5AC8FA;
    --blue: #007AFF;
    --indigo: #5856D6;
    --purple: #AF52DE;
    --pink: #FF2D55;
    --grey0: #F7F7FA;
    --grey5: #F0F0F3;
    --grey10: #E6E4EA;
    --grey20: #D1CFD7;
    --grey30: #B8B6BF;
    --grey40: #9A99A2;
    --grey50: #77767E;
    --grey60: #4E4E53;
    --grey70: #232326;
    --gradient-primary: linear-gradient(to bottom, #1AC9FC, #1D73F1);
    --gradient-accent: linear-gradient(to bottom, #FF60AB, #FF2F21);
    --gradient-purple: linear-gradient(to bottom, #EB4DBF, #CB44F5);
    --gradient-pink: linear-gradient(to bottom, #FB5D6E, #D05CA9);
    --gradient-violet: linear-gradient(to bottom, #DD6291, #5D97F5);
    --gradient-grey: linear-gradient(to bottom, #A5AAB7, #848993);
}




.dz-clear {
    clear: both;
    display: block;
}

.dz-clear:after {
    clear: both;
    content: '';
    display: block;
}


.dz-flex-style {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dz-w-10{
    width: 10%;
}
.dz-w-20{
    width: 20%;
}
.dz-w-30{
    width: 30%;
}
.dz-w-40{
    width: 40%;
}
.dz-w-50{
    width: 50%;
}
.dz-w-60{
    width: 60%;
}
.dz-w-70{
    width: 70%;
}
.dz-w-80{
    width: 80%;
}
.dz-w-90{
    width: 90%;
}
.dz-w-100{
    width: 100%;
}
.dz-mt-20{
    margin-top: 20px;
}
.dz-mb-20{
    margin-bottom: 20px;
}
.dz-p0 {
    padding: 0 !important;
}
.dz-pl0{
    padding-left: 0 !important;
}
.dz-pr0{
    padding-right: 0 !important;
}
.dz-plr0{
    padding-right: 0 !important;
    padding-left: 0 !important;
}
/*===============================================
 preloader css 
================================================*/

.preloader{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: #1c1b2a;
    z-index: 9999;
}

div.spinner {
    position: absolute;
    width: 54px;
    height: 54px;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #1c1b2a;
    padding: 10px;
    border-radius: 10px;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
}
  
  div.spinner div {
    width: 6%;
    height: 16%;
    background: #FFF;
    position: absolute;
    left: 49%;
    top: 43%;
    opacity: 0;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -webkit-box-shadow: 0 0 3px rgba(0,0,0,0.2);
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
    -webkit-animation: fade 1s linear infinite;
    animation: fade 1s linear infinite;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
}
  
  @-webkit-keyframes fade {
    from {opacity: 1;}
    to {opacity: 0.25;}
  }
  @keyframes fade {
    from {opacity: 1;}
    to {opacity: 0.25;}
  }
  
  div.spinner div.bar1 {
    -webkit-transform:rotate(0deg) translate(0, -130%);
    transform:rotate(0deg) translate(0, -130%);
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }    
  
  div.spinner div.bar2 {
    -webkit-transform:rotate(30deg) translate(0, -130%); 
    transform:rotate(30deg) translate(0, -130%); 
    -webkit-animation-delay: -0.9167s;
    animation-delay: -0.9167s;
  }
  
  div.spinner div.bar3 {
    -webkit-transform:rotate(60deg) translate(0, -130%); 
    transform:rotate(60deg) translate(0, -130%); 
    -webkit-animation-delay: -0.833s;
    animation-delay: -0.833s;
  }
  div.spinner div.bar4 {
    -webkit-transform:rotate(90deg) translate(0, -130%); 
    transform:rotate(90deg) translate(0, -130%); 
    -webkit-animation-delay: -0.7497s;
    animation-delay: -0.7497s;
  }
  div.spinner div.bar5 {
    -webkit-transform:rotate(120deg) translate(0, -130%); 
    transform:rotate(120deg) translate(0, -130%); 
    -webkit-animation-delay: -0.667s;
    animation-delay: -0.667s;
  }
  div.spinner div.bar6 {
    -webkit-transform:rotate(150deg) translate(0, -130%); 
    transform:rotate(150deg) translate(0, -130%); 
    -webkit-animation-delay: -0.5837s;
    animation-delay: -0.5837s;
  }
  div.spinner div.bar7 {
    -webkit-transform:rotate(180deg) translate(0, -130%); 
    transform:rotate(180deg) translate(0, -130%); 
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
}
div.spinner div.bar8 {
    -webkit-transform:rotate(210deg) translate(0, -130%); 
    transform:rotate(210deg) translate(0, -130%); 
    -webkit-animation-delay: -0.4167s;
    animation-delay: -0.4167s;
}
div.spinner div.bar9 {
    -webkit-transform:rotate(240deg) translate(0, -130%); 
    transform:rotate(240deg) translate(0, -130%); 
    -webkit-animation-delay: -0.333s;
    animation-delay: -0.333s;
}
div.spinner div.bar10 {
    -webkit-transform:rotate(270deg) translate(0, -130%); 
    transform:rotate(270deg) translate(0, -130%); 
    -webkit-animation-delay: -0.2497s;
    animation-delay: -0.2497s;
}
div.spinner div.bar11 {
    -webkit-transform:rotate(300deg) translate(0, -130%); 
    transform:rotate(300deg) translate(0, -130%); 
    -webkit-animation-delay: -0.167s;
    animation-delay: -0.167s;
}
div.spinner div.bar12 {
    -webkit-transform:rotate(330deg) translate(0, -130%); 
    transform:rotate(330deg) translate(0, -130%); 
    -webkit-animation-delay: -0.0833s;
    animation-delay: -0.0833s;
}


/*===============================================
 appbar css 
================================================*/
.dz-pop .dz-appbar{
    padding: 55px 15px 11px 15px;
}
.dz-pop .dz-appbar button{
    display: flex;
    align-items: center;
}
.dz-pop .dz-appbar .dz-left{
    font-size: 17px;
    font-family: SFProReg;
    text-transform: capitalize;
    color: var(--blue);
}
.dz-pop .dz-appbar button i{
    font-size: 20px;
    margin-right: 8px;
}
.dz-pop .dz-appbar h1{
    font-size: 34px;
    line-height: 41px;
    font-family: SFProBold;
    text-transform: capitalize;
    color: var(--grey70);
    padding-top: 15px;
}
.dz-pop .dz-content{
    padding: 0 15px 100px 15px;
}
.dz-pop .dz-content img{
    width: 100%;
}
/*===============================================
 tab bar css 
================================================*/
.dz-pop .dz-tab-bar {
    background: #f7f7f7;
    border-top: 1px solid var(--grey10);
    box-sizing: border-box;
    padding: 5px 15px 34px 15px;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
}
.dz-pop .dz-tab-bar.dz-tab-icon{
    padding-top: 10px;
}
.dz-pop .dz-tab-bar .dz-bar-btn {
    color: var(--grey40);
}
.dz-pop .dz-tab-bar .dz-bar-btn i{
    font-size: 20px;
    color: var(--grey40);
}
.dz-pop .dz-tab-bar .dz-bar-btn.dz-active {
    color: var(--blue);
}

/*===============================================
 popup 1 css 
================================================*/
.dz-pop1 .dz-tab-bar .dz-active i{
    color: var(--pink);
}
/*===============================================
 popup 2 css 
================================================*/
.dz-pop2 .dz-appbar .dz-arrow i{
    color: var(--blue);
    font-size: 24px;
    padding-top: 15px;
}
/*===============================================
 popup 3 css 
================================================*/
.dz-pop3 .dz-tab-bar{
    bottom: 20px;
}
/*===============================================
 popup 4 css 
================================================*/
.dz-pop4:before{
    content: '';
    height: 100%;
    width: 100%;
    background: hsla(0, 0%, 0%, 0.24);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
}
/*===============================================
 popup 5 css 
================================================*/
.dz-pop5:before{
    content: '';
    height: 100%;
    width: 100%;
    background: hsla(0, 0%, 0%, 0.24);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    display: none;
}
.dz-pop5.dz-show:before{
    display: block;
}
/*===============================================
 popup dark css 
================================================*/
.dz-pop.dz-dark-mode{
    background: var(--grey70);
}
.dz-pop.dz-dark-mode .dz-appbar .dz-left{
    color: var(--grey0);
}
.dz-pop.dz-dark-mode .dz-appbar .dz-left i{
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.dz-pop.dz-dark-mode .dz-appbar h1{
    color: var(--white);
}
.dz-pop.dz-dark-mode .dz-tab-bar{
    background: var(--grey70);
    border-top: 1px solid var(--black);
}
.dz-pop1.dz-dark-mode .dz-tab-bar .dz-active i{
    color: var(--green);
}

/*===============================================
 nav css 
================================================*/

.dz-nav{
    border-radius: 13px;
    box-shadow: 0 16px 128px 0 hsla(240, 17%, 24%, 0.24);
}

.dz-nav ul li{
    padding: 0 15px;
}
.dz-nav ul li a{
    display: flex;
    align-items: center;
    width: 100%;
}
.dz-nav ul li .dz-text{
    text-align: left;
}

.dz-nav ul li .dz-text h3{
    font-size: 16px;
    line-height: 21px;
    font-family: SFProReg;
    font-weight: normal;
    text-transform: capitalize;
}
.dz-nav ul li .dz-text p{
    font-size: 13px;
    line-height: 18px;
    color: var(--grey40);
    font-family: SFProReg;
}

/*===============================================
 nav 1 css 
================================================*/

.dz-nav1{
    width: 277px;
    background: var(--white);
    position: fixed;
    bottom: 70px;
    right: 5px;
    opacity: 0;
    visibility: hidden;
    transition: all linear 0.2s;
    -webkit-transition: all linear 0.2s;
    -moz-transition: all linear 0.2s;
    -ms-transition: all linear 0.2s;
    -o-transition: all linear 0.2s;
    z-index: 9;
}
.dz-nav1.dz-show{
    opacity: 1;
    visibility: visible;
}
.dz-nav1 ul{
    padding: 8px 0;
}
.dz-nav1 .dz-top{
    border-bottom: 1px solid var(--grey10);
}
.dz-nav1 ul li{
    padding-top: 10px;
    padding-bottom: 9px;
}
.dz-nav1 ul li .dz-icon{
    height: 36px;
    width: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 6px;
    background: hsla(211, 100%, 50%, 0.10);
    margin-right: 9px;
}
.dz-nav1 ul li .dz-icon i{
    font-size: 20px;
    color: var(--blue);
}
.dz-nav1 ul li .dz-text h3{
    color: var(--blue);
}

.dz-nav1 ul .dz-del .dz-icon{
    background: hsla(349, 100%, 59%, 0.10);
}
.dz-nav1 ul .dz-del .dz-icon i{
    color: var(--pink);
}
.dz-nav1 ul .dz-del .dz-text h3{
    color: var(--pink);
}
.dz-nav1 ul .dz-del .dz-text p{
    color: var(--grey60);
}

/*===============================================
 nav 1 dark css 
================================================*/
.dz-pop1.dz-dark-mode .dz-nav1{
    background: var(--grey60);
}
.dz-pop1.dz-dark-mode .dz-nav1 .dz-top{
    border-color: hsla(240, 4%, 14%, 0.48);
}
.dz-pop1.dz-dark-mode .dz-nav1 ul li .dz-icon{
    background: hsla(255, 9%, 83%, 0.2);
}
.dz-pop1.dz-dark-mode .dz-nav1 ul li .dz-icon i {
    color: var(--white);
}
.dz-pop1.dz-dark-mode .dz-nav1 ul li .dz-text h3,
.dz-pop1.dz-dark-mode .dz-nav1 ul .dz-del .dz-text h3{
    color: var(--white);
}

.dz-pop1.dz-dark-mode .dz-nav1 ul .dz-del .dz-text p{
    color: var(--grey40);
}
.dz-pop1.dz-dark-mode .dz-nav1 ul .dz-del .dz-icon{
    background: hsla(35, 100%, 50%, 0.20);
}
.dz-pop1.dz-dark-mode .dz-nav1 ul .dz-del .dz-icon i{
    color: var(--orange);
}
/*===============================================
 nav 2 css 
================================================*/
.dz-nav2{
    width: 221px;
    background: var(--grey60);
    position: absolute;
    top: 130px;
    right: 0;
    transition: all linear 0.2s;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all linear 0.2s;
    -moz-transition: all linear 0.2s;
    -ms-transition: all linear 0.2s;
    -o-transition: all linear 0.2s;
    z-index: 9;
}
.dz-nav2.dz-show{
    opacity: 1;
    visibility: visible;
}
.dz-nav2 ul li{
    padding-top: 10px;
    padding-bottom: 10px;
}
.dz-nav2 .dz-top {
    padding-top: 6px;
    padding-bottom: 10px;
}
.dz-nav2 .dz-mid {
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid var(--grey50);
}

.dz-nav2 .dz-bottom{
    padding-top: 10px;
    padding-bottom: 6px;
    border-top: 1px solid var(--grey50);
}
.dz-nav2 ul li button{
    position: relative;
}
.dz-nav2 ul li .dz-icon{
    height: 28px;
    width: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 6px;
    background: hsla(260, 12%, 91%, 0.10);
    margin-right: 15px;
}
.dz-nav2 ul li .dz-icon i{
    font-size: 14px;
    color: var(--white);
}
.dz-nav2 ul li .dz-text h3{
    font-size: 17px;
    line-height: 22px;
    color: var(--white);
}
.dz-nav2 ul li .dz-text h3 span{
    color: var(--grey40);
}
.dz-nav2 ul li a{
    position: relative;
}
.dz-nav2 ul li .dz-more{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
.dz-nav2 ul li .dz-more i{
    color: var(--grey70);
}
.dz-nav2 ul .dz-del .dz-icon{
    background: hsla(35, 100%, 50%, 0.10);
}
.dz-nav2 ul .dz-del .dz-icon i{
    color: var(--orange);
}
.dz-nav2 ul .dz-del .dz-text h3{
    font-family: SFProSemiBold;
    color: var(--orange);
}
/*===============================================
 nav 2 dark css 
================================================*/
.dz-pop2.dz-dark-mode .dz-nav2 .dz-mid {
    border-color: hsla(240, 4%, 14%, 0.48);
}
.dz-pop2.dz-dark-mode .dz-nav2 .dz-bottom{
    border-color: hsla(240, 4%, 14%, 0.48);
}
.dz-pop2.dz-dark-mode .dz-nav2 ul li .dz-icon{
    background: transparent;
    margin-right: 12px;
}
.dz-pop2.dz-dark-mode .dz-nav2 ul .dz-del{
    background: hsla(35, 100%, 50%, 0.16);
    padding-top: 20px;
    padding-bottom: 16px;
    border-bottom-left-radius: 13px;
    border-bottom-right-radius: 13px;
}
.dz-pop2.dz-dark-mode .dz-nav2 .dz-bottom {
    padding-top: 0;
    padding-bottom: 0;
}

/*===============================================
 nav 3 css 
================================================*/
.dz-nav3{
    padding-bottom: 46px;
    background: var(--grey60);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    position: fixed;
    bottom: -295px;
    left: 0;
    transition: all linear 0.3s;
    -webkit-transition: all linear 0.3s;
    -moz-transition: all linear 0.3s;
    -ms-transition: all linear 0.3s;
    -o-transition: all linear 0.3s;
    z-index: 9;
    width: 100%;
}
.dz-nav3.dz-show{
    bottom: 0;
}
.dz-nav3 .dz-down-btn{
    width: 100%;
    text-align: center;
    padding: 4px 0;
}
.dz-nav3 ul li{
    padding: 10px 15px 9px 15px;
    display: flex;
    align-items: flex-start;
}
.dz-nav3 ul li:nth-child(1){
    margin-bottom: 8px;
}
.dz-nav3 ul li:nth-child(2){
    margin-bottom: 13px;
}
.dz-nav3 ul li .dz-icon{
    height: 36px;
    width: 36px;
    border-radius: 6px;
    text-align: center;
    line-height: 36px;
    margin-right: 9px;
}
.dz-nav3 ul li .dz-green{
    background: hsla(135, 59%, 49%, 0.10);
}
.dz-nav3 ul li .dz-green i{
    color: var(--green);
}
.dz-nav3 ul li .dz-orange{
    background: hsla(35, 100%, 50%, 0.10);
}
.dz-nav3 ul li .dz-orange i{
    color: var(--orange);
}
.dz-nav3 ul li .dz-blue{
    background: hsla(211, 100%, 50%, 0.10);
}
.dz-nav3 ul li .dz-blue i{
    color: var(--blue);
}
.dz-nav3 ul li .dz-text{
    width: calc(100% - 45px);
}
.dz-nav3 ul li .dz-text h3{
    color: var(--white);
}
/*===============================================
 nav 3 dark css 
================================================*/
.dz-pop3.dz-dark-mode .dz-nav3 ul li .dz-icon{
    background: hsla(240, 4%, 14%, 0.48);
}
/*===============================================
 nav 4 css 
================================================*/
.dz-pop4.dz-hide:before{
    display: none;
}
.dz-nav4{
    width: 100%;
    border-radius: 0;
    background: var(--white);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    left: 0;
    z-index: 9;
}
.dz-nav4.dz-hide{
    display: none;
}
.dz-nav4:after{
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    border-radius: 6px;
    background: var(--white);
    transform: rotate(45deg);
    top: -7px;
    left: 25px;
}

.dz-nav4 ul{
    padding: 16px 0;
}

.dz-nav4 ul li{
    display: flex;
    align-items: center;
    padding: 10px 15px 9px 15px;
    position: relative;
    margin-bottom: 16px;
}
.dz-nav4 ul li:last-child{
    margin-bottom: 0;
}
.dz-nav4 ul li .dz-icon{
    height: 36px;
    width: 36px;
    background: var(--white);
    border-radius: 6px;
    text-align: center;
    line-height: 36px;
    margin-right: 9px;
}
.dz-nav4 ul li .dz-icon i{
    font-size: 23px;
    color: var(--grey40);
}
.dz-nav4 ul li .dz-teal i{
    color: var(--teal);
}
.dz-nav4 ul li .dz-teal1 i{
    color: #82C5E6;
}
.dz-nav4 ul li .dz-text h3{
    color: var(--grey70);
}
.dz-nav4 .dz-icon-check,
.dz-nav4 .dz-more{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
}
.dz-nav4 .dz-more i{
    color: var(--grey40);
}
.dz-nav4 ul li.dz-checked .dz-icon{
    box-shadow: 0 4px 4px 0 hsla(349, 100%, 59%, 0.12);
}
.dz-nav4 ul li.dz-checked .dz-icon i,
.dz-nav4 ul li.dz-checked .dz-icon-check i{
    color: var(--pink);
}
.dz-nav4 ul li.dz-checked .dz-text h3{
    color: var(--pink);
}
/*===============================================
 nav 4 dark css 
================================================*/
.dz-pop4.dz-dark-mode .dz-nav4{
    background: var(--grey60);
}
.dz-pop4.dz-dark-mode .dz-nav4:after{
    background: var(--grey60);
}
.dz-pop4.dz-dark-mode .dz-nav4 ul li{
    position: relative;
}
.dz-pop4.dz-dark-mode .dz-nav4 ul li .dz-text h3{
    color: var(--white);
}
.dz-pop4.dz-dark-mode .dz-nav4 ul li.dz-checked .dz-text h3{
    color: var(--white);
    font-family: SFProSemiBold;
}
.dz-pop4.dz-dark-mode .dz-nav4 ul li .dz-icon{
    background: transparent;
    box-shadow: none;
}
.dz-pop4.dz-dark-mode .dz-nav4 ul li .dz-radio{
    opacity: 0;
    display: none;
}
.dz-pop4.dz-dark-mode .dz-nav4 ul li .dz-checkmark{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    cursor: pointer;
    height: 22px;
    width: 22px;
    border: 1px solid var(--grey70);
    border-radius: 50%;
}


.dz-pop4.dz-dark-mode .dz-nav4 ul li .dz-checkmark:after {
    content: "";
    position: absolute;
    display: none;
    top: -2px;
    left: -2px;
    width: 24px;
    height: 24px;
    background: url(../images/icon/checkmark.svg) no-repeat center;
    z-index: 9;
}
.dz-pop4.dz-dark-mode .dz-nav4 ul li .dz-radio:checked ~ .dz-checkmark:after {
    display: block;
}
.dz-pop4.dz-dark-mode .dz-nav4 .dz-option{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    display: block;
    width: fit-content;
}
/*===============================================
 nav 5 css 
================================================*/
.dz-nav5{
    width: 319px;
    background: var(--white);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    z-index: 9;
    display: none;
}
.dz-nav5.dz-show{
    display: block;
}
.dz-nav5 .dz-nav-title{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 15px;
}
.dz-nav5 .dz-nav-title h2{
    font-size: 34px;
    line-height: 41px;
    color: var(--grey70);
    font-family: SFProBold;
    text-transform: capitalize;
}
.dz-nav5 .dz-nav-title button i{
    color: var(--grey40);
    font-size: 16px;
}
.dz-nav5 ul{
    padding-bottom: 15px;
    padding-left: 15px;
}
.dz-nav5 ul li{
    display: flex;
    padding: 0;
    padding-right: 15px;
    border-bottom: 1px solid var(--grey10);
    position: relative;
}
.dz-nav5 ul li:last-child{
    border: 0;
}
.dz-nav5 ul li .dz-icon{
    margin-right: 15px;
    line-height: 50px;
}
.dz-nav5 ul li .dz-icon i{
    font-size: 20px;
    color: var(--blue);
    padding-left: 4px;
}
.dz-nav5 ul li .dz-num i{
    color: var(--teal);
    padding-left: 15px;
}
.dz-nav5 ul li .dz-teal i{
    color: var(--teal);
}
.dz-nav5 ul li .dz-grey i{
    color: var(--grey30);
}
.dz-nav5 ul li .dz-text h3{
    font-size: 17px;
    line-height: 50px;
    color: var(--grey70);
    font-family: SFProReg;
}
.dz-nav5 ul .dz-active .dz-text h3{
    font-family: SFProSemiBold;
}
.dz-nav5 ul li .dz-num {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
}
.dz-nav5 ul li .dz-num p{
    color: #82C5E6;
    font-size: 15px;
    line-height: 20px;
    font-family: SFProReg;
    padding-right: 4px;
}

/*===============================================
 nav 5 dark css 
================================================*/
.dz-pop5.dz-dark-mode .dz-nav5{
    width: 319px;
    background: var(--grey60);
}
.dz-pop5.dz-dark-mode .dz-nav5 .dz-nav-title h2{
    color: #fff;
}
.dz-pop5.dz-dark-mode .dz-nav5 ul{
    padding-left: 0;
}
.dz-pop5.dz-dark-mode .dz-nav5 ul li{
    padding: 0 15px;
    border: 0;
}
.dz-pop5.dz-dark-mode .dz-nav5 ul li .dz-text h3 {
    color: var(--white);
}
.dz-pop5.dz-dark-mode .dz-nav5 ul li{
    position: relative;
}
.dz-pop5.dz-dark-mode .dz-nav5 ul li.dz-border{
    border-bottom: 1px solid var(--grey70);
}
.dz-pop5.dz-dark-mode .dz-nav5 .dz-more{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
}
.dz-pop5.dz-dark-mode .dz-nav5 ul li .dz-num p{
    color: var(--green);
}


@media (min-width:250px) and (max-width:374px) {
    
}
