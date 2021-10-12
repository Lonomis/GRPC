sap.ui.define([
    'sap/ui/base/Object',
    'sap/ui/core/Fragment',
    "zmmo071303/model/FragmentModel"
], function(Object, Fragment, FragmentModel) {
    'use strict';
    return Object.extend("zmmo071303.screenManager.ScreenManager", {
        _fixedValue: {
            sFragmentNameSpace  :   "zmmo071303.fragment."
        },
        
        _fragments  :   {},

        _attributes :   {
            view        :   {},
            controller  :   {},
            contentVBox :   {}
        },

        _setAttributes: function(oView, oVBox, oController){
            this._attributes.view           =   oView;
            this._attributes.contentVBox    =   oVBox;
            this._attributes.controller     =   oController;
        },

        _clearFragments: function(){
            this._fragments =   {};
        },

        constructor: function(oView, oVBox, sFragmentModelName, oController){
            //Instantiate Fragment Model
            this.FragmentModel = new FragmentModel();
            
            //Set Fragment Model
            this.FragmentModel.setModel(oView, sFragmentModelName);

            this._setAttributes(oView, oVBox, oController);
            this._clearFragments();
        },

        loadFragment: function(sFragmentName){
            var that = this;

            this._attributes.contentVBox.removeAllItems();
            
            return new Promise(function(resolve){
                that.instantiateFragment(sFragmentName).then(function(oForm){
                    that.FragmentModel.setActiveFragment(sFragmentName);
                    that._attributes.contentVBox.insertItem(oForm);
                    
                    resolve();
                })
            })
        },

        instantiateFragment: function(sFragmentName){
            var oFragment = this._fragments[sFragmentName];

            if (!oFragment) {
                oFragment = Fragment.load({
                    id:         this._attributes.view.getId(),
                    name:       this._fixedValue.sFragmentNameSpace + sFragmentName,
                    controller: this._attributes.controller
                });
                this._fragments[sFragmentName] = oFragment;
            }

            return oFragment;
        }
        
    });
});