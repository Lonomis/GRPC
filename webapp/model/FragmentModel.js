sap.ui.define([
    'sap/ui/base/Object',
    'sap/ui/model/json/JSONModel'
], function(Object, JSONModel) {
    'use strict';
    
    return Object.extend("zmmo071303.model.FragmentModel", {
        _oData : {
            activeFragment : ""
        },

        _FragmentModel : {},

        constructor : function() {
            //Clear Active Fragment
            this._oData.activeFragment = "";
            this._FragmentModel = new JSONModel(this._oData);
        },

        setModel : function(oView, sModelName) {
            oView.setModel(this._FragmentModel, sModelName);
        },

        setActiveFragment : function(sActiveFragment) {
            var oFragmentData = this._FragmentModel.getData();

            oFragmentData.activeFragment = sActiveFragment;

            this._FragmentModel.setData(oFragmentData);
        },

        getActiveFragment : function() {
            var oFragmentData = this._FragmentModel.getData();

            return oFragmentData.activeFragment;
        }

    });
});