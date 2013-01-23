if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-datatable/inputex-datatable.js",
    code: []
};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].code=["YUI.add('inputex-datatable', function (Y, NAME) {","","/*global Y:true,confirm:true*/","","/**"," * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin."," * @module inputex-datatable"," */","","var inputEx = Y.inputEx;","","Y.namespace('inputEx.Plugin');","","/**","* Provide add/modify/delete functionalities on a dataTable as a plugin","* @class inputEx.Plugin.InputExDataTable","* @extends Plugin.Base","* @constructor","* @param {Object} configuration object","*/","inputEx.Plugin.InputExDataTable = function (config) {","   inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);","};","","inputEx.Plugin.InputExDataTable.NS = \"InputExDataTable\";","","Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {","   ","   /**","    * @method initializer","    */","   initializer: function () {","","      var host = this.get(\"host\");","","      // enrich data (Model instance) with modify and delete attributs","      this.enrichData();","      ","      // enrich DataTable with modify and delete columns","      this.enrichColumns();","","      // add a button called \"add\" in order to add record in the DataTable","      this.addAddButton();","        ","      if(!this.get(\"disableModifyFunc\")) {","         // handle row modification","         host.delegate(\"click\",this.modifyRecord, \"td.\"+host.getClassName('cell-modify'), this);","      }","","      if(!this.get(\"disableDeleteFunc\")) {","         // handle row removal","         host.delegate(\"click\",this.deleteRecord, \"td.\"+host.getClassName('cell-delete'), this);","      }","      ","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').addClass( host.getClassName('inplaceedit') );","         this.setupInplaceEditing();","      }","","    },","","","   setupInplaceEditing: function() {","      var host = this.get('host');","","      // Delegate click event to make the inplace editor appear","      this.cellClickHandler = host.delegate(\"click\", this.onCellClick, \".\"+host.getClassName('cell'), this);","","      this.after('editorShow', this._onEditorShow, this);","","   },","","   _onEditorShow: function() {","      this.get('inplaceOverlay').show();","   },","","   onCellClick: function(e) {","","      var findTd = function(n) { return n.get('tagName') === 'TD' && n.hasClass('yui3-datatable-cell'); },","          td = findTd(e.target) ? e.target : e.target.ancestor(findTd), // this might be a DIV because of a formatter (see color)","          host = this.get('host'),","          colIndex = td.get('parentNode').get('children').indexOf(td),","          column = host.getColumn(colIndex),","          record = host.getRecord(td),","          key = column.key,","          value = record.get(key),","","          overlay = this.get('inplaceOverlay'),","","          // inputEx Field config","          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { return i.name === key; }),","          conf = Y.mix({","            parentEl: this.overlayFieldContainer.getDOMNode()","          }, fieldConf),","          field;","","      // When we changed the value of an overlay but click on another cell, it doesn't save automatically","      // since the event is stopped. So we do it manually here.","      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision","      if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","         this.onOverlaySave();","      }","","      if( !fieldConf ||","          fieldConf.type === \"uneditable\" ||","          td.hasClass('yui3-datatable-cell-delete') ||","          td.hasClass('yui3-datatable-cell-modify') ) {","         return;","      }","","      e.stopPropagation();","","      // Align","      overlay.align(td, [\"tl\", \"tl\"]);","","      // Render field","      this.overlayFieldContainer.set('innerHTML', '');","      field = new Y.inputEx(conf);","      field.setValue(value);","      field.focus();","","      this._inplaceeditCell = {","         record: record,","         key: column.key,","         field: field,","         td: td","      };","","      // TODO: fire an event editorShow","      this.fire('editorShow', {","         column: column,","         record: record,","         key: key,","         value: value,","         cell: td,","         field: field","      });","","   },","","","   _initInplaceOverlay: function() {","","      var o = new Y.Overlay({","            zIndex: 5","          }),","          contentBox = o.get('contentBox'),","          overlayFieldContainer = Y.Node.create(\"<div />\"),","          overlayButtonsContainer = Y.Node.create(\"<div class='editor-buttons' />\"),","          saveButton,","          cancelButton;","","      contentBox.appendChild(overlayFieldContainer);","      this.overlayFieldContainer = overlayFieldContainer;","","      contentBox.appendChild(overlayButtonsContainer);","","      // Overlay save and cancel buttons","      saveButton = Y.Node.create('<button>Sauver</button>');","      overlayButtonsContainer.appendChild(saveButton);","","      saveButton.addClass('yui3-button');","      saveButton.addClass('yui3-button-primary');","","      cancelButton = Y.Node.create('<button>Annuler</button>');","","      cancelButton.addClass('yui3-button');","      cancelButton.addClass('yui3-button-link');","","","      overlayButtonsContainer.appendChild(cancelButton);","      saveButton.on('click', this.onOverlaySave, this);","      cancelButton.on('click', this.onOverlayCancel, this);","","      // Close overlay if click outside of the overlay","      this.docClickHandler = Y.on('click', Y.bind(function(e) {","         var overlay = this.get('inplaceOverlay');","","         if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {","            this.onOverlaySave();","         }","      }, this), Y.config.doc);","","      contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));","","      o.hide();","      o.render();","      return o;","   },","","   onOverlaySave: function() {","","      // Call the updateMethod async method","      var updateMethod = this.get('updateMethod'),","          field = this._inplaceeditCell.field,","          newValue = field.getValue(),","          record = this._inplaceeditCell.record,","          key = this._inplaceeditCell.key,","          oldValue = record.get(key),","          fieldValues = {},","          id = record.get('id'),","          host = this.get('host'),","          td = this._inplaceeditCell.td;","","      if(!field.validate()) {","         return;","      }","","      // has not changed => don't do anything","      if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||","            (newValue === oldValue) ) {","         this.get('inplaceOverlay').hide();","         return;","      }","","      fieldValues[key] = newValue;","","      td.addClass( host.getClassName('cell-edited') );","","      updateMethod.call(this, id, fieldValues, Y.bind(function(success) {","         if (success) {","            // on success, update the record in the datatable","            host.get(\"data\").getById(id).setAttrs(fieldValues);","            td.removeClass( host.getClassName('cell-edited') );","         }","      },this));","","      this.get('inplaceOverlay').hide();","   },","","   onOverlayCancel: function() {","      this.get('inplaceOverlay').hide();","   },","","   /**","    * add Attributes on the data model depending on the plugin configuration","    *","    * @method enrichData","    */","   enrichData: function () {","","      var that = this,","          data = this.get(\"host\").get(\"data\");","","      data.each(function (model) {","         if(!this.get(\"disableModifyFunc\")) {","            that.addModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")){","            that.addDeleteAttr(model);","         }","      });","","   },","","   /**","    * add Columns on the DataTable depending on the plugin configuration","    *","    * @method enrichColumns","    */","   enrichColumns: function () {","","      if(!this.get(\"disableModifyFunc\")) {","         this.addModifyColumn();","      }","      ","      if(!this.get(\"disableDeleteFunc\")) {","         this.addDeleteColumn();","      }","   },","","   /**","    * Provide the add button in order to add record on the DataTable","    *","    * @method addAddButton","    */","   addAddButton: function() {","","      if(!this.get(\"disableAddFunc\")) {","      ","         var buttonHtml = \"<button class='yui3-button'>\"+this.get(\"strings\").addButtonText+\"</button>\",","             button = Y.Node.create(buttonHtml);","","         this.addButton = button;","","         this.get(\"host\").get(\"contentBox\").append(button);","         ","         button.on(\"click\", this._onAddButtonClick, this);","      }","   ","   },","","   _onAddButtonClick: function (e) {","      var panel = this.get(\"panel\");","","      e.stopPropagation();","","      panel.set(\"headerContent\",this.get(\"strings\").addItemHeader);","      panel.get(\"field\").clear();","      panel.show();","   },","","   /**","    *","    * @method modifyRecord","    */","   modifyRecord: function(e) {","      ","      e.stopPropagation();","      ","      var record = this.get(\"host\").getRecord(e.currentTarget),","          panel = this.get(\"panel\");","","      panel.set(\"headerContent\",this.get(\"strings\").modifyItemHeader);","      panel.get('field').setValue(record.getAttrs());","      panel.show();","   },","","   /**","    * Called when the user clicked on a link to delete a record","    * @method deleteRecord","    */","   deleteRecord: function(e) {","      e.stopPropagation();","      var deleteMethod,","          host = this.get('host'),","          record = host.getRecord(e.currentTarget),","          row;","      if (!this.get(\"confirmDelete\") || confirm(this.get(\"strings\").confirmDeletion)) {","","         // Call the deleteMethod async method","         deleteMethod = this.get('deleteMethod');","","         row = host.getRow(record);","         row.addClass( host.getClassName('row-edited') );","","         deleteMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               // on success, remove the record from the datatable","               host.get(\"data\").remove(record);","            }","         },this));","","      }","   },","","   /**","    *","    * @method deleteExtraColumns","    */","   deleteExtraColumns: function() {","      ","      if(!this.get(\"disableModifyFunc\")) {","         this.removeModifyColumn();","      }","      if(!this.get(\"disableDeleteFunc\")) {","         this.removeDeleteColumn();","      }","   },","","   /**","    *","    * @method _initPanel","    * @private","    */","   _initPanel: function () {","","      var opts = Y.mix({}, this.get('panelOptions') );","","      var panel = new Y.inputEx.Panel( Y.mix(opts, {","         inputEx: this.get(\"inputEx\"),","         buttons: {","            header: ['close'],","","            footer: [","               {","                  value: this.get(\"strings\").saveText,","                  action: Y.bind(this.onPanelSaveButton, this),","                  classNames: 'yui3-button-primary'","               },","               {","                  value: this.get(\"strings\").cancelText,","                  action: Y.bind(this.onPanelCancelButton, this),","                  classNames: 'yui3-button-link'","               }","            ]","         }","      }) );","","      // first the panel needs to be \"render\" then \"show\"","      panel.render();","      return panel;","   },","","   onPanelCancelButton: function (e) {","      e.preventDefault();","      this.get('panel').hide();","   },","","   onPanelSaveButton: function (e) {","      e.preventDefault();","","      var field = this.get(\"panel\").get(\"field\"),","         fieldValues = field.getValue(),","         host = this.get(\"host\"),","         record,","         RecordType,","         updateMethod,","         row,","         addMethod;","","      if (!field.validate()) {","         return;","      }","","      // Modification","      if (fieldValues.id) {","","         // Call the updateMethod async method","         updateMethod = this.get('updateMethod');","","         record = host.get(\"data\").getById(fieldValues.id);","         row = host.getRow(record);","         row.addClass( host.getClassName('row-edited') );","","         updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {","            if (success) {","               // on success, update the record in the datatable","               host.get(\"data\").getById(fieldValues.id).setAttrs(fieldValues);","               this.get('panel').hide();","               row.removeClass( host.getClassName('row-edited') );","            }","         },this));","","      }","      // Creation","      else {","","         fieldValues.id = this.generateId(this.get(\"idSize\"));","         RecordType = host.get(\"recordType\");","         record = new RecordType();","         record.setAttrs(fieldValues);","         this.addModifyAttr(record);","         this.addDeleteAttr(record);","","         // call the async method to create a record","         addMethod = this.get('addMethod');","         addMethod.call(this, record, Y.bind(function(success) {","            if (success) {","               // if success, add the record in the datatable","               host.get(\"data\").add(record);","               this.get('panel').hide();","            }","         },this));","","      }","","   },","","   /**","    *","    * @method destructor","    */","   destructor: function() {","","      var that = this,","          host = this.get('host'),","          data = host.get(\"data\");","","      data.each(function (model) {","","         if(!this.get(\"disableModifyFunc\")) {","            that.delModifyAttr(model);","         }","         if(!this.get(\"disableDeleteFunc\")) {","            that.delDeleteAttr(model);","         }","","      });","      ","      this.deleteExtraColumns();","      ","      if(!this.get(\"disableAddFunc\")) {","         this.addButton.remove();","      }","","      if(this.get(\"inplaceedit\")) {","         host.get('contentBox').removeClass( host.getClassName('inplaceedit') );","         this.cellClickHandler.detach();","","         if (this.docClickHandler) {","            this.docClickHandler.detach();","         }","      }","","      this.get(\"panel\").destroy();","   },","","","   /**","    * Add the modify attribute on the data model","    *","    * @method addModifyAttr","    */","   addModifyAttr: function(model) {","      model.addAttr(\"modify\");","   },","","   /**","    * Add the delete attribute on the data model","    *","    * @method addDeleteAttr","    */","   addDeleteAttr: function (model) {","      model.addAttr(\"delete\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delModifyAttr","    */","   delModifyAttr: function(model) {","      model.removeAttr(\"modify\");","   },","","   /**","    * Remove the modify attribute from the data model","    *","    * @method delDeleteAttr","    */","   delDeleteAttr: function (model) {","      model.removeAttr(\"delete\");","   },","","   /**","    * Add the modify column on the DataTable","    *","    * @method addModifyColumn","    */","   addModifyColumn: function() {","","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").modifyText,","         className: host.getClassName('cell-modify'),","         formatter: this.get('modifyColumnFormatter'),","         nodeFormatter: this.get('modifyColumnNodeFormatter')","      });","","   },","   ","   /**","    * Add the delete column on the DataTable","    *","    * @method addDeleteColumn","    */","   addDeleteColumn: function() {","      ","      var host = this.get('host');","         ","      host.addColumn({","         label: ' ',","         key: this.get(\"strings\").deleteText,","         className: host.getClassName('cell-delete'),","         formatter: this.get('deleteColumnFormatter'),","         nodeFormatter: this.get('deleteColumnNodeFormatter')","      });","   },","","   /**","    * Remove the modify column from the DataTable","    *","    * @method removeModifyColumn","    */","   removeModifyColumn: function() {","      this.get(\"host\").removeColumn(\"modify\");","   },","","   /**","    * Remove the delete column from the DataTable","    *","    * @method removeDeleteColumn","    */","   removeDeleteColumn: function() {","      this.get(\"host\").removeColumn(\"delete\");","   },","","","   generateId : function(size) {","      var prefixId = this.get(\"prefixId\"),","          s = size ? size : 5;","      prefixId = prefixId ? prefixId : \"\";","      return prefixId + Math.floor(Math.random()*Math.pow(10,s));","   },","   ","   _initStrings : function() {","      return Y.Intl.get(\"inputex-datatable\");","   }","","}, {","","/**"," * Static property used to define the default attribute configuration of"," * the Plugin."," *"," * @property ATTRS"," * @type {Object}"," * @static"," */","ATTRS: {","","   /**","    * This is an inputEx field definition. This is used when a user try to create/modify a record","    *","    * @attribute inputEx","    */","   inputEx: {},","","","   /**","    * This string is inserted before the generated id","    *","    * @attribute prefixId","    * @type String","    * @example prefixId : \"po-\" --> id = po-1342561","    */","   prefixId: {","     value: \"\"","   },","","   /**","    * This represents the number of digits used in the id generation","    *","    * @attribute idSize","    * @type Number","    */","   idSize: {","     value: 5","   },","","   /**","    * If true the add functionality is disabled","    *","    * @attribute disableAddFunc","    * @type boolean","    */","   disableAddFunc: {","     value: false","   },","","   /**","    * If true the modify functionality is disabled","    * @attribute disableModifyFunc","    * @type boolean","    */","   disableModifyFunc: {","     value: false","   },","","   /**","    * If true the delete functionality is disabled","    *","    * @attribute disableDeleteFunc","    * @type boolean","    */","   disableDeleteFunc: {","     value: false","   },","","   /**","    * Labels of the plugin","    *","    * @attribute modifyColumnLabel","    */","   strings : {","     value : null,","     valueFn : '_initStrings'","   },","","   /**","    * If true a confirmation will be asked to the user when a delete attempt appear","    *","    * @attribute confirmDelete","    * @type boolean","    */","   confirmDelete: {","     value: true","   },","","   /**","    * This panel will be displayed on record creation/modication","    * @attribute panel","    * @type Y.inputEx.Panel","    */","   panel: {","     valueFn: '_initPanel',","     lazyAdd: true","   },","","   panelOptions: {","      value: {","         centered: true,","         width: 500,","         modal: true,","         zIndex: 5,","         visible: false","      }","   },","","   /**","    * Set to true if you want to activate in-cell editing (ALPHA)","    * @attribute inplaceedit","    * @atype boolean","    */","   inplaceedit: {","      value: false","   },","","   /**","    * Overlay used for the inplace editing","    * @attribute inplaceOverlay","    * @type Y.Overlay","    */","   inplaceOverlay: {","     valueFn: '_initInplaceOverlay',","     lazyAdd: true","   },","","   /**","    * Function used to confirm the creation of a new record.","    * You can perform validation and/or ajax creation.","    * addMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute addMethod","    * @type function","    */","   addMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the modification of an existing record.","    * You can perform validation and/or ajax update.","    * updateMethod must be a function(id, newValues, cb) which calls 'cb' with success status as first argument","    * @attribute updateMethod","    * @type function","    */","   updateMethod: {","      value: function(id, newValues, cb) {","         cb(true);","      }","   },","","   /**","    * Function used to confirm the deletion of an existing record.","    * You can perform validation and/or ajax deletion.","    * deleteMethod must be a function(record, cb) which calls 'cb' with success status as first argument","    * @attribute deleteMethod","    * @type function","    */","   deleteMethod: {","      value: function(record, cb) {","         cb(true);","      }","   },","","   /**","    * Formatter for the modify column","    * @attribute modifyColumnFormatter","    * @type function","    */","   modifyColumnFormatter: {","      value: null","   },","","   /**","    * Formatter for the delete column","    * @attribute deleteColumnFormatter","    * @type function","    */","   deleteColumnFormatter: {","      value: null","   },","","   /**","    * nodeFormatter for the modify column","    * @attribute modifyColumnNodeFormatter","    * @type function","    */","   modifyColumnNodeFormatter: {","      value: null","   },","","   /**","    * nodeFormatter for the delete column","    * @attribute deleteColumnNodeFormatter","    * @type function","    */","   deleteColumnNodeFormatter: {","      value: null","   }","","}","","});","","","}, '@VERSION@', {","    \"requires\": [","        \"inputex-group\",","        \"inputex-panel\",","        \"datatable\",","        \"overlay\",","        \"intl\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\",","        \"de\",","        \"ca\",","        \"es\",","        \"fr\",","        \"it\",","        \"nl\"","    ]","});"];
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].lines = {"1":0,"10":0,"12":0,"21":0,"22":0,"25":0,"27":0,"34":0,"37":0,"40":0,"43":0,"45":0,"47":0,"50":0,"52":0,"56":0,"57":0,"58":0,"65":0,"68":0,"70":0,"75":0,"80":0,"92":0,"101":0,"102":0,"105":0,"109":0,"112":0,"115":0,"118":0,"119":0,"120":0,"121":0,"123":0,"131":0,"145":0,"154":0,"155":0,"157":0,"160":0,"161":0,"163":0,"164":0,"166":0,"168":0,"169":0,"172":0,"173":0,"174":0,"177":0,"178":0,"180":0,"181":0,"185":0,"187":0,"188":0,"189":0,"195":0,"206":0,"207":0,"211":0,"213":0,"214":0,"217":0,"219":0,"221":0,"222":0,"224":0,"225":0,"229":0,"233":0,"243":0,"246":0,"247":0,"248":0,"250":0,"251":0,"264":0,"265":0,"268":0,"269":0,"280":0,"282":0,"285":0,"287":0,"289":0,"295":0,"297":0,"299":0,"300":0,"301":0,"310":0,"312":0,"315":0,"316":0,"317":0,"325":0,"326":0,"330":0,"333":0,"335":0,"336":0,"338":0,"339":0,"341":0,"354":0,"355":0,"357":0,"358":0,"369":0,"371":0,"392":0,"393":0,"397":0,"398":0,"402":0,"404":0,"413":0,"414":0,"418":0,"421":0,"423":0,"424":0,"425":0,"427":0,"428":0,"430":0,"431":0,"432":0,"440":0,"441":0,"442":0,"443":0,"444":0,"445":0,"448":0,"449":0,"450":0,"452":0,"453":0,"467":0,"471":0,"473":0,"474":0,"476":0,"477":0,"482":0,"484":0,"485":0,"488":0,"489":0,"490":0,"492":0,"493":0,"497":0,"507":0,"516":0,"525":0,"534":0,"544":0,"546":0,"563":0,"565":0,"580":0,"589":0,"594":0,"596":0,"597":0,"601":0,"742":0,"755":0,"768":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].functions = {"InputExDataTable:21":0,"initializer:32":0,"setupInplaceEditing:64":0,"_onEditorShow:74":0,"findTd:80":0,"(anonymous 2):92":0,"onCellClick:78":0,"(anonymous 3):177":0,"_initInplaceOverlay:143":0,"(anonymous 4):221":0,"onOverlaySave:192":0,"onOverlayCancel:232":0,"(anonymous 5):246":0,"enrichData:241":0,"enrichColumns:262":0,"addAddButton:278":0,"_onAddButtonClick:294":0,"modifyRecord:308":0,"(anonymous 6):338":0,"deleteRecord:324":0,"deleteExtraColumns:352":0,"_initPanel:367":0,"onPanelCancelButton:396":0,"(anonymous 7):427":0,"(anonymous 8):449":0,"onPanelSaveButton:401":0,"(anonymous 9):471":0,"destructor:465":0,"addModifyAttr:506":0,"addDeleteAttr:515":0,"delModifyAttr:524":0,"delDeleteAttr:533":0,"addModifyColumn:542":0,"addDeleteColumn:561":0,"removeModifyColumn:579":0,"removeDeleteColumn:588":0,"generateId:593":0,"_initStrings:600":0,"value:741":0,"value:754":0,"value:767":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredLines = 173;
_yuitest_coverage["build/inputex-datatable/inputex-datatable.js"].coveredFunctions = 42;
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 1);
YUI.add('inputex-datatable', function (Y, NAME) {

/*global Y:true,confirm:true*/

/**
 * The inputex-datatable module provides the inputEx.Plugin.InputExDataTable class which is a plugin.
 * @module inputex-datatable
 */

_yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 10);
var inputEx = Y.inputEx;

_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 12);
Y.namespace('inputEx.Plugin');

/**
* Provide add/modify/delete functionalities on a dataTable as a plugin
* @class inputEx.Plugin.InputExDataTable
* @extends Plugin.Base
* @constructor
* @param {Object} configuration object
*/
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 21);
inputEx.Plugin.InputExDataTable = function (config) {
   _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "InputExDataTable", 21);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 22);
inputEx.Plugin.InputExDataTable.superclass.constructor.call(this, config);
};

_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 25);
inputEx.Plugin.InputExDataTable.NS = "InputExDataTable";

_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 27);
Y.extend(inputEx.Plugin.InputExDataTable, Y.Plugin.Base, {
   
   /**
    * @method initializer
    */
   initializer: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "initializer", 32);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 34);
var host = this.get("host");

      // enrich data (Model instance) with modify and delete attributs
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 37);
this.enrichData();
      
      // enrich DataTable with modify and delete columns
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 40);
this.enrichColumns();

      // add a button called "add" in order to add record in the DataTable
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 43);
this.addAddButton();
        
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 45);
if(!this.get("disableModifyFunc")) {
         // handle row modification
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 47);
host.delegate("click",this.modifyRecord, "td."+host.getClassName('cell-modify'), this);
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 50);
if(!this.get("disableDeleteFunc")) {
         // handle row removal
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 52);
host.delegate("click",this.deleteRecord, "td."+host.getClassName('cell-delete'), this);
      }
      

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 56);
if(this.get("inplaceedit")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 57);
host.get('contentBox').addClass( host.getClassName('inplaceedit') );
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 58);
this.setupInplaceEditing();
      }

    },


   setupInplaceEditing: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "setupInplaceEditing", 64);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 65);
var host = this.get('host');

      // Delegate click event to make the inplace editor appear
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 68);
this.cellClickHandler = host.delegate("click", this.onCellClick, "."+host.getClassName('cell'), this);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 70);
this.after('editorShow', this._onEditorShow, this);

   },

   _onEditorShow: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_onEditorShow", 74);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 75);
this.get('inplaceOverlay').show();
   },

   onCellClick: function(e) {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onCellClick", 78);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 80);
var findTd = function(n) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "findTd", 80);
return n.get('tagName') === 'TD' && n.hasClass('yui3-datatable-cell'); },
          td = findTd(e.target) ? e.target : e.target.ancestor(findTd), // this might be a DIV because of a formatter (see color)
          host = this.get('host'),
          colIndex = td.get('parentNode').get('children').indexOf(td),
          column = host.getColumn(colIndex),
          record = host.getRecord(td),
          key = column.key,
          value = record.get(key),

          overlay = this.get('inplaceOverlay'),

          // inputEx Field config
          fieldConf = Y.Array.find(this.get('inputEx').fields, function(i) { _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 2)", 92);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 92);
return i.name === key; }),
          conf = Y.mix({
            parentEl: this.overlayFieldContainer.getDOMNode()
          }, fieldConf),
          field;

      // When we changed the value of an overlay but click on another cell, it doesn't save automatically
      // since the event is stopped. So we do it manually here.
      // TODO: this can have strange effects if you're editing to fast because of the this._inplaceeditCell collision
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 101);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 102);
this.onOverlaySave();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 105);
if( !fieldConf ||
          fieldConf.type === "uneditable" ||
          td.hasClass('yui3-datatable-cell-delete') ||
          td.hasClass('yui3-datatable-cell-modify') ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 109);
return;
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 112);
e.stopPropagation();

      // Align
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 115);
overlay.align(td, ["tl", "tl"]);

      // Render field
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 118);
this.overlayFieldContainer.set('innerHTML', '');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 119);
field = new Y.inputEx(conf);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 120);
field.setValue(value);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 121);
field.focus();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 123);
this._inplaceeditCell = {
         record: record,
         key: column.key,
         field: field,
         td: td
      };

      // TODO: fire an event editorShow
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 131);
this.fire('editorShow', {
         column: column,
         record: record,
         key: key,
         value: value,
         cell: td,
         field: field
      });

   },


   _initInplaceOverlay: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initInplaceOverlay", 143);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 145);
var o = new Y.Overlay({
            zIndex: 5
          }),
          contentBox = o.get('contentBox'),
          overlayFieldContainer = Y.Node.create("<div />"),
          overlayButtonsContainer = Y.Node.create("<div class='editor-buttons' />"),
          saveButton,
          cancelButton;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 154);
contentBox.appendChild(overlayFieldContainer);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 155);
this.overlayFieldContainer = overlayFieldContainer;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 157);
contentBox.appendChild(overlayButtonsContainer);

      // Overlay save and cancel buttons
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 160);
saveButton = Y.Node.create('<button>Sauver</button>');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 161);
overlayButtonsContainer.appendChild(saveButton);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 163);
saveButton.addClass('yui3-button');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 164);
saveButton.addClass('yui3-button-primary');

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 166);
cancelButton = Y.Node.create('<button>Annuler</button>');

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 168);
cancelButton.addClass('yui3-button');
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 169);
cancelButton.addClass('yui3-button-link');


      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 172);
overlayButtonsContainer.appendChild(cancelButton);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 173);
saveButton.on('click', this.onOverlaySave, this);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 174);
cancelButton.on('click', this.onOverlayCancel, this);

      // Close overlay if click outside of the overlay
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 177);
this.docClickHandler = Y.on('click', Y.bind(function(e) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 3)", 177);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 178);
var overlay = this.get('inplaceOverlay');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 180);
if( overlay.get('visible') && !overlay.get('boundingBox').contains(e.target) ) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 181);
this.onOverlaySave();
         }
      }, this), Y.config.doc);

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 185);
contentBox.addClass(this.get('host').getClassName('inplaceOverlay'));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 187);
o.hide();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 188);
o.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 189);
return o;
   },

   onOverlaySave: function() {

      // Call the updateMethod async method
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlaySave", 192);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 195);
var updateMethod = this.get('updateMethod'),
          field = this._inplaceeditCell.field,
          newValue = field.getValue(),
          record = this._inplaceeditCell.record,
          key = this._inplaceeditCell.key,
          oldValue = record.get(key),
          fieldValues = {},
          id = record.get('id'),
          host = this.get('host'),
          td = this._inplaceeditCell.td;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 206);
if(!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 207);
return;
      }

      // has not changed => don't do anything
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 211);
if(   (Y.Lang.isDate(newValue) && Y.Lang.isDate(oldValue) && newValue.getTime() === oldValue.getTime() ) ||
            (newValue === oldValue) ) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 213);
this.get('inplaceOverlay').hide();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 214);
return;
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 217);
fieldValues[key] = newValue;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 219);
td.addClass( host.getClassName('cell-edited') );

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 221);
updateMethod.call(this, id, fieldValues, Y.bind(function(success) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 4)", 221);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 222);
if (success) {
            // on success, update the record in the datatable
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 224);
host.get("data").getById(id).setAttrs(fieldValues);
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 225);
td.removeClass( host.getClassName('cell-edited') );
         }
      },this));

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 229);
this.get('inplaceOverlay').hide();
   },

   onOverlayCancel: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onOverlayCancel", 232);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 233);
this.get('inplaceOverlay').hide();
   },

   /**
    * add Attributes on the data model depending on the plugin configuration
    *
    * @method enrichData
    */
   enrichData: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichData", 241);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 243);
var that = this,
          data = this.get("host").get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 246);
data.each(function (model) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 5)", 246);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 247);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 248);
that.addModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 250);
if(!this.get("disableDeleteFunc")){
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 251);
that.addDeleteAttr(model);
         }
      });

   },

   /**
    * add Columns on the DataTable depending on the plugin configuration
    *
    * @method enrichColumns
    */
   enrichColumns: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "enrichColumns", 262);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 264);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 265);
this.addModifyColumn();
      }
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 268);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 269);
this.addDeleteColumn();
      }
   },

   /**
    * Provide the add button in order to add record on the DataTable
    *
    * @method addAddButton
    */
   addAddButton: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addAddButton", 278);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 280);
if(!this.get("disableAddFunc")) {
      
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 282);
var buttonHtml = "<button class='yui3-button'>"+this.get("strings").addButtonText+"</button>",
             button = Y.Node.create(buttonHtml);

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 285);
this.addButton = button;

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 287);
this.get("host").get("contentBox").append(button);
         
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 289);
button.on("click", this._onAddButtonClick, this);
      }
   
   },

   _onAddButtonClick: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_onAddButtonClick", 294);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 295);
var panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 297);
e.stopPropagation();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 299);
panel.set("headerContent",this.get("strings").addItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 300);
panel.get("field").clear();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 301);
panel.show();
   },

   /**
    *
    * @method modifyRecord
    */
   modifyRecord: function(e) {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "modifyRecord", 308);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 310);
e.stopPropagation();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 312);
var record = this.get("host").getRecord(e.currentTarget),
          panel = this.get("panel");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 315);
panel.set("headerContent",this.get("strings").modifyItemHeader);
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 316);
panel.get('field').setValue(record.getAttrs());
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 317);
panel.show();
   },

   /**
    * Called when the user clicked on a link to delete a record
    * @method deleteRecord
    */
   deleteRecord: function(e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteRecord", 324);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 325);
e.stopPropagation();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 326);
var deleteMethod,
          host = this.get('host'),
          record = host.getRecord(e.currentTarget),
          row;
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 330);
if (!this.get("confirmDelete") || confirm(this.get("strings").confirmDeletion)) {

         // Call the deleteMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 333);
deleteMethod = this.get('deleteMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 335);
row = host.getRow(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 336);
row.addClass( host.getClassName('row-edited') );

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 338);
deleteMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 6)", 338);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 339);
if (success) {
               // on success, remove the record from the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 341);
host.get("data").remove(record);
            }
         },this));

      }
   },

   /**
    *
    * @method deleteExtraColumns
    */
   deleteExtraColumns: function() {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "deleteExtraColumns", 352);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 354);
if(!this.get("disableModifyFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 355);
this.removeModifyColumn();
      }
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 357);
if(!this.get("disableDeleteFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 358);
this.removeDeleteColumn();
      }
   },

   /**
    *
    * @method _initPanel
    * @private
    */
   _initPanel: function () {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initPanel", 367);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 369);
var opts = Y.mix({}, this.get('panelOptions') );

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 371);
var panel = new Y.inputEx.Panel( Y.mix(opts, {
         inputEx: this.get("inputEx"),
         buttons: {
            header: ['close'],

            footer: [
               {
                  value: this.get("strings").saveText,
                  action: Y.bind(this.onPanelSaveButton, this),
                  classNames: 'yui3-button-primary'
               },
               {
                  value: this.get("strings").cancelText,
                  action: Y.bind(this.onPanelCancelButton, this),
                  classNames: 'yui3-button-link'
               }
            ]
         }
      }) );

      // first the panel needs to be "render" then "show"
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 392);
panel.render();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 393);
return panel;
   },

   onPanelCancelButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelCancelButton", 396);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 397);
e.preventDefault();
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 398);
this.get('panel').hide();
   },

   onPanelSaveButton: function (e) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "onPanelSaveButton", 401);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 402);
e.preventDefault();

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 404);
var field = this.get("panel").get("field"),
         fieldValues = field.getValue(),
         host = this.get("host"),
         record,
         RecordType,
         updateMethod,
         row,
         addMethod;

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 413);
if (!field.validate()) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 414);
return;
      }

      // Modification
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 418);
if (fieldValues.id) {

         // Call the updateMethod async method
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 421);
updateMethod = this.get('updateMethod');

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 423);
record = host.get("data").getById(fieldValues.id);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 424);
row = host.getRow(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 425);
row.addClass( host.getClassName('row-edited') );

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 427);
updateMethod.call(this, fieldValues.id, fieldValues, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 7)", 427);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 428);
if (success) {
               // on success, update the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 430);
host.get("data").getById(fieldValues.id).setAttrs(fieldValues);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 431);
this.get('panel').hide();
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 432);
row.removeClass( host.getClassName('row-edited') );
            }
         },this));

      }
      // Creation
      else {

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 440);
fieldValues.id = this.generateId(this.get("idSize"));
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 441);
RecordType = host.get("recordType");
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 442);
record = new RecordType();
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 443);
record.setAttrs(fieldValues);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 444);
this.addModifyAttr(record);
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 445);
this.addDeleteAttr(record);

         // call the async method to create a record
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 448);
addMethod = this.get('addMethod');
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 449);
addMethod.call(this, record, Y.bind(function(success) {
            _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 8)", 449);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 450);
if (success) {
               // if success, add the record in the datatable
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 452);
host.get("data").add(record);
               _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 453);
this.get('panel').hide();
            }
         },this));

      }

   },

   /**
    *
    * @method destructor
    */
   destructor: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "destructor", 465);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 467);
var that = this,
          host = this.get('host'),
          data = host.get("data");

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 471);
data.each(function (model) {

         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "(anonymous 9)", 471);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 473);
if(!this.get("disableModifyFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 474);
that.delModifyAttr(model);
         }
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 476);
if(!this.get("disableDeleteFunc")) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 477);
that.delDeleteAttr(model);
         }

      });
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 482);
this.deleteExtraColumns();
      
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 484);
if(!this.get("disableAddFunc")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 485);
this.addButton.remove();
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 488);
if(this.get("inplaceedit")) {
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 489);
host.get('contentBox').removeClass( host.getClassName('inplaceedit') );
         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 490);
this.cellClickHandler.detach();

         _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 492);
if (this.docClickHandler) {
            _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 493);
this.docClickHandler.detach();
         }
      }

      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 497);
this.get("panel").destroy();
   },


   /**
    * Add the modify attribute on the data model
    *
    * @method addModifyAttr
    */
   addModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyAttr", 506);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 507);
model.addAttr("modify");
   },

   /**
    * Add the delete attribute on the data model
    *
    * @method addDeleteAttr
    */
   addDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteAttr", 515);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 516);
model.addAttr("delete");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delModifyAttr
    */
   delModifyAttr: function(model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delModifyAttr", 524);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 525);
model.removeAttr("modify");
   },

   /**
    * Remove the modify attribute from the data model
    *
    * @method delDeleteAttr
    */
   delDeleteAttr: function (model) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "delDeleteAttr", 533);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 534);
model.removeAttr("delete");
   },

   /**
    * Add the modify column on the DataTable
    *
    * @method addModifyColumn
    */
   addModifyColumn: function() {

      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addModifyColumn", 542);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 544);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 546);
host.addColumn({
         label: ' ',
         key: this.get("strings").modifyText,
         className: host.getClassName('cell-modify'),
         formatter: this.get('modifyColumnFormatter'),
         nodeFormatter: this.get('modifyColumnNodeFormatter')
      });

   },
   
   /**
    * Add the delete column on the DataTable
    *
    * @method addDeleteColumn
    */
   addDeleteColumn: function() {
      
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "addDeleteColumn", 561);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 563);
var host = this.get('host');
         
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 565);
host.addColumn({
         label: ' ',
         key: this.get("strings").deleteText,
         className: host.getClassName('cell-delete'),
         formatter: this.get('deleteColumnFormatter'),
         nodeFormatter: this.get('deleteColumnNodeFormatter')
      });
   },

   /**
    * Remove the modify column from the DataTable
    *
    * @method removeModifyColumn
    */
   removeModifyColumn: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeModifyColumn", 579);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 580);
this.get("host").removeColumn("modify");
   },

   /**
    * Remove the delete column from the DataTable
    *
    * @method removeDeleteColumn
    */
   removeDeleteColumn: function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "removeDeleteColumn", 588);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 589);
this.get("host").removeColumn("delete");
   },


   generateId : function(size) {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "generateId", 593);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 594);
var prefixId = this.get("prefixId"),
          s = size ? size : 5;
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 596);
prefixId = prefixId ? prefixId : "";
      _yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 597);
return prefixId + Math.floor(Math.random()*Math.pow(10,s));
   },
   
   _initStrings : function() {
      _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "_initStrings", 600);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 601);
return Y.Intl.get("inputex-datatable");
   }

}, {

/**
 * Static property used to define the default attribute configuration of
 * the Plugin.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
ATTRS: {

   /**
    * This is an inputEx field definition. This is used when a user try to create/modify a record
    *
    * @attribute inputEx
    */
   inputEx: {},


   /**
    * This string is inserted before the generated id
    *
    * @attribute prefixId
    * @type String
    * @example prefixId : "po-" --> id = po-1342561
    */
   prefixId: {
     value: ""
   },

   /**
    * This represents the number of digits used in the id generation
    *
    * @attribute idSize
    * @type Number
    */
   idSize: {
     value: 5
   },

   /**
    * If true the add functionality is disabled
    *
    * @attribute disableAddFunc
    * @type boolean
    */
   disableAddFunc: {
     value: false
   },

   /**
    * If true the modify functionality is disabled
    * @attribute disableModifyFunc
    * @type boolean
    */
   disableModifyFunc: {
     value: false
   },

   /**
    * If true the delete functionality is disabled
    *
    * @attribute disableDeleteFunc
    * @type boolean
    */
   disableDeleteFunc: {
     value: false
   },

   /**
    * Labels of the plugin
    *
    * @attribute modifyColumnLabel
    */
   strings : {
     value : null,
     valueFn : '_initStrings'
   },

   /**
    * If true a confirmation will be asked to the user when a delete attempt appear
    *
    * @attribute confirmDelete
    * @type boolean
    */
   confirmDelete: {
     value: true
   },

   /**
    * This panel will be displayed on record creation/modication
    * @attribute panel
    * @type Y.inputEx.Panel
    */
   panel: {
     valueFn: '_initPanel',
     lazyAdd: true
   },

   panelOptions: {
      value: {
         centered: true,
         width: 500,
         modal: true,
         zIndex: 5,
         visible: false
      }
   },

   /**
    * Set to true if you want to activate in-cell editing (ALPHA)
    * @attribute inplaceedit
    * @atype boolean
    */
   inplaceedit: {
      value: false
   },

   /**
    * Overlay used for the inplace editing
    * @attribute inplaceOverlay
    * @type Y.Overlay
    */
   inplaceOverlay: {
     valueFn: '_initInplaceOverlay',
     lazyAdd: true
   },

   /**
    * Function used to confirm the creation of a new record.
    * You can perform validation and/or ajax creation.
    * addMethod must be a function(record, cb) which calls 'cb' with success status as first argument
    * @attribute addMethod
    * @type function
    */
   addMethod: {
      value: function(record, cb) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 741);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 742);
cb(true);
      }
   },

   /**
    * Function used to confirm the modification of an existing record.
    * You can perform validation and/or ajax update.
    * updateMethod must be a function(id, newValues, cb) which calls 'cb' with success status as first argument
    * @attribute updateMethod
    * @type function
    */
   updateMethod: {
      value: function(id, newValues, cb) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 754);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 755);
cb(true);
      }
   },

   /**
    * Function used to confirm the deletion of an existing record.
    * You can perform validation and/or ajax deletion.
    * deleteMethod must be a function(record, cb) which calls 'cb' with success status as first argument
    * @attribute deleteMethod
    * @type function
    */
   deleteMethod: {
      value: function(record, cb) {
         _yuitest_coverfunc("build/inputex-datatable/inputex-datatable.js", "value", 767);
_yuitest_coverline("build/inputex-datatable/inputex-datatable.js", 768);
cb(true);
      }
   },

   /**
    * Formatter for the modify column
    * @attribute modifyColumnFormatter
    * @type function
    */
   modifyColumnFormatter: {
      value: null
   },

   /**
    * Formatter for the delete column
    * @attribute deleteColumnFormatter
    * @type function
    */
   deleteColumnFormatter: {
      value: null
   },

   /**
    * nodeFormatter for the modify column
    * @attribute modifyColumnNodeFormatter
    * @type function
    */
   modifyColumnNodeFormatter: {
      value: null
   },

   /**
    * nodeFormatter for the delete column
    * @attribute deleteColumnNodeFormatter
    * @type function
    */
   deleteColumnNodeFormatter: {
      value: null
   }

}

});


}, '@VERSION@', {
    "requires": [
        "inputex-group",
        "inputex-panel",
        "datatable",
        "overlay",
        "intl"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl"
    ]
});
