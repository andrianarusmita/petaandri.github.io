// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/_base/array dojo/_base/Deferred jimu/utils jimu/portalUrlUtils jimu/LayerInfos/LayerInfos esri/request esri/kernel esri/symbols/PictureMarkerSymbol esri/symbols/jsonUtils".split(" "),function(h,k,r,n,t,u,v,w,x,y){return{getDefaultPopupInfo:function(a,b,c){var f={title:"",fieldInfos:[],description:null,showAttachments:!1,mediaInfos:[]};c=!!c;if(a.displayField){var d=this._getRealFieldName(a.displayField,a);f.title="{"+d+"}"}else if(d=n.getObjectIdField(a))f.title="{"+d+
"}";f.showAttachments=!!a.hasAttachments;d=a=a.fields;b||(d=k.filter(a,h.hitch(this,function(e){return"esriFieldTypeGeometry"!==e.type})));b=k.map(d,h.hitch(this,function(e){e=n.getDefaultPortalFieldInfo(e);e.visible=c;return e}));f.fieldInfos=b;return f},_getRealFieldName:function(a,b){a=a.toUpperCase();if(b.fields&&0<b.fields.length)for(var c=0;c<b.fields.length;c++)if(b.fields[c].name.toUpperCase()===a)return b.fields[c].name;return""},getPortalFieldInfosWithoutShape:function(a,b){return k.filter(b,
h.hitch(this,function(c){return(c=n.getFieldInfoByFieldName(a.fields,c.fieldName))?"esriFieldTypeGeometry"!==c.type:!0}))},getPopupInfoByAttributes:function(a,b){var c=this.getDefaultPopupInfo(a,!1),f=[],d={},e;for(e in b){f.push(e);var g=n.getFieldInfoByFieldName(a.fields,e).type;if("esriFieldTypeSingle"===g||"esriFieldTypeDouble"===g)g=b[e],null!==g&&void 0!==g&&(g=parseFloat(g),isNaN(g)||(g=g.toString().split("."),2===g.length&&(d[e]=g[1].length)))}c.fieldInfos=k.filter(c.fieldInfos,h.hitch(this,
function(p){var m=p.fieldName;d.hasOwnProperty(m)&&(p.format.places=d[m]);return f.indexOf(m)}));return c},upgradePopupToPopupInfo:function(a,b){var c=this.getDefaultPopupInfo(a,!1,!1);c.title=b.title||"";c.title=c.title.replace("${","{");if(b.fields){var f={};k.forEach(b.fields,h.hitch(this,function(d){f[d.name]=d}));k.forEach(c.fieldInfos,h.hitch(this,function(d){var e=d.fieldName,g=f[e];g&&(d.label=g.alias||d.label,d.visible=!0,"image"===g.specialType&&(e="{"+e+"}",c.mediaInfos.push({title:"",
type:"image",caption:d.label,value:{sourceURL:e,linkURL:e}})))}))}return c},isImageServiceLayer:function(a){return a.url&&-1<a.url.indexOf("/ImageServer")},isTable:function(a){return"Table"===a.type},getConfigWithValidDataSource:function(a){a=h.clone(a);var b=u.getInstanceSync();a.queries=k.filter(a.queries,h.hitch(this,function(c){return(c=c.webMapLayerId)?b.getLayerInfoById(c)?!0:!!b.getTableInfoById(c):!0}));return a},removePopupInfoUnsupportFields:function(a,b){var c=k.map(a.fields,h.hitch(this,
function(f){return f.name}));b.fieldInfos&&0<b.fieldInfos.length&&(b.fieldInfos=k.filter(b.fieldInfos,h.hitch(this,function(f){return 0<=c.indexOf(f.fieldName)})))},overridePopupTemplateMethodGetAttachments:function(a,b,c){a.getAttachments=function(f){var d=new r;try{var e=f.attributes[c],g=b+"/"+e+"/attachments";f={url:g,content:{f:"json"},callbackParamName:"callback"};var p="",m=w.id.findCredential(b);m&&m.token&&(p="?token\x3d"+m.token);v(f).then(function(l){l=l.attachmentInfos;k.forEach(l,function(q){q.url=
g+"/"+q.id+p;q.objectId=e});d.resolve(l)},function(l){d.reject(l)})}catch(l){console.error(l)}return d}},isServiceSupportsOrderBy:function(a){var b=!1;a.advancedQueryCapabilities&&a.advancedQueryCapabilities.supportsOrderBy&&(b=!0);return b},isServiceSupportsPagination:function(a){var b=!1;a.advancedQueryCapabilities&&a.advancedQueryCapabilities.supportsPagination&&(b=!0);return b},isSupportObjectIds:function(a){var b=0,c=n.getObjectIdField(a);a.currentVersion&&(b=parseFloat(a.currentVersion));return!!c&&
(10<=b||a.hasOwnProperty("typeIdField"))},getQueryType:function(a){var b=-1;return b=this.isServiceSupportsOrderBy(a)&&this.isServiceSupportsPagination(a)?1:this.isSupportObjectIds(a)?2:3},getWebMapPopupInfoByUrl:function(a,b){var c=null;b=b.replace(/\/*$/g,"");var f=t.removeProtocol(b);k.some(a.operationalLayers,h.hitch(this,function(d){if(d&&d.url){var e=t.removeProtocol(d.url.replace(/\/*$/g,""));if(d.popupInfo){if(e===f)return c=d.popupInfo,!0}else if(d.layers&&0<d.layers.length)return k.some(d.layers,
h.hitch(this,function(g){return e+"/"+g.id===f?(c=d.popupInfo,!0):!1}))}return!1}));return c},getPopupInfoForRelatedLayer:function(a,b,c){(a=this.getWebMapPopupInfoByUrl(a,b))||(a=this.getDefaultPopupInfo(c,!1,!0));!a.title&&(c=n.getObjectIdField(c))&&(a.title="{"+c+"}");return a},dynamicUpdateConfigIcon:function(a,b){b=window.location.protocol+"//"+window.location.hostname+b;a.icon&&"object"===typeof a.icon?a.icon=y.fromJson(a.icon):"string"===typeof a.icon&&(b=new x({yoffset:16,type:"picturemarkersymbol",
url:a.icon?a.icon:b,width:24,height:24,size:16,xoffset:0}),a.icon=b)},tryGetLayerObject:function(a){var b=new r;if(!a)return b.resolve(),b;a=this._tryGetLayerInfo(a);if(!a)return console.error("Invalid data source"),b.resolve(),b;a.getLayerObject().then(function(c){b.resolve(c)}.bind(this),function(c){b.reject(c)});return b},_tryGetLayerInfo:function(a){var b=u.getInstanceSync(),c=b.getLayerInfoById(a);c||(c=b.getTableInfoById(a));return c}}});