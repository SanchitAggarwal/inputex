YUI.add("inputex-menu",function(e,t){var n=e.inputEx,r=e.Lang,i=e.substitute,s=e.Node.create,o="vertical",u="horizontal";n.MenuField=function(e){n.MenuField.superclass.constructor.call(this,e)},n.MenuField.MENU_TEMPLATE='<div class="yui3-menu" id="{menu_id}"><div class="yui3-menu-content"><ul>{menu_items}</ul></div></div>',n.MenuField.MENU_ITEM_TEMPLATE='<li class="{item_class}"><a href="{href}" class="{label_class}">{label}</a>{submenu}</li>',e.extend(n.MenuField,n.Field,{setOptions:function(e){n.MenuField.superclass.setOptions.call(this,e),this.options.className=e.className?e.className:"inputEx-Field inputEx-MenuField",this.options.typeInvite=e.typeInvite||n.messages.menuTypeInvite,this.options.colorInvite=e.colorInvite||"FFFFFF",this.options.menuTrigger=e.menuTrigger||"click",this.options.menuOrientation=e.menuOrientation||o,this.options.menuItems=e.menuItems,this.options.menuConfig=e.menuConfig||{autoSubmenuDisplay:this.options.menuTrigger=="mouseover"}},renderComponent:function(){this.hiddenEl=n.cn("input",{type:"hidden",name:this.options.name||"",value:this.options.value||""}),this.fieldContainer.appendChild(this.hiddenEl),this.renderMenu(this.fieldContainer),this.setBackgroundColorOfRootLabel(this.options.colorInvite)},renderMenu:function(t){var o=this;this._textFromValue={};var a=function(e,t,s){if(s>5)throw new Error("MenuField : too much recursion, menuItems property should be 5 level deep at most.");var u="",f=t.length,l,c,h;for(h=0;h<f;h++)l=t[h],r.isUndefined(l.text)&&!r.isUndefined(l.value)&&(l.text=l.value),r.isUndefined(l.value)&&!r.isUndefined(l.text)&&(l.value=l.text),c={label:l.text,href:"#"+l.value,submenu:"",label_class:"yui3-menuitem-content",item_class:l.classname},r.isUndefined(l.submenu)?(c.item_class+=" yui3-menuitem",o._textFromValue[l.value]=l.text):(c.label_class="yui3-menu-label",c.submenu=a(l.value,l.submenu.itemdata,s+1)),u+=i(n.MenuField.MENU_ITEM_TEMPLATE,c);return i(n.MenuField.MENU_TEMPLATE,{menu_id:e,menu_items:u})};if(!this.options.menuItems)throw new Error("Missing 'menuItems' property in options");this._menu=s(a(e.guid(),[{text:this.options.typeInvite,submenu:{itemdata:this.options.menuItems}}],0)),this.options.menuOrientation===u&&this._menu.addClass("yui3-menu-horizontal  yui3-menubuttonnav"),this._rootItemLabel=this._menu.one(".yui3-menu-label"),this.options.menuOrientation===u&&(this._rootItemLabel.setContent("<em>"+this.options.typeInvite+"</em>"),this._rootItemLabel=this._rootItemLabel.one("em")),this._menu.plug(e.Plugin.NodeMenuNav,this.options.menuConfig),this._menu.appendTo(t)},initEvents:function(){var t=this;this._menu.delegate("click",e.bind(this.onItemClick,this),"a"),this.options.menuTrigger=="click"&&this._menu.menuNav._rootMenu.on(["mousedown","click"],function(e){var n=t._menu.menuNav;n._toggleSubmenuDisplay.call(n,e)},this._menu.menuNav)},setBackgroundColorOfRootLabel:function(e){this._menu.one(".yui3-menu-label").setStyle("backgroundColor",e)},onItemClick:function(e){var t=e.currentTarget,n;e.preventDefault(),t.hasClass("yui3-menuitem-content")&&(n=t.getAttribute("href",2),this.setValue(n.substr(n.indexOf("#")+1),!0),this._menu.menuNav._hideAllSubmenus(this._menu.menuNav._rootMenu))},getValue:function(){return this.hiddenEl.value},setValue:function(e,t){this._rootItemLabel.setContent(this._textFromValue[e]||this.options.typeInvite),this.hiddenEl.value=this._textFromValue[e]?e:"",n.MenuField.superclass.setValue.call(this,e,t)}}),n.registerType("menu",n.MenuField)},"@VERSION@",{requires:["inputex-field","node-event-delegate","node-menunav","substitute"],skinnable:!0,ix_provides:"menu"});
