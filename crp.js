/*
 * @version		0.1
 * @date Crea	23/04/2013.
 * @date Modif	11/04/2014.
 * @package		jquery.crp.min.js
 * @contact		chagry.com - git@chagry.com
 * @Func Crypt	$.crp.crypte('Text', 'Key');
 * @Func Decry	$.crp.decrypte('Text', 'Key');
 * @Dependence	jquery.md5.min.js - jquery.base64.min.js
 */
function generationCle(t,k){var keyCrypt=$.md5(k);var compt=0;var tmp='';for(var i=0,c=t.length;i<c;i++){if(compt==keyCrypt.length){compt=0;}tmp+=String.fromCharCode(t.charCodeAt(i) ^ keyCrypt.charCodeAt(compt));compt++;}return tmp;};(function($,undefined){$.extend({crp:{crypte:function(t,k){var keyCrypt = $.md5(Math.round(Math.random()*3200000));var compt=0;var tmp='';for (var i=0,c=t.length;i<c;i++){if(compt==keyCrypt.length){compt=0;}tmp+=keyCrypt.substr(compt,1)+String.fromCharCode(t.charCodeAt(i) ^ keyCrypt.charCodeAt(compt));compt++;}return $.base64.encode(generationCle(tmp,k));},decrypte:function(t,k){var texte=generationCle($.base64.decode(t),k);var tmp='';for(var i=0,c=texte.length;i<c;i++){var md5 = texte.charCodeAt(i);i++;tmp+=String.fromCharCode(texte.charCodeAt(i)^md5);}return tmp;}}});})(jQuery);
